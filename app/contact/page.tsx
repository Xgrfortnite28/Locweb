import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  return (
    <section className="page-section">
      <div className="container contact-grid">
        <div>
          <div className="pill">Contact</div>
          <h1 className="page-title">Talk to the team or request service online.</h1>
          <p className="page-intro">
            Reach out directly by phone or use the booking page to request an available appointment window.
          </p>

          <div className="contact-card-stack">
            <div className="glass-card contact-card">
              <h3>Phone</h3>
              <a className="big-link" href={siteConfig.phoneHref}>{siteConfig.phone}</a>
            </div>
            <div className="glass-card contact-card">
              <h3>Address</h3>
              <p>{siteConfig.address}</p>
              <a className="text-link" href={siteConfig.mapsHref} target="_blank" rel="noreferrer">Get Directions →</a>
            </div>
          </div>
        </div>

        <div className="glass-card coverage-card">
          <div className="coverage-map" />
          <div className="coverage-footer">
            <div>
              <small>Service area</small>
              <strong>{siteConfig.serviceAreas.join(" • ")}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
