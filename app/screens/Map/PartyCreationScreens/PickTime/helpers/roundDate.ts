export function roundDate(date: Date, roundingFactor: number) {
  const milliseconds = date.getTime(); // get the date number in milliseconds
  const roundingFactorMs = roundingFactor * 60 * 1000; // convert rounding factor to milliseconds
  const roundedMilliseconds =
    Math.round(milliseconds / roundingFactorMs) * roundingFactorMs; // round to the nearest rounding factor
  const roundedDate = new Date(roundedMilliseconds); // create a new Date object with the rounded date number
  return roundedDate;
}
