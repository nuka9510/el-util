import { plugin } from "../@types/plugin";
export default class Plugin {
    #private;
    /** `SceComponent`에 사용할 `plugin` 배열 객체 */
    static get plugin(): plugin[];
    /** `SceComponent`에 사용할 `plugin`을 추가 한다.  */
    static appendPlugin(plugin: plugin): void;
}
