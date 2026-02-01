import RoleLoginForm from "@/components/auth/RoleLoginForm";

export const metadata = { title: "Admin Login" };

export default function AdminLoginPage() {
  return (
    <RoleLoginForm
      title="Admin Login"
      subtitle="Sign in to manage users, academics, notices, events, and settings."
      roleLabel="Admin"
      defaultCallbackUrl="/dashboard/admin"
      helperText="Admin default (seed): admin@school.local / Admin123!"
    />
  );
}
