export = util;
export as namespace util;

declare namespace util {
  interface dateInterval {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
  }
}