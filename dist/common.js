import { Util } from "@nuka9510/js-util";
import Plugin from "./plugin.js";
import Interceptor from "./interceptor.js";
export default class Common {
    #isInit = false;
    #action;
    #windowAction;
    /** `init` 실행 여부 */
    get isInit() { return this.#isInit; }
    /** `EventListener`에 할당 할 `data-eu-action`을 정의한 `action` */
    get action() { return {}; }
    /** `window`객체의 `EventListener`에 할당 할 `actionCallback` */
    get windowAction() { return []; }
    /** `Common`에서 사용할 모든 `action` */
    get allAction() {
        const plugin = Plugin.plugin.filter((...arg) => Util.empty(arg[0].common) ||
            arg[0].common.includes(this)), action = {
            ...plugin.reduce((...arg) => {
                return {
                    ...arg[0],
                    ...arg[1]?.action
                };
            }, {}),
            ...this.action
        }, windowAction = [
            ...plugin.reduce((...arg) => {
                return [
                    ...arg[0],
                    ...arg[1].windowAction
                ];
            }, []),
            ...this.windowAction
        ];
        let _action = {};
        for (const key in action) {
            for (const value of action[key].values()) {
                if (Util.empty(value.event)) {
                    _action[key] = [
                        ...(_action[key] ?? []),
                        value
                    ];
                }
            }
        }
        const keys = Object.keys(_action);
        if (!Util.empty(keys)) {
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
                    ...action[key].filter((...arg) => !Util.empty(arg[0].event)),
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
     * import { Common } from "@nuka9510/el-util";
     *
     * class Index extends Common {
     *   get action() {
     *     return {
     *       'test-click': [
     *         { event: 'click', callback: this.onTestClick }
     *       ]
     *     };
     *   }
     *
     *   onTestClick(ev) { alert('test'); }
     *
     * }
     *
     * new Index();
     * ```
     */
    constructor() {
        const updateEvent = this.updateEvent.bind(this), init = this.init.bind(this);
        this.updateEvent = () => {
            this.#updateEvent();
            updateEvent();
        };
        this.init = () => {
            this.#initAction();
            this.#addEvent();
            init();
            this.init = () => {
                this.updateEvent();
                init();
            };
            this.#isInit = true;
        };
    }
    /** `Common`객체 초기화. */
    init() { }
    #initAction() {
        const interceptor = Interceptor.interceptor, allAction = this.allAction;
        this.#action = allAction.action;
        this.#windowAction = allAction.windowAction;
        for (const action in this.#action) {
            this.#action[action].forEach((...arg) => { arg[0].listener = Common.#actionHandle(this, interceptor, arg[0].callback.bind(this), action, arg[0].flag).bind(this); });
        }
        this.#windowAction.forEach((...arg) => { arg[0].listener = Common.#actionHandle(this, interceptor, arg[0].callback.bind(this)).bind(this); });
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
        for (const action in this.#action) {
            this.#action[action]
                .forEach((...arg) => {
                if (Util.empty(arg[0].event)) {
                    return;
                }
                if (Array.isArray(arg[0].event)) {
                    arg[0].event
                        .forEach((..._arg) => window.addEventListener(_arg[0], arg[0].listener, arg[0].option));
                }
                else {
                    window.addEventListener(arg[0].event, arg[0].listener, arg[0].option);
                }
            });
        }
        this.#windowAction.forEach((...arg) => {
            if (Util.empty(arg[0].event)) {
                return;
            }
            if (Array.isArray(arg[0].event)) {
                arg[0].event
                    .forEach((..._arg) => window.addEventListener(_arg[0], arg[0].listener, arg[0].option));
            }
            else {
                window.addEventListener(arg[0].event, arg[0].listener, arg[0].option);
            }
        });
        this.addEvent();
    }
    /** `Common`객체의 `action`에 정의한 이벤트를 `removeEventListener`에 적용할 시 실행할 `callback`. */
    removeEvent() { }
    #removeEvent() {
        for (const action in this.#action) {
            this.#action[action]
                .forEach((...arg) => {
                if (Util.empty(arg[0].event)) {
                    return;
                }
                if (Array.isArray(arg[0].event)) {
                    arg[0].event
                        .forEach((..._arg) => window.removeEventListener(_arg[0], arg[0].listener, arg[0].option));
                }
                else {
                    window.removeEventListener(arg[0].event, arg[0].listener, arg[0].option);
                }
            });
        }
        this.#windowAction.forEach((...arg) => {
            if (Util.empty(arg[0].event)) {
                return;
            }
            if (Array.isArray(arg[0].event)) {
                arg[0].event
                    .forEach((..._arg) => window.removeEventListener(_arg[0], arg[0].listener, arg[0].option));
            }
            else {
                window.removeEventListener(arg[0].event, arg[0].listener, arg[0].option);
            }
        });
        this.removeEvent();
    }
    static #actionHandle(common, interceptor, callback, action, flag) {
        return async (ev) => {
            let target = ev.target;
            if (!Util.empty(action)) {
                if (!(ev.target instanceof HTMLElement)) {
                    return;
                }
                target = ev.target.closest(`[data-eu-action~="${action}"]`);
                if (Util.empty(target)) {
                    return;
                }
                if ((flag ?? false) &&
                    !(target.getAttribute('data-eu-event') ?? '')
                        .split(' ')
                        .includes(ev.type)) {
                    return;
                }
            }
            const preHandle = interceptor.filter((...arg) => Util.empty(arg[0].action) ||
                arg[0].action.includes(action))
                .map((...arg) => arg[0].preHandle), postHandle = interceptor.filter((...arg) => Util.empty(arg[0].action) ||
                arg[0].action.includes(action)).map((...arg) => arg[0].postHandle);
            for (const handle of preHandle) {
                if (!(handle?.(ev, target, common) ?? true)) {
                    return;
                }
            }
            await callback(ev, target, common);
            postHandle.forEach((...arg) => arg[0]?.(ev, target, common));
        };
    }
}
