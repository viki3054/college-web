import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/http";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { hashPassword } from "@/lib/password";

export const runtime = "nodejs";

const createSchema = z.object({
  kind: z.enum(["USER", "STUDENT", "TEACHER", "PARENT"]),
  email: z.string().email().max(200),
  name: z.string().min(1).max(120).optional().or(z.literal("")),
  password: z.string().min(6).max(200),
  role: z.enum(["ADMIN", "TEACHER", "PARENT", "STUDENT"]),

  // Student
  admissionNo: z.string().max(50).optional().or(z.literal("")),
  classId: z.string().optional().or(z.literal("")),

  // Teacher
  employeeNo: z.string().max(50).optional().or(z.literal("")),
  phone: z.string().max(50).optional().or(z.literal("")),

  // Parent
  childAdmissionNo: z.string().max(50).optional().or(z.literal("")),
  relation: z.string().max(50).optional().or(z.literal("")),
});

export async function GET(req) {
  try {
    await requireAdmin();

    const rl = enforceRateLimit(req, { limit: 60, windowMs: 60_000, keyPrefix: "admin-users" });
    if (!rl.ok) return jsonError("Too many requests", 429);

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      take: 200,
    });

    return jsonOk({ users });
  } catch (e) {
    return jsonError(e, e?.status || 500);
  }
}

export async function POST(req) {
  try {
    await requireAdmin();

    const rl = enforceRateLimit(req, { limit: 20, windowMs: 60_000, keyPrefix: "admin-users-write" });
    if (!rl.ok) return jsonError("Too many requests", 429);

    const body = await req.json();
    const data = createSchema.parse(body);

    const email = data.email.toLowerCase().trim();
    const passwordHash = await hashPassword(data.password);

    const created = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          name: data.name || null,
          role: data.role,
          passwordHash,
          isActive: true,
          permissions: [],
        },
      });

      if (data.kind === "STUDENT") {
        if (!data.admissionNo) throw new Error("admissionNo is required");
        await tx.student.create({
          data: {
            userId: user.id,
            admissionNo: data.admissionNo,
            classId: data.classId || null,
          },
        });
      }

      if (data.kind === "TEACHER") {
        if (!data.employeeNo) throw new Error("employeeNo is required");
        await tx.teacher.create({
          data: {
            userId: user.id,
            employeeNo: data.employeeNo,
            phone: data.phone || null,
          },
        });
      }

      if (data.kind === "PARENT") {
        const parent = await tx.parent.create({
          data: {
            userId: user.id,
            phone: data.phone || null,
          },
        });

        if (data.childAdmissionNo) {
          const student = await tx.student.findUnique({
            where: { admissionNo: data.childAdmissionNo },
            select: { id: true },
          });
          if (student) {
            await tx.parentStudent.create({
              data: {
                parentId: parent.id,
                studentId: student.id,
                relation: data.relation || null,
              },
            });
          }
        }
      }

      return user;
    });

    return jsonOk({ id: created.id }, { status: 201 });
  } catch (e) {
    return jsonError(e, 400);
  }
}
