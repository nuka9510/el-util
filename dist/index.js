var elUtil;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Common)
/* harmony export */ });
/* harmony import */ var _nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _plugin_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _interceptor_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);



class Common {
    #isInit = false;
    /** `init` 실행 여부 */
    get isInit() { return this.#isInit; }
    #childWindow;
    #submitMsg = {
        reg: '등록하시겠습니까?',
        mod: '수정하시겠습니까?',
        del: '삭제하시겠습니까?'
    };
    #_action;
    get #action() {
        return {
            'prevent-default': [
                { callback: this.#onPreventDefault }
            ],
            'stop-propagation': [
                { callback: this.#onStopPropagation }
            ],
            'get': [
                { callback: this.#onGet }
            ],
            'post': [
                { callback: this.#onPost }
            ],
            'sub-select': [
                { event: 'change', callback: this.#onSubSelect }
            ],
            'check-all': [
                { event: 'click', callback: this.#onCheckAll, option: { capture: true } }
            ],
            'win-open': [
                { event: 'click', callback: this.#onWinOpen }
            ],
            'win-close': [
                { event: 'click', callback: this.#onWinClose }
            ],
            'number-only': [
                { event: 'keydown', callback: this.#onNumberOnlyKeydown },
                { event: 'input', callback: this.#onNumberOnlyInput },
                { event: 'blur', callback: this.#onNumberOnlyBlur }
            ],
            'clipboard': [
                { event: 'click', callback: this.#onClipboard }
            ],
            'check': [
                { event: 'click', callback: this.#onCheck }
            ]
        };
    }
    #_windowAction;
    get #windowAction() {
        return [
            { event: 'child-close', callback: this.#onChildClose }
        ];
    }
    /** `submit` 이벤트를 전달할 `HTMLFormElement` 객체 */
    form;
    /** `validation` 확인을 위한 객체 */
    validation;
    /** `EventListener`에 할당 할 `data-eu-action`을 정의한 `action` */
    get action() { return {}; }
    /** `window`객체의 `EventListener`에 할당 할 `actionCallback` */
    get windowAction() { return []; }
    /** `EUCommon`에서 사용할 모든 `action` */
    get allAction() {
        const plugin = _plugin_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].plugin.filter((...arg) => _nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(arg[0].target) ||
            arg[0].target.includes(this));
        return {
            action: {
                ...this.#action,
                ...plugin.reduce((...arg) => {
                    return {
                        ...arg[0],
                        ...arg[1].plugin.action
                    };
                }, {}),
                ...this.action
            },
            windowAction: [
                ...this.#windowAction,
                ...plugin.reduce((...arg) => {
                    return [
                        ...arg[0],
                        ...arg[1].plugin.windowAction
                    ];
                }, []),
                ...this.windowAction
            ]
        };
    }
    /**
     * ```
     * <button type="button" data-eu-action="test-click">test-click</button>
     * <script type="importmap">
     *   {
     *     "imports": {
     *       "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util/dist/index.js",
     *       "@nuka9510/simple-validation": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-validation/dist/index.js",
     *       "@nuka9510/simple-enum": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-enum/dist/index.js",
     *       "@nuka9510/el-util": "https://cdn.jsdelivr.net/npm/@nuka9510/el-util/dist/index.js"
     *     }
     *   }
     * </script>
     * <script type="module">
     *   import { EUCommon } from "@nuka9510/el-util";
     *
     *   class Index extends EUCommon {
     *     get action() {
     *       return {
     *         'test-click': [
     *           { event: 'click', callback: this.onTestClick }
     *         ]
     *       };
     *     }
     *
     *     onTestClick(ev) { alert('test'); }
     *
     *   }
     *
     *   new Index();
     * </script>
     * ```
     */
    constructor(config) {
        const addEvent = this.addEvent.bind(this), init = this.init.bind(this);
        this.addEvent = () => {
            this.#addEvent();
            addEvent();
        };
        this.init = () => {
            init();
            this.#init();
            this.addEvent();
            this.init = () => {
                init();
                this.addEvent();
            };
            this.#isInit = true;
        };
        this.validation = new _nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.SValidation(config);
    }
    /** `Common`객체 초기화. */
    init() { }
    #init() {
        const allAction = this.allAction;
        this.#_action = allAction.action;
        this.#_windowAction = allAction.windowAction;
        for (const action in this.#_action) {
            this.#_action[action].forEach((...arg) => { arg[0].callback = _interceptor_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].actionHandle(arg[0].callback.bind(this)).bind(this); });
        }
        this.#_windowAction.forEach((...arg) => {
            this.#_windowAction[arg[1]] = {
                ...arg[0],
                callback: _interceptor_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].actionHandle(arg[0].callback.bind(this)).bind(this)
            };
        });
    }
    /** `Common`객체의 `action`에 정의한 이벤트를 `addEventListener`에 적용한다. */
    addEvent() { }
    #addEvent() {
        for (const action in this.#_action) {
            document.querySelectorAll(`[data-eu-action~="${action}"]`).forEach((...arg) => {
                this.#_action[action].forEach((..._arg) => {
                    if (_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(_arg[0].event)) {
                        arg[0].dataset['euEvent']?.split(' ').forEach((...__arg) => {
                            if (!_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(__arg[0])) {
                                arg[0].addEventListener(__arg[0], _arg[0].callback, _arg[0].option);
                            }
                        });
                    }
                    else {
                        arg[0].addEventListener(_arg[0].event, _arg[0].callback, _arg[0].option);
                    }
                });
            });
        }
        this.#_windowAction.forEach((...arg) => { window.addEventListener(arg[0].event, arg[0].callback, arg[0].option); });
    }
    /**
     * ```
     * <input type="radio" data-eu-action="prevent-default" data-eu-event="[ string ]">
     * ```
     *
     * ### attribute
     * #### data-eu-event
     * - 이벤트
     * - separator: `' '`
     */
    #onPreventDefault(ev) { ev.preventDefault(); }
    /**
     * ```
     * <button type="button" data-eu-action="stop-propagation" data-eu-event="[ string ]"> 버튼 </button>
     * ```
     *
     * ### attribute
     * #### data-eu-event
     * - 이벤트
     * - separator: `' '`
     */
    #onStopPropagation(ev) { ev.stopPropagation(); }
    /** `data-eu-action="get"`의 이벤트가 실행 되기 전에 실행 한다. */
    async onGetBefore(ev) { }
    ;
    /** `data-eu-action="get"`의 이벤트가 실행 된 후에 실행 한다. */
    async onGetAfter(ev) { }
    ;
    /**
     * ```
     * <button type="submit" data-eu-action="get" data-eu-url="[ string ]" data-eu-validation="[ 'Y' | 'N' ]" data-eu-event="[ string ]"> submit </button>
     * ```
     *
     * ## attribute
     * #### data-eu-url
     * - link
     * #### data-eu-validation - `optional`
     * - validation check 구분
     * - default: `'Y'`
     * #### data-eu-event
     * - 이벤트
     * - separator: `' '`
     */
    async #onGet(ev) {
        const node = ev.currentTarget;
        await this.onGetBefore(ev)
            .then(async (result) => {
            if (!_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(this.form)) {
                this.validation.init();
                if (result ?? true) {
                    if ((node.dataset['euValidation'] ?? 'Y') == 'Y') {
                        this.validation.run(this.form);
                    }
                    if (this.validation.result.flag) {
                        this.form.action = node.dataset['euUrl'];
                        this.form.submit();
                    }
                    else {
                        await this.onGetAfter(ev);
                        alert(this.validation.result.alertMsg);
                        this.validation.result.el?.focus();
                    }
                }
            }
            else {
                if (result ?? true) {
                    location.href = node.dataset['euUrl'];
                }
            }
        });
    }
    /** `data-eu-action="post"`의 이벤트가 실행 되기 전에 실행 한다. */
    async onPostBefore(ev) { }
    ;
    /** `data-eu-action="post"`의 이벤트가 실행 된 후에 실행 한다. */
    async onPostAfter(ev) { }
    /**
     * ```
     * <button type="submit" data-eu-action="post" data-eu-url="[ string ]" data-eu-state="[ 'reg' | 'mod' | 'del' ]" data-eu-validation="[ 'Y' | 'N' ]" data-eu-msg="[ string ]" data-eu-event="[ string ]"> submit </button>
     * ```
     *
     * ## attribute
     * #### data-eu-url
     * - link
     * #### data-eu-state - `optional`
     * - post type
     * #### data-eu-validation - `optional`
     * - validation check 구분
     * - default:
     * - - data-eu-state="del":
     * - - - `'N'`
     * - - otherwise:
     * - - - `'Y'`
     * #### data-eu-msg - `optional`
     * - confirm msg
     * #### data-eu-event
     * - 이벤트
     * - separator: `' '`
     */
    async #onPost(ev) {
        const node = ev.currentTarget;
        await this.onPostBefore(ev)
            .then(async (result) => {
            let flag = true;
            this.validation.init();
            if (result ?? true) {
                if (_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(node.dataset['euMsg'] || node.dataset['euState']) ||
                    confirm(node.dataset['euMsg'] || this.#submitMsg[node.dataset['euState']])) {
                    if ((node.dataset['euValidation'] ?? ((node.dataset['euState'] == 'del') ? 'N' : 'Y')) == 'Y') {
                        this.validation.run(this.form);
                    }
                    if (this.validation.result.flag) {
                        this.form.action = `${node.dataset['euUrl']}${location.search}`;
                        this.form.submit();
                    }
                    else {
                        await this.onPostAfter(ev);
                        alert(this.validation.result.alertMsg);
                        this.validation.result.el?.focus();
                    }
                }
                else {
                    flag = false;
                }
            }
            else {
                flag = false;
            }
            if (!flag) {
                await this.onPostAfter(ev);
            }
        });
    }
    /** `data-eu-action="sub-select"`의 이벤트가 실행 된 후에 실행 한다. */
    async onSubSelectAfter(ev) { }
    /**
     * ```
     * <select data-eu-action="sub-select" data-eu-target="[ string ]">
     *    <option value="a">A</option>
     *    <option value="b">B</option>
     * </select>
     * <select data-eu-name="[ string ]">
     *    <option style="display: none" data-eu-main="[ string ]" value="1">1</option>
     *    <option style="display: none" data-eu-main="[ string ]" value="2">2</option>
     *    <option style="display: none" data-eu-main="[ string ]" value="3">3</option>
     *    <option style="display: none" data-eu-main="[ string ]" value="4">4</option>
     *    <option style="display: none" data-eu-main="[ string ]" value="5">5</option>
     *    <option style="display: none" data-eu-main="[ string ]" value="6">6</option>
     * </select>
     * ```
     *
     * ### attribute
     * #### data-eu-target
     * - target `data-eu-name`
     * #### data-eu-name
     * #### data-eu-main
     * - main `optionElement` `value`
     */
    #onSubSelect(ev) {
        const node = ev.currentTarget, subNode = document.querySelectorAll(`select[data-eu-name="${node.dataset['euTarget']}"]`);
        subNode.forEach(async (...arg) => {
            arg[0].querySelectorAll('option').forEach((..._arg) => {
                if (!_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(_arg[0].value)) {
                    _arg[0].style.setProperty('display', (node.value == _arg[0].dataset['euMain']) ? 'block' : 'none');
                }
            });
            arg[0].value = '';
            await this.onSubSelectAfter(ev);
            arg[0].dispatchEvent(new Event('change'));
        });
    }
    /** `data-eu-action="check-all"`의 이벤트가 실행 된 후에 실행 한다. */
    async onCheckAllAfter(ev) { }
    /**
     * ```
     * <input type="checkbox" data-eu-action="check-all" data-eu-target="[ string ]">
     * <input type="checkbox" data-eu-name="[ string ]">
     * <input type="checkbox" data-eu-name="[ string ]">
     * ```
     *
     * ### attribute
     * #### data-eu-target
     * - target `data-eu-name`
     * #### data-eu-name
     */
    async #onCheckAll(ev) {
        const node = ev.currentTarget;
        document.querySelectorAll(`input[type="checkbox"][data-eu-name='${node.dataset['euTarget']}']`).forEach((...arg) => { arg[0].checked = node.checked; });
        await this.onCheckAllAfter(ev);
    }
    /**
     * ```
     * <form id="[ string ]">
     *   <input type="text" name="name" value="value">
     * </form>
     * <button type="button" data-eu-action="win-open" data-eu-option="[ string ]" data-eu-url="[ string ]" data-eu-form="[ form ]"> 버튼 </button>
     * <script type="application/json" data-eu-name="win-open" data-eu-id="[ string ]">
     *   {"name": "[window-name]", "pos": "center", "width": 1700, "height": 800, "scrollbars": "yes", "resizable": "yes"}
     * </script>
     * ```
     *
     * ### attribute
     * #### data-eu-option
     * - target `data-eu-id`
     * #### data-eu-url
     * - link
     * #### data-eu-form
     * - form tag id
     * #### data-eu-id
     */
    #onWinOpen(ev) {
        const node = ev.currentTarget;
        if (!_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(node.dataset['euOption'])) {
            const url = /^https?:/.test(node.dataset['euUrl']) ? new URL(node.dataset['euUrl']) : new URL(node.dataset['euUrl'], location.origin), option = JSON.parse(document.querySelector(`script[data-eu-name="win-open"][data-eu-id="${node.dataset['euOption']}"]`)?.innerText ?? '{}');
            if (!_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(node.dataset['euForm'])) {
                const form = document.querySelector(`form${node.dataset['euForm']}`), searchParam = new URLSearchParams(new FormData(form));
                url.search = `${url.search || '?'}${url.search && '&'}${searchParam}`;
            }
            let optiontext = '';
            switch (option?.pos) {
                case 'center':
                    option.top = (screen.height - option.height) / 2;
                    option.left = (screen.width - option.width) / 2;
                    break;
            }
            for (const key in option) {
                if (!['name', 'pos'].includes(key)) {
                    if (!_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(optiontext)) {
                        optiontext += ', ';
                    }
                    optiontext += `${key}=${option[key]}`;
                }
            }
            if (_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(option.name)) {
                window.open(url, undefined, optiontext);
            }
            else {
                const childWindow = window.open(url, option.name, optiontext);
                this.#childWindow = _nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(this.#childWindow)
                    ? { [option.name]: childWindow }
                    : {
                        ...this.#childWindow,
                        [option.name]: childWindow
                    };
            }
        }
    }
    /**
     * ```
     * <button type="button" data-eu-action="win-close"> 버튼 </button>
     * ```
     */
    #onWinClose(ev) { window.close(); }
    #onNumberOnlyKeydown(ev) {
        const node = ev.currentTarget;
        /** 한글 입력시 input 이벤트가 여러번 발생하는 현상 보정을 위한 로직 */
        if (ev.keyCode == 229) {
            node.event_key_code = ev.keyCode;
            node.prev_value = node.value;
            node.prev_selection = node.selectionStart;
        }
        else {
            delete node.event_key_code;
            delete node.prev_value;
            delete node.prev_selection;
        }
    }
    #onNumberOnlyInput(ev) {
        const node = ev.currentTarget;
        /** 한글 입력시 input 이벤트가 여러번 발생하는 현상 보정을 위한 로직 */
        if (node.event_key_code == 229) {
            if (!ev.isComposing) {
                node.value = node.prev_value;
                node.selectionStart = node.prev_selection;
            }
            else {
                delete node.event_key_code;
                delete node.prev_value;
                delete node.prev_selection;
            }
        }
        if (ev.data != null) {
            const regex = {
                A: /[\d]/,
                B: /[\d\.\-]/,
                C: /[\d\.]/
            };
            if (!regex[node.dataset['euType'] ?? 'A'].test(ev.data) &&
                !_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(node.selectionStart)) {
                node.selectionStart -= 1;
            }
        }
        this.#onNumberOnly(ev);
    }
    #onNumberOnlyBlur(ev) { this.#onNumberOnly(ev); }
    /**
     * ```
     * <input type="text" data-eu-action="number-only" data-eu-type="[ 'A' | 'B' | 'C' ]" data-eu-min="[ number ]" data-eu-max="[ number ]" data-eu-decimal="[ number ]">
     * ```
     *
     * ### attribute
     * #### data-eu-type
     * - `A`: 숫자만 허용
     * - `B`: 소숫점 및 음수 허용
     * - `C`: #,###.# 형식으로 변환
     * #### data-eu-min - `optional`
     * - 최소값
     * #### data-eu-max - `optional`
     * - 최대값
     * #### data-eu-decimal - `optional`
     * - 소숫점 아래 자리 수
     * - #defalut: `0`
     */
    #onNumberOnly(ev) {
        const node = ev.currentTarget, type = node.dataset['euType'] ?? 'A', min = node.dataset['euMin'], max = node.dataset['euMax'], regex = {
            A: /[^\d]/g,
            B: /[^\d\.\-]/g,
            C: /[^\d]/g
        };
        let selection = node.selectionStart, decimal;
        if (type == 'C') {
            const value = node.value.split('.');
            selection = node.selectionStart - [...node.value.matchAll(/,/g)].length;
            node.value = value[0];
            decimal = value.filter((el, i, arr) => i > 0).join('').substring(0, parseInt(node.dataset['euDecimal'] ?? '0'));
            decimal = `${!_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(decimal) ? '.' : ''}${decimal}`;
        }
        node.value = node.value.replace(regex[type], '');
        if (type == 'C') {
            if (!_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(node.value) ||
                !_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(decimal)) {
                const num = parseInt(node.value || '0');
                node.value = `${_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.numberFormat(num)}${decimal}`;
                selection += [...node.value.matchAll(/,/g)].length;
            }
        }
        if (_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.isNumber(min) ||
            _nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.isNumber(max)) {
            let flag = false, value, num;
            if (type == 'C') {
                value = Number(node.value.replace(/,/g, ''));
            }
            else {
                value = Number(node.value);
            }
            if (!flag &&
                _nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.isNumber(min)) {
                if (_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(node.value) ||
                    value < Number(min)) {
                    num = Number(min);
                    flag = true;
                }
            }
            if (!flag &&
                _nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.isNumber(max) &&
                value > Number(max)) {
                num = Number(max);
                flag = true;
            }
            if (flag) {
                let _value;
                if (type == 'C') {
                    _value = _nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.numberFormat(num, parseInt(node.dataset['euDecimal'] ?? '0'));
                }
                else {
                    _value = `${num}`;
                }
                selection -= node.value.length - _value.length;
                node.value = _value;
            }
        }
        if (!_nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(node.selectionEnd)) {
            node.selectionEnd = selection;
        }
    }
    /**
     * ```
     * <button type="button" data-eu-action="clipboard" data-eu-value="[ string ]">복사</button>
     * ```
     *
     * ### attribute
     * #### data-eu-value
     * - 복사할 문자열
     */
    async #onClipboard(ev) {
        const node = ev.currentTarget;
        await navigator.clipboard
            .writeText(node.dataset['euValue'])
            .then((value) => { alert('링크가 클립보드에 저장되었습니다.'); })
            .catch((e) => { console.error(e); });
    }
    /** `data-eu-action="check"`의 이벤트가 실행 된 후에 실행 한다. */
    async onCheckAfter(ev) { }
    /**
     * ```
     * <input type="checkbox" data-eu-action="check" data-eu-target="[ string ]">
     * <input type="hidden" value="[ string ]" data-eu-name="[ string ]" data-eu-true="[ string ]" data-eu-false="[ string ]">
     * ```
     *
     * ### attribute
     * #### data-eu-target
     * - target `data-eu-name`
     * #### data-eu-name
     * #### data-eu-true
     * - `true` 일 경우 `value`
     * #### data-eu-false
     * - `false` 일 경우 `value`
     */
    async #onCheck(ev) {
        const node = ev.currentTarget, target = document.querySelector(`input[data-eu-name="${node.dataset['euTarget']}"]`);
        target.value = node.checked ? target.dataset['euTrue'] : target.dataset['euFalse'];
        await this.onCheckAfter(ev);
    }
    /** `ChildCloseEvent`객체를 반환 한다. */
    static childCloseEvent(opt) { return new CustomEvent('child-close', opt); }
    /** `window`객체에 `ChildCloseEvent`이벤트가 전달 되었을 경우 실행 한다. */
    async onChildClose(ev) { }
    ;
    /**
     * ```
     * <script>
     *   opener.dispatchEvent(new CustomEvent('child-close'));
     *   window.close();
     * </script>
     * ```
     */
    async #onChildClose(ev) {
        await this.onChildClose(ev);
        if (ev.detail.reload ?? true) {
            location.reload();
        }
    }
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JUtil: () => (/* reexport safe */ _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_1__.JUtil),
/* harmony export */   SValidation: () => (/* reexport safe */ _validation_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _validation_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);





/***/ }),
/* 3 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Validation)
/* harmony export */ });
/* harmony import */ var _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);

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
/* 4 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JUtil: () => (/* reexport safe */ _util_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _util_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);




/***/ }),
/* 5 */
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
    /** `true`일 경우 `arg`의 `type`도 확인 | #default `false` */ strict = false) {
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
    /** 변환할 숫자 - `number` 타입이 아닌경우 `null` 반환 */ num, 
    /** 소숫점 아래 자리 수 - `number` 타입이 아닌경우 `null` 반환 | #default `0` */ decimals = 0, 
    /** 소수점 구분자 | #default `'.'` */ decimalSeparator = '.', 
    /** 천 단위 구분자 | #default `','` */ thousandsSeparator = ',') {
        if (!Util.isNumber(num, true) ||
            !Util.isNumber(decimals, true)) {
            return null;
        }
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
    /** 비교할 날짜 | #default `new Date()` */ date2 = new Date()) { return Util.strftime(date1, '%Y-%m-%d') == Util.strftime(date2, '%Y-%m-%d'); }
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
    /** 해당 요일의 약어반환 대한 구분 값 `false`일 경우 약어 반환 | #default `true` */ flag = true) {
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
    /** 비율 적용 기준 | #default `true` */ flag = true) {
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
    /** 소숫점 아래 자리 수 | #default `0` */ exp = 0) {
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


/***/ }),
/* 6 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Plugin)
/* harmony export */ });
/* harmony import */ var _nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

class Plugin {
    /** `EUCommon`에 사용할 `plugin` 배열 객체 */
    static #plugin = [];
    /** `EUCommon`에 사용할 `plugin` 배열 객체 */
    static get plugin() { return _nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.copy(Plugin.#plugin); }
    /** `EUCommon`에 사용할 `plugin`을 추가 한다.  */
    static appendPlugin(plugin) { Plugin.#plugin.push(plugin); }
}


/***/ }),
/* 7 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Interceptor)
/* harmony export */ });
/* harmony import */ var _nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

class Interceptor {
    /** `EUCommon`에 사용할 `interceptor` 배열 객체 */
    static #interceptor = [];
    /** `EUCommon`에 사용할 `interceptor` 배열 객체 */
    static get interceptor() { return _nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_0__.JUtil.copy(Interceptor.#interceptor); }
    /** `EUCommon`에 사용할 `interceptor`을 추가 한다.  */
    static appendInterceptor(interceptor) { Interceptor.#interceptor.push(interceptor); }
    static actionHandle(callback) {
        return async (ev) => {
            const preHandle = Interceptor.interceptor.map((...arg) => arg[0].preHandle), postHandle = Interceptor.interceptor.map((...arg) => arg[0].postHandle);
            for (const handle of preHandle) {
                if (!(handle?.(ev, callback) ?? true)) {
                    return;
                }
            }
            await callback(ev);
            postHandle.forEach((...arg) => arg[0]?.(ev, callback));
        };
    }
}


/***/ }),
/* 8 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JUtil: () => (/* reexport safe */ _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_1__.JUtil),
/* harmony export */   SEnum: () => (/* reexport safe */ _enum_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _enum_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);





/***/ }),
/* 9 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Enum)
/* harmony export */ });
/* harmony import */ var _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);

class Enum {
    /** `Enum`객체 고유 값 */
    #value;
    /**
     * `Enum`객체
     *
     * ```
     * import { SEnum } from "@nuka9510/simple-enum";
     *
     * class Enum extends SEnum {
     *   static #A = new Enum('A');
     *
     *   static #B = new Enum('B');
     *
     *   static get A() { return Enum.#A; }
     *
     *   static get B() { return Enum.#B; }
     *
     *   constructor(value) { super(value); }
     * }
     *
     * const e = Enum.valueOf('A');
     *
     * switch (e) {
     *   case Enum.A: console.log('A', e.value, Enum.A.value); break;
     *   case Enum.B: console.log('B', e.value, Enum.B.value); break;
     * }
     * ```
     */
    constructor(value) {
        this.#value = value;
        Enum.#setEnums(value, this);
    }
    /** `Enum`객체 고유 값 */
    get value() {
        if (this.#value?.constructor != Object) {
            return this.#value;
        }
        const __enums__ = Object.getOwnPropertyDescriptor(this.constructor, '__enums__'), __value__ = __enums__.value?.find((...arg) => arg[0].value == this.#value), property = { value: __value__?.id }, value = _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.copy(this.#value);
        Object.defineProperty(value, '__enums_id__', property);
        return value;
    }
    /** `Enum`객체의 `property`를 설정한다. */
    static #setEnums(value, enums) {
        const __constructor__ = enums.constructor, __enums__ = (Object.getOwnPropertyDescriptor(__constructor__, '__enums__') ?? {}), __value__ = (__enums__.value ?? []);
        if (__value__.some((...arg) => arg[0].value == value)) {
            throw new Error('이미 등록된 값 입니다.');
        }
        Object.defineProperty(__constructor__, '__enums__', {
            ...__enums__,
            value: [
                ...__value__,
                {
                    value: value,
                    enums: enums,
                    id: `${__constructor__.name}-${Date.now()}-${__value__.length}`
                }
            ],
            configurable: true
        });
    }
    /** `value`를 고유 값으로 가지는 `Enum`객체를 반환한다. */
    static valueOf(value) {
        const __enums__ = (Object.getOwnPropertyDescriptor(this, '__enums__') ?? {});
        if (value?.constructor != Object) {
            return __enums__.value?.find((...arg) => arg[0].value == value)?.enums;
        }
        return __enums__.value?.find((...arg) => value.hasOwnProperty('__enums_id__')
            ? arg[0].id == Object.getOwnPropertyDescriptor(value, '__enums_id__')?.value
            : arg[0].value == value)?.enums;
    }
    /** `Enum`객체에 정의된 `enum`들을 `Iterator`객체로 반환한다. */
    static values() {
        const __enums__ = (Object.getOwnPropertyDescriptor(this, '__enums__') ?? {});
        return __enums__.value
            ?.values()
            .map((...arg) => arg[0].enums) ?? null;
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
/* harmony export */   Common: () => (/* reexport safe */ _common_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   Interceptor: () => (/* reexport safe */ _interceptor_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   JUtil: () => (/* reexport safe */ _nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_3__.JUtil),
/* harmony export */   Plugin: () => (/* reexport safe */ _plugin_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   SEnum: () => (/* reexport safe */ _nuka9510_simple_enum__WEBPACK_IMPORTED_MODULE_4__.SEnum),
/* harmony export */   SValidation: () => (/* reexport safe */ _nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_3__.SValidation)
/* harmony export */ });
/* harmony import */ var _common_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _plugin_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _interceptor_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _nuka9510_simple_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _nuka9510_simple_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);







})();

elUtil = __webpack_exports__;
/******/ })()
;