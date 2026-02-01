const bcrypt = require("bcrypt");
const crypto = require("crypto");
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

async function upsertDkteisPages() {
  const pages = [
    {
      title: "DKTE Society's International School, Tardal",
      slug: "dkteis-home",
      isPublished: true,
      sourceUrl: "https://www.dkteis.com/",
      content:
        "Call For Admissions: +91 8149065016\nEmail: dkteis@gmail.com\n\nVISION\nEducation should be a joyful experience and we believe that every child is unique and has / her unique strengths and we work for manifestation of these strengths.\nWe believe in nurturing the creativity of the students so that they find their niche.\n\nMISSION\nOur focus is to provide a stimulating early learning and child care experience which promotes each child's social/ emotional, physical & cognitive development. Our kinder garden provides a safe developmentally appropriate, nurturing environment that promotes social, emotional,\n\nChairman Message\nHon. Kallappanna B. Awade\nDear Students, Parents, and Faculty, I am honored to address you as the Chairman of our esteemed institution and share with you the general vision that guides our school.\n\nAddress: KATP Road Tardal 416 121\nPhone: +91 8149065016, +91 7020453191\nMail: info@dekteis.com",
      contentHtml: `
<section>
  <p><strong>Call For Admissions:</strong> <a href="tel:+918149065016">+91 8149065016</a></p>
  <p><strong>Email:</strong> <a href="mailto:dkteis@gmail.com">dkteis@gmail.com</a></p>
</section>

<hr />

<h2>VISION</h2>
<p>
  Education should be a joyful experience and we believe that every child is unique and has his/her unique strengths
  and we work for manifestation of these strengths. We believe in nurturing the creativity of the students so that
  they find their niche.
</p>

<h2>MISSION</h2>
<p>
  Our focus is to provide a stimulating early learning and child care experience which promotes each child's
  social/emotional, physical &amp; cognitive development. Our kinder garden provides a safe developmentally appropriate,
  nurturing environment that promotes social, emotional.
</p>

<h2>School Achievements</h2>
<p>
  We provide comprehensive, reliable, and efficient knowledge to our students, leveraging cutting-edge technology
  and top-tier expertise to deliver peace of mind and lasting value.
</p>

<h2>Chairman Message</h2>
<p><strong>Hon. Kallappanna B. Awade</strong></p>
<p>
  Dear Students, Parents, and Faculty, I am honored to address you as the Chairman of our esteemed institution and
  share with you the general vision that guides our school. At DKTE International School, we firmly believe that
  education is the key to unlocking the full potential of every individual.
</p>
<p>
  Our vision encompasses creating an inclusive and nurturing learning environment that empowers our students to
  become confident, responsible, and compassionate global citizens.
</p>
<p>
  At the core of our educational philosophy lies a commitment to academic excellence. We strive to provide our
  students with a rigorous and well-rounded curriculum that not only imparts knowledge but also fosters critical
  thinking, creativity, and problem-solving skills.
</p>
<p>
  As the Chairman, I assure you that our dedicated and passionate team of educators is committed to upholding the
  vision of our school. We continuously strive for excellence and are devoted to providing a nurturing and inspiring
  educational experience for each student.
</p>

<h2>D.K.T.E. Society’s</h2>
<p>
  D.K.T.E. Society’s 40 years long &amp; rich experience of catering to high quality education from KG to Ph.D.
  International school, Tardal (CBSE) is one of the dream project of our founder president Hon. Kallappanna Awade
  (Dada).
</p>

<h2>Contact</h2>
<p><strong>Address:</strong> KATP Road Tardal 416 121</p>
<p><strong>Call Now:</strong> <a href="tel:+918149065016">+91 8149065016</a>, <a href="tel:+917020453191">+91 7020453191</a></p>
<p><strong>Mail:</strong> <a href="mailto:info@dekteis.com">info@dekteis.com</a></p>
      `.trim(),
    },
    {
      title: "About",
      slug: "dkteis-about",
      isPublished: true,
      sourceUrl: "https://www.dkteis.com/about/",
      content: "Education should be joyful experience and we believe that every child is unique and has his/her unique strengths.",
      contentHtml: `
<h2>About</h2>
<p>
  Education should be joyful experience and we believe that every child is unique and has his/her unique strengths
  &amp; we work for manifestation of these strengths. Learning should be a fun-filled journey of discovery. We believe
  in nurturing the creativity of the students.
</p>
      `.trim(),
    },
    {
      title: "Management",
      slug: "dkteis-management",
      isPublished: true,
      sourceUrl: "https://www.dkteis.com/management/",
      content: "Management",
      contentHtml: `<h2>Management</h2><p>Content to be updated with full management details.</p>`,
    },
    {
      title: "Infrastructure",
      slug: "dkteis-infrastructure",
      isPublished: true,
      sourceUrl: "https://www.dkteis.com/infrastructure/",
      content: "Infrastructure of the school.",
      contentHtml: `
<h2>Infrastructure of the School</h2>
<p>
  We care, we take a personalized approach to each customer, and our management team is never more than a phone
  call or email away.
</p>
      `.trim(),
    },
    {
      title: "Academic",
      slug: "dkteis-academic",
      isPublished: true,
      sourceUrl: "https://www.dkteis.com/academic/",
      content: "Academic",
      contentHtml: `<h2>Academic</h2><p>Content to be updated with academic details.</p>`,
    },
    {
      title: "Facilities",
      slug: "dkteis-facilities",
      isPublished: true,
      sourceUrl: "https://www.dkteis.com/facilities/",
      content: "Facilities",
      contentHtml: `<h2>Facilities</h2><p>Content to be updated with facilities details.</p>`,
    },
    {
      title: "Blog",
      slug: "dkteis-blog",
      isPublished: true,
      sourceUrl: "https://www.dkteis.com/blog/",
      content: "Blog",
      contentHtml: `<h2>Blog</h2><p>Blog content will appear here.</p>`,
    },
    {
      title: "Contact",
      slug: "dkteis-contact",
      isPublished: true,
      sourceUrl: "https://www.dkteis.com/contact/",
      content: "Contact",
      contentHtml: `
<h2>Contact</h2>
<p><strong>Address:</strong> KATP Road Tardal 416 121</p>
<p><strong>Call Now:</strong> <a href="tel:+918149065016">+91 8149065016</a>, <a href="tel:+917020453191">+91 7020453191</a></p>
<p><strong>Mail:</strong> <a href="mailto:info@dekteis.com">info@dekteis.com</a></p>
      `.trim(),
    },
    {
      title: "Disclosure",
      slug: "dkteis-disclosure",
      isPublished: true,
      sourceUrl: "https://www.dkteis.com/disclosure/",
      content: "Disclosure",
      contentHtml: `<h2>Disclosure</h2><p>Disclosure content will appear here.</p>`,
    },
  ];

  for (const p of pages) {
    await prisma.sitePage.upsert({
      where: { slug: p.slug },
      create: p,
      update: {
        title: p.title,
        content: p.content,
        contentHtml: p.contentHtml,
        isPublished: p.isPublished,
        sourceUrl: p.sourceUrl,
      },
    });
  }
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

async function seedDemoData() {
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) return;

  const academicYear = "2025-26";

  const class10A = await prisma.class.upsert({
    where: { grade_section_academicYear: { grade: "10", section: "A", academicYear } },
    create: { name: "Grade 10", grade: "10", section: "A", academicYear },
    update: { name: "Grade 10" },
  });

  const class9B = await prisma.class.upsert({
    where: { grade_section_academicYear: { grade: "9", section: "B", academicYear } },
    create: { name: "Grade 9", grade: "9", section: "B", academicYear },
    update: { name: "Grade 9" },
  });

  const math = await prisma.subject.upsert({
    where: { code: "MATH-10" },
    create: { name: "Mathematics", code: "MATH-10" },
    update: { name: "Mathematics" },
  });

  const science = await prisma.subject.upsert({
    where: { code: "SCI-10" },
    create: { name: "Science", code: "SCI-10" },
    update: { name: "Science" },
  });

  const english = await prisma.subject.upsert({
    where: { code: "ENG-10" },
    create: { name: "English", code: "ENG-10" },
    update: { name: "English" },
  });

  const teacherEmail = "teacher1@school.local";
  const teacherPasswordHash = await bcrypt.hash("Teacher123!", 12);
  const teacherUser = await prisma.user.upsert({
    where: { email: teacherEmail },
    create: {
      email: teacherEmail,
      name: "Asha Patil",
      role: "TEACHER",
      passwordHash: teacherPasswordHash,
      isActive: true,
      permissions: [],
    },
    update: { role: "TEACHER", isActive: true },
  });

  const teacher = await prisma.teacher.upsert({
    where: { employeeNo: "T-1001" },
    create: {
      userId: teacherUser.id,
      employeeNo: "T-1001",
      phone: "+91 90000 00001",
    },
    update: { userId: teacherUser.id, phone: "+91 90000 00001" },
  });

  await prisma.teacherClass.upsert({
    where: { teacherId_classId: { teacherId: teacher.id, classId: class10A.id } },
    create: { teacherId: teacher.id, classId: class10A.id },
    update: {},
  });

  await prisma.teacherSubject.upsert({
    where: { teacherId_subjectId: { teacherId: teacher.id, subjectId: math.id } },
    create: { teacherId: teacher.id, subjectId: math.id },
    update: {},
  });

  await prisma.teacherSubject.upsert({
    where: { teacherId_subjectId: { teacherId: teacher.id, subjectId: science.id } },
    create: { teacherId: teacher.id, subjectId: science.id },
    update: {},
  });

  await prisma.class.update({
    where: { id: class10A.id },
    data: { classTeacherId: teacher.id },
  });

  const studentEmail = "student1@school.local";
  const studentPasswordHash = await bcrypt.hash("Student123!", 12);
  const studentUser = await prisma.user.upsert({
    where: { email: studentEmail },
    create: {
      email: studentEmail,
      name: "Rohit Kulkarni",
      role: "STUDENT",
      passwordHash: studentPasswordHash,
      isActive: true,
      permissions: [],
    },
    update: { role: "STUDENT", isActive: true },
  });

  const student = await prisma.student.upsert({
    where: { admissionNo: "S-1001" },
    create: {
      userId: studentUser.id,
      admissionNo: "S-1001",
      rollNo: 1,
      classId: class10A.id,
    },
    update: { userId: studentUser.id, classId: class10A.id, rollNo: 1 },
  });

  const parentEmail = "parent1@school.local";
  const parentPasswordHash = await bcrypt.hash("Parent123!", 12);
  const parentUser = await prisma.user.upsert({
    where: { email: parentEmail },
    create: {
      email: parentEmail,
      name: "Sanjay Kulkarni",
      role: "PARENT",
      passwordHash: parentPasswordHash,
      isActive: true,
      permissions: [],
    },
    update: { role: "PARENT", isActive: true },
  });

  const parent = await prisma.parent.upsert({
    where: { userId: parentUser.id },
    create: { userId: parentUser.id, phone: "+91 90000 00002" },
    update: { phone: "+91 90000 00002" },
  });

  await prisma.parentStudent.upsert({
    where: { parentId_studentId: { parentId: parent.id, studentId: student.id } },
    create: { parentId: parent.id, studentId: student.id, relation: "Father" },
    update: { relation: "Father" },
  });

  for (const subject of [math, science, english]) {
    await prisma.classSubject.upsert({
      where: { classId_subjectId: { classId: class10A.id, subjectId: subject.id } },
      create: { classId: class10A.id, subjectId: subject.id },
      update: {},
    });
  }

  await prisma.classSubject.upsert({
    where: { classId_subjectId: { classId: class9B.id, subjectId: english.id } },
    create: { classId: class9B.id, subjectId: english.id },
    update: {},
  });

  const existingHomework = await prisma.homework.findFirst({
    where: { classId: class10A.id, title: "Algebra Practice Set" },
  });
  if (!existingHomework) {
    const dueAt = new Date();
    dueAt.setDate(dueAt.getDate() + 5);
    await prisma.homework.create({
      data: {
        classId: class10A.id,
        subjectId: math.id,
        title: "Algebra Practice Set",
        description: "Solve questions 1-15 from Chapter 4.",
        dueAt,
        createdById: teacherUser.id,
      },
    });
  }

  const existingMaterial = await prisma.studyMaterial.findFirst({
    where: { classId: class10A.id, title: "Photosynthesis Notes" },
  });
  if (!existingMaterial) {
    await prisma.studyMaterial.create({
      data: {
        classId: class10A.id,
        subjectId: science.id,
        title: "Photosynthesis Notes",
        description: "Key concepts and diagrams for photosynthesis.",
        youtubeUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
        createdById: teacherUser.id,
      },
    });
  }

  const existingVideo = await prisma.videoLink.findFirst({
    where: { classId: class10A.id, title: "Linear Equations Basics" },
  });
  if (!existingVideo) {
    await prisma.videoLink.create({
      data: {
        classId: class10A.id,
        subjectId: math.id,
        title: "Linear Equations Basics",
        url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
        createdById: teacherUser.id,
      },
    });
  }

  const existingTimetable = await prisma.timetable.findFirst({ where: { classId: class10A.id } });
  if (!existingTimetable) {
    const bytes = Buffer.from("Demo timetable for Grade 10 A");
    const sha256 = crypto.createHash("sha256").update(bytes).digest("hex");
    const uploaded = await prisma.uploadedFile.create({
      data: {
        name: "grade-10-a-timetable.txt",
        mimeType: "text/plain",
        bytes,
        size: bytes.length,
        sha256,
        uploadedById: admin.id,
      },
    });

    await prisma.timetable.create({
      data: {
        classId: class10A.id,
        title: "Grade 10 A Timetable",
        uploadedFileId: uploaded.id,
      },
    });
  }

  const attendanceDate = new Date();
  attendanceDate.setHours(0, 0, 0, 0);
  const record = await prisma.attendanceRecord.upsert({
    where: {
      date_classId_subjectId: { date: attendanceDate, classId: class10A.id, subjectId: math.id },
    },
    create: {
      date: attendanceDate,
      classId: class10A.id,
      subjectId: math.id,
      markedById: teacherUser.id,
    },
    update: { markedById: teacherUser.id },
  });

  await prisma.attendanceEntry.upsert({
    where: { recordId_studentId: { recordId: record.id, studentId: student.id } },
    create: { recordId: record.id, studentId: student.id, status: "PRESENT" },
    update: { status: "PRESENT" },
  });

  await prisma.result.upsert({
    where: {
      studentId_subjectId_term_examName: {
        studentId: student.id,
        subjectId: math.id,
        term: "Term 1",
        examName: "Unit Test",
      },
    },
    create: {
      studentId: student.id,
      subjectId: math.id,
      term: "Term 1",
      examName: "Unit Test",
      marks: 78,
      maxMarks: 100,
      grade: "B+",
      publishedAt: new Date(),
      publishedById: teacherUser.id,
    },
    update: {
      marks: 78,
      maxMarks: 100,
      grade: "B+",
      publishedAt: new Date(),
      publishedById: teacherUser.id,
    },
  });

  console.log("Seeded demo accounts:");
  console.log("Teacher: teacher1@school.local / Teacher123!");
  console.log("Student: student1@school.local / Student123!");
  console.log("Parent: parent1@school.local / Parent123!");
}

async function main() {
  await upsertNotificationSetting();
  await upsertEmailTemplates();
  await upsertDkteisPages();
  await upsertAdminUser();
  await seedPublicContentIfEmpty();
  await seedDemoData();
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
