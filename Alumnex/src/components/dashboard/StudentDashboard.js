'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getDemoSession, logoutDemoUser } from '@/lib/demo-auth';
import './student-dashboard.css';

export default function StudentDashboard({ initialTab = 'dashboard' }) {
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
      if (session.role !== 'student') {
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

    const tag = s => `<span class="tag t-${(s || '').split(' ')[0]}">${s}</span>`;
    const S = {
      me: {
        name: 'Rafi Ahmed',
        dept: 'Computer Science & Engineering',
        batch: 2026,
        email: 'rafi.ahmed@student.example.edu',
        phone: '',
        bio: 'Final-year CSE student interested in backend engineering and machine learning.',
        skills: ['Python', 'React', 'SQL'],
        vis: true,
      },
      alumni: [
        [1, 'Marcus Bell', 'Senior Software Engineer', 'Brightwave', 'Computer Science & Engineering', 2018, 'Dhaka', ['Backend', 'Cloud']],
        [2, 'Amelia Hart', 'Product Manager', 'Nexora', 'Business Administration', 2016, 'Singapore', ['Product', 'Strategy']],
        [3, 'Daniel Okafor', 'Data Scientist', 'Lumen Labs', 'Computer Science & Engineering', 2015, 'London', ['ML', 'Python']],
        [4, 'Lena Fischer', 'Design Lead', 'Studio Arc', 'Architecture', 2019, 'Berlin', ['UX', 'Portfolio']],
        [5, 'Priya Nair', 'Marketing Director', 'Verity', 'Business Administration', 2020, 'Dhaka', ['Branding', 'Growth']],
        [6, 'Omar Siddiqui', 'Power Systems Engineer', 'GridWorks', 'Electrical Engineering', 2017, 'Dhaka', ['Energy', 'Research']],
        [7, 'Sana Tariq', 'Embedded Engineer', 'Circuita', 'Electrical Engineering', 2021, 'Toronto', ['IoT', 'C++']],
        [8, 'Henry Wallace', 'Legal Counsel', 'Meridian', 'Law', 2014, 'Dubai', ['Contracts', 'Careers']],
      ].map(a => ({ id: a[0], name: a[1], role: a[2], co: a[3], dept: a[4], batch: a[5], city: a[6], tags: a[7] })),
      jobs: [
        [1, 'Junior Backend Developer', 'Brightwave', 'Full-time', 'Dhaka', 'Computer Science & Engineering', '2 days ago', 1],
        [2, 'Data Science Intern', 'Lumen Labs', 'Internship', 'Remote', 'Computer Science & Engineering', '4 days ago', 3],
        [3, 'Product Associate', 'Nexora', 'Full-time', 'Singapore', 'Business Administration', '1 week ago', 2],
        [4, 'UX Design Intern', 'Studio Arc', 'Internship', 'Remote', 'Architecture', '3 days ago', 4],
        [5, 'Brand Executive', 'Verity', 'Full-time', 'Dhaka', 'Business Administration', '5 days ago', 5],
        [6, 'Grid Analyst Trainee', 'GridWorks', 'Internship', 'Dhaka', 'Electrical Engineering', '1 week ago', 6],
        [7, 'Embedded Software Engineer', 'Circuita', 'Full-time', 'Remote', 'Electrical Engineering', '6 days ago', 7],
        [8, 'Part-time Research Assistant', 'Meridian', 'Part-time', 'Dubai', 'Law', '2 weeks ago', 8],
      ].map(j => ({ id: j[0], t: j[1], co: j[2], type: j[3], loc: j[4], dept: j[5], posted: j[6], by: j[7] })),
      apps: [
        { job: 3, status: 'Interview', date: 'Nov 12' },
        { job: 5, status: 'Review', date: 'Nov 15' },
        { job: 6, status: 'Applied', date: 'Nov 18' },
      ],
      reqs: [
        { a: 3, topic: 'Career advice', status: 'Accepted', date: 'Nov 10' },
        { a: 2, topic: 'Product management', status: 'Pending', date: 'Nov 17' },
      ],
      events: [
        [1, '2026-11-25', 'Resume Clinic with Alumni', 'Online', 120, 84],
        [2, '2026-12-03', 'Career Mentorship Fair', 'Innovation Centre', 300, 212],
        [3, '2026-12-08', 'Tech Talk: Breaking into Backend', 'Auditorium', 180, 97],
        [4, '2026-12-15', 'Annual Homecoming Gala', 'Grand Ballroom', 400, 388],
        [5, '2027-01-12', 'Research Showcase', 'Library Atrium', 150, 61],
      ].map(e => ({ id: e[0], d: e[1], t: e[2], v: e[3], cap: e[4], reg: e[5], mine: e[0] == 2 })),
      notes: [
        { t: 'Interview scheduled', m: 'Nexora invited you to interview for Product Associate.', time: '2 hrs ago', read: false, to: 'applications' },
        { t: 'Mentorship accepted', m: 'Daniel Okafor accepted your mentorship request.', time: 'Yesterday', read: false, to: 'mentorship' },
        { t: 'Event reminder', m: 'Career Mentorship Fair is on Dec 3.', time: '2 days ago', read: true, to: 'events' },
      ],
      conv: [
        { a: 3, unread: 1, m: [{ me: 0, t: 'Happy to help. What are you working on right now?', time: 'Yesterday' }] },
        { a: 1, unread: 0, m: [{ me: 1, t: 'Thanks for sharing the backend roadmap!', time: 'Mon' }, { me: 0, t: 'Anytime. Ask me if you get stuck.', time: 'Mon' }] },
      ],
      cur: null,
      q: {},
      tab: {},
    };

    const A = id => S.alumni.find(a => a.id == id) || { name: 'Alumnus', role: 'Alumni', co: 'Company' };
    const J = id => S.jobs.find(j => j.id == id) || { t: 'Job', co: 'Company', loc: 'City' };

    const ic = {
      dashboard: 'M3 12 12 3l9 9M5 10v10h14V10',
      profile: 'M16 11a4 4 0 1 0-8 0M4 20c0-4 4-6 8-6s8 2 8 6',
      alumni: 'M12 3 2 8l10 5 10-5-10-5zM6 11v5c3 3 9 3 12 0v-5',
      mentorship: 'M12 3l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z',
      jobs: 'M3 8h18v12H3zM9 8V5h6v3',
      applications: 'M5 3h14v18H5zM9 8h6M9 12h6M9 16h4',
      messages: 'M4 5h16v11H9l-5 4z',
      events: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
      notifications: 'M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10 20h4',
    };

    const R = [
      ['dashboard', 'Dashboard'],
      ['profile', 'Profile'],
      ['alumni', 'Alumni'],
      ['mentorship', 'Mentorship'],
      ['jobs', 'Jobs'],
      ['applications', 'Applications'],
      ['messages', 'Messages'],
      ['events', 'Events'],
      ['notifications', 'Notifications'],
    ];

    const tabFromPath = {
      dashboard: 'dashboard',
      overview: 'dashboard',
      profile: 'profile',
      alumni: 'alumni',
      mentorship: 'mentorship',
      jobs: 'jobs',
      applications: 'applications',
      messages: 'messages',
      events: 'events',
      notifications: 'notifications',
    };

    const pathForTab = {
      dashboard: '/student/dashboard',
      profile: '/student/profile',
      alumni: '/student/alumni',
      mentorship: '/student/mentorship',
      jobs: '/student/jobs',
      applications: '/student/applications',
      messages: '/student/messages',
      events: '/student/events',
      notifications: '/student/notifications',
    };

    const unr = () => S.notes.filter(n => !n.read).length;
    const munr = () => S.conv.reduce((a, c) => a + c.unread, 0);
    const strength = () =>
      40 +
      (S.me.bio.length > 20 ? 20 : 0) +
      (S.me.skills.length >= 3 ? 20 : 0) +
      (S.me.phone ? 10 : 0) +
      (S.me.vis ? 10 : 0);

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
    const head = (h, p, a = '') => `<div class="ph"><div><span class="eb">Student portal</span><h1>${h}</h1><p>${p}</p></div>${a}</div>`;
    const stat = (l, v, s) => `<div class="card stat hov"><div class="l">${l}</div><div class="v">${v}</div><span class="mu">${s}</span></div>`;
    const fdate = d => {
      const x = new Date(d + 'T00:00');
      return `<div class="date"><b>${x.getDate()}</b><span>${x.toLocaleString('en', { month: 'short' })}</span></div>`;
    };

    const alCard = a => {
      const asked = S.reqs.some(r => r.a == a.id);
      return `<div class="card hov"><div class="who"><span class="av">${ini(a.name)}</span><div><b>${a.name}</b><small>${a.role} · ${a.co}</small></div></div><p class="sub" style="margin:12px 0 6px">${a.dept} · Class of ${a.batch} · ${a.city}</p>${a.tags.map(t => `<span class="chip">${t}</span>`).join('')}<div class="acts"><button class="btn s" ${asked ? 'disabled' : ''} onclick="reqM(${a.id})">${asked ? 'Requested' : 'Request mentorship'}</button><button class="btn g s" onclick="chat(${a.id})">Message</button></div></div>`;
    };

    const V = {};

    const go = () => {
      const hash = window.location.hash.slice(1);
      const seg = pathname.split('/')[2];
      const curTab = hash || tabFromPath[seg] || 'dashboard';
      customRoute(curTab, 1);
    };

    V.dashboard = () => {
      const rec = S.jobs.filter(j => j.dept == S.me.dept).slice(0, 3),
        act = S.apps.length;
      return (
        `<div class="hero">${[10, 28, 46, 63, 80].map((l, i) => `<i style="left:${l}%;animation-delay:${i * 1.6}s"></i>`).join('')}<h1>Welcome back, ${S.me.name.split(' ')[0]}. <em>Your next step starts here.</em></h1><p>Meet alumni, apply for roles and find the events that move your career forward.</p><div><a class="btn" href="#alumni" onclick="customRoute('alumni');return false">Find a mentor</a> <a class="btn g" href="#jobs" onclick="customRoute('jobs');return false">Browse jobs</a></div></div>
<div class="grid stats">${stat('Profile strength', strength() + '%', 'Complete it to stand out') + stat('Active applications', act, '1 interview scheduled') + stat('Mentorship requests', S.reqs.length, S.reqs.filter(r => r.status == 'Accepted').length + ' accepted') + stat('Events registered', S.events.filter(e => e.mine).length, 'Next: Dec 3')}</div>
<div class="grid two" style="margin-bottom:16px"><div class="card"><h3>Recommended jobs</h3><div class="sub">Matched to your department</div>${rec.map(j => `<div class="row"><div><b>${j.t}</b><small>${j.co} · ${j.type} · ${j.loc}</small></div><a class="btn g s" href="#jobs" onclick="customRoute('jobs');return false">View</a></div>`).join('') || '<div class="empty">No matches yet.</div>'}</div>
<div class="card"><h3>Upcoming events</h3><div class="sub">Reserve your seat</div>${S.events.slice(0, 3).map(e => `<div class="row"><div style="display:flex;gap:12px;align-items:center">${fdate(e.d)}<div><b>${e.t}</b><small>${e.v}</small></div></div><div style="display:flex;align-items:center;gap:8px">${e.mine ? tag('Registered') : `<button class="btn s" onclick="regE(${e.id})">Register</button>`}</div></div>`).join('')}</div></div>
<div class="card"><h3>Alumni you may want to meet</h3><div class="sub">Open to mentoring this semester</div><div class="grid eq" style="gap:12px">${S.alumni.filter(a => a.dept == S.me.dept).concat(S.alumni).filter((a, i, s) => s.indexOf(a) == i).slice(0, 3).map(alCard).join('')}</div></div>`
      );
    };

    V.profile = () => {
      const m = S.me;
      return (
        head('Your profile', 'Alumni and recruiters see this information.', `<button class="btn" onclick="saveP()">Save changes</button>`) +
        `<div class="grid two"><div class="card"><div class="f"><div class="c2"><label>Full name<input id="pn" value="${m.name}"></label><label>Expected graduation<input id="pb2" type="number" value="${m.batch}"></label></div><label>Department<input id="pd" value="${m.dept}"></label><div class="c2"><label>Email<input id="pe" value="${m.email}"></label><label>Phone<input id="pp" value="${m.phone}" placeholder="Add a phone number"></label></div><label>About you<textarea id="pa" rows="4">${m.bio}</textarea></label>
<label>Skills<div>${m.skills.map((s, i) => `<span class="chip">${s}<button onclick="rmS(${i})" aria-label="Remove ${s}">×</button></span>`).join('')}</div><input id="ps2" placeholder="Type a skill and press Enter" onkeydown="if(event.key=='Enter'){addS(this.value);this.value=''}"></label></div></div>
<div class="card"><h3>Profile strength</h3><div style="font:400 40px var(--serif);color:var(--gold-hi)">${strength()}%</div><div class="bar"><i style="width:${strength()}%"></i></div><p class="sub" style="margin-top:14px">Add a longer bio, three or more skills and a phone number to reach 100%.</p>
<div class="row"><div>Visible to alumni<small>Let alumni find and message you</small></div><label class="sw"><input type="checkbox" ${m.vis ? 'checked' : ''} onchange="S.me.vis=this.checked;side();toast('Visibility '+(this.checked?'on':'off'))" aria-label="Visible"><i></i></label></div></div></div>`
      );
    };

    const addS = v => {
      v = (v || '').trim();
      if (v && !S.me.skills.includes(v)) {
        S.me.skills.push(v);
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
      const m = S.me;
      const pn = $('#pn');
      if (!pn || !pn.value.trim()) return toast('Enter your name');
      Object.assign(m, {
        name: pn.value.trim(),
        batch: +$('#pb2').value || m.batch,
        dept: $('#pd').value,
        email: $('#pe').value,
        phone: $('#pp').value,
        bio: $('#pa').value,
      });
      side();
      go();
      toast('Profile saved');
    };

    V.alumni = () => {
      const q = S.q.al || '',
        d = S.q.ad || '',
        list = () => S.alumni.filter(a => (!d || a.dept == d) && (a.name + a.role + a.co + a.tags).toLowerCase().includes(q.toLowerCase()));
      const drawAlumni = () => {
        const alg = $('#alg');
        if (!alg) return;
        alg.innerHTML = list().map(alCard).join('') || '<div class="empty">No alumni match. Try another filter.</div>';
      };
      window._al = drawAlumni;
      setTimeout(drawAlumni, 10);
      return (
        head('Alumni', 'Discover and search alumni by name, company, skill or department.') +
        `<div class="tools"><input placeholder="Search by name, company or skill" value="${q}" oninput="S.q.al=this.value;_al()" aria-label="Search"><select onchange="S.q.ad=this.value;_al()" aria-label="Department"><option value="">All departments</option>${[...new Set(S.alumni.map(a => a.dept))].map(x => `<option ${x == d ? 'selected' : ''}>${x}</option>`).join('')}</select></div><div class="grid eq" id="alg"></div>`
      );
    };

    const reqM = id => {
      const a = A(id);
      modal(
        'Request mentorship from ' + a.name,
        `<div class="f"><label>Topic<select id="rt"><option>Career advice</option><option>Interview preparation</option><option>Industry insights</option><option>Research guidance</option></select></label><label>Message<textarea id="rm" rows="4" placeholder="Introduce yourself and what you hope to learn"></textarea></label></div>`,
        () => {
          const rm = $('#rm');
          if (!rm || rm.value.trim().length < 10) {
            toast('Write a short message first (at least 10 characters)');
            return false;
          }
          S.reqs.unshift({ a: id, topic: $('#rt').value, status: 'Pending', date: 'Today' });
          notify('Request sent', 'Your mentorship request to ' + a.name + ' is pending.', 'mentorship');
          side();
          go();
          toast('Request sent to ' + a.name);
        },
        'Send request'
      );
    };

    V.mentorship = () => {
      const t = S.tab.m || 'All',
        l = S.reqs.filter(r => t == 'All' || r.status == t);
      return (
        head('Mentorship', 'Track your requests and connect with your mentors.', `<a class="btn" href="#alumni" onclick="customRoute('alumni');return false">Find a mentor</a>`) +
        `<div class="tools"><div class="seg">${['All', 'Pending', 'Accepted'].map(x => `<button class="${x == t ? 'on' : ''}" onclick="S.tab.m='${x}';go()">${x}</button>`).join('')}</div></div><div class="card">${l.map(r => { const a = A(r.a), i = S.reqs.indexOf(r); return `<div class="row"><div class="who"><span class="av">${ini(a.name)}</span><div><b>${a.name}</b><small>${r.topic} · ${r.date} · ${a.role}, ${a.co}</small></div></div><div class="acts" style="margin:0;align-items:center">${tag(r.status)}${r.status == 'Accepted' ? `<button class="btn s" onclick="chat(${a.id})">Message</button>` : `<button class="btn g s" onclick="cancelReq(${i})">Cancel</button>`}</div></div>`; }).join('') || '<div class="empty">Nothing here yet. Find a mentor to get started.</div>'}</div>`
      );
    };

    const cancelReq = i => {
      S.reqs.splice(i, 1);
      side();
      go();
      toast('Request cancelled');
    };

    V.jobs = () => {
      const q = S.q.j || '',
        t = S.q.jt || '';
      const drawJobs = () => {
        const jl = $('#jl');
        if (!jl) return;
        const l = S.jobs.filter(j => (!t || j.type == t) && (j.t + j.co + j.loc).toLowerCase().includes(q.toLowerCase()));
        jl.innerHTML =
          l.map(j => {
            const ap = S.apps.some(a => a.job == j.id);
            return `<div class="card hov"><div style="display:flex;justify-content:space-between;gap:8px"><div><b>${j.t}</b><div class="sub" style="margin:2px 0 0">${j.co} · ${j.loc}</div></div>${tag('Open')}</div><p class="sub" style="margin:12px 0 0">${j.type} · ${j.dept}<br>Posted ${j.posted} by ${A(j.by).name}</p><div class="acts"><button class="btn s" ${ap ? 'disabled' : ''} onclick="applyM(${j.id})">${ap ? 'Applied' : 'Apply now'}</button><button class="btn g s" onclick="chat(${j.by})">Ask alumni</button></div></div>`;
          }).join('') || '<div class="empty">No jobs match your search.</div>';
      };
      window._jb = drawJobs;
      setTimeout(drawJobs, 10);
      return (
        head('Jobs', 'Opportunities shared by the alumni community.') +
        `<div class="tools"><input placeholder="Search roles, companies or locations" value="${q}" oninput="S.q.j=this.value;_jb()" aria-label="Search jobs"><select onchange="S.q.jt=this.value;_jb()" aria-label="Type"><option value="">All types</option>${['Full-time', 'Internship', 'Part-time'].map(x => `<option ${x == t ? 'selected' : ''}>${x}</option>`).join('')}</select></div><div class="grid eq" id="jl"></div>`
      );
    };

    const applyM = id => {
      const j = J(id);
      modal(
        'Apply: ' + j.t,
        `<p class="sub">${j.co} · ${j.loc}</p><div class="f"><label>Cover note<textarea id="cn" rows="5" placeholder="Why are you a great fit?"></textarea></label></div>`,
        () => {
          const cn = $('#cn');
          if (!cn || cn.value.trim().length < 10) {
            toast('Add a short cover note (at least 10 characters)');
            return false;
          }
          S.apps.unshift({ job: id, status: 'Applied', date: 'Today' });
          notify('Application submitted', 'You applied for ' + j.t + ' at ' + j.co + '.', 'applications');
          side();
          go();
          toast('Application submitted');
        },
        'Submit application'
      );
    };

    const withdrawApp = i => {
      S.apps.splice(i, 1);
      side();
      go();
      toast('Application withdrawn');
    };

    V.applications = () => {
      const st = ['Applied', 'Review', 'Interview', 'Offer'],
        c = s => S.apps.filter(a => a.status == s).length;
      return (
        head('Applications', 'Follow every application from submission to offer.', `<a class="btn" href="#jobs" onclick="customRoute('jobs');return false">Browse jobs</a>`) +
        `<div class="grid stats">${st.map(s => stat(s == 'Review' ? 'Under review' : s, c(s), 'applications')).join('')}</div><div class="card">${S.apps.map((a, i) => { const j = J(a.job), p = (Math.max(1, st.indexOf(a.status) + 1) / 4) * 100; return `<div class="row"><div style="flex:1;min-width:0"><b>${j.t}</b><small>${j.co} · Applied ${a.date}</small><div class="bar"><i style="width:${p}%"></i></div></div><div class="acts" style="margin:0;align-items:center">${tag(a.status == 'Review' ? 'Review' : a.status)}<button class="btn g s" onclick="withdrawApp(${i})">Withdraw</button></div></div>`; }).join('') || '<div class="empty">No applications yet.</div>'}</div>`
      );
    };

    const chat = a => {
      if (!S.conv.find(c => c.a == a)) S.conv.unshift({ a, unread: 0, m: [] });
      S.cur = a;
      customRoute('messages');
    };

    V.messages = () => {
      const cur = S.cur ? S.conv.find(c => c.a == S.cur) : null;
      return (
        head('Messages', 'Chat with alumni and mentors.') +
        `<div class="card chat ${cur ? 'open' : ''}"><div class="cl">${S.conv.map(c => { const a = A(c.a), l = c.m[c.m.length - 1]; return `<div class="ci ${c.a == S.cur ? 'on' : ''}" onclick="S.cur=${c.a};S.conv.find(x=>x.a==${c.a}).unread=0;side();go()"><span class="av">${ini(a.name)}</span><div style="flex:1;min-width:0"><b>${a.name}</b><small>${l ? l.t : 'Say hello'}</small></div>${c.unread ? `<span class="n" style="background:var(--wine-hi);border-radius:99px;padding:1px 8px;font-size:11px">${c.unread}</span>` : ''}</div>`; }).join('')}</div>
<div class="ct">${cur ? `<div class="hd"><button class="btn g s back" onclick="S.cur=null;go()">Back</button> <b>${A(cur.a).name}</b><div class="mu">${A(cur.a).role}, ${A(cur.a).co}</div></div><div class="msgs" id="ms2">${cur.m.map(x => `<div class="m ${x.me ? 'me' : ''}">${x.t}<small>${x.time}</small></div>`).join('') || '<div class="empty">Start the conversation.</div>'}</div><div class="send"><input id="mi" placeholder="Write a message" onkeydown="if(event.key=='Enter')sendM()" aria-label="Message"><button class="btn" onclick="sendM()">Send</button></div>` : '<div class="empty" style="margin:auto">Select a conversation</div>'}</div></div>`
      );
    };

    const sendM = () => {
      const input = $('#mi');
      const v = input ? input.value.trim() : '';
      if (!v) return;
      const c = S.conv.find(x => x.a == S.cur);
      if (!c) return;
      c.m.push({ me: 1, t: v, time: 'Now' });
      go();
      const id = S.cur;
      setTimeout(() => {
        c.m.push({
          me: 0,
          t: ['Thanks for reaching out. Happy to help!', 'Great question. Let’s set up a quick call this week.', 'Send me your CV and I’ll take a look.'][c.m.length % 3],
          time: 'Now',
        });
        if (S.cur == id && (window.location.hash == '#messages' || window.location.pathname.includes('/messages'))) {
          go();
        } else {
          c.unread++;
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

    V.events = () =>
      head('Events', 'Discover what’s happening and reserve your seat.') +
      `<div class="grid eq">${S.events.map(e => `<div class="card hov"><div style="display:flex;gap:14px">${fdate(e.d)}<div style="flex:1"><b>${e.t}</b><div class="sub" style="margin:0">${e.v}</div><div class="bar"><i style="width:${Math.min(100, ((e.reg + (e.mine ? 1 : 0)) / e.cap) * 100)}%"></i></div><small class="mu">${e.reg + (e.mine ? 1 : 0)} of ${e.cap} registered</small></div></div><div class="acts">${e.mine ? `${tag('Registered')}<button class="btn g s" onclick="regE(${e.id})">Cancel</button>` : `<button class="btn s" onclick="regE(${e.id})">Register</button>`}</div></div>`).join('')}</div>`;

    const regE = id => {
      const e = S.events.find(x => x.id == id);
      if (!e) return;
      e.mine = !e.mine;
      if (e.mine) notify('Registered', 'You’re registered for ' + e.t + '.', 'events');
      toast(e.mine ? 'You’re registered' : 'Registration cancelled');
      go();
    };

    V.notifications = () => {
      const t = S.tab.n || 'All',
        l = S.notes.filter(n => t == 'All' || !n.read);
      return (
        head('Notifications', 'Updates and reminders from across Alumnex.', `<button class="btn g" onclick="S.notes.forEach(n=>n.read=true);side();go();toast('All caught up')">Mark all as read</button>`) +
        `<div class="tools"><div class="seg">${['All', 'Unread'].map(x => `<button class="${x == t ? 'on' : ''}" onclick="S.tab.n='${x}';go()">${x}</button>`).join('')}</div></div><div class="card">${l.map(n => `<div class="nt ${n.read ? '' : 'un'}" onclick="S.notes[${S.notes.indexOf(n)}].read=true;side();customRoute('${n.to}')"><span class="pt"></span><div><b>${n.t}</b><div>${n.m}</div><small class="mu">${n.time}</small></div></div>`).join('') || '<div class="empty">You’re all caught up.</div>'}</div>`
      );
    };

    function side() {
      const bd = { messages: munr(), notifications: unr() };
      root.querySelectorAll('#nav [data-r]').forEach(a => {
        const n = bd[a.dataset.r];
        const b = a.querySelector('.n');
        if (b) {
          b.textContent = n || '';
          b.style.display = n ? '' : 'none';
        }
      });
      const bdTop = $('#bd');
      if (bdTop) bdTop.style.display = unr() ? 'block' : 'none';
      const mnm = $('#mnm');
      if (mnm) mnm.textContent = S.me.name;
      const hav = $('#hav');
      if (hav) hav.textContent = ini(S.me.name);
    }

    function anim() {
      root.querySelectorAll('.page .card,.page .hero').forEach((c, i) => c.style.setProperty('--d', i));
      root.querySelectorAll('.stat .v').forEach(v => {
        const t = v.textContent.trim();
        if (!/^\d+%?$/.test(t)) return;
        const pc = t.endsWith('%'),
          n = parseInt(t),
          t0 = performance.now();
        (function f(now) {
          const k = Math.min(1, (now - t0) / 1200);
          v.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))) + (pc ? '%' : '');
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

      const targetPath = pathForTab[r] || '/student/' + r;
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
      } else if (href.startsWith('/student/')) {
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
          ...S.alumni.filter(a => (a.name + a.co).toLowerCase().includes(q)).map(a => [a.name + ' · Alumni', 'alumni']),
          ...S.jobs.filter(j => (j.t + j.co).toLowerCase().includes(q)).map(j => [j.t + ' · Job', 'jobs']),
          ...S.events.filter(x => x.t.toLowerCase().includes(q)).map(x => [x.t + ' · Event', 'events']),
        ].slice(0, 6);
        b.innerHTML = r.length
          ? r.map(x => `<a href="#${x[1]}" onclick="closeSearch();customRoute('${x[1]}');return false">${x[0]}</a>`).join('')
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

    // Expose methods onto window for inline handlers
    window.S = S;
    window.V = V;
    window.toast = toast;
    window.modal = modal;
    window.closeM = closeM;
    window.go = go;
    window.side = side;
    window.addS = addS;
    window.rmS = rmS;
    window.saveP = saveP;
    window.reqM = reqM;
    window.cancelReq = cancelReq;
    window.applyM = applyM;
    window.withdrawApp = withdrawApp;
    window.regE = regE;
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
    };
  }, [initialTab, pathname, router]);

  return (
    <div className="student-portal" ref={containerRef}>
      <div className="shell">
        <header id="top" className="intro">
          <div className="r1">
            <a className="logo" href="/student/dashboard" aria-label="Alumnex">
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
              <input id="gs" placeholder="Search alumni, jobs and events" autoComplete="off" />
              <div className="sres" id="sres" />
            </div>
            <div className="hr">
              <a className="ib" href="#notifications" aria-label="Notifications" onClick={e => { e.preventDefault(); if (window.customRoute) window.customRoute('notifications'); }}>
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10 20h4"/></svg>
                <span className="dot" id="bd" />
              </a>
              <a className="chip2" href="#profile" aria-label="Profile" onClick={e => { e.preventDefault(); if (window.customRoute) window.customRoute('profile'); }}>
                <span className="av" id="hav">RA</span>
                <span><b id="mnm">Rafi Ahmed</b><small>Student</small></span>
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
