export const formatPrice = (cents) => {
  return cents / 100;
};

export const formatTime = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const daysGoneInMilliseconds = today.getTime() - date.getTime();

  var days, total_hours, total_minutes, total_seconds;

  total_seconds = parseInt(Math.floor(daysGoneInMilliseconds / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));
  if (days === 0) {
    return "Today";
  }
  if (days < 7) {
    const returnString = days === 1 ? `${days} day ago` : `${days} days ago`;
    return returnString;
  }
  return date.toDateString();
};

formatTime();
