import { action, actionItem } from "./common";
import Common from "../src/common.js";

export interface plugin {
  common?: Common[];
  action?: action;
  windowAction?: actionItem[];
}