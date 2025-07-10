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
      preHandle: (ev, target) => {
        console.debug(ev, target);
        alert('preHandle');
      }
    });
    
    this.init();
  }

  onTestClick(ev, target) {
    console.debug(ev, target);
    alert('test');
  }

}

new Index();