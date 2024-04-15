export default function formatStatusCount(num: number): string {
  if (num < 0) {
    throw new Error("Number must be positive");
  }

  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return num / 1000 + "K";
  } else if (num < 1000000000) {
    return num / 1000000 + "M";
  } else {
    return num / 1000000000 + "B";
  }
}
