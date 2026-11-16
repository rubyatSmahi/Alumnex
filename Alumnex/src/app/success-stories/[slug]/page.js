export default function Page({ params }) {
  return (
    <main className="page-shell">
      <section className="content-panel">
        <p className="eyebrow">Success Story</p>
        <h1>{params.slug}</h1>
        <p className="lead">Read how this alumnus advanced through mentorship, opportunities, and university community support.</p>
        <div className="action-row">
          <a href="/success-stories" className="primary-link">All stories</a>
          <a href="/contact" className="secondary-link">Share your story</a>
        </div>
      </section>
    </main>
  );
}