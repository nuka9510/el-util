import { Common } from "@nuka9510/el-util";
import { action, actionItem } from "./common";

export interface plugin {
  common?: Common[];
  action?: action;
  windowAction?: actionItem[];
}