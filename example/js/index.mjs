import { Common, Interceptor, Plugin } from "@nuka9510/el-util";

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

    Interceptor.append({
      action: 'test-click',
      preHandle: (ev, target, common) => {
        console.debug(ev, target, common);

        alert('preHandle');
      }
    });

    this.init();
  }

  onTestClick(ev, target, common) { console.debug(ev, target, common); }

}

new Index();