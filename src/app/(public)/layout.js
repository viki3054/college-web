import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <PublicFooter />
    </div>
  );
}
