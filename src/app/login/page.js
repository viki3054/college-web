import RoleLoginForm from "@/components/auth/RoleLoginForm";

export default function LoginPage() {
  return (
    <RoleLoginForm
      title="Sign in"
      subtitle="Use your school account to access the portal."
      roleLabel="Portal"
      defaultCallbackUrl="/dashboard"
      helperText="Admin default (seed): admin@school.local / Admin123!"
      showRoleLinks
    />
  );
}
