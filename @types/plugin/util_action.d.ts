import { Common } from "../../src/index.js";
import { actionItem } from "../common";

export interface NumberOnlyElement extends HTMLInputElement {
  event_key_code?: KeyboardEvent['keyCode'];
  prev_value?: string;
  prev_selection?: number | null;
}

export interface ChildCloseEventDetail {
  reload?: boolean;
  callback?: string;
}

export type ChildCloseEvent = CustomEvent<ChildCloseEventDetail>;

export type ChildCloseEventOption = CustomEventInit<ChildCloseEventDetail>;

export interface childWindow {
  [windowName: string]: Window | null;
}

export interface EUPropertyDescriptor<T> extends PropertyDescriptor {
  value?: T;
  get?(): T;
  set?(v: T): void;
}

export interface plugin {
  common?: Common[];
  action: {
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
    'sub-select': actionItem[];
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
    'check-all': actionItem[];
    /**
      * ```
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
      * #### data-eu-id
      */
    'win-open': actionItem[];
    /**
      * ```
      * <button type="button" data-eu-action="win-close"> 버튼 </button>
      * ```
      */
    'win-close': actionItem[];
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
    'number-only': actionItem[];
    /**
      * ```
      * <button type="button" data-eu-action="clipboard" data-eu-value="[ string ]">복사</button>
      * ```
      * 
      * ### attribute
      * #### data-eu-value
      * - 복사할 문자열
      */
    'clipboard': actionItem[];
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
    'check': actionItem[];
  };
  /**
   * child-close 
   * `Common` 상속 객체
   * ```
   * async onChildClose(
   *   ev: ChildCloseEvent,
   *   target: EventTarget,
   *   common: Common
   * ): Promise<void> {}
   * ```
   * 
   * child window
   * ```
   * <script>
   *   opener.dispatchEvent(new CustomEvent('child-close'));
   *   window.close();
   * </script>
   * ```
   */
  windowAction: [ actionItem ];
}