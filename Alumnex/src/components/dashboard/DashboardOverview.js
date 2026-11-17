'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

const overviewData = {
  admin: {
    eyebrow: 'Your university community',
    title: 'Your community at a glance',
    description: 'A clear view of the people, progress, and opportunities shaping your alumni network.',
    action: { label: 'Review registrations', href: '/admin/registrations' },
    stats: [
      { label: 'Total alumni', value: '2,486', change: '+8.2%', note: 'vs. last year' },
      { label: 'Current students', value: '8,940', change: '+3.4%', note: 'vs. last year' },
      { label: 'Awaiting review', value: '18', change: 'Needs attention', note: 'registrations' },
      { label: 'Verified alumni', value: '2,304', change: '92.7%', note: 'of alumni records' },
    ],
    chartTitle: 'Community growth',
    chartDescription: 'Member activity over the last six months',
    bars: [38, 51, 45, 70, 63, 88],
    barsLabel: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    summary: [
      { value: '18', label: 'New registrations', meta: '8 alumni · 10 students', href: '/admin/registrations', tone: 'gold' },
      { value: '06', label: 'Upcoming events', meta: 'Next: Alumni meet-up · Nov 22', href: '/admin/events', tone: 'plum' },
      { value: '74%', label: 'Mentorship match rate', meta: 'Up 6% this semester', href: '/admin/reports', tone: 'sage' },
    ],
    activityTitle: 'Recent registrations',
    activity: [
      { initials: 'NK', name: 'Nadia Khan', detail: 'Computer Science · Class of 2022', status: 'Alumni', time: '12 min ago', tone: 'gold' },
      { initials: 'JR', name: 'Jason Rivera', detail: 'Business · Class of 2027', status: 'Student', time: '1 hr ago', tone: 'blue' },
      { initials: 'ST', name: 'Sana Tariq', detail: 'Electrical Engineering · Class of 2021', status: 'Alumni', time: '3 hrs ago', tone: 'rose' },
    ],
    activityLink: { label: 'View all registrations', href: '/admin/registrations' },
  },
  alumni: {
    eyebrow: 'Your alumni community',
    title: 'Stay connected to what matters.',
    description: 'Your experience can open doors. Catch up with your community and see where you can make a difference.',
    action: { label: 'Update my profile', href: '/alumni/profile' },
    stats: [
      { label: 'Profile views', value: '128', change: '+18%', note: 'this month' },
      { label: 'Mentorship requests', value: '03', change: '2 new', note: 'awaiting your reply' },
      { label: 'Opportunities shared', value: '02', change: '1 active', note: 'job listing' },
      { label: 'Community events', value: '04', change: 'Next in 5 days', note: 'you are invited' },
    ],
    chartTitle: 'Your community impact',
    chartDescription: 'Profile and mentorship activity this semester',
    bars: [32, 46, 40, 64, 56, 81],
    barsLabel: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    summary: [
      { value: '03', label: 'Students seeking guidance', meta: '2 requests need a reply', href: '/alumni/mentorship', tone: 'gold' },
      { value: '02', label: 'Open opportunities', meta: 'Your roles are reaching students', href: '/alumni/jobs', tone: 'plum' },
      { value: '78%', label: 'Profile completeness', meta: 'Add skills to stand out', href: '/alumni/profile', tone: 'sage' },
    ],
    activityTitle: 'A few things to explore',
    activity: [
      { initials: 'MP', name: 'Maya Patel', detail: 'Computer Science · Seeking a mentor', status: 'New request', time: '20 min ago', tone: 'gold' },
      { initials: 'AC', name: 'Alumni community', detail: 'Fall gathering · November 22', status: 'Event', time: 'Tomorrow', tone: 'blue' },
      { initials: 'JD', name: 'Jordan Davis', detail: 'Applied to Product Designer', status: 'Application', time: 'Yesterday', tone: 'rose' },
    ],
    activityLink: { label: 'Open mentorship', href: '/alumni/mentorship' },
  },
  student: {
    eyebrow: 'Your next chapter starts here',
    title: 'Make your next connection count.',
    description: 'Meet alumni who have been where you are, find opportunities, and build your path forward.',
    action: { label: 'Explore alumni', href: '/student/alumni' },
    stats: [
      { label: 'Alumni connections', value: '14', change: '+3', note: 'this semester' },
      { label: 'Mentorship requests', value: '01', change: 'In progress', note: 'stay tuned' },
      { label: 'Open opportunities', value: '24', change: '+6 this week', note: 'matched to you' },
      { label: 'Applications', value: '03', change: '1 update', note: 'check your status' },
    ],
    chartTitle: 'Your career journey',
    chartDescription: 'Steps taken toward your goals this semester',
    bars: [24, 35, 44, 58, 68, 84],
    barsLabel: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    summary: [
      { value: '12', label: 'Alumni in your field', meta: 'Computer Science · nearby', href: '/student/alumni', tone: 'gold' },
      { value: '24', label: 'Roles to explore', meta: '6 added this week', href: '/student/jobs', tone: 'plum' },
      { value: '01', label: 'Upcoming event', meta: 'Alumni meet-up · Nov 22', href: '/student/events', tone: 'sage' },
    ],
    activityTitle: 'Recommended for you',
    activity: [
      { initials: 'AM', name: 'Avery Morgan', detail: 'Senior Product Designer · Northstar', status: 'Alumni', time: 'Mentor match', tone: 'gold' },
      { initials: 'NS', name: 'Northstar Labs', detail: 'Product Design Intern · Remote', status: 'New role', time: '2 hrs ago', tone: 'blue' },
      { initials: 'AC', name: 'Alumni community', detail: 'Fall gathering · November 22', status: 'Event', time: '5 days', tone: 'rose' },
    ],
    activityLink: { label: 'Browse opportunities', href: '/student/jobs' },
  },
};

function MotionItem({ children, className, delay = 0, reducedMotion }) {
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.32, delay: reducedMotion ? 0 : delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function DashboardOverview({ role }) {
  const data = overviewData[role];
  const reducedMotion = useReducedMotion();

  return (
    <div className="dashboard-overview">
      <section className="dashboard-welcome">
        <div>
          <p className="dashboard-eyebrow">{data.eyebrow}</p>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
        <Link className="dashboard-primary-action" href={data.action.href}>
          {data.action.label}<span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className="dashboard-stat-grid" aria-label="Key statistics">
        {data.stats.map((stat, index) => (
          <MotionItem key={stat.label} className="dashboard-stat-card" delay={index * 0.045} reducedMotion={reducedMotion}>
            <span className="dashboard-stat-label">{stat.label}</span>
            <strong className="dashboard-stat-value">{stat.value}</strong>
            <span className={`dashboard-stat-change${stat.change.includes('Needs') ? ' is-alert' : ''}`}>{stat.change}</span>
            <span className="dashboard-stat-note">{stat.note}</span>
            <span className={`dashboard-stat-decoration stat-decoration-${index}`} aria-hidden="true" />
          </MotionItem>
        ))}
      </section>

      <section className="dashboard-insights-grid">
        <MotionItem className="dashboard-card dashboard-chart-card" delay={0.12} reducedMotion={reducedMotion}>
          <div className="dashboard-card-heading">
            <div>
              <h2>{data.chartTitle}</h2>
              <p>{data.chartDescription}</p>
            </div>
            <span className="dashboard-period-label">Last 6 months <span aria-hidden="true">⌄</span></span>
          </div>
          <div className="dashboard-chart" role="img" aria-label={`${data.chartTitle}: ${data.barsLabel.map((label, index) => `${label} ${data.bars[index]} percent`).join(', ')}`}>
            {data.bars.map((height, index) => (
              <div className="dashboard-chart-column" key={data.barsLabel[index]}>
                <span className="dashboard-chart-bar-wrap">
                  <span className={`dashboard-chart-bar${index === data.bars.length - 1 ? ' is-current' : ''}`} style={{ height: `${height}%` }} />
                </span>
                <span className="dashboard-chart-month">{data.barsLabel[index]}</span>
              </div>
            ))}
          </div>
        </MotionItem>

        <MotionItem className="dashboard-card dashboard-summary-card" delay={0.18} reducedMotion={reducedMotion}>
          <div className="dashboard-card-heading">
            <div>
              <h2>At a glance</h2>
              <p>Small steps, meaningful impact.</p>
            </div>
          </div>
          <div className="dashboard-summary-list">
            {data.summary.map((item) => (
              <Link className="dashboard-summary-item" href={item.href} key={item.label}>
                <span className={`dashboard-summary-icon is-${item.tone}`} aria-hidden="true">↗</span>
                <span className="dashboard-summary-copy">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                  <small>{item.meta}</small>
                </span>
                <span className="dashboard-summary-arrow" aria-hidden="true">›</span>
              </Link>
            ))}
          </div>
        </MotionItem>
      </section>

      <MotionItem className="dashboard-card dashboard-activity-card" delay={0.22} reducedMotion={reducedMotion}>
        <div className="dashboard-card-heading dashboard-activity-heading">
          <div>
            <h2>{data.activityTitle}</h2>
            <p>A few recent updates from your community.</p>
          </div>
          <Link className="dashboard-text-link" href={data.activityLink.href}>{data.activityLink.label}<span aria-hidden="true">→</span></Link>
        </div>
        <div className="dashboard-activity-list">
          {data.activity.map((item) => (
            <div className="dashboard-activity-row" key={item.name}>
              <span className={`dashboard-activity-avatar is-${item.tone}`}>{item.initials}</span>
              <span className="dashboard-activity-copy">
                <strong>{item.name}</strong>
                <span>{item.detail}</span>
              </span>
              <span className={`dashboard-activity-status is-${item.tone}`}>{item.status}</span>
              <span className="dashboard-activity-time">{item.time}</span>
            </div>
          ))}
        </div>
      </MotionItem>
      <p className="dashboard-demo-note">Preview data for demonstration purposes.</p>
    </div>
  );
}
