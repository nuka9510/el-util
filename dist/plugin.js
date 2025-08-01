import { Util } from "@nuka9510/js-util";
export default class Plugin {
    /** `EUCommon`에 사용할 `plugin` 배열 객체 */
    static #plugin = [];
    /** `EUCommon`에 사용할 `plugin` 배열 객체 */
    static get plugin() { return Util.copy(Plugin.#plugin); }
    /** `EUCommon`에 사용할 `plugin`을 추가 한다.  */
    static appendPlugin(plugin) { Plugin.#plugin.push(plugin); }
}
