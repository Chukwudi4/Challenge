export const formatPrice = (cents) => {
  return cents / 100;
};

export const formatTime = (dateString) => {
  const date = new Date(
    "Mon Feb 01 2021 21:17:07 GMT+0100 (West Africa Standard Time)"
  );
  const today = new Date();
  const daysGone = today.getDay() - date.getDay();
  if (daysGone < 7) {
    return `${daysGone} days ago`;
  }
  return;
};

formatTime();
