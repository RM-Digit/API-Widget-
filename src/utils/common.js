export function isToday(inputDate) {
  const today = new Date();
  inputDate = new Date(inputDate);
  return inputDate.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0);
}

export function isComing(inputDate) {
  const today = new Date();
  inputDate = new Date(inputDate);
  return inputDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
}

export function filterByObj(array, val, key) {
  return array.filter((innerArray) => innerArray[0][key] == val);
}
