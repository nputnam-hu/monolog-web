import moment from "moment";

export function formatDate(m) {
  return moment(m).calendar(null, {
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Yesterday]",
    lastWeek: "dddd",
    sameElse: "DD/MM/YYYY",
  });
}

export function formatTime(n) {
  const n_integer = Math.round(Number(n));
  if (n < 60) {
    return `${n_integer.toString()}s`;
  } else {
    const numMinutes = n_integer % 60;
    const numSeconds = Math.round(n_integer / 60);
    return `${numSeconds.toString()}m ${Number(numMinutes).toString()}s`;
  }
}
