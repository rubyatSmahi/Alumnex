import Link from 'next/link';

export default function Layout({ children }) {
  const items = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/alumni', label: 'Alumni' },
    { href: '/admin/students', label: 'Students' },
    { href: '/admin/registrations', label: 'Registrations' },
    { href: '/admin/verification', label: 'Verification' },
    { href: '/admin/batches', label: 'Batches' },
    { href: '/admin/departments', label: 'Departments' },
    { href: '/admin/events', label: 'Events' },
    { href: '/admin/reports', label: 'Reports' },
    { href: '/admin/settings', label: 'Settings' },
  ];

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="brand-block">
          <Link href="/">Alumnex</Link>
        </div>
        <nav>
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="side-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="dashboard-content">{children}</div>
    </div>
  );
}