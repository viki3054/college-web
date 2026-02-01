import TeacherVideosForm from "./ui";

export const metadata = { title: "YouTube Videos" };

export default function TeacherVideosPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">YouTube Videos</h1>
      <p className="mt-1 text-sm text-zinc-600">
        Attach YouTube learning videos to a class/subject.
      </p>
      <div className="mt-6">
        <TeacherVideosForm />
      </div>
    </div>
  );
}
