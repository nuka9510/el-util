export = eu_common;
export as namespace eu_common;

declare namespace eu_common {
  interface childWindow {
    [windowName: string]: Window | null;
  }

  interface actionCallback {
    event?: string;
    callback: (ev: Event) => void | Promise<void>;
    option?: EventListenerOptions;
  }

  interface action {
    [data_eu_action: string]: actionCallback[];
  }

  interface fetchJson {
    result: boolean;
    alertMsg?: string;
    redirect?: string;
  }

  interface submitMsg {
    reg: '등록하시겠습니까?';
    mod: '수정하시겠습니까?';
    del: '삭제하시겠습니까?';
  }

  interface NumberOnlyElement extends HTMLInputElement {
    event_key_code?: KeyboardEvent['keyCode'];
    prev_value?: string;
    prev_selection?: number;
  }

  interface ChildCloseEventDetail {
    reload?: boolean;
    callback?: string;
  }

  type ChildCloseEvent = CustomEvent<ChildCloseEventDetail>;

  type ChildCloseEventOption = CustomEventInit<ChildCloseEventDetail>;
}