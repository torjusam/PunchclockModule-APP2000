// Author: Torjus A.M
// Formates date to: Januar 06, 2024
const months: string[] = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
];

export function formatDate(date: Date): string {
  const day: number = date.getDate();
  const month: string = months[date.getMonth()];
  const year: number = date.getFullYear();

  // Add leading zero to day if it's a single digit
  const formattedDay: string = (day < 10) ? `0${day}` : day.toString();

  return `${month} ${formattedDay}, ${year}`;
}


export function formatTime (date: Date): string {
  date = new Date(date);
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();

  // Add leading zero to minutes if it's a single digit
  const formattedMinutes: string = (minutes < 10) ? `0${minutes}` : minutes.toString();

  return `${hours}:${formattedMinutes}`;
}