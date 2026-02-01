import RoleLoginForm from "@/components/auth/RoleLoginForm";

export const metadata = { title: "Student Login" };

export default function StudentLoginPage() {
  return (
    <RoleLoginForm
      title="Student Login"
      subtitle="Sign in to view your timetable, homework, results, and materials."
      roleLabel="Student"
      defaultCallbackUrl="/dashboard/student"
    />
  );
}
