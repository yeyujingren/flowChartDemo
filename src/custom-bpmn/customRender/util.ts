import demo from './music-menu.png'

// 自定义元素的类型，此时我们只需要自定义一种节点，所以数组只有一个元素
const customElements = ['bpmn:StartEvent']; 
const customConfig = {
  // 自定义元素的配置
  demo: {
    url: demo,
    attr: {x: 0, y: 0, width: 50, height: 50}
  }
};
 
export {customElements, customConfig};