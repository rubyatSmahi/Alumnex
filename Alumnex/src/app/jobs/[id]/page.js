export default function Page({ params }) {
  return (
    <main className="page-shell">
      <section className="content-panel">
        <p className="eyebrow">Opportunity</p>
        <h1>Role #{params.id}</h1>
        <p className="lead">A detailed opening with responsibilities, requirements, and application guidance.</p>
        <div className="action-row">
          <a href="/jobs" className="primary-link">All opportunities</a>
          <a href="/register" className="secondary-link">Apply now</a>
        </div>
      </section>
    </main>
  );
}