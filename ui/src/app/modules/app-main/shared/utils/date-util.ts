export function convertDateStringToDate(dateString: string) {
  if (dateString) {
    return new Date(dateString).toISOString().slice(0, -8);
  } else {
    let now = new Date();
    let newDate = new Date(now.getTime() - now.getTimezoneOffset()*60*1000);
    return newDate.toISOString().slice(0, -8);
  }
}
