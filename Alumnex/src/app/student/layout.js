import DashboardShell from '@/components/dashboard/DashboardShell';

export default function Layout({ children }) {
  return <DashboardShell role="student">{children}</DashboardShell>;
}