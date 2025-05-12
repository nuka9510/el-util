export interface interceptor {
  preHandle: (ev: Event) => boolean | void;
  postHandle: (ev: Event) => void;
}