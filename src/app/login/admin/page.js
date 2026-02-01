import { Suspense } from "react";
import RoleLoginForm from "@/components/auth/RoleLoginForm";

export const metadata = { title: "Admin Login" };

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <RoleLoginForm
        title="Admin Login"
        subtitle="Sign in to manage users, academics, notices, events, and settings."
        roleLabel="Admin"
        defaultCallbackUrl="/dashboard/admin"
        helperText="Admin default (seed): admin@school.local / Admin123!"
      />
    </Suspense>
  );
}
