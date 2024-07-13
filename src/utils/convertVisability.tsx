export default function convertWindSpeed(speed: number): string {
  return `${(speed / 1000).toFixed(0)}Km/h`;
}
