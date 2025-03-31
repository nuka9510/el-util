import { SValidation } from "@nuka9510/simple-validation";
import { action, actionCallback, ChildCloseEvent, ChildCloseEventOption } from "../@types/common.js";
import { config } from "@nuka9510/simple-validation/@types/validation.js";
export default class Common {
    #private;
    form?: HTMLFormElement;
    validation: SValidation;
    get action(): action;
    get windowAction(): actionCallback[];
    /**
     * ```
     * <button type="button" data-eu-action="test-click">test-click</button>
     * <script type="importmap">
     *   {
     *     "imports": {
     *       "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util/dist/index.js",
     *       "@nuka9510/el-util": "https://cdn.jsdelivr.net/npm/@nuka9510/el-util/dist/index.js"
     *     }
     *   }
     * </script>
     * <script type="module">
     *   import { EUCommon } from "@nuka9510/el-util";
     *
     *   class Index extends EUCommon {
     *     get action() {
     *       return {
     *         'test-click': [
     *           { event: 'click', callback: this.onTestClick }
     *         ]
     *       };
     *     }
     *
     *     onTestClick(ev) { alert('test'); }
     *
     *   }
     *
     *   new Index();
     * </script>
     * ```
     */
    constructor(config: config);
    addEvent(): void;
    onGetBefore(ev: Event): Promise<boolean | void>;
    onGetAfter(ev: Event): Promise<void>;
    onPostBefore(ev: Event): Promise<boolean | void>;
    onPostAfter(ev: Event): Promise<void>;
    onSubSelectAfter(ev: Event): Promise<void>;
    onCheckAllAfter(ev: MouseEvent): Promise<void>;
    onCheckAfter(ev: MouseEvent): Promise<void>;
    childCloseEvent(opt: ChildCloseEventOption): ChildCloseEvent;
    onChildCloseAfter(ev: ChildCloseEvent): Promise<void>;
}
