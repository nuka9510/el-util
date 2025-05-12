import { EUCommon, EUInterceptor } from "@nuka9510/el-util";

class Index extends EUCommon {
  get action() {
    return {
      'test-click': [
        { event: 'click', callback: this.onTestClick }
      ]
    };
  }

  constructor() {
    super();

    EUInterceptor.appendInterceptor({
      preHandle: (ev, actionCallback) => {
        console.debug('actionCallback', actionCallback.toString());
      }
    });
    
    this.init();
  }

  onTestClick(ev) { alert('test'); }

}

new Index();