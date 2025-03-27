import { dateInterval } from "../@types/util.js";

export default class Util {
  /**
   * 값이 비어있는지 확인한다.
   *
   * ```
   * // returns true
   * empty(undefined);
   * empty(null);
   * empty(0);
   * empty('');
   * empty([]);
   * empty({});
   * ```
   */
  static empty(
    /** 확인할 값 */ arg: any
  ): boolean {
    let result = [undefined, null, 0, ''].includes(arg);

    if (!result) {
      if (arg.constructor == Object) {
        result = Object.keys(arg).length == 0 &&
                  Object.keys(Object.getPrototypeOf(arg)).length == 0;
      } else if (arg.constructor == NodeList) {
        result = arg.length == 0;
      } else if (Array.isArray(arg)) { result = arg.length == 0; }
    }

    return result;
  }

  /**
   * 값이 숫자인지 확인한다.
   *
   * ```
   * // returns true
   * isNumber(1);
   * isNumber('1');
   * 
   * // returns false
   * isNumber('test');
   * isNumber('1', true);
   * ```
   */
  static isNumber(
    /** 확인할 값 */ arg: any,
    /** `true`일 경우 `arg`의 `type`도 확인 #default `false` */ strict: boolean = false
  ): boolean {
    let result = !Number.isNaN(Number(arg)) &&
                  ['number', 'string'].includes(typeof arg) &&
                  !/^\s*$/.test(`${ arg }`);

    if (
      result &&
      strict
    ) { result = typeof arg == 'number'; }

    return result;
  }

  /**
   * 해당 값이 객체인지 확인
   *
   * ```
   * // returns true
   * isObject({});
   * 
   * // returns false
   * isObject(undefined);
   * isObject(null);
   * isObject(0);
   * isObject('');
   * isObject([]);
   * ```
   */
  static isObject(
    /** 확인할 값 */ arg: any
  ): boolean { return arg?.constructor == Object; }

  /**
   * 천 단위 마다 그룹화 된 숫자 형식으로 변환한 문자열을 반환 한다.
   * 
   * ```
   * // returns '1,000'
   * numberFormat(1000);
   * numberFormat(1000.01);
   * 
   * // returns '1,000.0'
   * numberFormat(1000.01, 1);
   * 
   * // returns '1,000 0'
   * numberFormat(1000.01, 1, ' ');
   * 
   * // returns '1.000 0'
   * numberFormat(1000.01, 1, ' ', '.');
   * ```
   */
  static numberFormat(
    /** 변환할 숫자 */ num: number,
    /** 소숫점 아래 자리 수 #default `0` */ decimals: number = 0,
    /** 소수점 구분자 #default `'.'` */ decimalSeparator: string = '.',
    /** 천 단위 구분자 #default `','` */ thousandsSeparator: string = ','
  ): string {
    const result = String(num).split('.');

    result[0] = result[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

    if (!Util.empty(result[1])) { result[1] = result[1].substring(0, decimals); }

    return (!Util.empty(result[1])) ? result[0].concat(decimalSeparator, result[1]) : result[0];
  }

  /**
   * 주어진 포맷에 따라 `Date`객체를 문자열로 변환
   * 
   * ```
   * const date = new Date(2022, 9, 27);
   * 
   * // returns '2022-10-27'
   * strftime(date, '%Y-%m-%d');
   * 
   * // returns '2022/10/27'
   * strftime(date, '%Y/%m/%d');
   * ```
   * 
   * `%a`: 요일을 축약된 이름으로 - Sun, Mon, …, Sat  \
   * `%A`: 요일을 전체 이름으로 - Sunday, Monday, …, Saturday  \
   * `%d`: 월중 일(day of the month)을 0으로 채워진 10진수로 - 01, 02, …, 31  \
   * `%b`: 월을 축약된 이름으로 - Jan, Feb, …, Dec  \
   * `%B`: 월을 전체 이름으로 - January, February, …, December  \
   * `%m`: 월을 0으로 채워진 10진수로 - 01, 02, …, 12  \
   * `%y`: 세기가 없는 해(year)를 0으로 채워진 10진수로 - 00, 01, …, 99  \
   * `%Y`: 세기가 있는 해(year)를 10진수로 - 0001, 0002, …, 2013, 2014, …, 9998, 9999  \
   * `%H`: 시(24시간제)를 0으로 채워진 십진수로 - 00, 01, …, 23  \
   * `%I`: 시(12시간제)를 0으로 채워진 십진수로 - 01, 02, …, 12  \
   * `%p`: 오전이나 오후에 해당하는 것 - AM, PM  \
   * `%M`: 분을 0으로 채워진 십진수로 - 00, 01, …, 59  \
   * `%S`: 초를 0으로 채워진 10진수로 - 00, 01, …, 59  \
   * `%%`: 리터럴 '%' 문자 - %
   */
  static strftime(
    /** 변환할 `Date`객체 */ date: Date,
    /** 변활할 포맷 문자열 */ format: string
  ): string {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    format = format.replace(/(%{1})/g, '\\$1');
    format = format.replace(/(\\%){2}/g, '%');
    format = format.replace(/\\%Y/g, String(date.getFullYear()));
    format = format.replace(/\\%y/g, String(date.getFullYear()).replace(/^\d+(\d{2})$/, '$1'));
    format = format.replace(/\\%B/g, month[date.getMonth()]);
    format = format.replace(/\\%b/g, month[date.getMonth()].replace(/^(\w{3})\w*$/, '$1'));
    format = format.replace(/\\%m/g, String(date.getMonth() + 1).replace(/^(\d{1})$/, '0$1'));
    format = format.replace(/\\%d/g, String(date.getDate()).replace(/^(\d{1})$/, '0$1'));
    format = format.replace(/\\%A/g, week[date.getDay()]);
    format = format.replace(/\\%a/g, week[date.getDay()].replace(/^(\w{3})\w*$/, '$1'));
    format = format.replace(/\\%H/g, String(date.getHours()).replace(/^(\d{1})$/, '0$1'));
    format = format.replace(/\\%I/g, String((date.getHours() > 12) ? (date.getHours() - 12) : date.getHours()).replace(/^0$/, '12').replace(/^(\d{1})$/, '0$1'));
    format = format.replace(/\\%p/g, (date.getHours() < 12) ? 'AM' : 'PM');
    format = format.replace(/\\%M/g, String(date.getMinutes()).replace(/^(\d{1})$/, '0$1'));
    format = format.replace(/\\%S/g, String(date.getSeconds()).replace(/^(\d{1})$/, '0$1'));

    return format;
  }

  /**
   * 유효한 날짜인지 확인
   *
   * ```
   * // returns true
   * checkdate(2022, 10, 28);
   * 
   * // returns false
   * checkdate(2022, 10, 32);
   * ```
   */
  static checkdate(
    /** 년 */ year: number,
    /** 월 */ month: number,
    /** 일 */ day: number
  ): boolean {
    const date: Date = new Date(year, (month - 1), day);

    return date.getFullYear() == year &&
          (date.getMonth() + 1) == month &&
          date.getDate() == day;
  }

  /**
   * 같은 날짜인지 비교
   *
   * ```
   * const date1 = new Date();
   * const date2 = new Date();
   * 
   * // returns true
   * equaldate(date1);
   * equaldate(date1, date2);
   * 
   * // returns false
   * date1.setDate(date1.getDate() + 1);
   * date2.setDate(date2.getDate() + 2);
   * equaldate(date1);
   * equaldate(date1, date2);
   * ```
   */
  static equaldate(
    /** 기준 날짜 */ date1: Date,
    /** 비교할 날짜 #default `new Date()` */ date2: Date = new Date()
  ): boolean { return Util.strftime(date1, '%Y-%m-%d') == Util.strftime(date2, '%Y-%m-%d'); }

  /**
   * Date객체에서 해당 하는 요일을 반환한다.
   * 
   * ```
   * const date = new Date(2022, 9, 27);
   * 
   * // returns '목요일'
   * getWeek(date);
   * 
   * // returns '목'
   * getWeek(date, false); 
   * ```
   */
  static getWeek(
    /** 요일을 반환할 `Date` 객체 */ date: Date,
    /** 해당 요일의 약어반환 대한 구분 값 `false`일 경우 약어 반환 #default `true` */ flag: boolean = true
  ): string {
    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    result = week[date.getDay()];

    return (flag) ? result : result.replace(/^([ㄱ-ㅎㅏ-ㅣ가-힣]{1})[ㄱ-ㅎㅏ-ㅣ가-힣]+$/, '$1');
  }

  /**
   * `Date`객체에 `interval`를 더한 값을 반환한다.
   * 
   * ```
   * const date = new Date(2022, 8, 27);
   * 
   * // returns '2022-10-28'
   * strftime(util.addDate(date, {month: 1, day: 1}), '%Y-%m-%d');
   * ```
   */
  static addDate(
    /** 기준 `Date`객체 */ date: Date,
    /** `Date`객체에 계산할 `interval` */ interval: dateInterval
  ): Date {
    return new Date(
      date.getFullYear() + (Util.isNumber(interval.year, true) ? interval.year : 0),
      date.getMonth() + (Util.isNumber(interval.month, true) ? interval.month : 0),
      date.getDate() + (Util.isNumber(interval.day, true) ? interval.day : 0),
      date.getHours() + (Util.isNumber(interval.hour, true) ? interval.hour : 0),
      date.getMinutes() + (Util.isNumber(interval.minute, true) ? interval.minute : 0),
      date.getSeconds() + (Util.isNumber(interval.second, true) ? interval.second : 0),
      date.getMilliseconds() + (Util.isNumber(interval.millisecond, true) ? interval.millisecond : 0)
    );
  }

  /**
   * `Date`객체에 `interval`를 뺀 값을 반환한다.
   * 
   * ```
   * const date = new Date(2022, 8, 27);
   * 
   * // returns '2022-08-26'
   * strftime(util.subDate(date, {month: 1, day: 1}), '%Y-%m-%d');
   * ```
   */
  static subDate(
    /** 기준 `Date`객체 */ date: Date,
    /** `Date`객체에 계산할 `interval` */ interval: dateInterval
  ): Date {
    return new Date(
      date.getFullYear() - (Util.isNumber(interval.year, true) ? interval.year : 0),
      date.getMonth() - (Util.isNumber(interval.month, true) ? interval.month : 0),
      date.getDate() - (Util.isNumber(interval.day, true) ? interval.day : 0),
      date.getHours() - (Util.isNumber(interval.hour, true) ? interval.hour : 0),
      date.getMinutes() - (Util.isNumber(interval.minute, true) ? interval.minute : 0),
      date.getSeconds() - (Util.isNumber(interval.second, true) ? interval.second : 0),
      date.getMilliseconds() - (Util.isNumber(interval.millisecond, true) ? interval.millisecond : 0)
    );
  }

  /**
   * xor 비교
   * 
   * ```
   * // returns true
   * xor(true, false);
   * xor(false, true);
   * 
   * // returns false
   * xor(true, true);
   * xor(false, false);
   * ```
   */
  static xor(
    /** 비교할 값 1 */ arg1: boolean,
    /** 비교할 값 2 */ arg2: boolean
  ): boolean {
    return !(arg1 && arg2) &&
          (arg1 || arg2);
  }

  /**
   * `FormDate`객체에 설정된 값을 `json`문자열로 반환 한다.
   * 
   * ```
   * const data = new FormData();
   * 
   * data.append('key', value);
   * 
   * const json = formDataToJson(data);
   * ```
   */
  static formDataToJson(
    /** `json`문자열로 반환할 `FormData`객체 */ formData: FormData
  ): string {
    return JSON.stringify(
      Object.fromEntries(
        [...new Set(formData.keys())].map(
          (...arg) => [
            arg[0],
            (formData.getAll(arg[0]).length > 1)
              ? formData.getAll(arg[0])
              : formData.get(arg[0])
          ]
        )
      )
    );
  }

  /**
   * 기준 숫자의 백분율 값을 적용했을 경우의 값을 반환한다.
   * 
   * ```
   * // returns 10
   * percentage(100, 10);
   * ```
   */
  static percentage(
    /** 기준 숫자 */ num: number,
    /** 백분율 */ per: number
  ): number { return num * (per / 100); }

  /**
   * 기준 숫자의 비율 대비 값을 반환한다.
   * 
   * ```
   * // returns 8 
   * // 1 : 2 = 4 : x
   * ratio([1, 2], 4);
   * 
   * // returns 2
   * // 1 : 2 = x : 4
   * ratio([1, 2], 4, false);
   * ```
   */
  static ratio(
    /** 비율 */ ratio: [number, number],
    /** 기준 숫자 */ num: number,
    /** 비율 적용 기준 #default `true` */ flag: boolean = true
  ): number {
    const index = flag
                    ? [1, 0]
                    : [0, 1];

    return (num * ratio[index[0]]) / ratio[index[1]];
  }

  /**
   * `x` 번째의 항이 `a`이고 공차가 `d`인 등차수열의 `n` 번째 항을 반환 한다.
   */
  static arithmeticSequence(
    /** 기준 항 */ a: number,
    /** 기준 위치 `x > 0`인 정수 */ x: number,
    /** 공차 */ d: number,
    /** 반환 위치 */ n: number
  ): number { return a + ((n - x) * d); }

  /**
   * `x` 번째의 항이 `a`이고 공비가 `r`인 등비수열의 `n` 번째 항을 반환 한다.
   */
  static geometricSequence(
    /** 기준 항 */ a: number,
    /** 기준 위치 `x > 0`인 정수 */ x: number,
    /** 공비 */ r: number,
    /** 반환 위치 */ n: number
  ): number { return (a / (r ** (x - 1))) * (r ** (n - 1)); }

  /**
   * `value`를 반올림(round), 내림(floor), 올림(ceil) 한 값을 반환한다.
   */
  static decimalAdjust(
    /** 구분 기준 `반올림(round)`, `내림(floor)`, `올림(ceil)` */ type: 'round' | 'floor' | 'ceil',
    /** 기준 값 */ value: number,
    /** 소숫점 아래 자리 수 #default `0` */ exp: number = 0
  ): number {
    const [ m, n = '0' ] = value.toString().split('e'),
    adjustValue = Math[type](Number(`${ m }e${ parseInt(n) + exp }`)),
    [ nm, nn = '0' ] = adjustValue.toString().split('e');

    return Number(`${ nm }e${ parseInt(nn) - exp }`);
  }

  /**
   * html entity를 인코딩 한다.
   */
  static encodeHtmlEntity(
    /** html entity를 인코딩 할 문자열 */ arg: string
  ): string {
    const textarea = document.createElement('textarea');

    textarea.innerText = arg;

    return textarea.innerHTML;
  }

  /**
   * html entity를 디코딩 한다.
   */
  static decodeHtmlEntity(
    /** html entity를 디코딩 할 문자열 */ arg: string
  ): string {
    const textarea = document.createElement('textarea');

    textarea.innerHTML = arg;

    return textarea.innerText;
  }

  /**
   * `Object`의 `deepCopy`를 반환 한다.
   */
  static copy<T extends Object>(
    /** `deepCopy`할 `object` */ arg?: T | null
  ): T {
    if (Util.isObject(arg)) {
      const result = {} as any;

      for (const i in arg) { result[i] = Util.copy(arg[i]); }

      return result;
    } else if (Array.isArray(arg)) {
      const result = [] as any;

      for (const i of arg) { result.push(Util.copy(i)); }

      return result;
    } else { return arg; }
  }

  /**
   * `sNum` <= x <= `eNum` 범위의 배열을 반환한다.
   */
  static numRange(
    /** 시작 값 */ sNum: number,
    /** 종료 값 */ eNum: number
  ): number[] {
    let range = (eNum - sNum);

    const flag = (range > 0);

    range = Math.abs(range) + 1;

    return [...new Array(range)].map((...arg) => (arg[1] * ((flag) ? 1 : -1)) + sNum);
  }

  /**
   * `size`를 크기로 하는 `chunk`를 담은 배열을 반환한다.
   */
  static arrayChunk<T>(
    /** 기준 배열 */ arr: T[],
    /** `chunk`의 크기 (`size > 0`인 정수) */ size: number
  ): T[][] {
    if (!Util.isNumber(size, true)) { throw new TypeError("size는 숫자 타입 이어야 합니다."); }
    if (
      size <= 0 &&
      Number.isInteger(size)
    ) { throw new RangeError("size는 0보다 큰 정수여야 합니다."); }

    const _arr = [];

    Util.numRange(0, Util.decimalAdjust('ceil', arr.length / size) + ((arr.length > 0) ? -1 : 0))
        .forEach((...arg) => { _arr.push(arr.slice(arg[0] * size, (arg[0] + 1) * size)); });

    return _arr;
  }

}