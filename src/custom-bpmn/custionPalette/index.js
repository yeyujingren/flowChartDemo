import {
  assign
} from 'min-dash';


/**
 * 创建自定义元素
 */
export default function PaletteProvider(palette, create, elementFactory, translate) {
  this._create = create;
  this._elementFactory = elementFactory;
  this._translate = translate;

  palette.registerProvider(this);
}

PaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'translate',
];


PaletteProvider.prototype.getPaletteEntries = function (element) {
  // debugger;
  var actions = {},
    create = this._create,
    elementFactory = this._elementFactory,
    translate = this._translate;

  function createAction(type, group, className, title, options) {

    function createListener(event) {
      var shape = elementFactory.createShape(assign({ type: type }, options));

      if (options) {
        shape.businessObject.di.isExpanded = options.isExpanded;
      }

      create.start(event, shape);
    }

    var shortType = type.replace(/^bpmn:/, '');

    return {
      group: group,
      className: className,
      title: translate(title || `Create ${shortType}`),
      action: {
        dragstart: createListener,
        click: createListener
      }
    };
  }

  function createParticipant(event) {
    create.start(event, elementFactory.createParticipantShape());
  }

  assign(actions, {
    'create.start-event': createAction(
      'bpmn:StartEvent', 'event', 'custom icon-custom-start',
      translate('Create StartEvent')
    ),
    'create.end-event': createAction(
      'bpmn:EndEvent', 'event', 'custom icon-custom-end',
      translate('Create EndEvent')
    ),
    'create.custom-task': createAction(
      'custom:task', 'custom', 'custom icon-custom-task',
      translate('Create task')
    ),
    'create.custom-coupon': createAction(
      'custom:coupon', 'custom', 'custom icon-custom-coupon',
      translate('Create coupon')
    ),
    'create.custom-test': createAction(
      'custom:test', 'custom', 'custom icon-custom-test',
      translate('Create test')
    ),
    'create.custom-tips': createAction(
      'custom:tips', 'custom', 'custom icon-custom-tips',
      translate('Create tips')
    ),
    'create.custom-branch': createAction(
      'custom:branch', 'custom', 'custom icon-custom-branch',
      translate('Create branch')
    ),
  });

  return actions;
};