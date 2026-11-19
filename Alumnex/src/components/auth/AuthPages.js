'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AlumnexLogo from '@/components/layout/AlumnexLogo';
import { getDemoUsers, getRoleHome, loginDemoUser, registerDemoUser, resetDemoData } from '@/lib/demo-auth';

const authPillarIcons = {
  login: [
    <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" /></>,
    <><path d="M12 6c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13C17 4 14 4.5 12 6z" /><path d="M12 6v13" /></>,
    <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  ],
  register: [
    <><circle cx="12" cy="8" r="3" /><path d="M6.5 19.5c0-3 2.4-5 5.5-5s5.5 2 5.5 5" /><circle cx="5" cy="10" r="2" /><circle cx="19" cy="10" r="2" /><path d="M1.5 18c0-2 1.5-3.6 3.5-4M22.5 18c0-2-1.5-3.6-3.5-4" /></>,
    <><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18M10.5 12.5v2h3v-2" /></>,
    <><path d="M2.5 9.5l4.5-2.5 4 1.5 4-1.5 4.5 2.5" /><path d="M2.5 9.5v6l3 1.5M21.5 9.5v6l-3 1.5" /><path d="M6 17l3.5 2.2c.8.5 1.8.2 2.2-.6M8.5 14.5l3.2 2.3M11 12l2.5 2.3a1.3 1.3 0 0 0 1.8-1.8L13 10.3" /></>,
  ],
};

const authVisuals = {
  login: {
    image: '/images/auth-login.jpg',
    imageDescription: 'Alumni gathered for dinner in a wood-panelled university library',
    title: <>Welcome back to<br />the <em>community.</em></>,
    description: 'Pick up your mentorships, messages and events right where you left them.',
    pillars: ['Messages', 'Mentors', 'Events'],
  },
  register: {
    image: '/images/auth-register.jpg',
    imageDescription: 'University clock tower building at dusk',
    title: <>Your journey<br />continues <em>here.</em></>,
    description: 'Reconnect with your university community, mentor the next generation, and build lasting connections.',
    pillars: ['Network', 'Grow', 'Give Back'],
  },
};

function AuthFrame({ kind, title, description, children, footer }) {
  const visual = authVisuals[kind];

  return (
    <main className="auth-layout">
      <section className={`auth-stage auth-stage--${kind}`} aria-label="Alumnex welcome">
        <div className="auth-photo" style={{ backgroundImage: `url("${visual.image}")` }} role="img" aria-label={visual.imageDescription} />
        <div className="auth-shade" />
        <div className="auth-wave" aria-hidden="true">
          <svg className="auth-wave__layer auth-wave__layer--first" viewBox="0 0 2880 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="auth-wave-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#8a1230" stopOpacity=".85" />
                <stop offset=".45" stopColor="#3d0612" stopOpacity=".7" />
                <stop offset="1" stopColor="#080706" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 70C240 115 480 150 720 100C960 50 1200 25 1440 70C1680 115 1920 150 2160 100C2400 50 2640 25 2880 70L2880 200L0 200Z" fill="url(#auth-wave-fill)" />
            <path d="M0 70C240 115 480 150 720 100C960 50 1200 25 1440 70C1680 115 1920 150 2160 100C2400 50 2640 25 2880 70" fill="none" stroke="#e0405f" strokeOpacity=".7" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          </svg>
          <svg className="auth-wave__layer auth-wave__layer--second" viewBox="0 0 2880 200" preserveAspectRatio="none">
            <path d="M0 100C300 150 560 170 860 135C1100 108 1240 70 1440 100C1740 150 2000 170 2300 135C2540 108 2680 70 2880 100" fill="none" stroke="#b3213f" strokeOpacity=".35" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="auth-copy">
          <div className="auth-visual-eyebrow"><span />ALUMNEX</div>
          <h1>{visual.title}</h1>
          <p className="auth-lede">{visual.description}</p>
          <ul className="auth-pillars">
            {visual.pillars.map((pillar, index) => (
              <li key={pillar}>
                <svg viewBox="0 0 24 24" aria-hidden="true">{authPillarIcons[kind][index]}</svg>
                {pillar}
              </li>
            ))}
          </ul>
        </div>
        <div className="auth-tag"><span /><em>Alumnex — A lifelong community.</em><span /></div>
      </section>
      <section className="auth-panel">
        <div className="auth-wrap">
          <h2>{title}</h2>
          <p className="auth-intro">{description}</p>
          {children}
          <div className="auth-foot">{footer}</div>
        </div>
      </section>
    </main>
  );
}

function AuthRecoveryFrame({ eyebrow, title, description, children, footer }) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-recovery-brand"><AlumnexLogo priority /></div>
        <p className="auth-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="auth-description">{description}</p>
        {children}
        <div className="auth-footer">{footer}</div>
      </section>
    </main>
  );
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? '' : 'Enter a valid email, like you@uiu.ac.bd.';
}

function validateRegistrationField(field, value, role, password) {
  const year = new Date().getFullYear();
  if (field === 'name') return value.trim().length >= 2 ? '' : 'Enter your full name.';
  if (field === 'email') return validateEmail(value);
  if (field === 'department') return value.trim() ? '' : 'Enter your department.';
  if (field === 'batch') {
    const batch = Number(value);
    if (!/^\d{4}$/.test(value)) return 'Enter a four-digit year.';
    if (role === 'student' && (batch < year || batch > year + 6)) return `Pick a year between ${year} and ${year + 6}.`;
    if (role === 'alumni' && (batch < 2007 || batch > year)) return `Pick a year between 2007 and ${year}.`;
    return '';
  }
  if (field === 'password') return value.length >= 8 ? '' : 'Use at least 8 characters.';
  if (field === 'confirmPassword') return value && value === password ? '' : 'Passwords don’t match.';
  return '';
}

function getPasswordStrength(value) {
  if (!value) return { level: 0, message: '' };
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value) || value.length >= 14) score += 1;
  if (score === 0) score = 1;
  const messages = [
    '',
    'Weak: add length, numbers or symbols.',
    'Fair: mix upper and lower case.',
    'Good: one more step and it’s strong.',
    'Strong password.',
  ];
  return { level: score, message: messages[score] };
}

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [busy, setBusy] = useState(false);

  function validateField(field, value) {
    const error = field === 'email' ? validateEmail(value) : value ? '' : 'Enter your password.';
    setFieldErrors((current) => ({ ...current, [field]: error }));
    return error;
  }

  function submit(event) {
    event.preventDefault();
    const errors = {
      email: validateEmail(email),
      password: password ? '' : 'Enter your password.',
    };
    setFieldErrors(errors);
    if (errors.email || errors.password) return;
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
      setFieldErrors({});
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
      kind="login"
      title="Welcome back."
      description="Enter your details to continue."
      footer={<>New to Alumnex? <Link href="/register">Create an account</Link></>}
    >
      <form className="auth-form" onSubmit={submit} noValidate>
        <div className="auth-field">
          <label htmlFor="login-email">University email</label>
          <input id="login-email" type="email" autoComplete="username" value={email} onChange={(event) => {
            const value = event.target.value;
            setEmail(value);
            if (fieldErrors.email) validateField('email', value);
          }} onBlur={(event) => event.target.value && validateField('email', event.target.value)} placeholder="you@uiu.ac.bd" aria-invalid={Boolean(fieldErrors.email)} aria-describedby="login-email-error" />
          <p className="auth-error" id="login-email-error" role="alert">{fieldErrors.email}</p>
        </div>
        <div className="auth-label-row">
          <label htmlFor="login-password">Password</label>
          <Link href="/forgot-password">Forgot password?</Link>
        </div>
        <div className="auth-field">
          <div className="auth-password-field">
            <input id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => {
              const value = event.target.value;
              setPassword(value);
              if (fieldErrors.password) validateField('password', value);
            }} onBlur={(event) => event.target.value && validateField('password', event.target.value)} placeholder="Enter your password" aria-invalid={Boolean(fieldErrors.password)} aria-describedby="login-password-error" />
            <button type="button" aria-controls="login-password" aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? 'Hide' : 'Show'}</button>
          </div>
          <p className="auth-error" id="login-password-error" role="alert">{fieldErrors.password}</p>
        </div>
        <label className="auth-keep">
          <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
          <span>Keep me signed in on this device</span>
        </label>
        {message && <p className={`auth-message auth-message--${messageType}`} role={messageType === 'error' ? 'alert' : 'status'}>{message}</p>}
        <button className="auth-submit" type="submit" disabled={busy}>
          <span>{busy ? 'Signing in…' : 'Sign in'}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
        <p className="auth-fine">Demo accounts are stored in this browser only. Create one first, then sign in with it.</p>
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
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [busy, setBusy] = useState(false);

  function update(field, value) {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);
    setFieldErrors((current) => {
      const updatedErrors = { ...current };
      if (updatedErrors[field]) {
        updatedErrors[field] = validateRegistrationField(field, value, updatedForm.role, updatedForm.password);
      }
      if (field === 'password' && updatedErrors.confirmPassword) {
        updatedErrors.confirmPassword = validateRegistrationField('confirmPassword', updatedForm.confirmPassword, updatedForm.role, value);
      }
      if (field === 'role' && (updatedForm.batch || updatedErrors.batch)) {
        updatedErrors.batch = validateRegistrationField('batch', updatedForm.batch, value, updatedForm.password);
      }
      return updatedErrors;
    });
  }

  function validateField(field) {
    const error = validateRegistrationField(field, form[field], form.role, form.password);
    setFieldErrors((current) => ({ ...current, [field]: error }));
    return error;
  }

  function blurField(field) {
    if (form[field] || fieldErrors[field]) validateField(field);
  }

  function submit(event) {
    event.preventDefault();
    const fields = ['name', 'email', 'department', 'batch', 'password', 'confirmPassword'];
    const errors = fields.reduce((result, field) => {
      result[field] = validateRegistrationField(field, form[field], form.role, form.password);
      return result;
    }, {});
    setFieldErrors(errors);
    const firstInvalid = fields.find((field) => errors[field]);
    if (firstInvalid) {
      document.getElementById(firstInvalid === 'confirmPassword' ? 'register-confirm' : `register-${firstInvalid}`)?.focus();
      return;
    }

    setBusy(true);
    setMessage('');
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
      kind="register"
      title="Create your account"
      description="Build meaningful connections across your university community."
      footer={<>Already have an account? <Link href="/login">Sign in</Link></>}
    >
      <form className="auth-form" onSubmit={submit} noValidate>
        <fieldset className="auth-role">
          <legend>I’m joining as</legend>
          <div className="auth-role-options">
            <label>
              <input type="radio" name="register-role" value="student" checked={form.role === 'student'} onChange={(event) => update('role', event.target.value)} />
              <span>Current student</span>
            </label>
            <label>
              <input type="radio" name="register-role" value="alumni" checked={form.role === 'alumni'} onChange={(event) => update('role', event.target.value)} />
              <span>Alumni</span>
            </label>
          </div>
          <p className="auth-hint">{form.role === 'student' ? 'Students get access as soon as they sign up.' : 'An administrator reviews alumni accounts before they go live.'}</p>
        </fieldset>
        <div className="auth-field">
          <label htmlFor="register-name">Full name</label>
          <input id="register-name" type="text" autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} onBlur={() => blurField('name')} placeholder="Your full name" aria-invalid={Boolean(fieldErrors.name)} aria-describedby="register-name-error" />
          <p className="auth-error" id="register-name-error" role="alert">{fieldErrors.name}</p>
        </div>
        <div className="auth-field">
          <label htmlFor="register-email">University email</label>
          <input id="register-email" type="email" autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} onBlur={() => blurField('email')} placeholder="you@uiu.ac.bd" aria-invalid={Boolean(fieldErrors.email)} aria-describedby="register-email-error" />
          <p className="auth-error" id="register-email-error" role="alert">{fieldErrors.email}</p>
        </div>
        <div className="auth-fields-row">
          <div className="auth-field">
            <label htmlFor="register-department">Department</label>
            <input id="register-department" type="text" list="register-departments" value={form.department} onChange={(event) => update('department', event.target.value)} onBlur={() => blurField('department')} placeholder="e.g. Computer Science" aria-invalid={Boolean(fieldErrors.department)} aria-describedby="register-department-error" />
            <datalist id="register-departments">
              <option value="Computer Science" />
              <option value="Business" />
              <option value="Electrical Engineering" />
              <option value="Data Science" />
              <option value="Public Health" />
            </datalist>
            <p className="auth-error" id="register-department-error" role="alert">{fieldErrors.department}</p>
          </div>
          <div className="auth-field">
            <label htmlFor="register-batch">{form.role === 'student' ? 'Expected graduation' : 'Graduation year'}</label>
            <input id="register-batch" type="text" inputMode="numeric" maxLength="4" value={form.batch} onChange={(event) => update('batch', event.target.value)} onBlur={() => blurField('batch')} placeholder={`e.g. ${new Date().getFullYear() + (form.role === 'student' ? 1 : -2)}`} aria-invalid={Boolean(fieldErrors.batch)} aria-describedby="register-batch-error" />
            <p className="auth-error" id="register-batch-error" role="alert">{fieldErrors.batch}</p>
          </div>
        </div>
        <div className="auth-field">
          <label htmlFor="register-password">Password</label>
          <div className="auth-password-field">
            <input id="register-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={form.password} onChange={(event) => update('password', event.target.value)} onBlur={() => blurField('password')} placeholder="At least 8 characters" aria-invalid={Boolean(fieldErrors.password)} aria-describedby="register-password-error register-password-strength" />
            <button type="button" aria-controls="register-password register-confirm" aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? 'Hide' : 'Show'}</button>
          </div>
          <PasswordStrength value={form.password} />
          <p className="auth-error" id="register-password-error" role="alert">{fieldErrors.password}</p>
        </div>
        <div className="auth-field">
          <label htmlFor="register-confirm">Confirm password</label>
          <input id="register-confirm" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={form.confirmPassword} onChange={(event) => update('confirmPassword', event.target.value)} onBlur={() => blurField('confirmPassword')} placeholder="Enter your password again" aria-invalid={Boolean(fieldErrors.confirmPassword)} aria-describedby="register-confirm-error" />
          <p className="auth-error" id="register-confirm-error" role="alert">{fieldErrors.confirmPassword}</p>
        </div>
        <p className="auth-fine">Demo accounts are stored in this browser only. Administrator accounts are invite-only.</p>
        {message && <p className={`auth-message auth-message--${messageType}`} role={messageType === 'error' ? 'alert' : 'status'}>{message}</p>}
        <button className="auth-submit" type="submit" disabled={busy}>
          <span>{busy ? 'Creating account…' : 'Create account'}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </form>
    </AuthFrame>
  );
}

function PasswordStrength({ value }) {
  const { level, message: strengthMessage } = getPasswordStrength(value);
  return (
    <>
      <div className="auth-meter" data-level={level} aria-hidden="true">
        <i /><i /><i /><i />
      </div>
      <p className="auth-strength" id="register-password-strength" aria-live="polite">{strengthMessage}</p>
    </>
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
    <AuthRecoveryFrame
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
    </AuthRecoveryFrame>
  );
}
