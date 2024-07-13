export default function convertWindSpeed(speed: number): string {
  return `${(speed * 3.6).toFixed(0)}Km/h`;
}
