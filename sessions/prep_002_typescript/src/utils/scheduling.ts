/**
 * Scheduling utility functions for inspection date calculations.
 */

export function getNextWeekday(date: Date): Date {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);

  const dayOfWeek = nextDay.getDay();
  if (dayOfWeek === 6) {
    nextDay.setDate(nextDay.getDate() + 2);
  } else if (dayOfWeek === 0) {
    nextDay.setDate(nextDay.getDate() + 1);
  }

  return nextDay;
}

export function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
