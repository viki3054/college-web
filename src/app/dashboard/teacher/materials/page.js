import TeacherMaterialsForm from "./ui";

export const metadata = { title: "Study Material" };

export default function TeacherMaterialsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Study Material</h1>
      <p className="mt-1 text-sm text-zinc-600">
        Upload learning content or add a YouTube link (max 4MB per file).
      </p>
      <div className="mt-6">
        <TeacherMaterialsForm />
      </div>
    </div>
  );
}
