import TeacherResultsForm from "./ui";

export const metadata = { title: "Results" };

export default function TeacherResultsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Result Management</h1>
      <p className="mt-1 text-sm text-zinc-600">
        Enter marks for students and optionally publish (publishing triggers email notifications).
      </p>
      <div className="mt-6">
        <TeacherResultsForm />
      </div>
    </div>
  );
}
