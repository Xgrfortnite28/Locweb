'use client';

import { useState, useEffect } from 'react';
import { bookingWindowsByWeekday } from '@/lib/site';

type AvailabilityItem = {
  date: string;
  booking_window: string;
  is_available: boolean;
  reason?: string;
};

export default function OwnerSchedulePage() {
  const [date, setDate] = useState('');
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Get today's date in YYYY-MM-DD format
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    setDate(`${year}-${month}-${day}`);
  }, []);

  // Load availability for selected date
  useEffect(() => {
    if (date) {
      loadAvailability(date);
    }
  }, [date]);

  const loadAvailability = async (selectedDate: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/owner-availability?date=${selectedDate}`);
      const result = await res.json();
      if (result.ok) {
        setAvailability(result.availability || []);
      }
    } catch (error) {
      console.error('Failed to load availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (window: string, currentState: boolean) => {
    try {
      const res = await fetch('/api/owner-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          booking_window: window,
          is_available: !currentState,
          reason: !currentState ? '' : 'Owner unavailable',
        }),
      });

      if ((await res.json()).ok) {
        loadAvailability(date);
      }
    } catch (error) {
      console.error('Failed to update availability:', error);
    }
  };

  if (!date) return <div>Loading...</div>;

  const weekday = new Date(`${date}T12:00:00`).getDay();
  const defaultWindows = bookingWindowsByWeekday[weekday] || [];

  return (
    <section className="page-section">
      <div className="container">
        <h1>Manage Your Schedule</h1>

        <div style={{ marginBottom: '2rem' }}>
          <label>
            Select Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ marginLeft: '1rem' }}
            />
          </label>
        </div>

        {loading ? (
          <p>Loading availability...</p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem', maxWidth: '600px' }}>
            <h2>Available Time Slots for {date}</h2>
            {defaultWindows.map((window) => {
              const existing = availability.find((a) => a.booking_window === window);
              const isAvailable = existing ? existing.is_available : true;

              return (
                <div
                  key={window}
                  style={{
                    padding: '1rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: isAvailable ? '#f0fff4' : '#fff5f5',
                  }}
                >
                  <span>{window}</span>
                  <button
                    onClick={() => toggleAvailability(window, isAvailable)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: isAvailable ? '#48bb78' : '#f56565',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {isAvailable ? 'Available' : 'Mark Available'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
