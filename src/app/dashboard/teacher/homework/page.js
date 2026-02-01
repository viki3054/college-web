import TeacherHomeworkForm from "./ui";

export const metadata = { title: "Homework" };

export default function TeacherHomeworkPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Homework</h1>
      <p className="mt-1 text-sm text-zinc-600">
        Upload homework with optional attachment (max 4MB).
      </p>
      <div className="mt-6">
        <TeacherHomeworkForm />
      </div>
    </div>
  );
}
