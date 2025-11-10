import { Common } from "@nuka9510/el-util";
import { action, actionItem } from "./common";

export interface plugin {
  /**
   * `Plugin`를 적용할 `Common`  \
   * 지정되지 않았을 경우 모든 `Common`에 적용
   */
  common?: Common[];
  /** `Plugin`으로 추가할 `action` */
  action?: action;
  /** `Plugin`으로 추가할 `windowAction` */
  windowAction?: actionItem[];
}