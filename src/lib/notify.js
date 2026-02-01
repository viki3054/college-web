import { prisma } from "@/lib/prisma";
import { sendTemplateEmail } from "@/lib/email/send";
import { getEmailsForClass, getEmailsForRole, getEmailsForStudentAndParents } from "@/lib/recipients";

export async function notifyNoticePublished(noticeId) {
  const settings = await prisma.notificationSetting.findUnique({ where: { id: "default" } });
  if (settings && !settings.noticesEnabled) return;

  const notice = await prisma.notice.findUnique({ where: { id: noticeId } });
  if (!notice?.isPublished) return;

  let recipients = [];
  if (notice.classId) {
    recipients = await getEmailsForClass(notice.classId, ["STUDENT", "PARENT", "TEACHER"]);
  } else if (notice.audienceRole) {
    recipients = await getEmailsForRole(notice.audienceRole);
  } else {
    recipients = [
      ...(await getEmailsForRole("STUDENT")),
      ...(await getEmailsForRole("PARENT")),
      ...(await getEmailsForRole("TEACHER")),
    ];
  }

  for (const to of recipients) {
    await sendTemplateEmail({
      to,
      templateKey: "NOTICE_PUBLISHED",
      context: { title: notice.title, content: notice.content },
    });
  }

  await prisma.notice.update({
    where: { id: noticeId },
    data: { emailNotifiedAt: new Date() },
  });
}

export async function notifyEventPublished(eventId) {
  const settings = await prisma.notificationSetting.findUnique({ where: { id: "default" } });
  if (settings && !settings.eventsEnabled) return;

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event?.isPublished) return;

  let recipients = [];
  if (event.classId) {
    recipients = await getEmailsForClass(event.classId, ["STUDENT", "PARENT", "TEACHER"]);
  } else if (event.audienceRole) {
    recipients = await getEmailsForRole(event.audienceRole);
  } else {
    recipients = [
      ...(await getEmailsForRole("STUDENT")),
      ...(await getEmailsForRole("PARENT")),
      ...(await getEmailsForRole("TEACHER")),
    ];
  }

  for (const to of recipients) {
    await sendTemplateEmail({
      to,
      templateKey: "EVENT_PUBLISHED",
      context: {
        title: event.title,
        description: event.description,
        startAt: new Date(event.startAt).toLocaleString(),
        location: event.location || "-",
      },
    });
  }

  await prisma.event.update({
    where: { id: eventId },
    data: { emailNotifiedAt: new Date() },
  });
}

export async function notifyAttendanceAlert({ studentId, date, status }) {
  const settings = await prisma.notificationSetting.findUnique({ where: { id: "default" } });
  if (settings && !settings.attendanceEnabled) return;

  const emails = await getEmailsForStudentAndParents(studentId);
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: { user: { select: { name: true, email: true } } },
  });

  for (const to of emails) {
    await sendTemplateEmail({
      to,
      templateKey: "ATTENDANCE_ALERT",
      context: {
        studentName: student?.user?.name || student?.user?.email || "Student",
        date: new Date(date).toLocaleDateString(),
        status,
      },
    });
  }
}

export async function notifyResultsPublished({ studentId, term, examName }) {
  const settings = await prisma.notificationSetting.findUnique({ where: { id: "default" } });
  if (settings && !settings.resultsEnabled) return;

  const emails = await getEmailsForStudentAndParents(studentId);
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: { user: { select: { name: true, email: true } } },
  });

  for (const to of emails) {
    await sendTemplateEmail({
      to,
      templateKey: "RESULT_PUBLISHED",
      context: {
        studentName: student?.user?.name || student?.user?.email || "Student",
        term,
        examName,
      },
    });
  }
}
