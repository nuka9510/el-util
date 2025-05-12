import { actionCallback } from "./common";

export interface interceptor {
  preHandle: (
    ev: Event,
    actionCallback: actionCallback['callback']
  ) => boolean | void;
  postHandle: (
    ev: Event,
    actionCallback: actionCallback['callback']
  ) => void;
}