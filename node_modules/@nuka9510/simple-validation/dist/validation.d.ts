import { config, result } from "../@types/validation";
/**
 * Validation Check를 위한 객체
 */
export default class Validation {
    #private;
    /** 결과 값 객체 */
    result: result;
    /**
     * Validation Check를 위한 객체
     *
     * ```
     * <form name="form">
     *   <input type="text" name="text" data-sv-pattern="password" data-sv-input-name="비밀번호" minlength="0" maxlength="10">
     *   <input type="text" name="text" data-sv-pattern="password" minlength="0" maxlength="10" required="비밀번호">
     *   <input type="date" name="sdate1" data-sv-date="date1" data-sv-date-state="S" data-sv-input-name="검색일1">
     *   <input type="date" name="edate1" data-sv-date="date1" data-sv-date-state="E" data-sv-input-name="검색일1">
     *   <input type="date" name="sdate2" data-sv-date="date2" data-sv-date-state="S" required="검색일2">
     *   <input type="date" name="edate2" data-sv-date="date2" data-sv-date-state="E" required="검색일2">
     * </form>
     * <script type="importmap">
     *   {
     *     "imports": { "@nuka9510/simple-validation": "/node_modules/@nuka9510/simple-validation/dist/index.js" }
     *   }
     * </script>
     * <script type="module">
     *   import SValidation from "@nuka9510/simple-validation";
     *
     *   const validation = new SValidation({regex: {password: /^[\S!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`]{6,10}$/}});
     *
     *   validation.run(form);
     *
     *   if (validation.result.flag) {
     *     form.submit();
     *   } else {
     *     alert(validation.result.alertMsg);
     *     validation.result.el.focus();
     *   }
     * </script>
     * ```
     */
    constructor(config?: config);
    /** 객체 초기화 */
    init(
    /** validation 초기화를 위한 객체 */ config?: config | null): void;
    /** validation을 실행한다. */
    run(form: HTMLFormElement): void;
}
