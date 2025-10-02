import { action, actionCallback, allAction, ChildCloseEvent, ChildCloseEventOption, childWindow, NumberOnlyElement } from "../@types/common";
import { plugin } from "../@types/plugin";
import { Util } from "@nuka9510/js-util";
import Plugin from "./plugin.js";
import Interceptor from "./interceptor.js";

export default class Common {
  #isInit: boolean = false;

  /** `init` 실행 여부 */
  get isInit(): boolean { return this.#isInit; }

  #childWindow?: childWindow;

  #_action: action;

  get #action(): action {
    return {
      'prevent-default': [
        { callback: this.#onPreventDefault, option: { capture: true } }
      ],
      'sub-select': [
        { event: 'change', callback: this.#onSubSelect }
      ],
      'check-all': [
        { event: 'click', callback: this.#onCheckAll }
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
        { event: 'blur', callback: this.#onNumberOnlyBlur, option: { capture: true } }
      ],
      'clipboard': [
        { event: 'click', callback: this.#onClipboard }
      ],
      'check': [
        { event: 'click', callback: this.#onCheck }
      ]
    };
  }

  #_windowAction: actionCallback[];

  get #windowAction(): actionCallback[] {
    return [
      { event: 'child-close', callback: this.#onChildClose }
    ];
  }

  /** `EventListener`에 할당 할 `data-eu-action`을 정의한 `action` */
  get action(): action { return {}; }

  /** `window`객체의 `EventListener`에 할당 할 `actionCallback` */
  get windowAction(): actionCallback[] { return []; }

  /** `Common`에서 사용할 모든 `action` */
  get allAction(): allAction {
    const plugin: plugin[] = Plugin.plugin.filter(
      (...arg) => Util.empty(arg[0].target) ||
                  arg[0].target.includes(this)
    ),
    action: action = {
      ...this.#action,
      ...plugin.reduce(
        (...arg) => {
          return {
            ...arg[0],
            ...arg[1].plugin.action
          };
        }, {}
      ),
      ...this.action
    },
    windowAction: actionCallback[] = [
      ...this.#windowAction,
      ...plugin.reduce(
        (...arg) => {
          return [
            ...arg[0],
            ...arg[1].plugin.windowAction
          ];
        }, []
      ),
      ...this.windowAction
    ];

    let _action: action = {};

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
      document.querySelectorAll(`[data-eu-action~="${ keys.join('"], [data-eu-action~="') }"]`)
              .forEach((...arg) => {
                if (!arg[0].hasAttribute('data-eu-event')) { return; }

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
    const updateEvent = this.updateEvent.bind(this),
    init = this.init.bind(this);

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
      }

      this.#isInit = true;
    }
  }

  /** `Common`객체 초기화. */
  init(): void {}

  #initAction(): void {
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
  updateEvent() {}

  #updateEvent() {
    this.#removeEvent();
    this.#initAction();
    this.#addEvent();
  }

  /** `Common`객체의 `action`에 정의한 이벤트를 `addEventListener`에 적용할 시 실행할 `callback`. */
  addEvent(): void {}

  #addEvent(): void {
    for (const action in this.#_action) {
      this.#_action[action]
          .forEach((...arg) => {
            if (Util.empty(arg[0].event)) { return; }

            if (Array.isArray(arg[0].event)) {
              arg[0].event
                    .forEach((..._arg) => window.addEventListener(_arg[0], arg[0].callback, arg[0].option));
            } else { window.addEventListener(arg[0].event, arg[0].callback, arg[0].option) }
          });
    }

    this.#_windowAction.forEach((...arg) => {
      if (Util.empty(arg[0].event)) { return; }

      if (Array.isArray(arg[0].event)) {
        arg[0].event
              .forEach((..._arg) => window.addEventListener(_arg[0], arg[0].callback, arg[0].option))
      } else { window.addEventListener(arg[0].event, arg[0].callback, arg[0].option) }
    });

    this.addEvent();
  }

  /** `Common`객체의 `action`에 정의한 이벤트를 `removeEventListener`에 적용할 시 실행할 `callback`. */
  removeEvent(): void {}

  #removeEvent(): void {
    for (const action in this.#_action) {
      this.#_action[action]
          .forEach((...arg) => {
            if (Util.empty(arg[0].event)) { return; }

            if (Array.isArray(arg[0].event)) {
              arg[0].event
                    .forEach((..._arg) => window.removeEventListener(_arg[0], arg[0].callback, arg[0].option));
            } else { window.removeEventListener(arg[0].event, arg[0].callback, arg[0].option) }
          });
    }

    this.#_windowAction.forEach((...arg) => {
      if (Util.empty(arg[0].event)) { return; }

      if (Array.isArray(arg[0].event)) {
        arg[0].event
              .forEach((..._arg) => window.removeEventListener(_arg[0], arg[0].callback, arg[0].option))
      } else { window.removeEventListener(arg[0].event, arg[0].callback, arg[0].option) }
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
  #onPreventDefault(
    ev: Event,
    target: HTMLElement
  ): void { ev.preventDefault(); }

  /** `data-eu-action="sub-select"`의 이벤트가 실행 된 후에 실행 한다. */
  async onSubSelectAfter(
    ev: Event,
    target: HTMLSelectElement
  ): Promise<void> {}

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
  #onSubSelect(
    ev: Event,
    target: HTMLSelectElement
  ): void {
    const subNode = document.querySelectorAll<HTMLSelectElement>(`select[data-eu-name="${ target.dataset['euTarget'] }"]`);

    subNode.forEach(async (...arg) => {
      arg[0].querySelectorAll('option').forEach((..._arg) => {
        if (!Util.empty(_arg[0].value)) { _arg[0].style.setProperty('display', (target.value == _arg[0].dataset['euMain']) ? 'block' : 'none'); }
      });

      arg[0].value = '';

      await this.onSubSelectAfter(ev, target);

      arg[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  /** `data-eu-action="check-all"`의 이벤트가 실행 된 후에 실행 한다. */
  async onCheckAllAfter(
    ev: MouseEvent,
    target: HTMLInputElement
  ): Promise<void> {}

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
  async #onCheckAll(
    ev: MouseEvent,
    target: HTMLInputElement
  ): Promise<void> {
    document.querySelectorAll<HTMLInputElement>(`input[type="checkbox"][data-eu-name="${ target.dataset['euTarget'] }"]`).forEach((...arg) => { arg[0].checked = target.checked; });

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
  #onWinOpen(
    ev: Event,
    target: HTMLElement
  ): void {
    if (!Util.empty(target.dataset['euOption'])) {
      const url = /^https?:/.test(target.dataset['euUrl']) ? new URL(target.dataset['euUrl']) :  new URL(target.dataset['euUrl'], location.origin),
      option = JSON.parse(document.querySelector<HTMLScriptElement>(`script[data-eu-name="win-open"][data-eu-id="${ target.dataset['euOption'] }"]`)?.innerText ?? '{}');

      if (!Util.empty(target.dataset['euForm'])) {
        const form = document.querySelector<HTMLFormElement>(`form${ target.dataset['euForm'] }`),
        searchParam = new URLSearchParams(new FormData(form) as unknown as string[][]);

        url.search = `${ url.search || '?' }${ url.search && '&' }${ searchParam }`;
      }

      let optiontext = '';

      switch (option?.pos) {
        case 'center':
          option.top = ( screen.height - option.height ) / 2;
          option.left = ( screen.width - option.width ) / 2;
          break;
      }

      for (const key in option) {
        if (!['name', 'pos'].includes(key)) {
          if (!Util.empty(optiontext)) { optiontext += ', ' }

          optiontext += `${ key }=${ option[key] }`
        }
      }

      if (Util.empty(option.name)) {
        window.open(url, undefined, optiontext);
      } else {
        const childWindow = window.open(url, option.name, optiontext);

        this.#childWindow = Util.empty(this.#childWindow)
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
  #onWinClose(
    ev: MouseEvent,
    target: HTMLElement
  ): void { window.close(); }

  #onNumberOnlyKeydown(
    ev: KeyboardEvent,
    target: NumberOnlyElement
  ): void {
    /** 한글 입력시 input 이벤트가 여러번 발생하는 현상 보정을 위한 로직 */
    if (ev.keyCode == 229) {
      target.event_key_code = ev.keyCode;
      target.prev_value = target.value;
      target.prev_selection = target.selectionStart;
    } else {
      delete target.event_key_code;
      delete target.prev_value;
      delete target.prev_selection;
    }
  }

  #onNumberOnlyInput(
    ev: InputEvent,
    target: NumberOnlyElement
  ): void {
    /** 한글 입력시 input 이벤트가 여러번 발생하는 현상 보정을 위한 로직 */
    if (target.event_key_code == 229) {
      if (!ev.isComposing) {
        target.value = target.prev_value;
        target.selectionStart = target.prev_selection;
      } else {
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

      if (
        !regex[target.dataset['euType'] ?? 'A'].test(ev.data) &&
        !Util.empty(target.selectionStart)
      ) { (target.selectionStart as number) -= 1; }
    }

    this.#onNumberOnly(ev, target);
  }

  #onNumberOnlyBlur(
    ev: FocusEvent,
    target: NumberOnlyElement
  ): void { this.#onNumberOnly(ev, target); }

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
  #onNumberOnly(
    ev: Event,
    target: NumberOnlyElement
  ): void {
    const type = target.dataset['euType'] ?? 'A',
    min = target.dataset['euMin'],
    max = target.dataset['euMax'],
    regex = {
      A: /[^\d]/g,
      B: /[^\d\.\-]/g,
      C: /[^\d]/g
    };

    let selection = target.selectionStart,
    decimal: string | undefined;

    if (type == 'C') {
      const value = target.value.split('.');

      selection = target.selectionStart - [...target.value.matchAll(/,/g)].length;

      target.value = value[0];

      decimal = value.filter((el, i, arr) => i > 0).join('').substring(0, parseInt(target.dataset['euDecimal'] ?? '0'));
      decimal = `${ !Util.empty(decimal) ? '.' : '' }${ decimal }`;
    }

    target.value = target.value.replace(regex[type], '');

    if (type == 'C') {
      if (
        !Util.empty(target.value) ||
        !Util.empty(decimal)
      ) {
        const num = parseInt(target.value || '0');

        target.value = `${ Util.numberFormat(num) }${ decimal }`;

        selection += [...target.value.matchAll(/,/g)].length;
      }
    }

    if (
      Util.isNumber(min) ||
      Util.isNumber(max)
    ) {
      let flag = false,
      value: number,
      num: number;

      if (type == 'C') {
        value = Number(target.value.replace(/,/g, ''));
      } else { value = Number(target.value); }

      if (
        !flag &&
        Util.isNumber(min)
      ) {
        if (
          Util.empty(target.value) ||
          value < Number(min)
        ) {
          num = Number(min);

          flag = true;
        }
      }

      if (
        !flag &&
        Util.isNumber(max) &&
        value > Number(max)
      ) {
        num = Number(max);

        flag = true;
      }

      if (flag) {
        let _value: string;

        if (type == 'C') {
          _value = Util.numberFormat(num, parseInt(target.dataset['euDecimal'] ?? '0'));
        } else { _value = `${ num }`; }

        selection -= target.value.length - _value.length;
        target.value = _value;
      }
    }

    if (!Util.empty(target.selectionEnd)) { target.selectionEnd = selection; }
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
  async #onClipboard(
    ev: Event,
    target: HTMLElement
  ): Promise<void> {
    await navigator.clipboard
      .writeText(target.dataset['euValue'])
      .then((value) => { alert('링크가 클립보드에 저장되었습니다.'); })
      .catch((e) => { console.error(e); });
  }

  /** `data-eu-action="check"`의 이벤트가 실행 된 후에 실행 한다. */
  async onCheckAfter(
    ev: MouseEvent,
    target: HTMLInputElement
  ): Promise<void> {}

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
  async #onCheck(
    ev: MouseEvent,
    target: HTMLInputElement
  ): Promise<void> {
    const targetEl = document.querySelector<HTMLInputElement>(`input[data-eu-name="${ target.dataset['euTarget'] }"]`);

    targetEl.value = target.checked ? targetEl.dataset['euTrue'] : targetEl.dataset['euFalse'];

    await this.onCheckAfter(ev, target);
  }

  /** `ChildCloseEvent`객체를 반환 한다. */
  static childCloseEvent(
    opt: ChildCloseEventOption
  ): ChildCloseEvent { return new CustomEvent('child-close', opt); }

  /** `window`객체에 `ChildCloseEvent`이벤트가 전달 되었을 경우 실행 한다. */
  async onChildClose(
    ev: ChildCloseEvent,
    target: EventTarget
  ): Promise<void> {};

  /**
   * ```
   * <script>
   *   opener.dispatchEvent(new CustomEvent('child-close'));
   *   window.close();
   * </script>
   * ```
   */
  async #onChildClose(
    ev: ChildCloseEvent,
    target: EventTarget
  ): Promise<void> {
    await this.onChildClose(ev, target);

    if (ev.detail.reload ?? true) { location.reload(); }
  }

}