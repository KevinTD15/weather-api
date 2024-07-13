export default function convertTmp(iconName: string, dateTime: string): string {
  const hours = new Date(dateTime).getHours();
  const isDay = hours >= 7 && hours <= 18;
  return isDay ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
}
