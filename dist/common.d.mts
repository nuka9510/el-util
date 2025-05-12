import { action, actionCallback, allAction, ChildCloseEvent, ChildCloseEventOption } from "../@types/common.js";
import { config } from "@nuka9510/simple-validation/@types/validation";
import { SValidation } from "@nuka9510/simple-validation";
export default class Common {
    #private;
    /** `init` 실행 여부 */
    get isInit(): boolean;
    /** `submit` 이벤트를 전달할 `HTMLFormElement` 객체 */
    form?: HTMLFormElement;
    /** `validation` 확인을 위한 객체 */
    validation: SValidation;
    /** `EventListener`에 할당 할 `data-eu-action`을 정의한 `action` */
    get action(): action;
    /** `window`객체의 `EventListener`에 할당 할 `actionCallback` */
    get windowAction(): actionCallback[];
    /** `EUCommon`에서 사용할 모든 `action` */
    get allAction(): allAction;
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
    constructor(config?: config);
    /** `Common`객체 초기화. */
    init(): void;
    /** `Common`객체의 `action`에 정의한 이벤트를 `addEventListener`에 적용한다. */
    addEvent(): void;
    /** `data-eu-action="get"`의 이벤트가 실행 되기 전에 실행 한다. */
    onGetBefore(ev: Event): Promise<boolean | void>;
    /** `data-eu-action="get"`의 이벤트가 실행 된 후에 실행 한다. */
    onGetAfter(ev: Event): Promise<void>;
    /** `data-eu-action="post"`의 이벤트가 실행 되기 전에 실행 한다. */
    onPostBefore(ev: Event): Promise<boolean | void>;
    /** `data-eu-action="post"`의 이벤트가 실행 된 후에 실행 한다. */
    onPostAfter(ev: Event): Promise<void>;
    /** `data-eu-action="sub-select"`의 이벤트가 실행 된 후에 실행 한다. */
    onSubSelectAfter(ev: Event): Promise<void>;
    /** `data-eu-action="check-all"`의 이벤트가 실행 된 후에 실행 한다. */
    onCheckAllAfter(ev: MouseEvent): Promise<void>;
    /** `data-eu-action="check"`의 이벤트가 실행 된 후에 실행 한다. */
    onCheckAfter(ev: MouseEvent): Promise<void>;
    /** `ChildCloseEvent`객체를 반환 한다. */
    static childCloseEvent(opt: ChildCloseEventOption): ChildCloseEvent;
    /** `window`객체에 `ChildCloseEvent`이벤트가 전달 되었을 경우 실행 한다. */
    onChildClose(ev: ChildCloseEvent): Promise<void>;
}
