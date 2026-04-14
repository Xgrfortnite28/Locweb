import Link from "next/link";
import { siteConfig } from "@/lib/site";
import type { Service } from "@/lib/types";

export default function ServicesPage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="section-head page-head">
          <span className="eyebrow">Services</span>
          <h1 className="page-title">Professional plumbing and septic services</h1>
          <p className="page-intro">
            Explore the service categories featured on the site and request the help you need.
          </p>
        </div>

        <div className="card-grid three-up">
          {siteConfig.services.map((service: Service) => (
            <article className="glass-card service-card tall" key={service.title}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link href="/booking" className="text-link">Book this service →</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
