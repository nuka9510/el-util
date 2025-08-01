import { Common, Interceptor } from "@nuka9510/el-util";

class Index extends Common {
  get action() {
    return {
      'test-click': [
        { event: 'click', callback: this.onTestClick }
      ]
    };
  }

  constructor() {
    super();

    Interceptor.appendInterceptor({
      preHandle: (ev, target) => {
        console.debug(ev, target);
        alert('preHandle');
      }
    });
    
    this.init();
  }

  onTestClick(ev, target) { console.debug(ev, target); }

}

new Index();