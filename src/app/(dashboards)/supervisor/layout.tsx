import { SUPERVISORSIDEBAR } from "@/components/sidebars";
import { AdminNav } from "@/components/navbars";
import { ChangePasswordModal } from "@/components/modal";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden">
        <SUPERVISORSIDEBAR />

        <section className="w-full   min-[900px]:pl-[80px]  absolute top-0 left-0 ">
          <header className="w-full  bg-foreground dark:bg-dark-foreground">
            <AdminNav />
          </header>
          {children}
        </section>
      </main>
      <ChangePasswordModal />

      {/* <EditProfile /> */}
    </>
  );
}
