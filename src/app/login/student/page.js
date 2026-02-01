import { Suspense } from "react";
import RoleLoginForm from "@/components/auth/RoleLoginForm";

export const metadata = { title: "Student Login" };

export default function StudentLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <RoleLoginForm
        title="Student Login"
        subtitle="Sign in to view your timetable, homework, results, and materials."
        roleLabel="Student"
        defaultCallbackUrl="/dashboard/student"
      />
    </Suspense>
  );
}
