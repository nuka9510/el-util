import { plugin } from "../@types/plugin";
export default class Plugin {
    #private;
    /** `EUCommon`에 사용할 `plugin` 배열 객체 */
    static get plugin(): plugin[];
    /** `EUCommon`에 사용할 `plugin`을 추가 한다.  */
    static appendPlugin(plugin: plugin): void;
}
