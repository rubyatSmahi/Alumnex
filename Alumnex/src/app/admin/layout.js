import DashboardShell from '@/components/dashboard/DashboardShell';

export default function Layout({ children }) {
  return <DashboardShell role="admin">{children}</DashboardShell>;
}