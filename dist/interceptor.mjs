import { JUtil } from "@nuka9510/simple-validation";
export default class Interceptor {
    /** `EUCommon`에 사용할 `interceptor` 배열 객체 */
    static #interceptor = [];
    /** `EUCommon`에 사용할 `interceptor` 배열 객체 */
    static get interceptor() { return JUtil.copy(Interceptor.#interceptor); }
    /** `EUCommon`에 사용할 `interceptor`을 추가 한다.  */
    static appendInterceptor(interceptor) { Interceptor.#interceptor.push(interceptor); }
    static actionHandle(callback, action, flag) {
        return async (ev) => {
            let target = ev.target;
            if (!JUtil.empty(action)) {
                if (!(ev.target instanceof HTMLElement)) {
                    return;
                }
                target = ev.target.closest(`[data-eu-action~="${action}"]`);
                if (JUtil.empty(target)) {
                    return;
                }
                if ((flag ?? false) &&
                    !(target.getAttribute('data-eu-event') ?? '').split(' ').includes(ev.type)) {
                    return;
                }
            }
            const preHandle = Interceptor.interceptor.map((...arg) => arg[0].preHandle), postHandle = Interceptor.interceptor.map((...arg) => arg[0].postHandle);
            for (const handle of preHandle) {
                if (!(handle?.(ev, target) ?? true)) {
                    return;
                }
            }
            await callback(ev, target);
            postHandle.forEach((...arg) => arg[0]?.(ev, target));
        };
    }
}
