import { plugin } from "@nuka9510/el-util/@types/plugin";
import { Util } from "@nuka9510/js-util";

export default class Plugin {
  /** `Common`에 사용할 `plugin` 배열 객체 */
  static #plugin: plugin[] = [];

  /** `Common`에 사용할 `plugin` 배열 객체 */
  static get plugin(): plugin[] { return Util.copy(Plugin.#plugin); }

  /** `Common`에 사용할 `plugin`을 추가 한다.  */
  static append(
    plugin: plugin | plugin[]
  ): void {
    if (Array.isArray(plugin)) {
      Plugin.#plugin.push(...plugin);
    } else { Plugin.#plugin.push(plugin); }
  }

}