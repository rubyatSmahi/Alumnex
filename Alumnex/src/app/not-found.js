export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="content-panel">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="lead">This page may have moved or no longer exists in the Alumnex network.</p>
        <div className="action-row">
          <a href="/" className="primary-link">Return home</a>
        </div>
      </section>
    </main>
  );
}