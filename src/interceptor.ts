import { interceptor } from "../@types/interceptor";
import { Util } from "@nuka9510/js-util";

export default class Interceptor {
  /** `Common`에 사용할 `interceptor` 배열 객체 */
  static #interceptor: interceptor[] = [];

  /** `Common`에 사용할 `interceptor` 배열 객체 */
  static get interceptor(): interceptor[] { return Util.copy(Interceptor.#interceptor); }

  /** `Common`에 사용할 `interceptor`을 추가 한다.  */
  static append(
    interceptor: interceptor | interceptor[]
  ): void {
    if (Array.isArray(interceptor)) {
      Interceptor.#interceptor.push(...interceptor);
    } else { Interceptor.#interceptor.push(interceptor); }
  }

}