import Common from "../src/common";
import { action, actionCallback } from "./common";

export = plugin;
export as namespace plugin;

declare namespace plugin {
  interface _plugin {
    action: action;
    windowAction: actionCallback['callback'][];
  }

  interface plugin {
    target?: Common[] | null;
    plugin: _plugin;
  }
}