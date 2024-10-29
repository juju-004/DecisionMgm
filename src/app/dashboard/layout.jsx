import AppSidebar from "@/components/layout/app-sidebar";

// export const metadata: Metadata = {
//   title: "Next Shadcn Dashboard Starter",
//   description: "Basic dashboard with Next.js and Shadcn",
// };

export default function DashboardLayout({ children }) {
  return <AppSidebar>{children}</AppSidebar>;
}
