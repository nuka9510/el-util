import { interceptor } from "@nuka9510/el-util/@types/interceptor";
export default class Interceptor {
    #private;
    /** `Common`에 사용할 `interceptor` 배열 객체 */
    static get interceptor(): interceptor[];
    /** `Common`에 사용할 `interceptor`을 추가 한다.  */
    static append(interceptor: interceptor | interceptor[]): void;
}
