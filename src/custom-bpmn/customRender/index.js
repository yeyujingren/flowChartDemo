import { customElements, customConfig } from './util';

import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  componentsToPath,
  createLine
} from 'diagram-js/lib/util/RenderUtil';

import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate
} from 'tiny-svg';

var COLOR_RED = '#cc0000',
  COLOR_YELLOW = '#ffc800';

/**
 * A renderer that knows how to render custom elements.
 */
export default function CustomRenderer(eventBus, styles) {

  BaseRenderer.call(this, eventBus, 2000);

  var computeStyle = styles.computeStyle;

  this.drawCircle = function (p, width, height) {
    var cx = width / 2,
      cy = height / 2;

    var attrs = computeStyle(attrs, {
      stroke: COLOR_YELLOW,
      strokeWidth: 4,
      fill: COLOR_YELLOW
    });

    var circle = svgCreate('circle');

    svgAttr(circle, {
      cx: cx,
      cy: cy,
      r: Math.round((width + height) / 4)
    });

    svgAttr(circle, attrs);

    svgAppend(p, circle);

    return circle;
  };

  this.getCirclePath = function (shape) {
    var cx = shape.x + shape.width / 2,
      cy = shape.y + shape.height / 2,
      radius = shape.width / 2;

    var circlePath = [
      ['M', cx, cy],
      ['m', 0, -radius],
      ['a', radius, radius, 0, 1, 1, 0, 2 * radius],
      ['a', radius, radius, 0, 1, 1, 0, -2 * radius],
      ['z']
    ];

    return componentsToPath(circlePath);
  };

  this.drawCustomConnection = function (p, element) {
    var attrs = computeStyle(attrs, {
      stroke: COLOR_RED,
      strokeWidth: 2
    });

    return svgAppend(p, createLine(element.waypoints, attrs));
  };

  this.getCustomConnectionPath = function (connection) {
    var waypoints = connection.waypoints.map(function (p) {
      return p.original || p;
    });

    var connectionPath = [
      ['M', waypoints[0].x, waypoints[0].y]
    ];

    waypoints.forEach(function (waypoint, index) {
      if (index !== 0) {
        connectionPath.push(['L', waypoint.x, waypoint.y]);
      }
    });

    return componentsToPath(connectionPath);
  };
}

CustomRenderer.prototype = Object.create(BaseRenderer.prototype);


CustomRenderer.$inject = ['eventBus', 'styles'];

/**
 * 返回 true 则会走对应的 drawShape 渲染函数，否则，走原来渲染函数
 */
CustomRenderer.prototype.canRender = function (element) {
  return /custom:|StartEvent|EndEvent/.test(element.type);
};

CustomRenderer.prototype.drawShape = function (p, element) {
  const type = element.type; // 获取到类型
  // 所有节点都会走这个函数，所以此时只限制，需要自定义的才去自定义，否则仍显示bpmn默认图标
  if (customElements.includes(type)) {
    const { url, attr } = customConfig[type];
    const customIcon = svgCreate('image', { ...attr, href: url});
    element['width'] = attr.width;
    element['height'] = attr.height;
    svgAppend(p, customIcon);
    return customIcon;
  }
  // 未被自定义覆盖，且通过canRender校验的节点，我们默认按照原来的逻辑渲染
  const shape = this.bpmnRenderer.drawShape(parentNode, element);
  return shape;
};

CustomRenderer.prototype.getShapePath = function (shape) {
  // debugger;
  var type = shape.type;

  // if (type === 'custom:music') {
  //   return musicIcon;
  // }

  if (type === 'custom:circle') {
    return this.getCirclePath(shape);
  }
};

CustomRenderer.prototype.drawConnection = function (p, element) {

  var type = element.type;

  if (type === 'custom:connection') {
    return this.drawCustomConnection(p, element);
  }
};


CustomRenderer.prototype.getConnectionPath = function (connection) {

  var type = connection.type;

  if (type === 'custom:connection') {
    return this.getCustomConnectionPath(connection);
  }
};
