export function getSizeWithUnits(bytes: number) {
  const sizes = ["B", "KiB", "MiB", "GiB"];
  if (bytes === 0) return "0 B";

  const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024));
  if (unitIndex === 0) return `${bytes} ${sizes[unitIndex]}`;

  return `${(bytes / Math.pow(1024, unitIndex)).toFixed(2)} ${
    sizes[unitIndex]
  }`;
}
