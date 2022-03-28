import ContextPadProvider from 'bpmn-js/lib/features/context-pad/ContextPadProvider';

import {
  isAny
} from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import {
  assign,
  bind
} from 'min-dash';

// 允许 custom elements 连接到 BPMN element
export default function CustomContextPadProvider(injector, connect, translate) {

  injector.invoke(ContextPadProvider, this);

  var cached = bind(this.getContextPadEntries, this);

  this.getContextPadEntries = function(element) {
    var actions = cached(element);

    var businessObject = element.businessObject;

    function startConnect(event, element, autoActivate) {
      connect.start(event, element, autoActivate);
    }

    // 添加连线
    if (isAny(businessObject, ['bpmn:StartEvent', 'bpmn:EndEvent', 'custom:task', 'custom:coupon', 'custom:test', 'custom:tips', 'custom:branch'])) {
      assign(actions, {
        'connect': {
          group: 'connect',
          className: 'bpmn-icon-connection-multi',
          title: translate('Connect using custom connection'),
          action: {
            click: startConnect,
            dragstart: startConnect
          }
        }
      });
    }

    return actions;
  };
}

CustomContextPadProvider.prototype = Object.create(ContextPadProvider.prototype);

CustomContextPadProvider.$inject = [
  'injector',
  'connect',
  'translate'
];