import iconCustomStart from '../assets/images/开始游戏.png';
import iconCustomEnd from '../assets/images/结束.png'

// 自定义元素的类型，此时我们只需要自定义一种节点，所以数组只有一个元素
const customElements = ['bpmn:StartEvent', 'bpmn:EndEvent']; 
const customConfig = {
  // 自定义元素的配置
  'bpmn:StartEvent': {
    url: iconCustomStart,
    attr: {x: 0, y: 0, width: 50, height: 50}
  },
  'bpmn:EndEvent': {
    url: iconCustomEnd,
    attr: {x: 0, y: 0, width: 50, height: 50}
  }
};
 
export {customElements, customConfig};