import { actionCallback } from "./common";

export interface interceptor {
  preHandle: (
    ev: Event,
    target: EventTarget | HTMLElement
  ) => boolean | void;
  postHandle: (
    ev: Event,
    target: EventTarget | HTMLElement
  ) => void;
}