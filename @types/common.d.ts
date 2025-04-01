export interface childWindow {
  [windowName: string]: Window | null;
}

export interface actionCallback {
  event?: string;
  callback: (ev: Event) => void | Promise<void>;
  option?: EventListenerOptions;
}

export interface action {
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
  'prevent-default'?: actionCallback[];
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
  'stop-propagation'?: actionCallback[];
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
  'get'?: actionCallback[];
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
  'post'?: actionCallback[];
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
  'sub-select'?: actionCallback[];
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
  'check-all'?: actionCallback[];
  /**
   * ```
   * <button type="button" data-eu-action="win-open" data-eu-option="[ string ]" data-eu-url="[ string ]"> 버튼 </button>
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
  'win-open'?: actionCallback[];
  /**
   * ```
   * <button type="button" data-eu-action="win-close"> 버튼 </button>
   * ```
   */
  'win-close'?: actionCallback[];
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
  'number-only'?: actionCallback[];
  /**
   * ```
   * <button type="button" data-eu-action="clipboard" data-eu-value="[ string ]">복사</button>
   * ```
   * 
   * ### attribute
   * #### data-eu-value
   * - 복사할 문자열
   */
  'clipboard'?: actionCallback[];
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
  'check'?: actionCallback[];
  [data_eu_action: string]: actionCallback[];
}

export interface submitMsg {
  reg: '등록하시겠습니까?';
  mod: '수정하시겠습니까?';
  del: '삭제하시겠습니까?';
}

export interface NumberOnlyElement extends HTMLInputElement {
  event_key_code?: KeyboardEvent['keyCode'];
  prev_value?: string;
  prev_selection?: number;
}

export interface ChildCloseEventDetail {
  reload?: boolean;
  callback?: string;
}

export type ChildCloseEvent = CustomEvent<ChildCloseEventDetail>;

export type ChildCloseEventOption = CustomEventInit<ChildCloseEventDetail>;