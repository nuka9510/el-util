import { SValidation } from "@nuka9510/simple-validation";
import { JUtil } from "@nuka9510/js-util";
import Plugin from "./plugin.mjs";
import Interceptor from "./interceptor.mjs";
export default class Common {
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
        const plugin = Plugin.plugin.filter((...arg) => JUtil.empty(arg[0].target) ||
            arg[0].target.includes(this)), action = {
            ...this.#action,
            ...plugin.reduce((...arg) => {
                return {
                    ...arg[0],
                    ...arg[1].plugin.action
                };
            }, {}),
            ...this.action
        }, windowAction = [
            ...this.#windowAction,
            ...plugin.reduce((...arg) => {
                return [
                    ...arg[0],
                    ...arg[1].plugin.windowAction
                ];
            }, []),
            ...this.windowAction
        ];
        let _action = {};
        for (const key in action) {
            for (const value of action[key].values()) {
                if (JUtil.empty(value.event)) {
                    _action[key] = [
                        ...(_action[key] ?? []),
                        value
                    ];
                }
            }
        }
        const keys = Object.keys(_action);
        if (!JUtil.empty(keys)) {
            document.querySelectorAll(`[data-eu-action~="${keys.join('"], [data-eu-action~="')}"]`)
                .forEach((...arg) => {
                if (!arg[0].hasAttribute('data-eu-event')) {
                    return;
                }
                const event = arg[0].getAttribute('data-eu-event')
                    .split(' ');
                arg[0].getAttribute('data-eu-action')
                    .split(' ')
                    .filter((..._arg) => keys.includes(_arg[0]))
                    .forEach((..._arg) => {
                    _action[_arg[0]].forEach((...__arg) => {
                        _action[_arg[0]][__arg[1]] = {
                            ...__arg[0],
                            event: [
                                ...(__arg[0].event ?? []),
                                ...event.filter((...___arg) => !(__arg[0].event ?? []).includes(___arg[0]))
                            ],
                            flag: true
                        };
                    });
                });
            });
            for (const key in _action) {
                action[key] = [
                    ...action[key].filter((...arg) => !JUtil.empty(arg[0].event)),
                    ..._action[key]
                ];
            }
        }
        return {
            action: action,
            windowAction: windowAction
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
        const updateEvent = this.updateEvent.bind(this), init = this.init.bind(this);
        this.updateEvent = () => {
            this.#updateEvent();
            updateEvent();
        };
        this.init = () => {
            init();
            this.#initAction();
            this.#addEvent();
            this.init = () => {
                init();
                this.updateEvent();
            };
            this.#isInit = true;
        };
        this.validation = new SValidation(config);
    }
    /** `Common`객체 초기화. */
    init() { }
    #initAction() {
        const allAction = this.allAction;
        this.#_action = allAction.action;
        this.#_windowAction = allAction.windowAction;
        for (const action in this.#_action) {
            this.#_action[action].forEach((...arg) => { arg[0].callback = Interceptor.actionHandle(arg[0].callback.bind(this), action, arg[0].flag).bind(this); });
        }
        this.#_windowAction.forEach((...arg) => {
            this.#_windowAction[arg[1]] = {
                ...arg[0],
                callback: Interceptor.actionHandle(arg[0].callback.bind(this)).bind(this)
            };
        });
    }
    /**
     * `Common`객체의 `action`에 정의한 이벤트들의 `eventListener`를 갱신한다.
     * `removeEventListener` -> `addEventListener`
     * `eventListener`를 갱신 후 실행할 `callback` 정의.
     */
    updateEvent() { }
    #updateEvent() {
        this.#removeEvent();
        this.#initAction();
        this.#addEvent();
    }
    /** `Common`객체의 `action`에 정의한 이벤트를 `addEventListener`에 적용할 시 실행할 `callback`. */
    addEvent() { }
    #addEvent() {
        for (const action in this.#_action) {
            this.#_action[action]
                .forEach((...arg) => {
                if (JUtil.empty(arg[0].event)) {
                    return;
                }
                if (Array.isArray(arg[0].event)) {
                    arg[0].event
                        .forEach((..._arg) => window.addEventListener(_arg[0], arg[0].callback, arg[0].option));
                }
                else {
                    window.addEventListener(arg[0].event, arg[0].callback, arg[0].option);
                }
            });
        }
        this.#_windowAction.forEach((...arg) => {
            if (JUtil.empty(arg[0].event)) {
                return;
            }
            if (Array.isArray(arg[0].event)) {
                arg[0].event
                    .forEach((..._arg) => window.addEventListener(_arg[0], arg[0].callback, arg[0].option));
            }
            else {
                window.addEventListener(arg[0].event, arg[0].callback, arg[0].option);
            }
        });
        this.addEvent();
    }
    /** `Common`객체의 `action`에 정의한 이벤트를 `removeEventListener`에 적용할 시 실행할 `callback`. */
    removeEvent() { }
    #removeEvent() {
        for (const action in this.#_action) {
            this.#_action[action]
                .forEach((...arg) => {
                if (JUtil.empty(arg[0].event)) {
                    return;
                }
                if (Array.isArray(arg[0].event)) {
                    arg[0].event
                        .forEach((..._arg) => window.removeEventListener(_arg[0], arg[0].callback, arg[0].option));
                }
                else {
                    window.removeEventListener(arg[0].event, arg[0].callback, arg[0].option);
                }
            });
        }
        this.#_windowAction.forEach((...arg) => {
            if (JUtil.empty(arg[0].event)) {
                return;
            }
            if (Array.isArray(arg[0].event)) {
                arg[0].event
                    .forEach((..._arg) => window.removeEventListener(_arg[0], arg[0].callback, arg[0].option));
            }
            else {
                window.removeEventListener(arg[0].event, arg[0].callback, arg[0].option);
            }
        });
        this.removeEvent();
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
    #onPreventDefault(ev, target) { ev.preventDefault(); }
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
    #onStopPropagation(ev, target) { ev.stopPropagation(); }
    /** `data-eu-action="get"`의 이벤트가 실행 되기 전에 실행 한다. */
    async onGetBefore(ev, target) { }
    ;
    /** `data-eu-action="get"`의 이벤트가 실행 된 후에 실행 한다. */
    async onGetAfter(ev, target) { }
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
    async #onGet(ev, target) {
        await this.onGetBefore(ev, target)
            .then(async (result) => {
            if (!JUtil.empty(this.form)) {
                this.validation.init();
                if (result ?? true) {
                    if ((target.dataset['euValidation'] ?? 'Y') == 'Y') {
                        this.validation.run(this.form);
                    }
                    if (this.validation.result.flag) {
                        this.form.action = target.dataset['euUrl'];
                        this.form.submit();
                    }
                    else {
                        await this.onGetAfter(ev, target);
                        alert(this.validation.result.alertMsg);
                        this.validation.result.el?.focus();
                    }
                }
            }
            else {
                if (result ?? true) {
                    location.href = target.dataset['euUrl'];
                }
            }
        });
    }
    /** `data-eu-action="post"`의 이벤트가 실행 되기 전에 실행 한다. */
    async onPostBefore(ev, target) { }
    ;
    /** `data-eu-action="post"`의 이벤트가 실행 된 후에 실행 한다. */
    async onPostAfter(ev, target) { }
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
    async #onPost(ev, target) {
        await this.onPostBefore(ev, target)
            .then(async (result) => {
            let flag = true;
            this.validation.init();
            if (result ?? true) {
                if (JUtil.empty(target.dataset['euMsg'] || target.dataset['euState']) ||
                    confirm(target.dataset['euMsg'] || this.#submitMsg[target.dataset['euState']])) {
                    if ((target.dataset['euValidation'] ?? ((target.dataset['euState'] == 'del') ? 'N' : 'Y')) == 'Y') {
                        this.validation.run(this.form);
                    }
                    if (this.validation.result.flag) {
                        this.form.action = `${target.dataset['euUrl']}${location.search}`;
                        this.form.submit();
                    }
                    else {
                        await this.onPostAfter(ev, target);
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
                await this.onPostAfter(ev, target);
            }
        });
    }
    /** `data-eu-action="sub-select"`의 이벤트가 실행 된 후에 실행 한다. */
    async onSubSelectAfter(ev, target) { }
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
    #onSubSelect(ev, target) {
        const subNode = document.querySelectorAll(`select[data-eu-name="${target.dataset['euTarget']}"]`);
        subNode.forEach(async (...arg) => {
            arg[0].querySelectorAll('option').forEach((..._arg) => {
                if (!JUtil.empty(_arg[0].value)) {
                    _arg[0].style.setProperty('display', (target.value == _arg[0].dataset['euMain']) ? 'block' : 'none');
                }
            });
            arg[0].value = '';
            await this.onSubSelectAfter(ev, target);
            arg[0].dispatchEvent(new Event('change'));
        });
    }
    /** `data-eu-action="check-all"`의 이벤트가 실행 된 후에 실행 한다. */
    async onCheckAllAfter(ev, target) { }
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
    async #onCheckAll(ev, target) {
        document.querySelectorAll(`input[type="checkbox"][data-eu-name="${target.dataset['euTarget']}"]`).forEach((...arg) => { arg[0].checked = target.checked; });
        await this.onCheckAllAfter(ev, target);
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
    #onWinOpen(ev, target) {
        if (!JUtil.empty(target.dataset['euOption'])) {
            const url = /^https?:/.test(target.dataset['euUrl']) ? new URL(target.dataset['euUrl']) : new URL(target.dataset['euUrl'], location.origin), option = JSON.parse(document.querySelector(`script[data-eu-name="win-open"][data-eu-id="${target.dataset['euOption']}"]`)?.innerText ?? '{}');
            if (!JUtil.empty(target.dataset['euForm'])) {
                const form = document.querySelector(`form${target.dataset['euForm']}`), searchParam = new URLSearchParams(new FormData(form));
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
                    if (!JUtil.empty(optiontext)) {
                        optiontext += ', ';
                    }
                    optiontext += `${key}=${option[key]}`;
                }
            }
            if (JUtil.empty(option.name)) {
                window.open(url, undefined, optiontext);
            }
            else {
                const childWindow = window.open(url, option.name, optiontext);
                this.#childWindow = JUtil.empty(this.#childWindow)
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
    #onWinClose(ev, target) { window.close(); }
    #onNumberOnlyKeydown(ev, target) {
        /** 한글 입력시 input 이벤트가 여러번 발생하는 현상 보정을 위한 로직 */
        if (ev.keyCode == 229) {
            target.event_key_code = ev.keyCode;
            target.prev_value = target.value;
            target.prev_selection = target.selectionStart;
        }
        else {
            delete target.event_key_code;
            delete target.prev_value;
            delete target.prev_selection;
        }
    }
    #onNumberOnlyInput(ev, target) {
        /** 한글 입력시 input 이벤트가 여러번 발생하는 현상 보정을 위한 로직 */
        if (target.event_key_code == 229) {
            if (!ev.isComposing) {
                target.value = target.prev_value;
                target.selectionStart = target.prev_selection;
            }
            else {
                delete target.event_key_code;
                delete target.prev_value;
                delete target.prev_selection;
            }
        }
        if (ev.data != null) {
            const regex = {
                A: /[\d]/,
                B: /[\d\.\-]/,
                C: /[\d\.]/
            };
            if (!regex[target.dataset['euType'] ?? 'A'].test(ev.data) &&
                !JUtil.empty(target.selectionStart)) {
                target.selectionStart -= 1;
            }
        }
        this.#onNumberOnly(ev, target);
    }
    #onNumberOnlyBlur(ev, target) { this.#onNumberOnly(ev, target); }
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
    #onNumberOnly(ev, target) {
        const type = target.dataset['euType'] ?? 'A', min = target.dataset['euMin'], max = target.dataset['euMax'], regex = {
            A: /[^\d]/g,
            B: /[^\d\.\-]/g,
            C: /[^\d]/g
        };
        let selection = target.selectionStart, decimal;
        if (type == 'C') {
            const value = target.value.split('.');
            selection = target.selectionStart - [...target.value.matchAll(/,/g)].length;
            target.value = value[0];
            decimal = value.filter((el, i, arr) => i > 0).join('').substring(0, parseInt(target.dataset['euDecimal'] ?? '0'));
            decimal = `${!JUtil.empty(decimal) ? '.' : ''}${decimal}`;
        }
        target.value = target.value.replace(regex[type], '');
        if (type == 'C') {
            if (!JUtil.empty(target.value) ||
                !JUtil.empty(decimal)) {
                const num = parseInt(target.value || '0');
                target.value = `${JUtil.numberFormat(num)}${decimal}`;
                selection += [...target.value.matchAll(/,/g)].length;
            }
        }
        if (JUtil.isNumber(min) ||
            JUtil.isNumber(max)) {
            let flag = false, value, num;
            if (type == 'C') {
                value = Number(target.value.replace(/,/g, ''));
            }
            else {
                value = Number(target.value);
            }
            if (!flag &&
                JUtil.isNumber(min)) {
                if (JUtil.empty(target.value) ||
                    value < Number(min)) {
                    num = Number(min);
                    flag = true;
                }
            }
            if (!flag &&
                JUtil.isNumber(max) &&
                value > Number(max)) {
                num = Number(max);
                flag = true;
            }
            if (flag) {
                let _value;
                if (type == 'C') {
                    _value = JUtil.numberFormat(num, parseInt(target.dataset['euDecimal'] ?? '0'));
                }
                else {
                    _value = `${num}`;
                }
                selection -= target.value.length - _value.length;
                target.value = _value;
            }
        }
        if (!JUtil.empty(target.selectionEnd)) {
            target.selectionEnd = selection;
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
    async #onClipboard(ev, target) {
        await navigator.clipboard
            .writeText(target.dataset['euValue'])
            .then((value) => { alert('링크가 클립보드에 저장되었습니다.'); })
            .catch((e) => { console.error(e); });
    }
    /** `data-eu-action="check"`의 이벤트가 실행 된 후에 실행 한다. */
    async onCheckAfter(ev, target) { }
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
    async #onCheck(ev, target) {
        const targetEl = document.querySelector(`input[data-eu-name="${target.dataset['euTarget']}"]`);
        targetEl.value = target.checked ? targetEl.dataset['euTrue'] : targetEl.dataset['euFalse'];
        await this.onCheckAfter(ev, target);
    }
    /** `ChildCloseEvent`객체를 반환 한다. */
    static childCloseEvent(opt) { return new CustomEvent('child-close', opt); }
    /** `window`객체에 `ChildCloseEvent`이벤트가 전달 되었을 경우 실행 한다. */
    async onChildClose(ev, target) { }
    ;
    /**
     * ```
     * <script>
     *   opener.dispatchEvent(new CustomEvent('child-close'));
     *   window.close();
     * </script>
     * ```
     */
    async #onChildClose(ev, target) {
        await this.onChildClose(ev, target);
        if (ev.detail.reload ?? true) {
            location.reload();
        }
    }
}
