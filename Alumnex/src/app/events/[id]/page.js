export default function Page({ params }) {
  return (
    <main className="page-shell">
      <section className="content-panel">
        <p className="eyebrow">Event</p>
        <h1>Event #{params.id}</h1>
        <p className="lead">A full event experience with agenda, speakers, registrations, and venue information.</p>
        <div className="action-row">
          <a href="/events" className="primary-link">View all events</a>
          <a href="/register" className="secondary-link">Reserve a spot</a>
        </div>
      </section>
    </main>
  );
}