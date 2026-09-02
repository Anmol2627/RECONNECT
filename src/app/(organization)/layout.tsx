import { OrgSidebar } from "@/components/features/org/OrgSidebar";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#FDFBF7]">
      <OrgSidebar />
      <main className="flex-1 overflow-x-hidden md:pl-64 pt-16 md:pt-0 pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
}
