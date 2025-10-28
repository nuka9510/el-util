import { ChildCloseEvent, ChildCloseEventOption, plugin } from "@nuka9510/el-util/@types/plugin/util-action";
import { Common } from "@nuka9510/el-util";
export default class UtilAction {
    #private;
    static plugin(common: Common | Common[]): plugin;
    /** `ChildCloseEvent`객체를 반환 한다. */
    static childCloseEvent(opt: ChildCloseEventOption): ChildCloseEvent;
}
