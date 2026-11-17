'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getDemoUsers, getRoleHome, loginDemoUser, registerDemoUser, resetDemoData } from '@/lib/demo-auth';

function AuthFrame({ eyebrow, title, description, children, footer }) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="auth-brand" href="/" aria-label="Alumnex home">
          <span className="auth-brand-mark">A</span>
          <span>alumnex<span>.</span></span>
        </Link>
        <p className="auth-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="auth-description">{description}</p>
        {children}
        <div className="auth-footer">{footer}</div>
      </section>
    </main>
  );
}

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [busy, setBusy] = useState(false);

  function submit(event) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const result = loginDemoUser(email, password, remember);
      if (result.error) {
        setMessageType('error');
        setMessage(result.error);
        setBusy(false);
        return;
      }
      router.push(getRoleHome(result.user.role));
    } catch (error) {
      setMessageType('error');
      setMessage(error.message || 'Unable to access demo accounts in this browser.');
      setBusy(false);
    }
  }

  function fillDemoAccount(role) {
    try {
      const user = getDemoUsers().find((account) => account.role === role && account.status === 'approved');
      if (!user) throw new Error('No approved demo account was found for this role.');
      setEmail(user.email);
      setPassword(user.password);
      setMessage('');
    } catch (error) {
      setMessageType('error');
      setMessage(error.message);
    }
  }

  function resetData() {
    try {
      resetDemoData();
      setEmail('');
      setPassword('');
      setMessageType('success');
      setMessage('Demo accounts reset. You can sign in with any sample account below.');
    } catch (error) {
      setMessageType('error');
      setMessage(error.message || 'Unable to reset demo data.');
    }
  }

  return (
    <AuthFrame
      eyebrow="Welcome back"
      title="Sign in to Alumnex"
      description="Reconnect with your community and pick up where you left off."
      footer={<>New to Alumnex? <Link href="/register">Create an account</Link></>}
    >
      <form className="auth-form" onSubmit={submit}>
        <label htmlFor="login-email">Email address</label>
        <input id="login-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@university.edu" />
        <div className="auth-label-row">
          <label htmlFor="login-password">Password</label>
          <Link href="/forgot-password">Forgot password?</Link>
        </div>
        <div className="auth-password-field">
          <input id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />
          <button type="button" onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? 'Hide' : 'Show'}</button>
        </div>
        <label className="auth-checkbox">
          <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
          <span>Remember me on this device</span>
        </label>
        {message && <p className={`auth-message is-${messageType}`} role="status">{message}</p>}
        <button className="auth-submit" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}<span aria-hidden="true">→</span></button>
      </form>
      <div className="auth-demo">
        <div className="auth-demo-heading"><strong>Try a demo account</strong><span>Local preview only</span></div>
        <div className="auth-demo-actions">
          <button type="button" onClick={() => fillDemoAccount('admin')}>Admin</button>
          <button type="button" onClick={() => fillDemoAccount('alumni')}>Alumni</button>
          <button type="button" onClick={() => fillDemoAccount('student')}>Student</button>
        </div>
        <button className="auth-reset" type="button" onClick={resetData}>Reset demo accounts</button>
      </div>
    </AuthFrame>
  );
}

export function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'student', department: '', batch: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [busy, setBusy] = useState(false);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    if (form.password.length < 8) {
      setMessageType('error');
      setMessage('Use a password with at least 8 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setMessageType('error');
      setMessage('Passwords do not match.');
      return;
    }

    setBusy(true);
    try {
      const result = registerDemoUser(form);
      if (result.error) {
        setMessageType('error');
        setMessage(result.error);
        setBusy(false);
        return;
      }
      if (result.user.role === 'alumni') {
        setMessageType('success');
        setMessage('Your alumni registration is submitted. You can sign in after an administrator approves it.');
        setBusy(false);
        return;
      }
      router.push('/student/dashboard');
    } catch (error) {
      setMessageType('error');
      setMessage(error.message || 'Unable to save your demo account.');
      setBusy(false);
    }
  }

  return (
    <AuthFrame
      eyebrow="Join the community"
      title="Create your account"
      description="Build meaningful connections across your university community."
      footer={<>Already have an account? <Link href="/login">Sign in</Link></>}
    >
      <form className="auth-form" onSubmit={submit}>
        <label htmlFor="register-name">Full name</label>
        <input id="register-name" autoComplete="name" required value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Your full name" />
        <label htmlFor="register-email">University email</label>
        <input id="register-email" type="email" autoComplete="email" required value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="you@university.edu" />
        <label htmlFor="register-role">I am joining as a</label>
        <select id="register-role" value={form.role} onChange={(event) => update('role', event.target.value)}>
          <option value="student">Current student</option>
          <option value="alumni">Alumni</option>
        </select>
        <div className="auth-fields-row">
          <div>
            <label htmlFor="register-department">Department</label>
            <input id="register-department" required value={form.department} onChange={(event) => update('department', event.target.value)} placeholder="e.g. Computer Science" />
          </div>
          <div>
            <label htmlFor="register-batch">Graduation year</label>
            <input id="register-batch" inputMode="numeric" required value={form.batch} onChange={(event) => update('batch', event.target.value)} placeholder="e.g. 2027" />
          </div>
        </div>
        <label htmlFor="register-password">Password</label>
        <div className="auth-password-field">
          <input id="register-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" minLength="8" required value={form.password} onChange={(event) => update('password', event.target.value)} placeholder="At least 8 characters" />
          <button type="button" onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? 'Hide' : 'Show'}</button>
        </div>
        <label htmlFor="register-confirm">Confirm password</label>
        <input id="register-confirm" type="password" autoComplete="new-password" required value={form.confirmPassword} onChange={(event) => update('confirmPassword', event.target.value)} placeholder="Enter your password again" />
        <p className="auth-privacy-note">Demo accounts are stored in this browser only. Alumni accounts require approval; administrator accounts are invite-only.</p>
        {message && <p className={`auth-message is-${messageType}`} role="status">{message}</p>}
        <button className="auth-submit" type="submit" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}<span aria-hidden="true">→</span></button>
      </form>
    </AuthFrame>
  );
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function submit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <AuthFrame
      eyebrow="Account recovery"
      title="Reset your password"
      description="Enter your account email. In this demo, recovery is simulated and no email is sent."
      footer={<>Remembered your password? <Link href="/login">Back to sign in</Link></>}
    >
      <form className="auth-form" onSubmit={submit}>
        <label htmlFor="recovery-email">Email address</label>
        <input id="recovery-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@university.edu" />
        {sent && <p className="auth-message is-success" role="status">If an account exists for {email}, recovery instructions would be sent. Email delivery is not enabled in this demo.</p>}
        <button className="auth-submit" type="submit">Continue<span aria-hidden="true">→</span></button>
      </form>
    </AuthFrame>
  );
}
