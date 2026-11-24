'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getDemoSession, logoutDemoUser } from '@/lib/demo-auth';
import './alumni-dashboard.css';

export default function AlumniDashboard({ initialTab = 'dashboard', createJob = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef(null);

  useEffect(() => {
    // Check session
    try {
      const session = getDemoSession();
      if (!session) {
        router.replace('/login');
        return;
      }
      if (session.role !== 'alumni') {
        router.replace(`/${session.role}/dashboard`);
        return;
      }
    } catch {
      router.replace('/login');
      return;
    }

    const root = containerRef.current;
    if (!root) return;

    const $ = s => root.querySelector(s);
    const ini = n => (n || '').split(' ').map(x => x[0]).join('').slice(0, 2);

    const esc = s =>
      String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const tag = s => `<span class="tag t-${s}">${s}</span>`;

    const S = {
      me: {
        name: 'Marcus Bell',
        dept: 'Computer Science & Engineering',
        batch: 2018,
        company: 'Brightwave',
        title: 'Senior Software Engineer',
        loc: 'Dhaka, Bangladesh',
        bio: 'Backend engineer passionate about scalable systems and helping students break into tech.',
        skills: ['Backend', 'Cloud', 'Mentoring'],
        li: 'linkedin.com/in/marcusbell',
        web: '',
        photo: null,
        cover: null,
        edu: [{ d: 'B.Sc. in Computer Science & Engineering', y: '2014 – 2018' }],
        achv: ['Led migration to microservices serving 2M users'],
        mil: [{ t: 'Promoted to Senior Software Engineer', d: 'Mar 2024' }],
      },
      exp: [
        { t: 'Software Engineer', co: 'Cloudline', y: '2019 – 2022', d: 'Built payment APIs and internal tooling.' },
        { t: 'Software Engineer Intern', co: 'Pixel Forge', y: '2018', d: 'Worked on a customer analytics dashboard.' },
      ],
      P: {
        s1: ['Rafi Ahmed', 'CSE · 2026'],
        s2: ['Nadia Khan', 'CSE · 2027'],
        s3: ['Jason Rivera', 'Business · 2027'],
        s4: ['Omar Faruk', 'EEE · 2026'],
        s5: ['Tasnim Akter', 'CSE · 2027'],
        a1: ['Amelia Hart', 'Product Manager, Nexora'],
        a2: ['Daniel Okafor', 'Data Scientist, Lumen Labs'],
        a3: ['Lena Fischer', 'Design Lead, Studio Arc'],
        a4: ['Priya Nair', 'Marketing Director, Verity'],
      },
      reqs: [
        { id: 1, s: 's1', topic: 'Career advice', msg: 'I’m a final-year CSE student aiming for backend roles. Could you guide me?', status: 'Pending', date: 'Nov 18' },
        { id: 2, s: 's2', topic: 'Interview preparation', msg: 'Would love tips on system design interviews.', status: 'Pending', date: 'Nov 17' },
        { id: 3, s: 's3', topic: 'Industry insights', msg: 'Curious how business students can move into tech product roles.', status: 'Pending', date: 'Nov 15' },
        { id: 4, s: 's4', topic: 'Research guidance', msg: 'Thanks for accepting. Excited to start!', status: 'Accepted', date: 'Oct 28' },
        { id: 5, s: 's5', topic: 'Career advice', msg: 'Learning cloud basics with your guidance.', status: 'Accepted', date: 'Oct 12' },
        { id: 6, s: 's3', topic: 'Portfolio review', msg: 'Completed in September.', status: 'Completed', date: 'Sep 30' },
      ],
      jobs: [
        {
          id: 1,
          t: 'Junior Backend Developer',
          co: 'Brightwave',
          type: 'Full-time',
          loc: 'Dhaka',
          desc: 'Work on core APIs with a friendly engineering team.',
          status: 'Open',
          posted: 'Nov 8',
          ap: [
            { s: 's1', st: 'New' },
            { s: 's2', st: 'Shortlisted' },
            { s: 's5', st: 'New' },
          ],
        },
        {
          id: 2,
          t: 'Software Engineering Intern',
          co: 'Brightwave',
          type: 'Internship',
          loc: 'Remote',
          desc: 'A 3-month paid internship for final-year students.',
          status: 'Open',
          posted: 'Nov 12',
          ap: [{ s: 's4', st: 'New' }],
        },
        {
          id: 3,
          t: 'QA Analyst',
          co: 'Brightwave',
          type: 'Part-time',
          loc: 'Dhaka',
          desc: 'Part-time QA role.',
          status: 'Closed',
          posted: 'Sep 20',
          ap: [{ s: 's3', st: 'Rejected' }],
        },
      ],
      other: [
        { id: 11, t: 'Product Associate', co: 'Nexora', by: 'a1', type: 'Full-time', loc: 'Singapore', saved: false },
        { id: 12, t: 'Data Science Intern', co: 'Lumen Labs', by: 'a2', type: 'Internship', loc: 'Remote', saved: false },
        { id: 13, t: 'UX Design Intern', co: 'Studio Arc', by: 'a3', type: 'Internship', loc: 'Remote', saved: true },
        { id: 14, t: 'Brand Executive', co: 'Verity', by: 'a4', type: 'Full-time', loc: 'Dhaka', saved: false },
      ],
      camps: [
        { id: 1, t: 'Scholarship Fund', d: 'Support students who need financial aid to complete their degrees.', goal: 50000, raised: 36400 },
        { id: 2, t: 'Innovation Lab', d: 'Fund new equipment and workspace for student projects.', goal: 30000, raised: 12900 },
        { id: 3, t: 'Library Renovation', d: 'Restore the historic reading rooms and add digital resources.', goal: 20000, raised: 18200 },
      ],
      don: [
        { c: 1, amt: 100, date: 'Oct 14', anon: false },
        { c: 3, amt: 50, date: 'Aug 02', anon: true },
      ],
      events: [
        [1, '2026-09-18', 'Alumni Welcome Back Day', 'Main Hall', 200, 196, 0],
        [2, '2026-11-22', 'Alumni Meet-up', 'Main Hall', 200, 164, 1],
        [3, '2026-12-03', 'Career Mentorship Fair', 'Innovation Centre', 300, 212, 0],
        [4, '2026-12-15', 'Annual Homecoming Gala', 'Grand Ballroom', 400, 388, 1],
        [5, '2027-01-12', 'Research Showcase', 'Library Atrium', 150, 61, 0],
        [6, '2026-10-05', 'Industry Panel Night', 'Auditorium', 180, 171, 1],
      ].map(e => ({ id: e[0], d: e[1], t: e[2], v: e[3], cap: e[4], reg: e[5], mine: !!e[6] })),
      notes: [
        { t: 'New mentorship request', m: 'Rafi Ahmed would like you as a mentor.', time: '3 hrs ago', read: false, to: 'mentorship' },
        { t: 'New applicant', m: 'Tasnim Akter applied for Junior Backend Developer.', time: 'Yesterday', read: false, to: 'jobs' },
        { t: 'Announcement', m: 'Homecoming Gala registration closes Dec 10.', time: '2 days ago', read: true, to: 'events' },
      ],
      conv: [
        { p: 's4', unread: 1, m: [{ me: 0, t: 'Thank you for accepting, Marcus! When can we talk?', time: 'Yesterday' }] },
        { p: 'a2', unread: 0, m: [{ me: 1, t: 'Are you joining the Meet-up on the 22nd?', time: 'Mon' }, { me: 0, t: 'Yes! See you there.', time: 'Mon' }] },
      ],
      cur: null,
      q: {},
      tab: {},
    };

    const ic = {
      dashboard: 'M3 12 12 3l9 9M5 10v10h14V10',
      profile: 'M16 11a4 4 0 1 0-8 0M4 20c0-4 4-6 8-6s8 2 8 6',
      career: 'M3 8h18v12H3zM9 8V5h6v3M3 13h18',
      mentorship: 'M12 3l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z',
      jobs: 'M5 3h14v18H5zM9 8h6M9 12h6M9 16h4',
      donations: 'M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z',
      messages: 'M4 5h16v11H9l-5 4z',
      events: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
      notifications: 'M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10 20h4',
    };

    const R = [
      ['dashboard', 'Dashboard'],
      ['profile', 'My Profile'],
      ['career', 'Career & Experience'],
      ['mentorship', 'Mentorship'],
      ['jobs', 'Jobs'],
      ['events', 'Events'],
      ['donations', 'Donations'],
      ['messages', 'Messages'],
      ['notifications', 'Notifications'],
    ];

    const tabFromPath = {
      dashboard: 'dashboard',
      overview: 'dashboard',
      profile: 'profile',
      career: 'career',
      mentorship: 'mentorship',
      jobs: 'jobs',
      events: 'events',
      donations: 'donations',
      messages: 'messages',
      notifications: 'notifications',
    };

    const pathForTab = {
      dashboard: '/alumni/dashboard',
      profile: '/alumni/profile',
      career: '/alumni/career',
      mentorship: '/alumni/mentorship',
      jobs: '/alumni/jobs',
      events: '/alumni/events',
      donations: '/alumni/donations',
      messages: '/alumni/messages',
      notifications: '/alumni/notifications',
    };

    const unr = () => S.notes.filter(n => !n.read).length;
    const munr = () => S.conv.reduce((a, c) => a + c.unread, 0);
    const pend = () => S.reqs.filter(r => r.status === 'Pending').length;
    const pct = () => {
      const m = S.me;
      return Math.min(
        100,
        (m.photo ? 10 : 0) +
          (m.cover ? 10 : 0) +
          (m.bio && m.bio.length > 40 ? 20 : 0) +
          (m.skills.length >= 3 ? 15 : 0) +
          (m.li ? 15 : 0) +
          (S.exp.length ? 10 : 0) +
          (m.edu.length ? 10 : 0) +
          (m.achv.length ? 10 : 0)
      );
    };

    const av = (n, ph, cls = 'av') => `<span class="${cls}" ${ph ? `style="background-image:url(${ph})"` : ''}>${ph ? '' : ini(n)}</span>`;
    const pav = id => av(S.P[id] ? S.P[id][0] : 'User');

    function toast(m) {
      const t = $('#toast');
      if (!t) return;
      t.textContent = m;
      t.classList.add('show');
      clearTimeout(t._);
      t._ = setTimeout(() => t.classList.remove('show'), 2300);
    }

    function modal(t, b, save, l = 'Save') {
      const box = $('#box');
      const mod = $('#mod');
      if (!box || !mod) return;
      box.innerHTML = `<h3>${t}</h3>${b}<div class="ft"><button class="btn g" onclick="closeM()">Cancel</button><button class="btn" id="ms">${l}</button></div>`;
      mod.classList.add('show');
      const ms = $('#ms');
      if (ms) {
        ms.onclick = () => {
          if (save() !== false) closeM();
        };
      }
    }

    const closeM = () => {
      const m = $('#mod');
      if (m) m.classList.remove('show');
    };

    const notify = (t, m, to) => S.notes.unshift({ t, m, time: 'Just now', read: false, to });
    const v = id => {
      const el = $('#' + id);
      return el ? el.value.trim() : '';
    };

    const head = (h, p, a = '') => `<div class="ph"><div><span class="eb">Alumni portal</span><h1>${h}</h1><p>${p}</p></div><div class="acts" style="margin:0">${a}</div></div>`;
    const stat = (l, n, s) => `<div class="card stat hov"><div class="l">${l}</div><div class="v">${n}</div><span class="mu">${s}</span></div>`;
    const fdate = d => {
      const x = new Date(d + 'T00:00');
      return `<div class="date"><b>${x.getDate()}</b><span>${x.toLocaleString('en', { month: 'short' })}</span></div>`;
    };
    const tabs = (k, l) =>
      `<div class="seg">${l
        .map(
          x =>
            `<button class="${x == (S.tab[k] || l[0]) ? 'on' : ''}" onclick="S.tab['${k}']='${x}';go()">${x}</button>`
        )
        .join('')}</div>`;
    const money = n => '$' + Number(n).toLocaleString('en');
    const today = '2026-11-20';

    const V = {};

    const go = () => {
      const hash = window.location.hash.slice(1);
      const seg = pathname.split('/')[2];
      const curTab = hash || tabFromPath[seg] || 'dashboard';
      customRoute(curTab, 1);
    };

    V.dashboard = () => {
      const m = S.me,
        pr = S.reqs.filter(r => r.status == 'Pending'),
        up = S.events.filter(e => e.d >= today).slice(0, 3);
      return (
        `<div class="hero">${[10, 28, 46, 63, 80].map((l, i) => `<i style="left:${l}%;animation-delay:${i * 1.6}s"></i>`).join('')}<div class="ring" style="--p:${pct()}"><b>${pct()}%</b><small>Profile</small></div><div class="who">${av(m.name, m.photo)}<div><small style="color:var(--muted)">${esc(m.title)} · ${esc(m.company)}</small></div></div><h1>Welcome back, ${esc(m.name.split(' ')[0])}. <em>Your story shapes the next generation.</em></h1><p>Mentor students, share opportunities and keep your professional presence strong.</p><div class="acts" style="margin:0"><a class="btn" href="#jobs" onclick="S.tab.j='My posts';customRoute('jobs');setTimeout(()=>jobM(),60);return false">Post a job</a><a class="btn g" href="#mentorship" onclick="customRoute('mentorship');return false">Review requests</a><a class="btn g" href="#donations" onclick="customRoute('donations');return false">Donate</a><a class="btn g" href="#career" onclick="customRoute('career');return false">Update career</a></div></div>
<div class="grid stats">${stat('Pending requests', pr.length, 'From students') + stat('Active mentees', S.reqs.filter(r => r.status == 'Accepted').length, 'Ongoing mentorship') + stat('Open job posts', S.jobs.filter(j => j.status == 'Open').length, S.jobs.reduce((a, j) => a + j.ap.length, 0) + ' applicants in total') + stat('Events registered', S.events.filter(e => e.mine && e.d >= today).length, 'Upcoming')}</div>
<div class="grid two" style="margin-bottom:16px"><div style="display:grid;gap:16px"><div class="card"><h3>Mentorship requests</h3><div class="sub">Students waiting for your reply</div>${pr.map(r => `<div class="row"><div class="who">${pav(r.s)}<div><b>${S.P[r.s][0]}</b><small>${r.topic}</small></div></div><div class="acts" style="margin:0"><button class="btn s" onclick="decide(${r.id},'Accepted')">Accept</button><button class="btn no s" onclick="decide(${r.id},'Declined')">Decline</button></div></div>`).join('') || '<div class="empty">No pending requests.</div>'}</div>
<div class="card"><h3>Your job posts</h3><div class="sub">Status and applicants</div>${S.jobs.map(j => `<div class="row"><div><b>${esc(j.t)}</b><small>${j.ap.length} applicants · Posted ${j.posted}</small></div>${tag(j.status)}</div>`).join('')}</div>
<div class="card"><h3>Upcoming events</h3><div class="sub">Where the community meets next</div>${up.map(e => `<div class="row"><div class="who">${fdate(e.d)}<div><b>${e.t}</b><small>${e.v}</small></div></div>${e.mine ? tag('Registered') : `<button class="btn g s" onclick="regE(${e.id})">Register</button>`}</div>`).join('')}</div></div>
<div style="display:grid;gap:16px;align-content:start"><div class="card"><h3>Profile completion</h3><div style="font:400 40px var(--serif);color:var(--iv)">${pct()}%</div><div class="bar"><i style="width:${pct()}%"></i></div><p class="sub" style="margin:12px 0 0">${pct() < 100 ? 'Add a cover image, photo or more details to reach 100%.' : 'Your profile is complete.'}</p><div class="acts"><a class="btn g s" href="#profile" onclick="customRoute('profile');return false">Improve profile</a></div></div>
<div class="card"><h3>Recent messages</h3><div class="sub">&nbsp;</div>${S.conv.slice(0, 3).map(c => { const l = c.m[c.m.length - 1]; return `<div class="row" style="cursor:pointer" onclick="chat('${c.p}')"><div class="who">${pav(c.p)}<div style="min-width:0"><b>${S.P[c.p][0]}</b><small>${l ? esc(l.t).slice(0, 42) : ''}</small></div></div>${c.unread ? '<span class="dot" style="position:static"></span>' : ''}</div>`; }).join('')}</div>
<div class="card"><h3>Notifications</h3><div class="sub">Latest updates</div>${S.notes.slice(0, 3).map(n => `<div class="row"><div><b>${n.t}</b><small>${n.m}</small></div></div>`).join('')}</div></div></div>`
      );
    };

    V.profile = () => {
      const m = S.me;
      return (
        head('My profile', 'How students and fellow alumni see you.', `<button class="btn" onclick="saveP()">Save changes</button>`) +
        `<div class="card"><div class="cover" id="cv" ${m.cover ? `style="background-image:url(${m.cover})"` : ''}><label class="btn g s" style="position:absolute;right:12px;bottom:12px;background:#0009;cursor:pointer">Change cover<input type="file" accept="image/*" hidden onchange="up(this,'cover')"></label></div><div style="display:flex;align-items:flex-end;gap:14px;flex-wrap:wrap">${av(m.name, m.photo, 'av pav')}<label class="btn g s" style="cursor:pointer;margin-bottom:6px">Change photo<input type="file" accept="image/*" hidden onchange="up(this,'photo')"></label></div></div>
<div class="grid two" style="margin-top:16px"><div class="card"><div class="f"><div class="c2"><label>Full name<input id="pn" value="${esc(m.name)}"></label><label>Graduation batch<input id="pbt" type="number" value="${m.batch}"></label></div><label>Department<input id="pd" value="${esc(m.dept)}"></label><div class="c2"><label>Current company<input id="pc" value="${esc(m.company)}"></label><label>Designation<input id="pt" value="${esc(m.title)}"></label></div><label>Professional biography<textarea id="pa" rows="4">${esc(m.bio)}</textarea></label><div class="c2"><label>LinkedIn<input id="pl" value="${esc(m.li)}" placeholder="linkedin.com/in/…"></label><label>Website or other link<input id="pw" value="${esc(m.web)}" placeholder="yoursite.com"></label></div>
<label>Skills and expertise<div>${m.skills.map((s, i) => `<span class="chip">${esc(s)}<button onclick="rmS(${i})" aria-label="Remove ${esc(s)}">×</button></span>`).join('')}</div><input id="ps2" placeholder="Type a skill and press Enter" onkeydown="if(event.key=='Enter'){addS(this.value);this.value=''}"></label></div></div>
<div class="card"><h3>Academic history</h3><div class="sub">Degrees and institutions</div><div class="tl">${m.edu.map((e, i) => `<div><b>${esc(e.d)}</b><small>${esc(e.y)} <a href="#profile" onclick="delEdu(${i});return false" style="color:var(--err);margin-left:8px">Remove</a></small></div>`).join('') || '<small>No entries yet.</small>'}</div><button class="btn g s" onclick="eduM()">Add degree</button><h3 style="margin-top:22px">Career history</h3><div class="sub">${esc(m.title)} at ${esc(m.company)}, plus ${S.exp.length} earlier roles</div><a class="btn g s" href="#career" onclick="customRoute('career');return false">Manage career</a></div></div>`
      );
    };

    const up = (el, k) => {
      const f = el.files[0];
      if (!f) return;
      if (f.size > 4e6) return toast('Choose an image under 4 MB');
      const r = new FileReader();
      r.onload = () => {
        S.me[k] = r.result;
        go();
        side();
        toast(k == 'cover' ? 'Cover updated' : 'Photo updated');
      };
      r.readAsDataURL(f);
    };

    const addS = x => {
      x = (x || '').trim();
      if (x && !S.me.skills.includes(x)) {
        S.me.skills.push(x);
        go();
        side();
      }
    };

    const rmS = i => {
      S.me.skills.splice(i, 1);
      go();
      side();
    };

    const saveP = () => {
      if (!v('pn')) return toast('Enter your name');
      Object.assign(S.me, {
        name: v('pn'),
        batch: +v('pbt') || S.me.batch,
        dept: v('pd'),
        company: v('pc'),
        title: v('pt'),
        bio: v('pa'),
        li: v('pl'),
        web: v('pw'),
      });
      side();
      go();
      toast('Profile saved');
    };

    const eduM = () =>
      modal(
        'Add degree',
        `<div class="f"><label>Degree<input id="ed" placeholder="e.g. M.Sc. in Computer Science"></label><label>Years<input id="ey" placeholder="2018 – 2020"></label></div>`,
        () => {
          if (!v('ed')) {
            toast('Enter a degree');
            return false;
          }
          S.me.edu.push({ d: v('ed'), y: v('ey') || '2024' });
          side();
          go();
          toast('Degree added');
        }
      );

    const delEdu = i => {
      S.me.edu.splice(i, 1);
      side();
      go();
      toast('Degree removed');
    };

    V.career = () => {
      const m = S.me;
      return (
        head('Career & Experience', 'Keep your professional story up to date.', `<button class="btn" onclick="expM()">Add experience</button><button class="btn g" onclick="milM()">Share a milestone</button>`) +
        `<div class="grid two"><div style="display:grid;gap:16px"><div class="card"><h3>Current position</h3><div class="sub">Shown at the top of your profile</div><div class="f"><div class="c2"><label>Job title<input id="ct" value="${esc(m.title)}"></label><label>Company<input id="cc" value="${esc(m.company)}"></label></div><div><button class="btn s" onclick="S.me.title=v('ct');S.me.company=v('cc');side();toast('Current position updated')">Update position</button></div></div></div>
<div class="card"><h3>Experience</h3><div class="sub">Previous roles</div><div class="tl">${S.exp.map((e, i) => `<div><b>${esc(e.t)} · ${esc(e.co)}</b><small>${esc(e.y)}</small><span>${esc(e.d)}</span><div class="acts" style="margin-top:6px"><button class="btn g s" onclick="expM(${i})">Edit</button><button class="btn no s" onclick="delExp(${i})">Remove</button></div></div>`).join('') || '<small>No previous roles yet.</small>'}</div></div></div>
<div style="display:grid;gap:16px;align-content:start"><div class="card"><h3>Achievements</h3><div class="sub">Highlights of your work</div>${m.achv.map((a, i) => `<div class="row"><span>${esc(a)}</span><button class="btn no s" onclick="rmAchv(${i})">Remove</button></div>`).join('')}<div class="tools" style="margin:12px 0 0"><input id="an" placeholder="Add an achievement" onkeydown="if(event.key=='Enter')addA()"><button class="btn s" onclick="addA()">Add</button></div></div>
<div class="card"><h3>Career milestones</h3><div class="sub">Shared with the community</div><div class="tl">${m.mil.map(x => `<div><b>${esc(x.t)}</b><small>${x.d}</small></div>`).join('') || '<small>No milestones yet.</small>'}</div></div></div></div>`
      );
    };

    const addA = () => {
      const x = v('an');
      if (!x) return;
      S.me.achv.unshift(x);
      side();
      go();
      toast('Achievement added');
    };

    const rmAchv = i => {
      S.me.achv.splice(i, 1);
      side();
      go();
      toast('Achievement removed');
    };

    const expM = i => {
      const e = S.exp[i] || { t: '', co: '', y: '', d: '' };
      modal(
        i == null ? 'Add experience' : 'Edit experience',
        `<div class="f"><div class="c2"><label>Title<input id="xt" value="${esc(e.t)}"></label><label>Company<input id="xc" value="${esc(e.co)}"></label></div><label>Years<input id="xy" value="${esc(e.y)}" placeholder="2019 – 2022"></label><label>Description<textarea id="xd" rows="3">${esc(e.d)}</textarea></label></div>`,
        () => {
          if (!v('xt') || !v('xc')) {
            toast('Add a title and company');
            return false;
          }
          const n = { t: v('xt'), co: v('xc'), y: v('xy'), d: v('xd') };
          if (i == null) S.exp.unshift(n);
          else S.exp[i] = n;
          side();
          go();
          toast('Experience saved');
        }
      );
    };

    const delExp = i => {
      S.exp.splice(i, 1);
      side();
      go();
      toast('Experience removed');
    };

    const milM = () =>
      modal(
        'Share a career milestone',
        `<div class="f"><label>Milestone<input id="mt" placeholder="e.g. Promoted to Engineering Lead"></label><label>When<input id="md" placeholder="Nov 2026"></label></div>`,
        () => {
          if (!v('mt')) {
            toast('Describe your milestone');
            return false;
          }
          S.me.mil.unshift({ t: v('mt'), d: v('md') || 'Today' });
          notify('Milestone shared', 'Your milestone is now visible to the community.', 'career');
          side();
          go();
          toast('Milestone shared');
        },
        'Share'
      );

    V.mentorship = () => {
      const t = S.tab.m || 'Requests',
        l = S.reqs.filter(r => (t == 'Requests' ? r.status == 'Pending' : t == 'Mentees' ? r.status == 'Accepted' : r.status == 'Completed' || r.status == 'Declined'));
      return (
        head('Mentorship', 'Guide students and manage your mentoring relationships.') +
        `<div class="tools">${tabs('m', ['Requests', 'Mentees', 'History'])}</div><div class="card">${l.map(r => `<div class="row"><div class="who">${pav(r.s)}<div><b>${S.P[r.s][0]} <span class="mu">${S.P[r.s][1]}</span></b><small>${r.topic} · ${r.date}</small><small style="color:var(--soft);margin-top:4px">${esc(r.msg)}</small></div></div><div class="acts" style="margin:0;align-items:center">${r.status == 'Pending' ? `<button class="btn s" onclick="decide(${r.id},'Accepted')">Accept</button><button class="btn no s" onclick="decide(${r.id},'Declined')">Decline</button>` : r.status == 'Accepted' ? `<button class="btn s" onclick="chat('${r.s}')">Message</button><button class="btn g s" onclick="endM(${r.id})">Complete</button>` : tag(r.status)}</div></div>`).join('') || '<div class="empty">Nothing here yet.</div>'}</div>`
      );
    };

    const decide = (id, s) => {
      const r = S.reqs.find(x => x.id == id);
      if (!r) return;
      r.status = s;
      notify(s == 'Accepted' ? 'Mentee added' : 'Request declined', S.P[r.s][0] + (s == 'Accepted' ? ' is now your mentee.' : '’s request was declined.'), 'mentorship');
      side();
      go();
      toast(s == 'Accepted' ? 'Request accepted' : 'Request declined');
    };

    const endM = id => {
      const r = S.reqs.find(x => x.id == id);
      if (!r) return;
      r.status = 'Completed';
      side();
      go();
      toast('Mentorship marked as completed');
    };

    V.jobs = () => {
      const t = S.tab.j || 'My posts';
      return (
        head('Jobs', 'Share opportunities with students and fellow alumni.', `<button class="btn" onclick="jobM()">Create job post</button>`) +
        `<div class="tools">${tabs('j', ['My posts', 'Browse jobs'])}</div>` +
        (t == 'My posts'
          ? `<div class="grid eq">${S.jobs.map(j => `<div class="card hov"><div style="display:flex;justify-content:space-between;gap:8px"><b>${esc(j.t)}</b>${tag(j.status)}</div><p class="sub" style="margin:8px 0 0">${esc(j.co)} · ${j.type} · ${esc(j.loc)}<br>Posted ${j.posted} · ${j.ap.length} applicants</p><div class="acts"><button class="btn s" onclick="apps(${j.id})">Applicants</button><button class="btn g s" onclick="jobM(${j.id})">Edit</button><button class="btn no s" onclick="delJ(${j.id})">Remove</button></div></div>`).join('') || '<div class="empty">No job posts yet.</div>'}</div>`
          : `<div class="grid eq">${S.other.map(j => `<div class="card hov"><b>${esc(j.t)}</b><p class="sub" style="margin:6px 0 0">${j.co} · ${j.type} · ${j.loc}<br>Shared by ${S.P[j.by][0]}</p><div class="acts"><button class="btn ${j.saved ? 'g' : ''} s" onclick="toggleSaveJob(${j.id})">${j.saved ? 'Saved' : 'Save'}</button><button class="btn g s" onclick="chat('${j.by}')">Message</button></div></div>`).join('')}</div>`)
      );
    };

    const toggleSaveJob = id => {
      const j = S.other.find(x => x.id === id);
      if (!j) return;
      j.saved = !j.saved;
      go();
      toast(j.saved ? 'Saved' : 'Removed from saved');
    };

    const jobM = id => {
      const j = S.jobs.find(x => x.id == id) || { t: '', co: S.me.company, type: 'Full-time', loc: '', desc: '', status: 'Open' };
      const o = (a, x) => a.map(y => `<option ${y == x ? 'selected' : ''}>${y}</option>`).join('');
      modal(
        id ? 'Edit job post' : 'Create job post',
        `<div class="f"><label>Job title<input id="jt" value="${esc(j.t)}"></label><div class="c2"><label>Company<input id="jc" value="${esc(j.co)}"></label><label>Location<input id="jl" value="${esc(j.loc)}"></label></div><div class="c2"><label>Type<select id="jy">${o(['Full-time', 'Internship', 'Part-time'], j.type)}</select></label><label>Status<select id="js">${o(['Open', 'Draft', 'Closed'], j.status)}</select></label></div><label>Description<textarea id="jd" rows="4">${esc(j.desc)}</textarea></label></div>`,
        () => {
          if (!v('jt')) {
            toast('Add a job title');
            return false;
          }
          const n = { t: v('jt'), co: v('jc'), loc: v('jl'), type: v('jy'), status: v('js'), desc: v('jd') };
          if (id) Object.assign(j, n);
          else S.jobs.unshift({ id: Date.now(), posted: 'Today', ap: [], ...n });
          S.tab.j = 'My posts';
          side();
          go();
          toast(id ? 'Job post updated' : 'Job post ' + (n.status == 'Open' ? 'published' : 'saved'));
        },
        id ? 'Save changes' : 'Publish'
      );
    };

    const delJ = id => {
      S.jobs = S.jobs.filter(j => j.id != id);
      go();
      toast('Job post removed');
    };

    const shortlistApp = (jobId, appIndex) => {
      const j = S.jobs.find(x => x.id == jobId);
      if (j && j.ap[appIndex]) {
        j.ap[appIndex].st = 'Shortlisted';
        apps(jobId);
        toast('Applicant shortlisted');
      }
    };

    const apps = id => {
      const j = S.jobs.find(x => x.id == id);
      if (!j) return;
      const box = $('#box');
      const mod = $('#mod');
      if (!box || !mod) return;
      box.innerHTML = `<h3>Applicants · ${esc(j.t)}</h3>${j.ap.map((a, i) => `<div class="row"><div class="who">${pav(a.s)}<div><b>${S.P[a.s][0]}</b><small>${S.P[a.s][1]}</small></div></div><div class="acts" style="margin:0;align-items:center">${tag(a.st)}<button class="btn g s" onclick="shortlistApp(${id}, ${i})">Shortlist</button><button class="btn g s" onclick="chat('${a.s}');closeM()">Message</button></div></div>`).join('') || '<div class="empty">No applicants yet.</div>'}<div class="ft"><button class="btn g" onclick="closeM();go()">Close</button></div>`;
      mod.classList.add('show');
    };

    V.events = () => {
      const t = S.tab.e || 'Upcoming',
        l = S.events.filter(e => (t == 'Upcoming' ? e.d >= today : t == 'Registered' ? e.mine : e.d < today));
      return (
        head('Events', 'Discover university events and track your registrations.') +
        `<div class="tools">${tabs('e', ['Upcoming', 'Registered', 'Previous'])}</div><div class="grid eq">${l.map(e => `<div class="card hov"><div style="display:flex;gap:14px">${fdate(e.d)}<div style="flex:1"><b>${e.t}</b><div class="sub" style="margin:0">${e.v}</div><div class="bar"><i style="width:${Math.min(100, (e.reg / e.cap) * 100)}%"></i></div><small class="mu">${e.reg} of ${e.cap} registered</small></div></div><div class="acts">${e.d < today ? (e.mine ? tag('Registered') + '<span class="mu">Attended</span>' : '<span class="mu">Event ended</span>') : e.mine ? `${tag('Registered')}<button class="btn g s" onclick="regE(${e.id})">Cancel</button>` : `<button class="btn s" onclick="regE(${e.id})">Register</button>`}</div></div>`).join('') || '<div class="empty">No events in this view.</div>'}</div>`
      );
    };

    const regE = id => {
      const e = S.events.find(x => x.id == id);
      if (!e) return;
      e.mine = !e.mine;
      e.reg += e.mine ? 1 : -1;
      if (e.mine) notify('Registered', 'You’re registered for ' + e.t + '.', 'events');
      side();
      go();
      toast(e.mine ? 'You’re registered' : 'Registration cancelled');
    };

    V.donations = () => {
      const tot = S.don.reduce((a, d) => a + d.amt, 0),
        C = id => S.camps.find(c => c.id == id) || { t: 'Campaign' };
      return (
        head('Donations', 'Give back to the university community.', `<button class="btn" onclick="donM()">Make a donation</button>`) +
        `<div class="note">Demonstration only. No real payments are processed.</div><div class="grid stats">${stat('Total contributed', money(tot), 'Across ' + S.don.length + ' gifts') + stat('Campaigns supported', new Set(S.don.map(d => d.c)).size, 'Of ' + S.camps.length + ' active')}</div><div class="grid eq" style="margin-bottom:16px">${S.camps.map(c => `<div class="card hov"><b>${c.t}</b><p class="sub" style="margin:6px 0 0">${c.d}</p><div class="bar"><i style="width:${Math.min(100, (c.raised / c.goal) * 100)}%"></i></div><small class="mu">${money(c.raised)} of ${money(c.goal)}</small><div class="acts"><button class="btn s" onclick="donM(${c.id})">Donate</button></div></div>`).join('')}</div><div class="card"><h3>Donation history</h3><div class="sub">Your contribution records</div>${S.don.map(d => `<div class="row"><div><b>${C(d.c).t}</b><small>${d.date}${d.anon ? ' · Anonymous' : ''}</small></div><b style="color:var(--iv)">${money(d.amt)}</b></div>`).join('') || '<div class="empty">No donations yet.</div>'}</div>`
      );
    };

    const donM = id =>
      modal(
        'Make a donation',
        `<div class="note">Demonstration only. No real payment is taken.</div><div class="f"><label>Campaign<select id="dc">${S.camps.map(c => `<option value="${c.id}" ${c.id == id ? 'selected' : ''}>${c.t}</option>`).join('')}</select></label><label>Amount (USD)<input id="da" type="number" min="1" value="50"></label><label style="display:flex;gap:8px;align-items:center"><input id="dn" type="checkbox" style="width:auto"> Give anonymously</label></div>`,
        () => {
          const a = +v('da');
          if (!(a > 0)) {
            toast('Enter a valid amount');
            return false;
          }
          const c = S.camps.find(x => x.id == +v('dc'));
          if (c) c.raised += a;
          const isAnon = $('#dn') ? $('#dn').checked : false;
          S.don.unshift({ c: c ? c.id : 1, amt: a, date: 'Today', anon: isAnon });
          notify('Thank you', `Your demo donation of ${money(a)} to ${c ? c.t : 'University'} was recorded.`, 'donations');
          side();
          go();
          toast('Thank you for giving');
        },
        'Donate'
      );

    const chat = p => {
      if (!S.conv.find(c => c.p == p)) S.conv.unshift({ p, unread: 0, m: [] });
      S.cur = p;
      customRoute('messages');
    };

    V.messages = () => {
      const cur = S.cur ? S.conv.find(c => c.p == S.cur) : null;
      return (
        head('Messages', 'Chat with students and fellow alumni.') +
        `<div class="card chat ${cur ? 'open' : ''}"><div class="cl">${S.conv.map(c => { const l = c.m[c.m.length - 1]; return `<div class="ci ${c.p == S.cur ? 'on' : ''}" onclick="S.cur='${c.p}';S.conv.find(x=>x.p=='${c.p}').unread=0;side();go()">${pav(c.p)}<div style="flex:1;min-width:0"><b>${S.P[c.p] ? S.P[c.p][0] : 'User'}</b><small>${l ? esc(l.t) : 'Say hello'}</small></div>${c.unread ? `<span class="n" style="background:var(--wine-hi);border-radius:99px;padding:1px 8px;font-size:11px">${c.unread}</span>` : ''}</div>`; }).join('')}</div><div class="ct">${cur ? `<div class="hd"><button class="btn g s back" onclick="S.cur=null;go()">Back</button> <b>${S.P[cur.p] ? S.P[cur.p][0] : 'User'}</b><div class="mu">${S.P[cur.p] ? S.P[cur.p][1] : ''}</div></div><div class="msgs" id="ms2">${cur.m.map(x => `<div class="m ${x.me ? 'me' : ''}">${esc(x.t)}<small>${x.time}</small></div>`).join('') || '<div class="empty">Start the conversation.</div>'}</div><div class="send"><input id="mi" placeholder="Write a message" onkeydown="if(event.key=='Enter')sendM()" aria-label="Message"><button class="btn" onclick="sendM()">Send</button></div>` : '<div class="empty" style="margin:auto">Select a conversation</div>'}</div></div>`
      );
    };

    const sendM = () => {
      const x = v('mi');
      if (!x) return;
      const p = S.cur;
      const c = S.conv.find(y => y.p == p);
      if (!c) return;
      c.m.push({ me: 1, t: x, time: 'Now' });
      go();
      setTimeout(() => {
        c.m.push({
          me: 0,
          t: ['Thank you, that really helps!', 'Sounds great. Talk soon.', 'I appreciate your time, Marcus.'][c.m.length % 3],
          time: 'Now',
        });
        if (S.cur == p && (window.location.hash == '#messages' || window.location.pathname.includes('/messages'))) {
          go();
        } else {
          c.unread++;
          notify('New message', (S.P[p] ? S.P[p][0] : 'Someone') + ' replied to you.', 'messages');
          side();
        }
      }, 1400);
      setTimeout(() => {
        const m = $('#ms2');
        if (m) m.scrollTop = 1e5;
        const mi = $('#mi');
        if (mi) mi.focus();
      }, 50);
    };

    V.notifications = () => {
      const t = S.tab.n || 'All',
        l = S.notes.filter(n => t == 'All' || !n.read);
      return (
        head('Notifications', 'Requests, updates and announcements.', `<button class="btn g" onclick="S.notes.forEach(n=>n.read=true);side();go();toast('All caught up')">Mark all as read</button>`) +
        `<div class="tools">${tabs('n', ['All', 'Unread'])}</div><div class="card">${l.map(n => `<div class="nt ${n.read ? '' : 'un'}" onclick="S.notes[${S.notes.indexOf(n)}].read=true;side();customRoute('${n.to}')"><span class="pt"></span><div><b>${n.t}</b><div>${n.m}</div><small class="mu">${n.time}</small></div></div>`).join('') || '<div class="empty">You’re all caught up.</div>'}</div>`
      );
    };

    function side() {
      const bd = { messages: munr(), notifications: unr(), mentorship: pend() };
      root.querySelectorAll('#nav [data-r]').forEach(a => {
        const n = bd[a.dataset.r];
        const b = a.querySelector('.n');
        if (b) {
          b.textContent = n || '';
          b.style.display = n ? '' : 'none';
        }
      });
      const topBd = $('#bd');
      if (topBd) topBd.style.display = unr() ? 'block' : 'none';
      const mnm = $('#mnm');
      if (mnm) mnm.textContent = S.me.name;
      const mrl = $('#mrl');
      if (mrl) mrl.textContent = S.me.title;
      const hav = $('#hav');
      if (hav) {
        hav.textContent = S.me.photo ? '' : ini(S.me.name);
        hav.style.backgroundImage = S.me.photo ? `url(${S.me.photo})` : '';
      }
    }

    function anim() {
      root.querySelectorAll('.page .card,.page .hero').forEach((c, i) => c.style.setProperty('--d', i));
      root.querySelectorAll('.stat .v').forEach(el => {
        const t = el.textContent.trim(),
          d = t[0] == '$',
          n = parseInt(t.replace(/\D/g, ''));
        if (isNaN(n) || !/^\$?[\d,]+%?$/.test(t)) return;
        const pc = t.endsWith('%'),
          t0 = performance.now();
        (function f(now) {
          const k = Math.min(1, (now - t0) / 1200),
            x = Math.round(n * (1 - Math.pow(1 - k, 3)));
          el.textContent = (d ? '$' : '') + x.toLocaleString('en') + (pc ? '%' : '');
          if (k < 1) requestAnimationFrame(f);
        })(t0);
      });
    }

    function customRoute(r, keep) {
      if (!V[r]) {
        r = tabFromPath[r] || 'dashboard';
      }
      const nav = $('#nav');
      if (nav) {
        nav.innerHTML = R.map(
          (x, i) =>
            `<a style="--i:${i}" href="#${x[0]}" data-r="${x[0]}" class="${x[0] == r ? 'on' : ''}"><svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="${ic[x[0]]}"/></svg>${x[1]}<span class="n"></span></a>`
        ).join('');
      }

      const p = $('#page');
      if (p) {
        p.innerHTML = V[r]();
        if (!keep) {
          p.classList.remove('fresh');
          void p.offsetWidth;
          p.classList.add('fresh');
          window.scrollTo(0, 0);
        }
      }
      document.body.classList.remove('open');
      side();
      if (!keep) anim();
      if (r == 'messages') {
        const m = $('#ms2');
        if (m) m.scrollTop = 1e5;
      }

      const targetPath = pathForTab[r] || '/alumni/' + r;
      if (window.location.pathname !== targetPath && !window.location.hash) {
        window.history.pushState(null, '', targetPath);
      }
    }

    function handleLinkClick(e) {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;

      if (href.startsWith('#')) {
        e.preventDefault();
        const tab = href.slice(1);
        if (V[tab]) {
          customRoute(tab);
        }
      } else if (href.startsWith('/alumni/')) {
        const seg = href.split('/')[2];
        const tab = tabFromPath[seg] || seg;
        if (V[tab]) {
          e.preventDefault();
          customRoute(tab);
        }
      }
    }
    root.addEventListener('click', handleLinkClick);

    const closeSearch = () => {
      const b = $('#sres');
      if (b) b.style.display = 'none';
      const input = $('#gs');
      if (input) input.value = '';
    };

    const signOut = () => {
      modal(
        'Sign out of Alumnex?',
        '<p class="sub" style="margin:0">You’ll need to sign in again to open your dashboard.</p>',
        () => {
          logoutDemoUser();
          router.replace('/login');
        },
        'Sign out'
      );
    };

    const gs = $('#gs');
    if (gs) {
      gs.oninput = e => {
        const q = e.target.value.toLowerCase();
        const b = $('#sres');
        if (!b) return;
        if (!q) {
          b.style.display = 'none';
          return;
        }
        const r = [
          ...Object.keys(S.P)
            .filter(k => S.P[k][0].toLowerCase().includes(q))
            .map(k => [S.P[k][0] + ' · Message', k]),
          ...S.jobs.filter(j => j.t.toLowerCase().includes(q)).map(j => [j.t + ' · Job', '#jobs']),
          ...S.events.filter(x => x.t.toLowerCase().includes(q)).map(x => [x.t + ' · Event', '#events']),
        ].slice(0, 6);
        b.innerHTML = r.length
          ? r
              .map(x => {
                if (x[1].startsWith('#')) {
                  const targetTab = x[1].slice(1);
                  return `<a href="${x[1]}" onclick="closeSearch();customRoute('${targetTab}');return false">${x[0]}</a>`;
                } else {
                  return `<a href="#messages" onclick="closeSearch();chat('${x[1]}');return false">${x[0]}</a>`;
                }
              })
              .join('')
          : '<a>No results</a>';
        b.style.display = 'block';
      };
    }

    const mod = $('#mod');
    if (mod) {
      mod.onclick = e => {
        if (e.target.id == 'mod') closeM();
      };
    }

    const onKeyDown = e => {
      if (e.key == 'Escape') closeM();
    };
    document.addEventListener('keydown', onKeyDown);

    const onDocClick = e => {
      if (!e.target.closest('.search')) closeSearch();
    };
    document.addEventListener('click', onDocClick);

    const onHeroMove = e => {
      const h = e.target.closest && e.target.closest('.hero');
      if (!h) return;
      const r = h.getBoundingClientRect();
      h.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(2));
    };
    document.addEventListener('mousemove', onHeroMove);

    // Expose all methods onto window for inline handlers
    window.S = S;
    window.V = V;
    window.toast = toast;
    window.modal = modal;
    window.closeM = closeM;
    window.go = go;
    window.side = side;
    window.v = v;
    window.up = up;
    window.addS = addS;
    window.rmS = rmS;
    window.saveP = saveP;
    window.eduM = eduM;
    window.delEdu = delEdu;
    window.addA = addA;
    window.rmAchv = rmAchv;
    window.expM = expM;
    window.delExp = delExp;
    window.milM = milM;
    window.decide = decide;
    window.endM = endM;
    window.jobM = jobM;
    window.delJ = delJ;
    window.apps = apps;
    window.shortlistApp = shortlistApp;
    window.toggleSaveJob = toggleSaveJob;
    window.regE = regE;
    window.donM = donM;
    window.chat = chat;
    window.sendM = sendM;
    window.closeSearch = closeSearch;
    window.signOut = signOut;
    window.customRoute = customRoute;
    window.$ = s => root.querySelector(s);

    try {
      const sess = getDemoSession();
      if (sess && sess.name) {
        S.me.name = sess.name;
        side();
      }
    } catch {}

    const hashTab = window.location.hash ? window.location.hash.slice(1) : null;
    const pathSeg = pathname.split('/')[2];
    const resolvedTab = hashTab && V[hashTab] ? hashTab : tabFromPath[initialTab] || tabFromPath[pathSeg] || 'dashboard';
    customRoute(resolvedTab);

    if (createJob && window.jobM) {
      setTimeout(() => window.jobM(), 200);
    }

    setTimeout(() => {
      const top = $('#top');
      if (top) top.classList.remove('intro');
    }, 3000);

    const onHashChange = () => {
      const h = window.location.hash.slice(1);
      if (h && V[h]) customRoute(h);
    };
    window.addEventListener('hashchange', onHashChange);

    return () => {
      root.removeEventListener('click', handleLinkClick);
      window.removeEventListener('hashchange', onHashChange);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('mousemove', onHeroMove);
    };
  }, [initialTab, createJob, pathname, router]);

  return (
    <div className="alumni-portal" ref={containerRef}>
      <div className="shell">
        <header id="top" className="intro">
          <div className="r1">
            <a className="logo" href="/alumni/dashboard" aria-label="Alumnex">
              <img src="/images/alumnex-icon.png" alt="Alumnex" style={{ width: 36, height: 36, objectFit: 'contain' }} />
              <span className="sep" />
              <span className="wm" style={{ display: 'inline-flex', alignItems: 'center', letterSpacing: '0.04em', fontFamily: "'Libre Caslon Text',Georgia,serif" }}>
                ALUMNE
                <svg viewBox="0 0 34 34" style={{ width: '1.2em', height: '1.2em', marginLeft: '-0.02em', overflow: 'visible' }} aria-hidden="true" focusable="false">
                  <path d="M5 28C11 19 21 9 29 5" fill="none" stroke="#c9a16b" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 6C14 9 20 21 27 28" fill="none" stroke="#c9a16b" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 27C4 31 9 31 13 25" fill="none" stroke="#c9a16b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M24 7C27 5 29 3 31 2" fill="none" stroke="#c9a16b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <div className="search">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
              <input id="gs" placeholder="Search students, jobs and events" autoComplete="off" />
              <div className="sres" id="sres" />
            </div>
            <div className="hr">
              <a className="ib" href="#notifications" aria-label="Notifications" onClick={e => { e.preventDefault(); if (window.customRoute) window.customRoute('notifications'); }}>
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10 20h4"/></svg>
                <span className="dot" id="bd" />
              </a>
              <a className="chip2" href="#profile" aria-label="My profile" onClick={e => { e.preventDefault(); if (window.customRoute) window.customRoute('profile'); }}>
                <span className="av" id="hav">MB</span>
                <span><b id="mnm">Marcus Bell</b><small id="mrl">Senior Software Engineer</small></span>
              </a>
              <button className="ib" id="so-btn" aria-label="Sign out" title="Sign out" onClick={() => window.signOut && window.signOut()}>
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/></svg>
              </button>
            </div>
          </div>
          <nav id="nav" />
        </header>
        <div className="page" id="page" />
      </div>
      <div className="mod" id="mod"><div className="box" id="box" /></div>
      <div className="toast" id="toast" />
    </div>
  );
}
