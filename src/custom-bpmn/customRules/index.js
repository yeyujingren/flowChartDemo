import {
  reduce
} from 'min-dash';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';

var HIGH_PRIORITY = 1500;


function isCustom(element) {
  return element && /^custom:/.test(element.type);
}

/**
 * 定义自定义元素的规则，包括是否可以连线，后面可以接入什么元素
 */
export default function CustomRules(eventBus) {
  RuleProvider.call(this, eventBus);
}

CustomRules.prototype = Object.create(RuleProvider.prototype);

CustomRules.$inject = [ 'eventBus' ];


CustomRules.prototype.init = function() {

  /**
   * Can shape be created on target container?
   */
  function canCreate(shape, target) {

    // only judge about custom elements
    if (!isCustom(shape)) {
      return;
    }

    // allow creation on processes
    return is(target, 'bpmn:Process') || is(target, 'bpmn:Participant') || is(target, 'bpmn:Collaboration');
  }

  /**
   * Can source and target be connected?
   */
  function canConnect(source, target) {

    // only judge about custom elements
    if (!isCustom(source) && !isCustom(target)) {
      return;
    }

    // allow connection between custom shape and task
    if (isCustom(source)) {
      if (is(target, 'bpmn:Task')) {
        return { type: 'custom:connection' };
      } else {
        return false;
      }
    } else if (isCustom(target)) {
      if (is(source, 'bpmn:Task')) {
        return { type: 'custom:connection' };
      } else {
        return false;
      }
    }
  }

  this.addRule('elements.move', HIGH_PRIORITY, function(context) {

    const target = context.target;
    const shapes = context.shapes;

    let type;

    // do not allow mixed movements of custom / BPMN shapes
    // if any shape cannot be moved, the group cannot be moved, too
    let allowed = reduce(shapes, function(result, s) {
      if (type === undefined) {
        type = isCustom(s);
      }

      if (type !== isCustom(s) || result === false) {
        return false;
      }

      return canCreate(s, target);
    }, undefined);

    // reject, if we have at least one
    // custom element that cannot be moved
    return allowed;
  });

  this.addRule('shape.create', HIGH_PRIORITY, function(context) {
    const target = context.target;
    const shape = context.shape;

    return canCreate(shape, target);
  });

  this.addRule('shape.resize', HIGH_PRIORITY, function(context) {
    const shape = context.shape;

    if (isCustom(shape)) {
      // cannot resize custom elements
      return false;
    }
  });

  this.addRule('connection.create', HIGH_PRIORITY, function(context) {
    const source = context.source;
    const target = context.target;

    return canConnect(source, target);
  });

  this.addRule('connection.reconnectStart', HIGH_PRIORITY, function(context) {
    const connection = context.connection;
    const source = context.hover || context.source;
    const target = connection.target;

    return canConnect(source, target, connection);
  });

  this.addRule('connection.reconnectEnd', HIGH_PRIORITY, function(context) {
    const connection = context.connection;
    const source = connection.source;
    const target = context.hover || context.target;

    return canConnect(source, target, connection);
  });

};
