import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>{siteConfig.name}</h3>
          <p>{siteConfig.tagline}</p>
          <a className="footer-phone" href={siteConfig.phoneHref}>
            {siteConfig.phone}
          </a>
        </div>
        <div>
          <h4>Services</h4>
          <Link href="/services">View Services</Link>
          <Link href="/booking">Book Service</Link>
          <Link href="/contact">Request Help</Link>
        </div>
        <div>
          <h4>Company</h4>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h4>Location</h4>
          <p>{siteConfig.address}</p>
          <a href={siteConfig.mapsHref} target="_blank" rel="noreferrer">
            Get Directions
          </a>
        </div>
      </div>
    </footer>
  );
}
