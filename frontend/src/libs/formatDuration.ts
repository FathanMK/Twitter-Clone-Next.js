export default function formatDuration(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.abs(now.getTime() - date.getTime()) / 1000; // difference in seconds

  const seconds = Math.floor(diff % 60);
  const minutes = Math.floor((diff / 60) % 60);
  const hours = Math.floor((diff / (60 * 60)) % 24);
  const days = Math.floor(diff / (24 * 60 * 60));

  if (days > 0) {
    // More than 24 hours, display in "day month" format
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    return `${day} ${month}`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
}
