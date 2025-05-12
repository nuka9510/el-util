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
      postHandle: (ev) => { console.debug('interceptor'); }
    });
    
    this.init();
  }

  onTestClick(ev) { alert('test'); }

}

new Index();