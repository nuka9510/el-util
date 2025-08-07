import { action, actionCallback, allAction, ChildCloseEvent, ChildCloseEventOption } from "../@types/common";
export default class Common {
    #private;
    /** `init` 실행 여부 */
    get isInit(): boolean;
    /** `EventListener`에 할당 할 `data-eu-action`을 정의한 `action` */
    get action(): action;
    /** `window`객체의 `EventListener`에 할당 할 `actionCallback` */
    get windowAction(): actionCallback[];
    /** `Common`에서 사용할 모든 `action` */
    get allAction(): allAction;
    /**
     * ```
     * import { Common } from "@nuka9510/el-util";
     *
     * class Index extends Common {
     *   get action() {
     *     return {
     *       'test-click': [
     *         { event: 'click', callback: this.onTestClick }
     *       ]
     *     };
     *   }
     *
     *   onTestClick(ev) { alert('test'); }
     *
     * }
     *
     * new Index();
     * ```
     */
    constructor();
    /** `Common`객체 초기화. */
    init(): void;
    /**
     * `Common`객체의 `action`에 정의한 이벤트들의 `eventListener`를 갱신한다.
     * `removeEventListener` -> `addEventListener`
     * `eventListener`를 갱신 후 실행할 `callback` 정의.
     */
    updateEvent(): void;
    /** `Common`객체의 `action`에 정의한 이벤트를 `addEventListener`에 적용할 시 실행할 `callback`. */
    addEvent(): void;
    /** `Common`객체의 `action`에 정의한 이벤트를 `removeEventListener`에 적용할 시 실행할 `callback`. */
    removeEvent(): void;
    /** `data-eu-action="sub-select"`의 이벤트가 실행 된 후에 실행 한다. */
    onSubSelectAfter(ev: Event, target: HTMLSelectElement): Promise<void>;
    /** `data-eu-action="check-all"`의 이벤트가 실행 된 후에 실행 한다. */
    onCheckAllAfter(ev: MouseEvent, target: HTMLInputElement): Promise<void>;
    /** `data-eu-action="check"`의 이벤트가 실행 된 후에 실행 한다. */
    onCheckAfter(ev: MouseEvent, target: HTMLInputElement): Promise<void>;
    /** `ChildCloseEvent`객체를 반환 한다. */
    static childCloseEvent(opt: ChildCloseEventOption): ChildCloseEvent;
    /** `window`객체에 `ChildCloseEvent`이벤트가 전달 되었을 경우 실행 한다. */
    onChildClose(ev: ChildCloseEvent, target: EventTarget): Promise<void>;
}
