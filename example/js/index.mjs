import { Common, Interceptor, Plugin } from "@nuka9510/el-util";
import { UtilAction } from "@nuka9510/el-util/plugin";

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

    Plugin.append(UtilAction.plugin(this));

    Interceptor.append({
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