import { JUtil } from "@nuka9510/simple-validation";
export default class Plugin {
    /** `SceComponent`에 사용할 `plugin` 배열 객체 */
    static #plugin = [];
    /** `SceComponent`에 사용할 `plugin` 배열 객체 */
    static get plugin() { return JUtil.copy(Plugin.#plugin); }
    /** `SceComponent`에 사용할 `plugin`을 추가 한다.  */
    static appendPlugin(plugin) { Plugin.#plugin.push(plugin); }
}
