export const FormatDate = ():[string,string,string] => {
  const newDate = new Date();
  const day = newDate.toLocaleString('en-US', { day: '2-digit' });
  const month = newDate.toLocaleString('en-US', { month: '2-digit' });
  const year = newDate.getFullYear().toString();
  return [day, month, year];
}