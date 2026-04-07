import { Sidebar } from "@/components/Sidebar/Sidebar";
import { TopBar } from "@/components/TopBar/TopBar";
import styles from "./layout.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopBar />
        <main className={styles.contentWrapper}>
          {children}
        </main>
      </div>
    </div>
  );
}
