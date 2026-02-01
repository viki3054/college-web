import TeacherAttendanceForm from "./ui";

export const metadata = { title: "Mark Attendance" };

export default function TeacherAttendancePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Mark Attendance</h1>
      <p className="mt-1 text-sm text-zinc-600">
        Mark daily attendance for a class (optionally subject-wise).
      </p>
      <div className="mt-6">
        <TeacherAttendanceForm />
      </div>
    </div>
  );
}
