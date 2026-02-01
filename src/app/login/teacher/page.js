import { Suspense } from "react";
import RoleLoginForm from "@/components/auth/RoleLoginForm";

export const metadata = { title: "Teacher Login" };

export default function TeacherLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <RoleLoginForm
        title="Teacher Login"
        subtitle="Sign in to manage classes, attendance, homework, and results."
        roleLabel="Teacher"
        defaultCallbackUrl="/dashboard/teacher"
      />
    </Suspense>
  );
}
