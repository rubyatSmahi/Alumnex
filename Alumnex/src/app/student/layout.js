import Link from 'next/link';

export default function Layout({ children }) {
  const items = [
    { href: '/student/dashboard', label: 'Dashboard' },
    { href: '/student/profile', label: 'Profile' },
    { href: '/student/alumni', label: 'Alumni' },
    { href: '/student/mentorship', label: 'Mentorship' },
    { href: '/student/jobs', label: 'Jobs' },
    { href: '/student/applications', label: 'Applications' },
    { href: '/student/messages', label: 'Messages' },
    { href: '/student/events', label: 'Events' },
    { href: '/student/notifications', label: 'Notifications' },
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