import { JUtil } from "@nuka9510/js-util";
/**
 * Validation Check를 위한 객체
 */
export default class Validation {
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
        this.#regex = (!JUtil.empty(regex) &&
            JUtil.isObject(regex))
            ? {
                ...this.#regex,
                ...regex
            }
            : { ...this.#regex };
    }
    /** el에 있는 Element들을 required check한다.  */
    #required(el) {
        const required = el.getAttribute('required');
        if (!JUtil.empty(required)) {
            if (el.type == 'radio') {
                this.#setRadio(el);
            }
            else if (JUtil.empty(el.value)) {
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
        if (!JUtil.empty(pattern)) {
            if (JUtil.empty(this.#el.el)) {
                this.#el.el = [];
            }
            this.#el.el?.push(el);
        }
        if (!JUtil.empty(date)) {
            const state = el.dataset['svDateState'];
            switch (state) {
                case 'S':
                case 'E':
                    if (JUtil.empty(this.#el.date)) {
                        this.#el.date = {};
                    }
                    if (JUtil.empty(this.#el.date[date])) {
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
        if (!JUtil.empty(required)) {
            if (JUtil.empty(this.#radio[required])) {
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
                if (!JUtil.empty(sdate) &&
                    !JUtil.empty(edate)) {
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
                    if (!JUtil.empty(val) &&
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
                if (!JUtil.empty(val) &&
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
