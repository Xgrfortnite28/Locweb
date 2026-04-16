import { siteConfig } from "@/lib/site";

export default function AboutPage() {
  return (
    <section className="page-section">
      <div className="container split-grid about-split">
        <div>
          <div className="pill">About</div>
          <h1 className="page-title">Local plumbing support with a clean, modern web experience.</h1>
          <p className="page-intro">
            This site positions Best Plumber & Septic as a dependable local service business with clear booking, strong service pages, and mobile-friendly contact options.
          </p>
          <div className="about-info-grid">
            <div className="glass-card info-card">
              <small>Phone</small>
              <strong>{siteConfig.phone}</strong>
            </div>
            <div className="glass-card info-card">
              <small>Address</small>
              <strong>{siteConfig.address}</strong>
            </div>
          </div>
        </div>
        <div className="glass-card image-style-card">
          <div className="pipe-shape pipe-a" />
          <div className="pipe-shape pipe-b" />
          <div className="pipe-shape pipe-c" />
          <div className="pipe-glow" />
        </div>
      </div>
    </section>
  );
}
