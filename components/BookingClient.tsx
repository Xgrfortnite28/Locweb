"use client";

import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/site";
import type { Service } from "@/lib/types";

type FormState = {
  name: string;
  phone: string;
  service: string;
  date: string;
  window: string;
  details: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  service: siteConfig.services[0]?.title ?? "",
  date: "",
  window: "",
  details: "",
  website: "",
};

type AvailabilityResponse = {
  ok: boolean;
  windows?: string[];
  unavailable?: string[];
  message?: string;
};

export default function BookingClient() {
  const [form, setForm] = useState<FormState>(initialState);
  const [windows, setWindows] = useState<string[]>([]);
  const [unavailable, setUnavailable] = useState<string[]>([]);
  const [loadingWindows, setLoadingWindows] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const minDate = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, []);

  useEffect(() => {
    if (!form.date) {
      setWindows([]);
      setUnavailable([]);
      return;
    }

    const controller = new AbortController();
    const load = async () => {
      setLoadingWindows(true);
      setError("");
      try {
        const res = await fetch(`/api/availability?date=${encodeURIComponent(form.date)}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        const data: AvailabilityResponse = await res.json();
        if (!res.ok || !data.ok) {
          throw new Error(data.message || "Could not load availability.");
        }
        setWindows(data.windows ?? []);
        setUnavailable(data.unavailable ?? []);
        setForm((prev) => ({
          ...prev,
          window: (data.windows ?? []).includes(prev.window) ? prev.window : "",
        }));
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setWindows([]);
        setUnavailable([]);
        setError(err instanceof Error ? err.message : "Could not load availability.");
      } finally {
        setLoadingWindows(false);
      }
    };

    void load();
    return () => controller.abort();
  }, [form.date]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || data.error || "Booking failed.");
      }
      setMessage("Your booking request has been sent successfully.");
      setForm(initialState);
      setWindows([]);
      setUnavailable([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="booking-layout-grid">
      <div className="booking-panel glass-card">
        <div className="eyebrow">Book Service</div>
        <h1 className="page-title">Schedule plumbing service online.</h1>
        <p className="page-intro">
          Choose your service, preferred date, and available arrival window.
        </p>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="service">Service</label>
            <select
              id="service"
              value={form.service}
              onChange={(e) => setForm((prev) => ({ ...prev, service: e.target.value }))}
              required
            >
              {siteConfig.services.map((service: Service) => (
                <option key={service.title} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="date">Preferred date</label>
            <input
              id="date"
              type="date"
              min={minDate}
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>

          <div className="field field-full">
            <label>Available time windows</label>
            <div className="window-grid">
              {!form.date && <div className="muted-note">Choose a date to load available windows.</div>}
              {loadingWindows && <div className="muted-note">Loading windows…</div>}
              {form.date && !loadingWindows && windows.length === 0 && (
                <div className="muted-note">No windows are available for that date.</div>
              )}
              {windows.map((window: string) => (
                <button
                  type="button"
                  key={window}
                  className={`window-chip ${form.window === window ? "selected" : ""} ${unavailable.includes(window) ? "disabled" : ""}`}
                  disabled={unavailable.includes(window)}
                  onClick={() => setForm((prev) => ({ ...prev, window }))}
                >
                  {window}
                </button>
              ))}
            </div>
          </div>

          <div className="field field-full">
            <label htmlFor="details">Issue details</label>
            <textarea
              id="details"
              rows={5}
              value={form.details}
              onChange={(e) => setForm((prev) => ({ ...prev, details: e.target.value }))}
              placeholder="Tell us what is going on."
            />
          </div>

          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
            />
          </div>

          {message && <div className="success-box">{message}</div>}
          {error && <div className="error-box">{error}</div>}

          <button type="submit" className="btn btn-primary full-btn" disabled={submitting || !form.window}>
            {submitting ? "Sending…" : "Book Appointment"}
          </button>
        </form>
      </div>

      <div className="booking-side-stack">
        <div className="side-card glass-card">
          <h3>Need faster help?</h3>
          <p>Call the office directly for urgent plumbing questions or immediate service requests.</p>
          <a className="btn btn-warm full-btn" href={siteConfig.phoneHref}>
            {siteConfig.phone}
          </a>
        </div>

        <div className="side-card glass-card">
          <h3>Service areas</h3>
          <ul className="service-area-list">
            {siteConfig.serviceAreas.map((area: string) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>

        <div className="side-card glass-card">
          <h3>Location</h3>
          <p>{siteConfig.address}</p>
          <a className="btn btn-secondary full-btn" href={siteConfig.mapsHref} target="_blank" rel="noreferrer">
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}
