export default function Page() {
  return (
    <main className="page-shell">
      <section className="content-panel">
        <p className="eyebrow">Alumnex</p>
        <h1>Alumni Directory</h1>
        <p className="lead">Search graduates by batch, department, company, or industry to build stronger connections and discover mentors.</p>
        <div className="action-row">
          <a href="/" className="primary-link">Back home</a>
          <a href="/contact" className="secondary-link">Talk to the team</a>
        </div>
      </section>
    </main>
  );
}