import { bookingLimits, bookingWindowsByWeekday } from "@/lib/site";

export function getTodayLocalDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(dateString: string, days: number): string {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isValidBookingDate(dateString: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;
  const today = getTodayLocalDateString();
  const max = addDays(today, bookingLimits.daysAhead);
  return dateString >= today && dateString <= max;
}

export function getAvailableWindowsForDate(dateString: string): string[] {
  if (!isValidBookingDate(dateString)) return [];
  const date = new Date(`${dateString}T12:00:00`);
  const weekday = date.getDay();
  const windows = bookingWindowsByWeekday[weekday] ?? [];
  
  // Filter out past times for today
  const today = getTodayLocalDateString();
  if (dateString === today) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    
    return windows.filter((window) => {
      const [startTime] = window.split(" - ");
      const [hour] = startTime.split(":").map(Number);
      // Only include slots that haven't started yet
      return hour > currentHour || (hour === currentHour && currentMin < 30);
    });
  }
  
  return windows;
}

export function isWindowAllowed(dateString: string, window: string): boolean {
  return getAvailableWindowsForDate(dateString).includes(window);
}
