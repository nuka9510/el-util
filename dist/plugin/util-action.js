import { Util } from "@nuka9510/js-util";
export default class UtilAction {
    static plugin(common) {
        let target;
        if (Array.isArray(common)) {
            target = common;
        }
        else {
            if (!Util.empty(common)) {
                target = [common];
            }
        }
        return {
            common: target,
            action: {
                'sub-select': [
                    { event: 'change', callback: UtilAction.#onSubSelect }
                ],
                'check-all': [
                    { event: 'click', callback: UtilAction.#onCheckAll }
                ],
                'win-open': [
                    { event: 'click', callback: UtilAction.#onWinOpen }
                ],
                'win-close': [
                    { event: 'click', callback: UtilAction.#onWinClose }
                ],
                'number-only': [
                    { event: 'keydown', callback: UtilAction.#onNumberOnlyKeydown },
                    { event: 'input', callback: UtilAction.#onNumberOnlyInput },
                    { event: 'blur', callback: UtilAction.#onNumberOnlyBlur, option: { capture: true } }
                ],
                'clipboard': [
                    { event: 'click', callback: UtilAction.#onClipboard }
                ],
                'check': [
                    { event: 'click', callback: UtilAction.#onCheck }
                ]
            },
            windowAction: [
                { event: 'child-close', callback: UtilAction.#onChildClose }
            ]
        };
    }
    static #onSubSelect(ev, target, common) {
        const subNode = document.querySelectorAll(`select[data-eu-name="${target.dataset['euTarget']}"]`);
        subNode.forEach(async (...arg) => {
            arg[0].querySelectorAll('option')
                .forEach((..._arg) => {
                if (!Util.empty(_arg[0].value)) {
                    _arg[0].style.setProperty('display', (target.value == _arg[0].dataset['euMain']) ? 'block' : 'none');
                }
            });
            arg[0].value = '';
            arg[0].dispatchEvent(new Event('change', { bubbles: true }));
        });
    }
    static #onCheckAll(ev, target, common) {
        document.querySelectorAll(`input[type="checkbox"][data-eu-name="${target.dataset['euTarget']}"]`)
            .forEach((...arg) => { arg[0].checked = target.checked; });
    }
    static #onWinOpen(ev, target, common) {
        if (!Util.empty(target.dataset['euOption'])) {
            const url = /^https?:/.test(target.dataset['euUrl']) ? new URL(target.dataset['euUrl']) : new URL(target.dataset['euUrl'], location.origin), option = JSON.parse(document.querySelector(`script[data-eu-name="win-open"][data-eu-id="${target.dataset['euOption']}"]`)?.innerText ?? '{}');
            if (!Util.empty(target.dataset['euForm'])) {
                const form = document.querySelector(`form${target.dataset['euForm']}`), searchParam = new URLSearchParams(new FormData(form));
                url.search = `${url.search || '?'}${url.search && '&'}${searchParam}`;
            }
            let optiontext = '';
            switch (option?.pos) {
                case 'center':
                    option.top = (screen.height - option.height) / 2;
                    option.left = (screen.width - option.width) / 2;
                    break;
            }
            for (const key in option) {
                if (!['name', 'pos'].includes(key)) {
                    if (!Util.empty(optiontext)) {
                        optiontext += ', ';
                    }
                    optiontext += `${key}=${option[key]}`;
                }
            }
            if (Util.empty(option.name)) {
                window.open(url, undefined, optiontext);
            }
            else {
                const childWindow = window.open(url, option.name, optiontext), childWindow_ = Object.getOwnPropertyDescriptor(common, 'childWindow');
                Object.defineProperty(common, 'childWindow', {
                    ...childWindow_,
                    value: {
                        ...(childWindow_.value ?? {}),
                        [option.name]: childWindow
                    },
                    configurable: true
                });
            }
        }
    }
    static #onWinClose(ev, target, common) { window.close(); }
    static #onNumberOnlyKeydown(ev, target, common) {
        /** 한글 입력시 input 이벤트가 여러번 발생하는 현상 보정을 위한 로직 */
        if (ev.keyCode == 229) {
            target.event_key_code = ev.keyCode;
            target.prev_value = target.value;
            target.prev_selection = target.selectionStart;
        }
        else {
            delete target.event_key_code;
            delete target.prev_value;
            delete target.prev_selection;
        }
    }
    static #onNumberOnlyInput(ev, target, common) {
        /** 한글 입력시 input 이벤트가 여러번 발생하는 현상 보정을 위한 로직 */
        if (target.event_key_code == 229) {
            if (!ev.isComposing) {
                target.value = target.prev_value;
                target.selectionStart = target.prev_selection;
            }
            else {
                delete target.event_key_code;
                delete target.prev_value;
                delete target.prev_selection;
            }
        }
        if (ev.data != null) {
            const regex = {
                A: /[\d]/,
                B: /[\d\.\-]/,
                C: /[\d\.]/
            };
            if (!regex[target.dataset['euType'] ?? 'A'].test(ev.data) &&
                !Util.empty(target.selectionStart)) {
                target.selectionStart -= 1;
            }
        }
        UtilAction.#onNumberOnly(ev, target, common);
    }
    static #onNumberOnlyBlur(ev, target, common) { UtilAction.#onNumberOnly(ev, target, common); }
    static #onNumberOnly(ev, target, common) {
        const type = target.dataset['euType'] ?? 'A', min = target.dataset['euMin'], max = target.dataset['euMax'], regex = {
            A: /[^\d]/g,
            B: /[^\d\.\-]/g,
            C: /[^\d]/g
        };
        let selection = target.selectionStart, decimal;
        if (type == 'C') {
            const value = target.value.split('.');
            selection -= [...target.value.matchAll(/,/g)].length;
            target.value = value[0];
            decimal = value.filter((...arg) => arg[1] > 0)
                .join('')
                .substring(0, parseInt(target.dataset['euDecimal'] ?? '0'));
            decimal = `${!Util.empty(decimal) ? '.' : ''}${decimal}`;
        }
        target.value = target.value.replace(regex[type], '');
        if (type == 'C') {
            if (!Util.empty(target.value) ||
                !Util.empty(decimal)) {
                const num = parseInt(target.value || '0');
                target.value = `${Util.numberFormat(num)}${decimal}`;
                selection += [...target.value.matchAll(/,/g)].length;
            }
        }
        if (Util.isNumber(min) ||
            Util.isNumber(max)) {
            let flag = false, value, num;
            if (type == 'C') {
                value = Number(target.value.replace(/,/g, ''));
            }
            else {
                value = Number(target.value);
            }
            if (!flag &&
                Util.isNumber(min)) {
                if (Util.empty(target.value) ||
                    value < Number(min)) {
                    num = Number(min);
                    flag = true;
                }
            }
            if (!flag &&
                Util.isNumber(max) &&
                value > Number(max)) {
                num = Number(max);
                flag = true;
            }
            if (flag) {
                let _value;
                if (type == 'C') {
                    _value = Util.numberFormat(num, parseInt(target.dataset['euDecimal'] ?? '0'));
                }
                else {
                    _value = `${num}`;
                }
                selection -= target.value.length - _value.length;
                target.value = _value;
            }
        }
        if (!Util.empty(target.selectionEnd)) {
            target.selectionEnd = selection;
        }
    }
    static async #onClipboard(ev, target, common) {
        await navigator.clipboard
            .writeText(target.dataset['euValue'])
            .then((value) => { alert('링크가 클립보드에 저장되었습니다.'); })
            .catch((e) => { console.error(e); });
    }
    static #onCheck(ev, target, common) {
        const targetEl = document.querySelector(`input[data-eu-name="${target.dataset['euTarget']}"]`);
        targetEl.value = target.checked ? targetEl.dataset['euTrue'] : targetEl.dataset['euFalse'];
    }
    static async #onChildClose(ev, target, common) {
        const onChildClose = Object.getOwnPropertyDescriptor(common, 'onChildClose');
        await onChildClose.value(ev, target, common);
        if (ev.detail.reload ?? true) {
            location.reload();
        }
    }
    /** `ChildCloseEvent`객체를 반환 한다. */
    static childCloseEvent(opt) { return new CustomEvent('child-close', opt); }
}
