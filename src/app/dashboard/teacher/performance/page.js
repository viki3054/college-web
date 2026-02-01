import TeacherPerformanceView from "./ui";

export const metadata = { title: "Performance" };

export default function TeacherPerformancePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Student Performance</h1>
      <p className="mt-1 text-sm text-zinc-600">
        Attendance rate and marks overview for your classes.
      </p>
      <div className="mt-6">
        <TeacherPerformanceView />
      </div>
    </div>
  );
}
