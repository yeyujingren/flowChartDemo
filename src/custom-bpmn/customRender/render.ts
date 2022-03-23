import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { append as svgAppend, create as svgCreate } from 'tiny-svg';
import { customElements, customConfig } from './util';
const HIGH_PRIORITY = 1500;


export default class CustomRenderer extends BaseRenderer {
  bpmnRenderer: any;
  static $inject: string[];
  constructor(eventBus: any, bpmnRenderer: any) {
    super(eventBus, HIGH_PRIORITY);
    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(ele: any) {
    return !ele.labelTarget;
  }

  drawShape(parentNode: any, element: any) {
    const type = element.type; // 获取到类型
    // 所有节点都会走这个函数，所以此时只限制，需要自定义的才去自定义，否则仍显示bpmn默认图标
    if (customElements.includes(type)) {  
      const {url, attr} = customConfig['demo'];
      const customIcon = svgCreate('image', {...attr, href: url});
      element['width'] = attr.width;
      element['height'] = attr.height;
      svgAppend(parentNode, customIcon as SVGElement);
      return customIcon;
    }
    debugger
    const shape = this.bpmnRenderer.drawShape(parentNode, element);
    return shape;
  }

  getShapePath(shape: any) {
    return this.bpmnRenderer.getShapePath(shape);
  }
}

CustomRenderer.$inject = [
  'eventBus',
  'bpmnRenderer'
]

