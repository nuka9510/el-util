import { JUtil } from "@nuka9510/simple-validation";
export default class Interceptor {
    /** `EUCommon`에 사용할 `interceptor` 배열 객체 */
    static #interceptor = [];
    /** `EUCommon`에 사용할 `interceptor` 배열 객체 */
    static get interceptor() { return JUtil.copy(Interceptor.#interceptor); }
    /** `EUCommon`에 사용할 `interceptor`을 추가 한다.  */
    static appendInterceptor(interceptor) { Interceptor.#interceptor.push(interceptor); }
    static actionHandle(callback) {
        return async (ev) => {
            const preHandle = Interceptor.interceptor.map((...arg) => arg[0].preHandle), postHandle = Interceptor.interceptor.map((...arg) => arg[0].postHandle);
            for (const handle of preHandle) {
                if (!(handle?.(ev) ?? true)) {
                    return;
                }
            }
            await callback(ev);
            postHandle.forEach((...arg) => arg[0]?.(ev));
        };
    }
}
