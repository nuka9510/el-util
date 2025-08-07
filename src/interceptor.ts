import { actionCallback } from "../@types/common";
import { interceptor } from "../@types/interceptor";
import { Util } from "@nuka9510/js-util";

export default class Interceptor {
  /** `Common`에 사용할 `interceptor` 배열 객체 */
  static #interceptor: interceptor[] = [];

  /** `Common`에 사용할 `interceptor` 배열 객체 */
  static get interceptor(): interceptor[] { return Util.copy(Interceptor.#interceptor); }

  /** `Common`에 사용할 `interceptor`을 추가 한다.  */
  static appendInterceptor(
    interceptor: interceptor
  ): void { Interceptor.#interceptor.push(interceptor); }

  static actionHandle(
    callback: actionCallback['callback'],
    action?: string,
    flag?: boolean
  ) {
    return async (
      ev: Event
    ) => {
      let target: EventTarget | HTMLElement = ev.target;

      if (!Util.empty(action)) {
        if (!(ev.target instanceof HTMLElement)) { return; }

        target = (ev.target as HTMLElement).closest(`[data-eu-action~="${ action }"]`);

        if (Util.empty(target)) { return; }

        if (
          (flag ?? false) &&
          !((target as HTMLElement).getAttribute('data-eu-event') ?? '').split(' ').includes(ev.type)
        ) { return; }
      }

      const preHandle = Interceptor.interceptor.map((...arg) => arg[0].preHandle),
      postHandle = Interceptor.interceptor.map((...arg) => arg[0].postHandle);

      for (const handle of preHandle) {
        if (!(handle?.(ev, target) ?? true)) { return; }
      }

      await callback(ev, target);

      postHandle.forEach((...arg) => arg[0]?.(ev, target));
    };
  }

}