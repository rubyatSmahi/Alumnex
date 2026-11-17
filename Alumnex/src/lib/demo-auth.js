const USERS_KEY = 'alumnex-demo-users-v1';
const SESSION_KEY = 'alumnex-demo-session-v1';

const demoUsers = [
  { id: 'admin-sara', name: 'Sara Ahmed', email: 'sara.ahmed@alumnex.edu', password: 'AlumnexDemo2026!', role: 'admin', status: 'approved', description: 'Platform administrator' },
  { id: 'admin-marcus', name: 'Marcus Lee', email: 'marcus.lee@alumnex.edu', password: 'AlumnexDemo2026!', role: 'admin', status: 'approved', description: 'University administrator' },
  { id: 'alumni-nadia', name: 'Nadia Khan', email: 'nadia.khan@alumnex.edu', password: 'AlumnexDemo2026!', role: 'alumni', status: 'approved', department: 'Computer Science', batch: '2022', description: 'Product designer and mentor' },
  { id: 'alumni-daniel', name: 'Daniel Brooks', email: 'daniel.brooks@alumnex.edu', password: 'AlumnexDemo2026!', role: 'alumni', status: 'approved', department: 'Business', batch: '2019', description: 'Startup founder' },
  { id: 'alumni-aisha', name: 'Aisha Rahman', email: 'aisha.rahman@alumnex.edu', password: 'AlumnexDemo2026!', role: 'alumni', status: 'approved', department: 'Electrical Engineering', batch: '2021', description: 'Electrical engineer and mentor' },
  { id: 'alumni-oliver', name: 'Oliver Chen', email: 'oliver.chen@alumnex.edu', password: 'AlumnexDemo2026!', role: 'alumni', status: 'approved', department: 'Data Science', batch: '2020', description: 'Data scientist' },
  { id: 'alumni-fatima', name: 'Fatima Yusuf', email: 'fatima.yusuf@alumnex.edu', password: 'AlumnexDemo2026!', role: 'alumni', status: 'approved', department: 'Public Health', batch: '2018', description: 'Public health researcher' },
  { id: 'student-maya', name: 'Maya Patel', email: 'maya.patel@alumnex.edu', password: 'AlumnexDemo2026!', role: 'student', status: 'approved', department: 'Computer Science', batch: '2027', description: 'Computer science student' },
  { id: 'student-jordan', name: 'Jordan Rivera', email: 'jordan.rivera@alumnex.edu', password: 'AlumnexDemo2026!', role: 'student', status: 'approved', department: 'Business', batch: '2027', description: 'Business student' },
  { id: 'student-sana', name: 'Sana Tariq', email: 'sana.tariq@alumnex.edu', password: 'AlumnexDemo2026!', role: 'student', status: 'approved', department: 'Electrical Engineering', batch: '2028', description: 'Electrical engineering student' },
  { id: 'student-ethan', name: 'Ethan Williams', email: 'ethan.williams@alumnex.edu', password: 'AlumnexDemo2026!', role: 'student', status: 'approved', department: 'Data Science', batch: '2026', description: 'Data science student' },
  { id: 'student-leila', name: 'Leila Hassan', email: 'leila.hassan@alumnex.edu', password: 'AlumnexDemo2026!', role: 'student', status: 'approved', department: 'Public Health', batch: '2028', description: 'Public health student' },
];

export function getDemoUsers() {
  const savedUsers = window.localStorage.getItem(USERS_KEY);
  if (!savedUsers) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
    return demoUsers;
  }

  let users;
  try {
    users = JSON.parse(savedUsers);
  } catch {
    throw new Error('Demo account data is unreadable. Reset demo data and try again.');
  }
  if (!Array.isArray(users)) {
    throw new Error('Demo account data is invalid. Reset demo data and try again.');
  }
  return users;
}

export function loginDemoUser(email, password, remember = false) {
  const user = getDemoUsers().find((account) => account.email.toLowerCase() === email.trim().toLowerCase());
  if (!user || user.password !== password) {
    return { error: 'Email or password is incorrect.' };
  }
  if (user.status === 'pending') {
    return { error: 'Your alumni registration is awaiting administrator approval.' };
  }
  if (user.status !== 'approved') {
    return { error: 'This account is not currently active. Contact your administrator.' };
  }

  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
  const storage = remember ? window.localStorage : window.sessionStorage;
  storage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, role: user.role, name: user.name }));
  return { user };
}

export function registerDemoUser({ name, email, password, role, department, batch }) {
  if (!['alumni', 'student'].includes(role)) {
    return { error: 'Choose a student or alumni account. Administrator accounts are invite-only.' };
  }
  const users = getDemoUsers();
  if (users.some((user) => user.email.toLowerCase() === email.trim().toLowerCase())) {
    return { error: 'An account with this email already exists.' };
  }

  const user = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    role,
    status: role === 'alumni' ? 'pending' : 'approved',
    department: department.trim(),
    batch: batch.trim(),
    description: role === 'alumni' ? 'Pending alumni registration' : 'New student account',
  };
  users.push(user);
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  if (user.role === 'student') {
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, role: user.role, name: user.name }));
  }
  return { user };
}

export function getRoleHome(role) {
  return `/${role}/dashboard`;
}

export function getDemoSession() {
  const savedSession = window.localStorage.getItem(SESSION_KEY) || window.sessionStorage.getItem(SESSION_KEY);
  if (!savedSession) return null;
  try {
    return JSON.parse(savedSession);
  } catch {
    throw new Error('Your demo session is unreadable. Sign in again.');
  }
}

export function logoutDemoUser() {
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
}

export function resetDemoData() {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
  logoutDemoUser();
}
