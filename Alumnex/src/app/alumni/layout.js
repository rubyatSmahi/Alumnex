import Link from 'next/link';

export default function Layout({ children }) {
  const items = [
    { href: '/alumni/dashboard', label: 'Dashboard' },
    { href: '/alumni/profile', label: 'Profile' },
    { href: '/alumni/career', label: 'Career' },
    { href: '/alumni/mentorship', label: 'Mentorship' },
    { href: '/alumni/jobs', label: 'Jobs' },
    { href: '/alumni/donations', label: 'Donations' },
    { href: '/alumni/messages', label: 'Messages' },
    { href: '/alumni/notifications', label: 'Notifications' },
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