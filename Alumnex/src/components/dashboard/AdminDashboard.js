'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getDemoSession, logoutDemoUser } from '@/lib/demo-auth';
import './admin-dashboard.css';

export default function AdminDashboard({ initialTab = 'overview' }) {
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
      if (session.role !== 'admin') {
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
    const ini = n => n.split(' ').map(x => x[0]).join('').slice(0, 2);

    

const D={depts:['Computer Science','Business','Electrical Engineering','Law','Architecture','Medicine'],
people:[['Nadia Khan','Alumni','Computer Science',2022,'Pending'],['Jason Rivera','Student','Business',2027,'Active'],['Sana Tariq','Alumni','Electrical Engineering',2021,'Pending'],['Marcus Bell','Alumni','Law',2018,'Verified'],['Amelia Hart','Alumni','Medicine',2016,'Verified'],['Rafi Ahmed','Student','Computer Science',2026,'Active'],['Lena Fischer','Alumni','Architecture',2019,'Verified'],['Omar Siddiqui','Student','Electrical Engineering',2027,'Active'],['Priya Nair','Alumni','Business',2020,'Pending'],['Daniel Okafor','Alumni','Computer Science',2015,'Verified'],['Chloe Martin','Student','Law',2028,'Suspended'],['Tahmid Rahman','Alumni','Business',2017,'Rejected'],['Isabel Cruz','Student','Medicine',2026,'Active'],['Henry Wallace','Alumni','Architecture',2014,'Verified']].map((p,i)=>({id:i,name:p[0],type:p[1],dept:p[2],batch:p[3],status:p[4],email:p[0].toLowerCase().replace(' ','.')+'@mail.com'})),
events:[{t:'Alumni Meet-up',d:'2026-11-22',v:'Main Hall',cap:200,reg:164,type:'Alumni'},{t:'Career Mentorship Fair',d:'2026-12-03',v:'Innovation Centre',cap:300,reg:212,type:'University'},{t:'Annual Homecoming Gala',d:'2026-12-15',v:'Grand Ballroom',cap:400,reg:388,type:'Alumni'},{t:'Research Showcase',d:'2027-01-12',v:'Library Atrium',cap:150,reg:61,type:'University'}],
posts:[{t:'Winter convocation details',k:'Announcement',s:'Published',a:'Registrar',d:'Nov 17'},{t:'Meet this year’s mentors',k:'Post',s:'Published',a:'Alumni Office',d:'Nov 14'},{t:'Scholarship fund update',k:'Announcement',s:'Draft',a:'Admin',d:'Nov 12'},{t:'Class of 2016 reunion recap',k:'Post',s:'Draft',a:'Events Team',d:'Nov 9'}],
note:[['New registration','Nadia Khan requested verification','12 min ago'],['Event full','Homecoming Gala is at 97%','1 hr ago'],['Report ready','October engagement report','Yesterday']]};
const ic={overview:'M3 12 12 3l9 9M5 10v10h14V10',users:'M16 11a4 4 0 1 0-8 0M4 20c0-4 4-6 8-6s8 2 8 6',alumni:'M12 3 2 8l10 5 10-5-10-5zM6 11v5c3 3 9 3 12 0v-5',students:'M4 5h16v12H4zM8 21h8M12 17v4',verify:'M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6zM9 12l2 2 4-4',events:'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',content:'M5 3h14v18H5zM9 8h6M9 12h6M9 16h4',analytics:'M4 20V10M10 20V4M16 20v-8M22 20H2',settings:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12l2-1-2-4-2 1-2-1V5h-4v2l-2 1-2-1-2 4 2 1v2l-2 1 2 4 2-1 2 1v2h4v-2l2-1 2 1 2-4-2-1z'};
const R=[['overview','Overview'],['users','User management'],['alumni','Alumni'],['students','Students'],['verification','Verification'],['events','Events'],['content','Content'],['analytics','Analytics & reports'],['settings','Settings']];
const pend=()=>D.people.filter(p=>p.type=='Alumni'&&p.status=='Pending').length;
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._);t._=setTimeout(()=>t.classList.remove('show'),2200)}
function modal(title,body,save,label='Save changes'){$('#box').innerHTML=`<h3>${title}</h3>${body}<div class="ft"><button class="btn g" onclick="closeM()">Cancel</button><button class="btn" id="ms">${label}</button></div>`;$('#mod').classList.add('show');$('#ms').onclick=()=>{if(save()!==false)closeM()}}
const closeM=()=>$('#mod').classList.remove('show');$('#mod').onclick=e=>{if(e.target.id=='mod')closeM()};
document.addEventListener('keydown',e=>{if(e.key=='Escape'){closeM();$('#pop').classList.remove('show')}});
const tag=s=>`<span class="tag t-${s}">${s}</span>`;
function line(a,b,w=560,h=220){const m=Math.max(...a,...b)*1.1;return `<div class="cw" data-a="${a}" data-b="${b}" data-m="${m}" data-w="${w}" data-h="${h}">${lineS(a,b,w,h)}<div class="xh"></div><i class="pd" style="--c:#c9a45c"></i><i class="pd" style="--c:#6f8fd8"></i><div class="tp"></div></div>`}
function lineS(a,b,w=560,h=220){const m=Math.max(...a,...b)*1.1,x=i=>30+i*(w-50)/(a.length-1),y=v=>h-26-v/m*(h-46),P=s=>s.map((v,i)=>(i?'L':'M')+x(i)+' '+y(v)).join('');
return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Growth chart"><defs><linearGradient id="gg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#c9a45c" stop-opacity=".35"/><stop offset="1" stop-color="#c9a45c" stop-opacity="0"/></linearGradient></defs>${[0,1,2,3].map(i=>`<line x1="30" x2="${w-20}" y1="${20+i*(h-46)/3}" y2="${20+i*(h-46)/3}" stroke="#fff" stroke-opacity=".07"/>`).join('')}
<path d="${P(a)}L${x(a.length-1)} ${h-26}L30 ${h-26}Z" fill="url(#gg)"/><path d="${P(a)}" fill="none" stroke="#c9a45c" stroke-width="2.5" pathLength="1" class="dr"/><path d="${P(b)}" fill="none" stroke="#6f8fd8" stroke-width="2.5" pathLength="1" class="dr" style="animation-delay:.6s"/>
${['Jun','Jul','Aug','Sep','Oct','Nov'].map((l,i)=>`<text x="${x(i)}" y="${h-6}" text-anchor="middle">${l}</text>`).join('')}</svg>`}
function bars(v,l,w=560,h=200){const m=Math.max(...v),bw=(w-40)/v.length;return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Bar chart">${v.map((n,i)=>{const bh=n/m*(h-50);return `<rect x="${30+i*bw+8}" y="${h-26-bh}" width="${bw-16}" height="${bh}" rx="6" class="gr" style="animation-delay:${i*90}ms" fill="${i==v.length-1?'#6f8fd8':'#1d3066'}" stroke="#c9a45c" stroke-opacity="${i==v.length-1?.8:.25}"/><text x="${30+i*bw+bw/2}" y="${h-8}" text-anchor="middle">${l[i]}</text>`}).join('')}</svg>`}
function donut(v,l){const t=v.reduce((a,b)=>a+b),c=['#c9a45c','#6f8fd8','#1d3066','#7a5c25','#ecd7a0','#2a3f7a'];let o=0;return `<div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap"><svg class="dn-svg" viewBox="0 0 42 42" width="150" role="img" aria-label="By department">${v.map((n,i)=>{const s=`<circle cx="21" cy="21" r="15.9" fill="none" stroke="${c[i]}" stroke-width="6" stroke-dasharray="${n/t*100} ${100-n/t*100}" stroke-dashoffset="${25-o}"/>`;o+=n/t*100;return s}).join('')}</svg><div>${l.map((x,i)=>`<div style="margin:3px 0"><span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${c[i]};margin-right:8px"></span>${x} <small style="color:var(--muted)">${Math.round(v[i]/t*100)}%</small></div>`).join('')}</div></div>`}
const head=(h,p,a='')=>`<div class="ph"><div><h1>${h}</h1><p>${p}</p></div>${a}</div>`;
const stat=(l,v,d,hl)=>`<div class="card stat ${hl?'hl':''}"><div class="l">${l}</div><div class="v">${v}</div><span class="${d[0]=='-'?'dn':'up'}">${d}</span></div>`;
const V={};
V.overview=()=>{const al=D.people.filter(p=>p.type=='Alumni').length;
return `<div class="hero">${[8,22,38,55,70,86].map((l,i)=>`<i style="left:${l}%;animation-delay:${i*1.4}s"></i>`).join('')}<h1>Your journey doesn’t end at graduation.</h1><p>The people, progress and opportunities shaping your alumni network, at a glance.</p><div><a class="btn sh" href="#verification" style="text-decoration:none;display:inline-block">Review verifications</a></div></div>`+
`<div class="grid stats">${stat('Total alumni','50,214','+8.2% vs last year',1)+stat('Current students','8,940','+3.4% vs last year')+stat('Registered users','59,154','+6.1% vs last year')+stat('Pending verifications',pend()+18,'Needs attention')}</div>
<div class="grid two" style="margin-bottom:16px"><div class="card"><h3>Platform activity</h3><div class="sub">Active members and new sign-ups in thousands. Hover over the chart for exact numbers.</div>${line([32,38,35,46,52,61],[12,18,15,22,27,31])}</div>
<div class="card"><h3>Recent activity</h3><div class="sub">Live from across the platform</div><div class="feed">${[['Nadia Khan','requested alumni verification','12 min ago'],['Marcus Bell','registered for Homecoming Gala','1 hr ago'],['Admin','published “Winter convocation details”','3 hrs ago'],['Lena Fischer','updated her profile','5 hrs ago'],['Jason Rivera','joined as a student','Yesterday']].map(a=>`<div><span class="av">${ini(a[0])}</span><span><b>${a[0]}</b> ${a[1]}<br><small>${a[2]}</small></span></div>`).join('')}</div></div></div>
<div class="card"><h3>Upcoming events</h3><div class="sub">Registrations so far</div><div class="grid eq">${D.events.slice(0,3).map(e=>`<div><b>${e.t}</b><br><small style="color:var(--muted)">${e.d} · ${e.v}</small><div class="bar"><i style="width:${e.reg/e.cap*100}%"></i></div><small style="color:var(--muted)">${e.reg} of ${e.cap}</small></div>`).join('')}</div></div>`};
function people(type){const st={q:'',s:'',d:'',b:''};const el={};
const rows=()=>D.people.filter(p=>(!type||p.type==type)&&(!st.s||p.status==st.s)&&(!st.d||p.dept==st.d)&&(!st.b||p.batch==st.b)&&(p.name+p.email).toLowerCase().includes(st.q.toLowerCase()));
const draw=()=>{const r=rows();$('#tb').innerHTML=r.length?r.map(p=>`<tr><td><div class="who"><span class="av">${ini(p.name)}</span><div>${p.name}<small>${p.email}</small></div></div></td>${type?'':`<td>${p.type}</td>`}<td>${p.dept}</td><td>${p.batch}</td><td>${tag(p.status)}</td><td><button class="btn g s" onclick="editP(${p.id})">Edit</button> <button class="btn g s" onclick="susp(${p.id})">${p.status=='Suspended'?'Restore':'Suspend'}</button></td></tr>`).join(''):`<tr><td colspan="6" class="empty">No matches. Try clearing a filter.</td></tr>`;$('#cnt').textContent=r.length+' shown'};
V._f=(k,v)=>{st[k]=v;draw()};V._d=draw;
const sts=type=='Student'?['Active','Suspended']:type=='Alumni'?['Verified','Pending','Rejected','Suspended']:['Verified','Active','Pending','Rejected','Suspended'];
const bs=[...new Set(D.people.filter(p=>!type||p.type==type).map(p=>p.batch))].sort();
const T={'':['User management','Search, filter and manage every student and alumni account.'],Alumni:['Alumni','Profiles, graduation batches, departments and verification status.'],Student:['Students','Student accounts and profile information.']}[type||''];
setTimeout(draw);return head(T[0],T[1],`<button class="btn" onclick="addP('${type||'Alumni'}')">Add ${type?type.toLowerCase():'user'}</button>`)+`<div class="card"><div class="tools"><input placeholder="Search by name or email" oninput="V._f('q',this.value)" aria-label="Search">
<select onchange="V._f('s',this.value)" aria-label="Status"><option value="">All statuses</option>${sts.map(s=>`<option>${s}</option>`).join('')}</select><select onchange="V._f('d',this.value)" aria-label="Department"><option value="">All departments</option>${D.depts.map(s=>`<option>${s}</option>`).join('')}</select><select onchange="V._f('b',this.value==''?'':+this.value)" aria-label="Batch"><option value="">All batches</option>${bs.map(s=>`<option>${s}</option>`).join('')}</select><span id="cnt" style="align-self:center;color:var(--muted)"></span></div>
<div class="tw"><table><thead><tr><th>Name</th>${type?'':'<th>Role</th>'}<th>Department</th><th>${type=='Student'?'Expected grad.':'Batch'}</th><th>Status</th><th>Actions</th></tr></thead><tbody id="tb"></tbody></table></div></div>`}
V.users=()=>people();V.alumni=()=>people('Alumni');V.students=()=>people('Student');
const pform=p=>`<div class="f"><label>Full name<input id="fn" value="${p.name||''}"></label><div class="c2"><label>Department<select id="fd">${D.depts.map(d=>`<option ${d==p.dept?'selected':''}>${d}</option>`).join('')}</select></label><label>Batch year<input id="fb" type="number" value="${p.batch||2024}"></label></div><label>Status<select id="fs">${['Verified','Active','Pending','Rejected','Suspended'].map(d=>`<option ${d==p.status?'selected':''}>${d}</option>`).join('')}</select></label></div>`;
const rd=()=>{const f=location.hash.slice(1)||'overview';route(f,1)};
window.editP=id=>{const p=D.people[id];modal('Edit '+p.name,pform(p),()=>{if(!$('#fn').value.trim()){toast('Enter a name');return false}Object.assign(p,{name:$('#fn').value,dept:$('#fd').value,batch:+$('#fb').value,status:$('#fs').value});toast('Changes saved');V._d()})};
window.susp=id=>{const p=D.people[id];p.status=p.status=='Suspended'?(p.type=='Student'?'Active':'Verified'):'Suspended';toast(p.name+(p.status=='Suspended'?' suspended':' restored'));V._d();badges()};
window.addP=t=>modal('Add '+t.toLowerCase(),pform({status:t=='Student'?'Active':'Pending'}),()=>{const n=$('#fn').value.trim();if(!n){toast('Enter a name');return false}D.people.unshift({id:D.people.length,name:n,type:t,dept:$('#fd').value,batch:+$('#fb').value,status:$('#fs').value,email:n.toLowerCase().replace(/\s+/g,'.')+'@mail.com'});D.people.forEach((p,i)=>p.id=i);toast(n+' added');V._d();badges()});
V.verification=()=>{const q=D.people.filter(p=>p.type=='Alumni'&&p.status=='Pending');return head('Verification requests','Confirm that each alumnus graduated before granting full access.')+`<div class="card">${q.length?q.map(p=>`<div class="vr"><span class="av">${ini(p.name)}</span><div><b>${p.name}</b><br><small style="color:var(--muted)">${p.dept} · Class of ${p.batch} · Submitted degree certificate</small></div><div class="acts"><button class="btn ok s" onclick="vr(${p.id},'Verified')">Approve</button><button class="btn no s" onclick="vr(${p.id},'Rejected')">Reject</button></div></div>`).join(''):'<div class="empty">All caught up. No requests are waiting.</div>'}</div>`};
window.vr=(id,s)=>{const p=D.people[id];p.status=s;toast(p.name+(s=='Verified'?' approved':' rejected'));badges();route('verification',1)};
V.events=()=>head('Events','Create and manage university and alumni events.',`<button class="btn" onclick="evForm()">Create event</button>`)+`<div class="grid eq">${D.events.map((e,i)=>{const d=new Date(e.d+'T00:00');return `<div class="card ev"><div class="date"><b>${d.getDate()}</b><span>${d.toLocaleString('en',{month:'short'})}</span></div><div style="flex:1"><h3>${e.t}</h3><div class="sub" style="margin:0">${e.v} · ${e.type}</div><div class="bar"><i style="width:${Math.min(100,e.reg/e.cap*100)}%"></i></div><small style="color:var(--muted)">${e.reg} of ${e.cap} registered</small><div class="acts" style="margin-top:12px"><button class="btn g s" onclick="evForm(${i})">Edit</button><button class="btn no s" onclick="D.events.splice(${i},1);toast('Event deleted');route('events',1)">Delete</button></div></div></div>`}).join('')}</div>`;
window.evForm=i=>{const e=D.events[i]||{t:'',d:'2026-12-20',v:'',cap:100,reg:0,type:'Alumni'};modal(i==null?'Create event':'Edit event',`<div class="f"><label>Title<input id="et" value="${e.t}"></label><div class="c2"><label>Date<input id="ed" type="date" value="${e.d}"></label><label>Capacity<input id="ec" type="number" value="${e.cap}"></label></div><div class="c2"><label>Venue<input id="ev" value="${e.v}"></label><label>Audience<select id="ey"><option ${e.type=='Alumni'?'selected':''}>Alumni</option><option ${e.type=='University'?'selected':''}>University</option></select></label></div></div>`,()=>{if(!$('#et').value.trim()){toast('Add an event title');return false}const n={t:$('#et').value,d:$('#ed').value,v:$('#ev').value,cap:+$('#ec').value||1,reg:e.reg,type:$('#ey').value};i==null?D.events.push(n):D.events[i]=n;D.events.sort((a,b)=>a.d<b.d?-1:1);toast(i==null?'Event created':'Event saved');route('events',1)},i==null?'Create event':'Save changes')};
V.content=()=>head('Content','Announcements, posts and platform content.',`<button class="btn" onclick="poForm()">New post</button>`)+`<div class="card"><div class="tw"><table><thead><tr><th>Title</th><th>Type</th><th>Author</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>${D.posts.map((p,i)=>`<tr><td><b>${p.t}</b></td><td>${p.k}</td><td>${p.a}</td><td>${p.d}</td><td>${tag(p.s)}</td><td><button class="btn g s" onclick="D.posts[${i}].s=D.posts[${i}].s=='Draft'?'Published':'Draft';toast(D.posts[${i}].s=='Published'?'Published':'Moved to drafts');route('content',1)">${p.s=='Draft'?'Publish':'Unpublish'}</button> <button class="btn no s" onclick="D.posts.splice(${i},1);toast('Deleted');route('content',1)">Delete</button></td></tr>`).join('')}</tbody></table></div></div>`;
window.poForm=()=>modal('New post',`<div class="f"><label>Title<input id="pt"></label><label>Type<select id="pk"><option>Announcement</option><option>Post</option></select></label><label>Body<textarea id="pb" rows="4"></textarea></label></div>`,()=>{if(!$('#pt').value.trim()){toast('Add a title');return false}D.posts.unshift({t:$('#pt').value,k:$('#pk').value,s:'Draft',a:'Admin',d:'Today'});toast('Saved as draft');route('content',1)},'Save draft');
V.analytics=()=>{const g=(a)=>a;return head('Analytics & reports','Growth, engagement and activity across the platform.',`<div style="display:flex;gap:10px;flex-wrap:wrap"><div class="seg" id="seg">${['6M','3M','30D'].map((x,i)=>`<button class="${i?'':'on'}" onclick="seg(this)">${x}</button>`).join('')}</div><button class="btn g" onclick="exp()">Export CSV</button></div>`)+
`<div class="grid stats">${stat('Weekly active','21,480','+9.4%',1)+stat('Avg. session','6m 42s','+0.8%')+stat('Mentorship matches','74%','+6% this semester')+stat('Event attendance','81%','-2.1%')}</div>
<div class="grid two" style="margin-bottom:16px"><div class="card"><h3>User growth</h3><div class="sub"><span style="color:var(--gold)">●</span> Alumni <span style="color:var(--crimson);margin-left:10px">●</span> Students</div><div id="gc">${line([32,38,35,46,52,61],[12,18,15,22,27,31])}</div></div><div class="card"><h3>Alumni by department</h3><div class="sub">Share of verified profiles</div>${donut([28,22,17,13,11,9],D.depts)}</div></div>
<div class="card"><h3>Engagement by month</h3><div class="sub">Posts, messages and event interactions (thousands)</div>${bars([42,51,47,63,58,74],['Jun','Jul','Aug','Sep','Oct','Nov'])}</div>`};
window.seg=b=>{b.parentNode.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');const m={'6M':[[32,38,35,46,52,61],[12,18,15,22,27,31]],'3M':[[46,52,61,66,70,74],[22,27,31,34,36,40]],'30D':[[52,54,57,58,60,61],[27,28,29,30,30,31]]}[b.textContent];$('#gc').innerHTML=line(...m)};
window.exp=()=>{const c='Name,Role,Department,Batch,Status\n'+D.people.map(p=>[p.name,p.type,p.dept,p.batch,p.status].join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([c],{type:'text/csv'}));a.download='alumnex-report.csv';a.click();toast('Report exported')};
V.settings=()=>head('Settings','Your admin profile and dashboard preferences.')+`<div class="grid eq"><div class="card"><h3>Admin profile</h3><div class="sub">Shown across the dashboard</div><div class="f"><label>Name<input id="sn" value="${D.me?.n||'Administrator'}"></label><label>Email<input value="admin@alumnex.edu"></label><label>Role<select><option>Super admin</option><option>Moderator</option></select></label><div><button class="btn" onclick="toast('Profile saved')">Save changes</button></div></div></div>
<div class="card"><h3>Preferences</h3><div class="sub">Notifications and display</div>${[['Email alerts','New verification requests'],['Weekly digest','Summary every Monday'],['Event reminders','One day before each event'],['Compact tables','Tighter row spacing']].map((r,i)=>`<div class="row"><div>${r[0]}<small>${r[1]}</small></div><label class="sw"><input type="checkbox" ${i<3?'checked':''} onchange="toast('${r[0]} '+(this.checked?'on':'off'))" aria-label="${r[0]}"><i></i></label></div>`).join('')}</div></div>`;
function badges(){const n=pend();$('#nav').querySelector('[data-r=verification] .n')&&($('#nav').querySelector('[data-r=verification] .n').textContent=n);$('#bd').style.display=n?'block':'none'}
function anim(){document.querySelectorAll('.page .card,.page .hero').forEach((c,i)=>c.style.setProperty('--d',i));
document.querySelectorAll('.stat .v').forEach(v=>{const t=v.textContent.trim();if(!/^[\d,]+%?$/.test(t))return;const pc=t.endsWith('%'),n=parseInt(t.replace(/\D/g,'')),T=1300,t0=performance.now();
(function f(now){const k=Math.min(1,(now-t0)/T),e=1-Math.pow(1-k,3);v.textContent=Math.round(n*e).toLocaleString('en')+(pc?'%':'');if(k<1)requestAnimationFrame(f)})(t0)});
document.querySelectorAll('tbody tr').forEach((r,i)=>r.style.animationDelay=Math.min(i,12)*35+'ms')}
const MO=['Jun','Jul','Aug','Sep','Oct','Nov'];
function hov(e){const c=e.target.closest&&e.target.closest('.cw');document.querySelectorAll('.cw.on').forEach(x=>{if(x!==c)x.classList.remove('on')});if(!c)return;
const a=c.dataset.a.split(',').map(Number),b=c.dataset.b.split(',').map(Number),m=+c.dataset.m,w=+c.dataset.w,h=+c.dataset.h,r=c.getBoundingClientRect(),cx=e.touches?e.touches[0].clientX:e.clientX,
i=Math.max(0,Math.min(a.length-1,Math.round(((cx-r.left)/r.width*w-30)/((w-50)/(a.length-1))))),px=(30+i*(w-50)/(a.length-1))/w*100,py=v=>(h-26-v/m*(h-46))/h*100;
c.classList.add('on');c.querySelector('.xh').style.left=px+'%';const d=c.querySelectorAll('.pd');[a,b].forEach((s,k)=>{d[k].style.left=px+'%';d[k].style.top=py(s[i])+'%'});
const t=c.querySelector('.tp');t.style.left=Math.min(Math.max(px,17),83)+'%';t.innerHTML=`<b>${MO[i]} 2026</b><span><i style="background:#c9a45c"></i>Active members: ${a[i]}k</span><span><i style="background:#6f8fd8"></i>New sign-ups: ${b[i]}k</span>`}
document.addEventListener('mousemove',hov);document.addEventListener('touchmove',hov,{passive:true});document.addEventListener('touchstart',hov,{passive:true});
function route(r,keep){if(!V[r])r='overview';$('#nav').innerHTML=R.map(x=>`<a style="--i:${R.indexOf(x)+1}" href="#${x[0]}" data-r="${x[0]}" class="${x[0]==r?'on':''}"><svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="${ic[x[0]=='verification'?'verify':x[0]]}"/></svg>${x[1]}${x[0]=='verification'?`<span class="n">${pend()}</span>`:''}</a>`).join('');
const p=$('#page');p.innerHTML=V[r]();if(!keep){p.classList.remove('fresh');void p.offsetWidth;p.classList.add('fresh');scrollTo(0,0)}document.body.classList.remove('open');badges();if(!keep)anim()}
addEventListener('hashchange',()=>route(location.hash.slice(1)));
$('#bell').onclick=()=>{$('#pop').innerHTML='<h4>Notifications</h4>'+D.note.map(n=>`<div class="i"><b>${n[0]}</b><br>${n[1]}<br><small>${n[2]}</small></div>`).join('');$('#pop').classList.toggle('show')};
$('#pf').onclick=()=>{$('#pop').innerHTML='<h4>Administrator</h4><div class="i"><a href="#settings" style="color:var(--gold-hi);text-decoration:none" onclick="$(\'#pop\').classList.remove(\'show\')">Profile & settings</a></div><div class="i" style="cursor:pointer" onclick="signOut()">Sign out</div>';$('#pop').classList.toggle('show')};
$('#gs').oninput=e=>{const q=e.target.value.toLowerCase(),b=$('#sres');if(!q){b.style.display='none';return}
const r=[...D.people.filter(p=>p.name.toLowerCase().includes(q)).map(p=>[p.name+' · '+p.type,p.type=='Alumni'?'alumni':'students']),...D.events.filter(x=>x.t.toLowerCase().includes(q)).map(x=>[x.t+' · Event','events']),...D.posts.filter(x=>x.t.toLowerCase().includes(q)).map(x=>[x.t+' · Content','content'])].slice(0,6);
b.innerHTML=r.length?r.map(x=>`<a href="#${x[1]}" onclick="$('#sres').style.display='none';$('#gs').value=''">${x[0]}</a>`).join(''):'<a>No results</a>';b.style.display='block'};
document.addEventListener('click',e=>{if(!e.target.closest('.hr'))$('#pop').classList.remove('show');if(!e.target.closest('.search'))$('#sres').style.display='none'});
route(location.hash.slice(1));setTimeout(()=>$('#top').classList.remove('intro'),3000);
window.signOut=()=>modal('Sign out of Alumnex?','<p class="sub" style="margin:0">You’ll need to sign in again to open your dashboard.</p>',()=>{const o=document.createElement('div');o.id='so';o.innerHTML=`<img src="${document.querySelector('.logo img').src}" alt="" style="height:54px"><h2>You’ve been signed out</h2><p>Thanks for visiting Alumnex. See you again soon.</p><button class="btn" id="sib">Sign back in</button>`;document.body.appendChild(o);document.getElementById('sib').onclick=()=>o.remove()},'Sign out');


    const tabFromPath = {
      dashboard: 'overview',
      overview: 'overview',
      users: 'users',
      registrations: 'users',
      batches: 'users',
      departments: 'users',
      alumni: 'alumni',
      students: 'students',
      verification: 'verification',
      events: 'events',
      content: 'content',
      analytics: 'analytics',
      reports: 'analytics',
      settings: 'settings',
    };

    const pathForTab = {
      overview: '/admin/dashboard',
      users: '/admin/registrations',
      alumni: '/admin/alumni',
      students: '/admin/students',
      verification: '/admin/verification',
      events: '/admin/events',
      content: '/admin/content',
      analytics: '/admin/reports',
      settings: '/admin/settings',
    };

    function customRoute(r, keep) {
      if (!V[r]) {
        r = tabFromPath[r] || 'overview';
      }
      $('#nav').innerHTML = R.map(x =>
        `<a style="--i:${R.indexOf(x) + 1}" href="#${x[0]}" data-r="${x[0]}" class="${x[0] == r ? 'on' : ''}"><svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="${ic[x[0] == 'verification' ? 'verify' : x[0]]}"/></svg>${x[1]}${x[0] == 'verification' ? `<span class="n">${pend()}</span>` : ''}</a>`
      ).join('');

      const p = $('#page');
      p.innerHTML = V[r]();
      if (!keep) {
        p.classList.remove('fresh');
        void p.offsetWidth;
        p.classList.add('fresh');
        window.scrollTo(0, 0);
      }
      document.body.classList.remove('open');
      badges();
      if (!keep) anim();

      const targetPath = pathForTab[r] || ('/admin/' + r);
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
      } else if (href.startsWith('/admin/')) {
        const seg = href.split('/')[2];
        const tab = tabFromPath[seg] || seg;
        if (V[tab]) {
          e.preventDefault();
          customRoute(tab);
        }
      }
    }
    root.addEventListener('click', handleLinkClick);

    window.signOut = () => {
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

    try {
      const sess = getDemoSession();
      if (sess && sess.name) {
        const pf = $('#pf');
        if (pf) {
          const av = pf.querySelector('.av');
          if (av) av.textContent = ini(sess.name);
          const b = pf.querySelector('b');
          if (b) b.textContent = sess.name;
        }
      }
    } catch {}

    const hashTab = window.location.hash ? window.location.hash.slice(1) : null;
    const pathSeg = pathname.split('/')[2];
    const resolvedTab = hashTab && V[hashTab] ? hashTab : (tabFromPath[initialTab] || tabFromPath[pathSeg] || 'overview');
    customRoute(resolvedTab);

    const onHashChange = () => {
      const h = window.location.hash.slice(1);
      if (h && V[h]) customRoute(h);
    };
    window.addEventListener('hashchange', onHashChange);

    return () => {
      root.removeEventListener('click', handleLinkClick);
      window.removeEventListener('hashchange', onHashChange);
      document.removeEventListener('mousemove', hov);
      document.removeEventListener('touchmove', hov);
      document.removeEventListener('touchstart', hov);
    };
  }, [initialTab, pathname, router]);

  return (
    <div className="admin-portal" ref={containerRef}>
      <div className="shell">
        <header id="top" className="intro">
          <div className="r1">
            <a className="logo" href="/admin/dashboard" aria-label="Alumnex">
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
              <input id="gs" placeholder="Search people, events, posts" autoComplete="off" />
              <div className="sres" id="sres" />
            </div>
            <div className="hr">
              <button className="ib" id="bell" aria-label="Notifications">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10 20h4"/></svg>
                <span className="dot" id="bd" />
              </button>
              <button className="chip2" id="pf" aria-label="Profile">
                <span className="av">AD</span>
                <span><b>Administrator</b><small>Admin</small></span>
              </button>
              <button className="ib" id="so-btn" aria-label="Sign out" title="Sign out" onClick={() => window.signOut && window.signOut()}>
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/></svg>
              </button>
              <div className="pop" id="pop" />
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
