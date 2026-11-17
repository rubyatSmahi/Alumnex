'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDemoSession, getRoleHome, logoutDemoUser } from '@/lib/demo-auth';

const navigation = {
  admin: [
    { href: '/admin/dashboard', label: 'Overview' },
    { href: '/admin/alumni', label: 'Alumni' },
    { href: '/admin/students', label: 'Students' },
    { href: '/admin/registrations', label: 'Registrations', badge: '8' },
    { href: '/admin/verification', label: 'Verification' },
    { href: '/admin/batches', label: 'Batches' },
    { href: '/admin/departments', label: 'Departments' },
    { href: '/admin/events', label: 'Events' },
    { href: '/admin/reports', label: 'Reports' },
    { href: '/admin/settings', label: 'Settings' },
  ],
  alumni: [
    { href: '/alumni/dashboard', label: 'Overview' },
    { href: '/alumni/profile', label: 'My profile' },
    { href: '/alumni/career', label: 'Career timeline' },
    { href: '/alumni/mentorship', label: 'Mentorship', badge: '3' },
    { href: '/alumni/jobs', label: 'Job opportunities' },
    { href: '/alumni/donations', label: 'Giving back' },
    { href: '/alumni/messages', label: 'Messages' },
    { href: '/alumni/notifications', label: 'Notifications' },
  ],
  student: [
    { href: '/student/dashboard', label: 'Overview' },
    { href: '/student/profile', label: 'My profile' },
    { href: '/student/alumni', label: 'Discover alumni' },
    { href: '/student/mentorship', label: 'Mentorship' },
    { href: '/student/jobs', label: 'Find opportunities' },
    { href: '/student/applications', label: 'Applications' },
    { href: '/student/events', label: 'Events' },
    { href: '/student/messages', label: 'Messages' },
    { href: '/student/notifications', label: 'Notifications' },
  ],
};

const roleDetails = {
  admin: { name: 'Administrator', initials: 'AD', subtitle: 'University workspace', profileHref: '/admin/settings', notificationsHref: '/admin/registrations' },
  alumni: { name: 'Alumni member', initials: 'AM', subtitle: 'Alumni workspace', profileHref: '/alumni/profile', notificationsHref: '/alumni/notifications' },
  student: { name: 'Student member', initials: 'SM', subtitle: 'Student workspace', profileHref: '/student/profile', notificationsHref: '/student/notifications' },
};

export default function DashboardShell({ role, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [access, setAccess] = useState('checking');
  const [accessError, setAccessError] = useState('');
  const user = roleDetails[role];
  const items = navigation[role];
  const activeItem = items.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)) || items[0];

  useEffect(() => {
    try {
      const session = getDemoSession();
      if (!session) {
        router.replace('/login');
        return;
      }
      if (session.role !== role) {
        router.replace(getRoleHome(session.role));
        return;
      }
      setAccess('granted');
    } catch (error) {
      setAccessError(error.message || 'Unable to verify your demo session.');
      setAccess('error');
    }
  }, [role, router]);

  function signOut() {
    logoutDemoUser();
    router.replace('/login');
  }

  if (access === 'checking') {
    return <main className="dashboard-auth-gate" role="status">Checking your demo session…</main>;
  }
  if (access === 'error') {
    return <main className="dashboard-auth-gate is-error" role="alert">{accessError} <Link href="/login">Sign in again</Link></main>;
  }

  return (
    <div className={`dashboard-shell dashboard-shell--${role}`}>
      {menuOpen && (
        <button
          type="button"
          className="dashboard-scrim"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside className={`dashboard-sidebar${menuOpen ? ' is-open' : ''}`}>
        <Link className="dashboard-brand" href="/" aria-label="Alumnex home">
          <span className="dashboard-brand-mark">A</span>
          <span>alumnex<span className="dashboard-brand-period">.</span></span>
        </Link>
        <div className="dashboard-workspace-label">{user.subtitle}</div>
        <nav className="dashboard-nav" aria-label={`${user.name} navigation`}>
          <p className="dashboard-nav-caption">Workspace</p>
          {items.map((item, index) => {
            const active = item.href === activeItem.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`dashboard-nav-link${active ? ' is-active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <span className="dashboard-nav-icon" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{item.label}</span>
                {item.badge && <span className="dashboard-nav-badge">{item.badge}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="dashboard-sidebar-bottom">
          <div className="dashboard-help-card">
            <span className="dashboard-help-icon" aria-hidden="true">?</span>
            <div>
              <strong>Need a hand?</strong>
              <span>We’re here to help.</span>
            </div>
            <Link href="/contact" aria-label="Contact Alumnex support">↗</Link>
          </div>
          <Link className="dashboard-user" href={user.profileHref}>
            <span className="dashboard-avatar">{user.initials}</span>
            <span className="dashboard-user-copy">
              <strong>{user.name}</strong>
              <span>View your profile</span>
            </span>
            <span className="dashboard-user-arrow" aria-hidden="true">⌄</span>
          </Link>
          <button className="dashboard-signout" type="button" onClick={signOut}>Sign out</button>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            type="button"
            className="dashboard-menu-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <div className="dashboard-breadcrumb">
            <span>{user.subtitle}</span>
            <span aria-hidden="true">/</span>
            <strong>{activeItem.label}</strong>
          </div>
          <div className="dashboard-topbar-actions">
            <span className="dashboard-live-status"><i /> Demo environment</span>
            <Link
                  className="dashboard-notification-link"
                  href={user.notificationsHref}
              aria-label="View notifications"
              title="Notifications"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
              </svg>
              <span />
            </Link>
            <span className="dashboard-avatar dashboard-avatar--top">{user.initials}</span>
          </div>
        </header>
        <main
          className="dashboard-page"
          key={pathname}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
