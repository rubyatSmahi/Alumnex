export default function Page({ params }) {
  return (
    <main className="page-shell">
      <section className="content-panel">
        <p className="eyebrow">Alumnex Directory</p>
        <h1>Profile #{params.id}</h1>
        <p className="lead">A detailed alumni profile with education history, work experience, and mentorship availability.</p>
        <div className="action-row">
          <a href="/alumni-directory" className="primary-link">Back to directory</a>
          <a href="/contact" className="secondary-link">Contact alumni</a>
        </div>
      </section>
    </main>
  );
}