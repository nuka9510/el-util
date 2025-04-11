var simpleValidation;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Validation)
/* harmony export */ });
/* harmony import */ var _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

/**
 * Validation Check를 위한 객체
 */
class Validation {
    /** 결과 값 객체 */
    result;
    /** validation check할 Element를 담는 객체 */
    #el;
    /** validation check할 radio Element를 담는 객체 */
    #radio;
    /** validation check에 사용할 정규식을 담은 객체 */
    #regex;
    /**
     * Validation Check를 위한 객체
     *
     * ```
     * <form name="form">
     *   <input type="text" name="text" data-sv-pattern="password" data-sv-input-name="비밀번호" minlength="0" maxlength="10">
     *   <input type="text" name="text" data-sv-pattern="password" minlength="0" maxlength="10" required="비밀번호">
     *   <input type="date" name="sdate1" data-sv-date="date1" data-sv-date-state="S" data-sv-input-name="검색일1">
     *   <input type="date" name="edate1" data-sv-date="date1" data-sv-date-state="E" data-sv-input-name="검색일1">
     *   <input type="date" name="sdate2" data-sv-date="date2" data-sv-date-state="S" required="검색일2">
     *   <input type="date" name="edate2" data-sv-date="date2" data-sv-date-state="E" required="검색일2">
     * </form>
     * <script type="importmap">
     *   {
     *     "imports": {
     *       "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util/dist/index.js",
     *       "@nuka9510/simple-validation": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-validation/dist/index.js"
     *     }
     *   }
     * </script>
     * <script type="module">
     *   import { SValidation } from "@nuka9510/simple-validation";
     *
     *   const validation = new SValidation({regex: {password: /^[\S!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`]{6,10}$/}});
     *
     *   validation.run(form);
     *
     *   if (validation.result.flag) {
     *     form.submit();
     *   } else {
     *     alert(validation.result.alertMsg);
     *     validation.result.el.focus();
     *   }
     * </script>
     * ```
     */
    constructor(config) { this.init(config); }
    /** 객체 초기화 */
    init(
    /** validation 초기화를 위한 객체 */ config = null) {
        this.#resultInit();
        this.#elInit();
        this.#radioInit();
        this.#regexInit(config?.regex);
    }
    /** 결과 값 초기화 */
    #resultInit() {
        this.result = {
            flag: true,
            alertMsg: null,
            el: null
        };
    }
    /** validation check할 Element를 담는 객체 초기화 */
    #elInit() { this.#el = {}; }
    /** validation check할 radio Element를 담는 객체 초기화 */
    #radioInit() { this.#radio = {}; }
    /** validation check에 사용할 정규식을 담은 객체 초기화 */
    #regexInit(regex = null) {
        this.#regex = (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(regex) &&
            _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.isObject(regex))
            ? {
                ...this.#regex,
                ...regex
            }
            : { ...this.#regex };
    }
    /** el에 있는 Element들을 required check한다.  */
    #required(el) {
        const required = el.getAttribute('required');
        if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(required)) {
            if (el.type == 'radio') {
                this.#setRadio(el);
            }
            else if (_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(el.value)) {
                this.result.flag = false;
                this.result.alertMsg = `'${required}'을/를 입력해 주세요.`;
                this.result.el = el;
            }
        }
    }
    /** radio에 있는 Element들을 required check한다.  */
    #requiredRadio() {
        for (const i in this.#radio) {
            const el = this.#radio[i][0], flag = this.#radio[i].some((...arg) => arg[0].checked);
            if (!flag) {
                this.result.flag = false;
                this.result.alertMsg = `'${i}'을/를 선택해주세요.`;
                this.result.el = el;
                break;
            }
        }
    }
    /** el에 Element를 담는다.  */
    #setEl(el) {
        const pattern = el.dataset['svPattern'], date = el.dataset['svDate'];
        if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(pattern)) {
            if (_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(this.#el.el)) {
                this.#el.el = [];
            }
            this.#el.el?.push(el);
        }
        if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(date)) {
            const state = el.dataset['svDateState'];
            switch (state) {
                case 'S':
                case 'E':
                    if (_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(this.#el.date)) {
                        this.#el.date = {};
                    }
                    if (_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(this.#el.date[date])) {
                        this.#el.date[date] = {};
                    }
                    this.#el.date[date][state] = el;
                    break;
            }
        }
    }
    /** `#radio`에 type이 'radio'인 Element를 담는다.  */
    #setRadio(el) {
        const required = el.getAttribute('required');
        if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(required)) {
            if (_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(this.#radio[required])) {
                this.#radio[required] = [el];
            }
            else {
                this.#radio[required].push(el);
            }
        }
    }
    /**
     * Element들을 validation check 한다.
     * ```
     * -----------------------
     * date : isDate
     * -----------------------
     * el : isPattern
     * ```
     */
    #match() {
        for (const i in this.#el) {
            if (this.result.flag) {
                switch (i) {
                    case 'date':
                        this.#isDate(this.#el[i]);
                        break;
                    case 'el':
                        this.#isPattern(this.#el[i]);
                        break;
                }
            }
            else {
                break;
            }
        }
    }
    /** date check */
    #isDate(el) {
        for (const i in el) {
            if (this.result.flag) {
                const sdate = el[i].S.value, edate = el[i].E.value;
                if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(sdate) &&
                    !_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(edate)) {
                    const inputName = el[i].S.dataset['svInputName'] ||
                        el[i].E.dataset['svInputName'], required = el[i].S.getAttribute('required') ||
                        el[i].E.getAttribute('required');
                    if ((new Date(sdate)).getTime() > (new Date(edate)).getTime()) {
                        this.result.flag = false;
                        this.result.alertMsg = `'${inputName || required}'의 시작일이 종료일 보다 늦습니다.`;
                        this.result.el = el[i].S;
                    }
                }
            }
            else {
                break;
            }
        }
    }
    /** regex check */
    #isPattern(el) {
        if (Array.isArray(el)) {
            for (const i of el) {
                const pattern = i.dataset['svPattern'], inputName = i.dataset['svInputName'], required = i.getAttribute('required'), val = i.value;
                if (Object.keys(this.#regex).includes(pattern)) {
                    if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(val) &&
                        !this.#regex[pattern].test(val)) {
                        this.result.flag = false;
                        this.result.alertMsg = `'${inputName || required}'의 형식이 올바르지 않습니다.`;
                        this.result.el = i;
                        break;
                    }
                }
            }
        }
        else {
            const pattern = el.dataset['svPattern'], inputName = el.dataset['svInputName'], required = el.getAttribute('required'), val = el.value;
            if (Object.keys(this.#regex).includes(pattern)) {
                if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(val) &&
                    !this.#regex[pattern].test(val)) {
                    this.result.flag = false;
                    this.result.alertMsg = `'${inputName || required}'의 형식이 올바르지 않습니다.`;
                    this.result.el = el;
                }
            }
        }
    }
    /** Element value의 length를 check 한다.  */
    #length() {
        for (const i in this.#el) {
            if (i == 'el' &&
                this.result.flag) {
                for (const j of this.#el[i]) {
                    const inputName = j.dataset['svInputName'], required = j.getAttribute('required'), val = j.value.length;
                    if (!(j instanceof HTMLSelectElement)) {
                        if (j.minLength >= 0 &&
                            j.maxLength >= 0) {
                            if (val < j.minLength ||
                                val > j.maxLength) {
                                this.result.flag = false;
                                this.result.alertMsg = `'${inputName || required}'은/는 ${j.minLength}~${j.maxLength}자 이내로 입력해주세요.`;
                                this.result.el = j;
                                break;
                            }
                        }
                        else if (j.minLength >= 0 &&
                            j.maxLength < 0) {
                            if (val < j.minLength) {
                                this.result.flag = false;
                                this.result.alertMsg = `'${inputName || required}'은/는 ${j.minLength}자 이상으로 입력해주세요.`;
                                this.result.el = j;
                                break;
                            }
                        }
                        else if (j.minLength < 0 &&
                            j.maxLength >= 0) {
                            if (val > j.maxLength) {
                                this.result.flag = false;
                                this.result.alertMsg = `'${inputName || required}'은/는 ${j.maxLength}자 이하로 입력해주세요.`;
                                this.result.el = j;
                                break;
                            }
                        }
                    }
                }
            }
            else if (!this.result.flag) {
                break;
            }
        }
    }
    /** validation을 실행한다. */
    run(form) {
        this.init();
        for (const el of form.elements) {
            if (this.result.flag) {
                if (['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) {
                    if (!el.disabled) {
                        this.#required(el);
                        this.#setEl(el);
                    }
                }
            }
            else {
                break;
            }
        }
        if (this.result.flag) {
            this.#requiredRadio();
        }
        if (this.result.flag) {
            this.#match();
        }
        if (this.result.flag) {
            this.#length();
        }
    }
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JUtil: () => (/* reexport safe */ _util_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _util_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);




/***/ }),
/* 3 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Util)
/* harmony export */ });
class Util {
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
    /** 확인할 값 */ arg) {
        let result = [undefined, null, 0, ''].includes(arg);
        if (!result) {
            if (arg.constructor == Object) {
                result = Object.keys(arg).length == 0 &&
                    Object.keys(Object.getPrototypeOf(arg)).length == 0;
            }
            else if (arg.constructor == NodeList) {
                result = arg.length == 0;
            }
            else if (Array.isArray(arg)) {
                result = arg.length == 0;
            }
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
    /** 확인할 값 */ arg, 
    /** `true`일 경우 `arg`의 `type`도 확인 #default `false` */ strict = false) {
        let result = !Number.isNaN(Number(arg)) &&
            ['number', 'string'].includes(typeof arg) &&
            !/^\s*$/.test(`${arg}`);
        if (result &&
            strict) {
            result = typeof arg == 'number';
        }
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
    /** 확인할 값 */ arg) { return arg?.constructor == Object; }
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
    /** 변환할 숫자 */ num, 
    /** 소숫점 아래 자리 수 #default `0` */ decimals = 0, 
    /** 소수점 구분자 #default `'.'` */ decimalSeparator = '.', 
    /** 천 단위 구분자 #default `','` */ thousandsSeparator = ',') {
        const result = String(num).split('.');
        result[0] = result[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
        if (!Util.empty(result[1])) {
            result[1] = result[1].substring(0, decimals);
        }
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
    /** 변환할 `Date`객체 */ date, 
    /** 변활할 포맷 문자열 */ format) {
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
    /** 년 */ year, 
    /** 월 */ month, 
    /** 일 */ day) {
        const date = new Date(year, (month - 1), day);
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
    /** 기준 날짜 */ date1, 
    /** 비교할 날짜 #default `new Date()` */ date2 = new Date()) { return Util.strftime(date1, '%Y-%m-%d') == Util.strftime(date2, '%Y-%m-%d'); }
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
    /** 요일을 반환할 `Date` 객체 */ date, 
    /** 해당 요일의 약어반환 대한 구분 값 `false`일 경우 약어 반환 #default `true` */ flag = true) {
        const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'], result = week[date.getDay()];
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
    /** 기준 `Date`객체 */ date, 
    /** `Date`객체에 계산할 `interval` */ interval) {
        return new Date(date.getFullYear() + (Util.isNumber(interval.year, true) ? interval.year : 0), date.getMonth() + (Util.isNumber(interval.month, true) ? interval.month : 0), date.getDate() + (Util.isNumber(interval.day, true) ? interval.day : 0), date.getHours() + (Util.isNumber(interval.hour, true) ? interval.hour : 0), date.getMinutes() + (Util.isNumber(interval.minute, true) ? interval.minute : 0), date.getSeconds() + (Util.isNumber(interval.second, true) ? interval.second : 0), date.getMilliseconds() + (Util.isNumber(interval.millisecond, true) ? interval.millisecond : 0));
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
    /** 기준 `Date`객체 */ date, 
    /** `Date`객체에 계산할 `interval` */ interval) {
        return new Date(date.getFullYear() - (Util.isNumber(interval.year, true) ? interval.year : 0), date.getMonth() - (Util.isNumber(interval.month, true) ? interval.month : 0), date.getDate() - (Util.isNumber(interval.day, true) ? interval.day : 0), date.getHours() - (Util.isNumber(interval.hour, true) ? interval.hour : 0), date.getMinutes() - (Util.isNumber(interval.minute, true) ? interval.minute : 0), date.getSeconds() - (Util.isNumber(interval.second, true) ? interval.second : 0), date.getMilliseconds() - (Util.isNumber(interval.millisecond, true) ? interval.millisecond : 0));
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
    /** 비교할 값 1 */ arg1, 
    /** 비교할 값 2 */ arg2) {
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
    /** `json`문자열로 반환할 `FormData`객체 */ formData) {
        return JSON.stringify(Object.fromEntries([...new Set(formData.keys())].map((...arg) => [
            arg[0],
            (formData.getAll(arg[0]).length > 1)
                ? formData.getAll(arg[0])
                : formData.get(arg[0])
        ])));
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
    /** 기준 숫자 */ num, 
    /** 백분율 */ per) { return num * (per / 100); }
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
    /** 비율 */ ratio, 
    /** 기준 숫자 */ num, 
    /** 비율 적용 기준 #default `true` */ flag = true) {
        const index = flag
            ? [1, 0]
            : [0, 1];
        return (num * ratio[index[0]]) / ratio[index[1]];
    }
    /**
     * `x` 번째의 항이 `a`이고 공차가 `d`인 등차수열의 `n` 번째 항을 반환 한다.
     */
    static arithmeticSequence(
    /** 기준 항 */ a, 
    /** 기준 위치 `x > 0`인 정수 */ x, 
    /** 공차 */ d, 
    /** 반환 위치 */ n) { return a + ((n - x) * d); }
    /**
     * `x` 번째의 항이 `a`이고 공비가 `r`인 등비수열의 `n` 번째 항을 반환 한다.
     */
    static geometricSequence(
    /** 기준 항 */ a, 
    /** 기준 위치 `x > 0`인 정수 */ x, 
    /** 공비 */ r, 
    /** 반환 위치 */ n) { return (a / (r ** (x - 1))) * (r ** (n - 1)); }
    /**
     * `value`를 반올림(round), 내림(floor), 올림(ceil) 한 값을 반환한다.
     */
    static decimalAdjust(
    /** 구분 기준 `반올림(round)`, `내림(floor)`, `올림(ceil)` */ type, 
    /** 기준 값 */ value, 
    /** 소숫점 아래 자리 수 #default `0` */ exp = 0) {
        const [m, n = '0'] = value.toString().split('e'), adjustValue = Math[type](Number(`${m}e${parseInt(n) + exp}`)), [nm, nn = '0'] = adjustValue.toString().split('e');
        return Number(`${nm}e${parseInt(nn) - exp}`);
    }
    /**
     * html entity를 인코딩 한다.
     */
    static encodeHtmlEntity(
    /** html entity를 인코딩 할 문자열 */ arg) {
        const textarea = document.createElement('textarea');
        textarea.innerText = arg;
        return textarea.innerHTML;
    }
    /**
     * html entity를 디코딩 한다.
     */
    static decodeHtmlEntity(
    /** html entity를 디코딩 할 문자열 */ arg) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = arg;
        return textarea.innerText;
    }
    /**
     * `Object`의 `deepCopy`를 반환 한다.
     */
    static copy(
    /** `deepCopy`할 `object` */ arg) {
        if (Util.isObject(arg)) {
            const result = {};
            for (const i in arg) {
                result[i] = Util.copy(arg[i]);
            }
            return result;
        }
        else if (Array.isArray(arg)) {
            const result = [];
            for (const i of arg) {
                result.push(Util.copy(i));
            }
            return result;
        }
        else {
            return arg;
        }
    }
    /**
     * `sNum` <= x <= `eNum` 범위의 배열을 반환한다.
     */
    static numRange(
    /** 시작 값 */ sNum, 
    /** 종료 값 */ eNum) {
        let range = (eNum - sNum);
        const flag = (range > 0);
        range = Math.abs(range) + 1;
        return [...new Array(range)].map((...arg) => (arg[1] * ((flag) ? 1 : -1)) + sNum);
    }
    /**
     * `size`를 크기로 하는 `chunk`를 담은 배열을 반환한다.
     */
    static arrayChunk(
    /** 기준 배열 */ arr, 
    /** `chunk`의 크기 (`size > 0`인 정수) */ size) {
        if (!Util.isNumber(size, true)) {
            throw new TypeError("size는 숫자 타입 이어야 합니다.");
        }
        if (size <= 0 &&
            Number.isInteger(size)) {
            throw new RangeError("size는 0보다 큰 정수여야 합니다.");
        }
        const _arr = [];
        Util.numRange(0, Util.decimalAdjust('ceil', arr.length / size) + ((arr.length > 0) ? -1 : 0))
            .forEach((...arg) => { _arr.push(arr.slice(arg[0] * size, (arg[0] + 1) * size)); });
        return _arr;
    }
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JUtil: () => (/* reexport safe */ _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_1__.JUtil),
/* harmony export */   Validation: () => (/* reexport safe */ _validation_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _validation_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);




})();

simpleValidation = __webpack_exports__;
/******/ })()
;