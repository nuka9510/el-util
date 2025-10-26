import { ChildCloseEvent, ChildCloseEventOption, plugin } from "../../@types/plugin/util_action";
import { Common } from "../index.js";
export default class UtilAction {
    #private;
    static plugin(common: Common | Common[]): plugin;
    /** `ChildCloseEvent`객체를 반환 한다. */
    static childCloseEvent(opt: ChildCloseEventOption): ChildCloseEvent;
}
