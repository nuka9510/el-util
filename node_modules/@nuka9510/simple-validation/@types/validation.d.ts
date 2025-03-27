export = validation;
export as namespace validation;

declare namespace validation {
  type InputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

  /** 결과 값 객체 */
  interface result {
    /** #default `true` */
    flag: boolean;
    /** #default `null` */
    alertMsg: string | null;
    /** #default `null` */
    el: InputElement | null;
  }

  interface dateEl {
    S?: InputElement;
    E?: InputElement;
  }

  /** validation check할 Element를 담는 객체 */
  interface el {
    el?: InputElement[];
    date?: {
      [date: string]: dateEl;
    };
  }

  interface radio {
    [required: string]: InputElement[];
  }

  /** validation에 사용할 정규식을 담은 객체 */
  interface regex {
    [pattern: string]: RegExp;
  }

  /** validation 초기화를 위한 객체 */
  interface config {
    regex?: regex;
  }
}