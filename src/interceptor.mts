import { JUtil } from "@nuka9510/simple-validation";
import { actionCallback } from "../@types/common";
import { interceptor } from "../@types/interceptor";

export default class Interceptor {
  /** `EUCommon`에 사용할 `interceptor` 배열 객체 */
  static #interceptor: interceptor[] = [];

  /** `EUCommon`에 사용할 `interceptor` 배열 객체 */
  static get interceptor(): interceptor[] { return JUtil.copy(Interceptor.#interceptor); }

  /** `EUCommon`에 사용할 `interceptor`을 추가 한다.  */
  static appendInterceptor(
    interceptor: interceptor
  ): void { Interceptor.#interceptor.push(interceptor); }

  static actionHandle(
    callback: actionCallback['callback']
  ) {
    return async (
      ev: Event
    ) => {
      const preHandle = Interceptor.interceptor.map((...arg) => arg[0].preHandle),
      postHandle = Interceptor.interceptor.map((...arg) => arg[0].postHandle);

      for (const handle of preHandle) {
        if (!(handle?.(ev) ?? true)) { return; }
      }

      await callback(ev);

      postHandle.forEach((...arg) => arg[0]?.(ev));
    };
  }

}