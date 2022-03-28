import iconCustomStart from '../assets/images/开始游戏.png';
import iconCustomEnd from '../assets/images/结束.png'
import iconCustomTask from '../assets/images/任务.png';
import iconCustomCoupon from '../assets/images/优惠券.png'
import iconCustomTest from '../assets/images/实验.png';
import iconCustomTips from '../assets/images/提示.png'
import iconCustomBranch from '../assets/images/分支模板.png';

// 自定义元素的类型，此时我们只需要自定义一种节点，所以数组只有一个元素
const customElements = ['bpmn:StartEvent', 'bpmn:EndEvent', 'custom:task', 'custom:coupon', 'custom:test', 'custom:tips', 'custom:branch']; 
const customConfig = {
  // 自定义元素的配置
  'bpmn:StartEvent': {
    url: iconCustomStart,
    attr: {x: 0, y: 0, width: 50, height: 50}
  },
  'bpmn:EndEvent': {
    url: iconCustomEnd,
    attr: {x: 0, y: 0, width: 50, height: 50}
  },
  'custom:task': {
    url: iconCustomTask,
    attr: {x: 0, y: 0, width: 50, height: 50}
  },
  'custom:coupon': {
    url: iconCustomCoupon,
    attr: {x: 0, y: 0, width: 50, height: 50}
  },
  'custom:test': {
    url: iconCustomTest,
    attr: {x: 0, y: 0, width: 50, height: 50}
  },
  'custom:tips': {
    url: iconCustomTips,
    attr: {x: 0, y: 0, width: 50, height: 50}
  },
  'custom:branch': {
    url: iconCustomBranch,
    attr: {x: 0, y: 0, width: 50, height: 50}
  },
};
 
export {customElements, customConfig};