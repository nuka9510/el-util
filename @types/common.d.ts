import { Common } from "@nuka9510/el-util";

export interface actionItem {
  /**
   * `EventListener`에 적용할 `event`  \
   * 지정되지 않았을 경우 `data-eu-event`의 값 사용
   */
  event?: string | string[];
  /** `EventListener`에 적용할 `callback` */
  callback: <T extends Event, U extends HTMLElement> (
    ev: T,
    target: U | EventTarget,
    common: Common
  ) => void | Promise<void>;
  /** `EventListener`에 적용할 `option` */
  option?: EventListenerOptions;
  /** 지정되지 않았을 경우 `data-eu-event` `attribute`를 사용하여 `event`를 지정했는지 여부 */
  flag?: boolean;
  listener?: (ev: Event) => Promise<void>;
}

export interface action {
  [data_eu_action: string]: actionItem[];
}

export interface allAction {
  action: action;
  windowAction: actionItem[];
}