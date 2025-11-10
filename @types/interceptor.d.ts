import { Common } from "@nuka9510/el-util";

export interface interceptor {
  /**
   * `Interceptor`를 적용할 `Common`  \
   * 지정되지 않았을 경우 모든 `Common`에 적용
   */
  common?: Common[];
  /**
   * `Interceptor`를 적용할 `action`명  \
   * 지정되지 않았을 경우 모든 `action`에 적용
   */
  action?: string[];
  /**
   * `action`동작 전에 실행 할 `callback`  \
   * `false` 반환 시 `action` 중단
   */
  preHandle?: <T extends Event, U extends HTMLElement> (
    ev: T,
    target: U | EventTarget,
    common: Common
  ) => boolean | void;
  /** `action`동작 이후 실행 할 `callback`  \ */
  postHandle?: <T extends Event, U extends HTMLElement> (
    ev: T,
    target: U | EventTarget,
    common: Common
  ) => void;
}