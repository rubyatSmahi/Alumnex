export default function Page() {
  return (
    <main className="page-shell">
      <section className="content-panel">
        <p className="eyebrow">Alumni</p>
        <h1>Create a job opportunity</h1>
        <p className="lead">
          Post openings for students and current graduates using a clear, professional listing format.
        </p>
        <div className="action-row">
          <a href="/alumni/jobs" className="primary-link">Back to jobs</a>
          <a href="/contact" className="secondary-link">Support</a>
        </div>
      </section>
    </main>
  );
}
