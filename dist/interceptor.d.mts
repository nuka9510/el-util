import { actionCallback } from "../@types/common";
import { interceptor } from "../@types/interceptor";
export default class Interceptor {
    #private;
    /** `EUCommon`에 사용할 `interceptor` 배열 객체 */
    static get interceptor(): interceptor[];
    /** `EUCommon`에 사용할 `interceptor`을 추가 한다.  */
    static appendInterceptor(interceptor: interceptor): void;
    static actionHandle(callback: actionCallback['callback']): (ev: Event) => Promise<void>;
}
