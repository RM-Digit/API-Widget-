export function isToday(inputDate) {
  const today = new Date();
  inputDate = new Date(inputDate);
  return inputDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0);
}
