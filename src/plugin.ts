import { plugin } from "../@types/plugin";
import { JUtil } from "@nuka9510/js-util";

export default class Plugin {
  /** `SceComponent`에 사용할 `plugin` 배열 객체 */
  static #plugin: plugin[] = [];

  /** `SceComponent`에 사용할 `plugin` 배열 객체 */
  static get plugin(): plugin[] { return JUtil.copy(Plugin.#plugin); }

  /** `SceComponent`에 사용할 `plugin`을 추가 한다.  */
  static appendPlugin(
    plugin: plugin
  ): void { Plugin.#plugin.push(plugin); }

}