import RoleLoginForm from "@/components/auth/RoleLoginForm";

export const metadata = { title: "Teacher Login" };

export default function TeacherLoginPage() {
  return (
    <RoleLoginForm
      title="Teacher Login"
      subtitle="Sign in to manage classes, attendance, homework, and results."
      roleLabel="Teacher"
      defaultCallbackUrl="/dashboard/teacher"
    />
  );
}
