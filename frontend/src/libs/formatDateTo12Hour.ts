export default function formatDateTo12Hour(dateString: string) {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours < 12 ? "AM" : "PM";

  hours = hours % 12 || 12;

  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedTime = `${hours}:${paddedMinutes}${period}`;

  return formattedTime;
}
