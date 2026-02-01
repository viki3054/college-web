import TeacherNoticeForm from "./ui";

export const metadata = { title: "Class Notices" };

export default function TeacherNoticesPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Class Notices</h1>
      <p className="mt-1 text-sm text-zinc-600">
        Post announcements for a specific class. Published notices trigger email alerts.
      </p>
      <div className="mt-6">
        <TeacherNoticeForm />
      </div>
    </div>
  );
}
