const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function upsertEmailTemplates() {
  const templates = [
    {
      key: "NOTICE_PUBLISHED",
      subject: "New Notice: {{title}}",
      text: "A new notice was published: {{title}}\n\n{{content}}",
      html: "<h2>New Notice</h2><p><strong>{{title}}</strong></p><div style=\"white-space:pre-wrap\">{{content}}</div>",
    },
    {
      key: "EVENT_PUBLISHED",
      subject: "New Event: {{title}}",
      text: "A new event was posted: {{title}}\nWhen: {{startAt}}\nWhere: {{location}}\n\n{{description}}",
      html: "<h2>New Event</h2><p><strong>{{title}}</strong></p><p><strong>When:</strong> {{startAt}}</p><p><strong>Where:</strong> {{location}}</p><div style=\"white-space:pre-wrap\">{{description}}</div>",
    },
    {
      key: "ATTENDANCE_ALERT",
      subject: "Attendance Alert for {{studentName}}",
      text: "Attendance update for {{studentName}} on {{date}}: {{status}}.",
      html: "<h2>Attendance Alert</h2><p><strong>{{studentName}}</strong></p><p>Date: {{date}}</p><p>Status: <strong>{{status}}</strong></p>",
    },
    {
      key: "RESULT_PUBLISHED",
      subject: "Results Published: {{studentName}}",
      text: "Results have been published for {{studentName}} ({{term}} / {{examName}}).",
      html: "<h2>Results Published</h2><p>Results have been published for <strong>{{studentName}}</strong>.</p><p>{{term}} / {{examName}}</p>",
    },
    {
      key: "CONTACT_ENQUIRY",
      subject: "New website enquiry from {{name}}",
      text: "From: {{name}} ({{email}})\nPhone: {{phone}}\n\n{{message}}",
      html: "<h2>New Enquiry</h2><p><strong>{{name}}</strong> ({{email}})</p><p>Phone: {{phone}}</p><div style=\"white-space:pre-wrap\">{{message}}</div>",
    },
  ];

  for (const t of templates) {
    await prisma.emailTemplate.upsert({
      where: { key: t.key },
      create: t,
      update: { subject: t.subject, text: t.text, html: t.html },
    });
  }
}

async function upsertNotificationSetting() {
  await prisma.notificationSetting.upsert({
    where: { id: "default" },
    create: { id: "default" },
    update: { updatedAt: new Date() },
  });
}

async function upsertAdminUser() {
  const email = process.env.ADMIN_EMAIL || "admin@school.local";
  const password = process.env.ADMIN_PASSWORD || "Admin123!";

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    create: {
      email,
      name: "Admin",
      role: "ADMIN",
      passwordHash,
      isActive: true,
      permissions: [],
    },
    update: {
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log("Seeded admin user:", email);
}

async function seedPublicContentIfEmpty() {
  const [noticeCount, eventCount] = await Promise.all([
    prisma.notice.count(),
    prisma.event.count(),
  ]);

  if (noticeCount === 0) {
    const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (admin) {
      await prisma.notice.createMany({
        data: [
          {
            title: "School Reopens - Important Instructions",
            content:
              "Welcome back! Please arrive 10 minutes early for assembly. Ensure uniforms and ID cards are in order.",
            isPublished: true,
            createdById: admin.id,
          },
          {
            title: "Parent-Teacher Meeting",
            content:
              "PTM will be held this Saturday from 10:00 AM to 1:00 PM. Please check the portal for class-wise schedules.",
            isPublished: true,
            createdById: admin.id,
          },
        ],
      });
    }
  }

  if (eventCount === 0) {
    const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (admin) {
      const start1 = new Date();
      start1.setDate(start1.getDate() + 7);
      start1.setHours(10, 0, 0, 0);

      const start2 = new Date();
      start2.setDate(start2.getDate() + 14);
      start2.setHours(9, 0, 0, 0);

      await prisma.event.createMany({
        data: [
          {
            title: "Annual Sports Day",
            description:
              "Join us for a full day of athletics, team sports, and award ceremonies.",
            location: "School Ground",
            startAt: start1,
            isPublished: true,
            createdById: admin.id,
          },
          {
            title: "Science Exhibition",
            description:
              "Students will present innovative projects and experiments. Parents are welcome to attend.",
            location: "Main Hall",
            startAt: start2,
            isPublished: true,
            createdById: admin.id,
          },
        ],
      });
    }
  }
}

async function main() {
  await upsertNotificationSetting();
  await upsertEmailTemplates();
  await upsertAdminUser();
  await seedPublicContentIfEmpty();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
