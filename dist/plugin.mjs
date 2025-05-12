import { JUtil } from "@nuka9510/simple-validation";
export default class Plugin {
    /** `EUCommon`에 사용할 `plugin` 배열 객체 */
    static #plugin = [];
    /** `EUCommon`에 사용할 `plugin` 배열 객체 */
    static get plugin() { return JUtil.copy(Plugin.#plugin); }
    /** `EUCommon`에 사용할 `plugin`을 추가 한다.  */
    static appendPlugin(plugin) { Plugin.#plugin.push(plugin); }
}
