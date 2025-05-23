import { action, actionCallback } from "./common";
import Common from "../src/common.mjs";

interface _plugin {
  action: action;
  windowAction: actionCallback[];
}

export interface plugin {
  target?: Common[] | null;
  plugin: _plugin;
}