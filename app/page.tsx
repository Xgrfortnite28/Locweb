import Link from "next/link";
import { siteConfig } from "@/lib/site";
import type { Service, Review, FAQ } from "@/lib/types";

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <div className="pill">Local Plumbing & Septic Service</div>
            <h1>Reliable service for drains, leaks, pipes, and septic needs.</h1>
            <p className="hero-copy">
              Best Plumber & Septic serves Lilburn with repair-focused plumbing support, clean scheduling, and a professional service experience.
            </p>
            <div className="button-row">
              <Link href="/booking" className="btn btn-primary">Book Service</Link>
              <Link href="/services" className="btn btn-secondary">View Services</Link>
            </div>
            <div className="contact-inline">
              <span>Call:</span> <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
            </div>
          </div>
          <div className="hero-card glass-card">
            <div className="hero-lines line-a" />
            <div className="hero-lines line-b" />
            <div className="hero-lines line-c" />
            <div className="hero-glow" />
            <div className="hero-status-card">
              <div className="status-icon">💧</div>
              <div>
                <small>Professional Service</small>
                <strong>Fast appointment scheduling</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Core services</span>
            <h2>What homeowners can request online</h2>
          </div>
          <div className="card-grid four-up">
            {siteConfig.services.slice(0, 4).map((service: Service) => (
              <article className="glass-card service-card" key={service.title}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container split-grid">
          <div className="metric-grid">
            <div className="glass-card metric-card"><strong>5.0</strong><span>Displayed rating</span></div>
            <div className="glass-card metric-card highlight"><strong>Fast</strong><span>Request online or by phone</span></div>
            <div className="glass-card metric-card"><strong>Lilburn</strong><span>Local service positioning</span></div>
            <div className="glass-card metric-card"><strong>Multi-service</strong><span>Plumbing and septic support</span></div>
          </div>
          <div>
            <span className="eyebrow">Why people choose this site</span>
            <h2>Built to look polished and make booking easy.</h2>
            <p>
              The site focuses on strong service copy, clear calls to action, responsive layout, and an appointment flow that checks real availability.
            </p>
            <ul className="check-list">
              <li>Fast online appointment request</li>
              <li>Visible availability by date</li>
              <li>Service-specific booking flow</li>
              <li>Clean mobile-friendly design</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-block warm-band-wrap">
        <div className="container">
          <div className="warm-band glass-card">
            <div>
              <div className="pill pill-warm">Schedule Service</div>
              <h2>Need help with a drain, leak, or pipe issue?</h2>
              <p>Choose a service, pick an available date, and request an appointment online.</p>
              <div className="button-row">
                <Link href="/booking" className="btn btn-light">Book Appointment</Link>
                <a href={siteConfig.phoneHref} className="btn btn-secondary">Call Now</a>
              </div>
            </div>
            <div className="warm-band-visual">
              <div className="warm-label">Trusted local service</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Customer feedback</span>
            <h2>Review highlights</h2>
          </div>
          <div className="card-grid three-up">
            {siteConfig.reviews.map((review: Review) => (
              <article className="glass-card review-card" key={review.name}>
                <div className="stars">★★★★★</div>
                <p>{review.text}</p>
                <div className="review-person">
                  <span className="avatar">{review.initials}</span>
                  <div>
                    <strong>{review.name}</strong>
                    <small>Customer review</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block faq-wrap">
        <div className="container narrow">
          <div className="section-head">
            <span className="eyebrow">Quick answers</span>
            <h2>Common questions</h2>
          </div>
          <div className="faq-list">
            {siteConfig.faqs.map((faq: FAQ) => (
              <details className="glass-card faq-item" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
