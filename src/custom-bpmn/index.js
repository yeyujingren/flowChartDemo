// export * as default from './custom';
import Modeler from "bpmn-js/lib/Modeler";

import CustomModule from './custom';

function isCustomConnection(element) {
  return element.type === 'custom:connection';
}

export default function CustomModeler(options) {
  Modeler.call(this, options);

  this._customElements = [];
}

// inherits(CustomModeler, Modeler);

CustomModeler.prototype = Object.create(Modeler.prototype);

CustomModeler.prototype._modules = [].concat(
  CustomModeler.prototype._modules,
  [
    CustomModule
  ]
);

/**
 * Add a single custom element to the underlying diagram
 *
 * @param {Object} customElement
 */
CustomModeler.prototype._addCustomShape = function(customElement) {

  this._customElements.push(customElement);

  var canvas = this.get('canvas'),
      elementFactory = this.get('elementFactory');

  var customAttrs = assign({ businessObject: customElement }, customElement);

  var customShape = elementFactory.create('shape', customAttrs);

  return canvas.addShape(customShape);

};

CustomModeler.prototype._addCustomConnection = function(customElement) {

  this._customElements.push(customElement);

  var canvas = this.get('canvas'),
      elementFactory = this.get('elementFactory'),
      elementRegistry = this.get('elementRegistry');

  var customAttrs = assign({ businessObject: customElement }, customElement);

  var connection = elementFactory.create('connection', assign(customAttrs, {
    source: elementRegistry.get(customElement.source),
    target: elementRegistry.get(customElement.target)
  }),
  elementRegistry.get(customElement.source).parent);

  return canvas.addConnection(connection);

};

/**
 * Add a number of custom elements and connections to the underlying diagram.
 *
 * @param {Array<Object>} customElements
 */
CustomModeler.prototype.addCustomElements = function(customElements) {

  if (!isArray(customElements)) {
    throw new Error('argument must be an array');
  }

  var shapes = [],
      connections = [];

  customElements.forEach(function(customElement) {
    if (isCustomConnection(customElement)) {
      connections.push(customElement);
    } else {
      shapes.push(customElement);
    }
  });

  // add shapes before connections so that connections
  // can already rely on the shapes being part of the diagram
  shapes.forEach(this._addCustomShape, this);

  connections.forEach(this._addCustomConnection, this);
};

/**
 * Get custom elements with their current status.
 *
 * @return {Array<Object>} custom elements on the diagram
 */
CustomModeler.prototype.getCustomElements = function() {
  return this._customElements;
};


// export default class CustomModeler extends Modeler {
//   constructor(options) {
//     super(options);
//     this._customElements = [];
//     this._modules = [].concat(this._modules, [CustomModel]);
//     this.canvas = this.get('canvas');
//     this.elementFactory = this.get('elementFactory');
//     this.elementRegistry = this.get('elementRegistry');
//   }

//   _addCustomShape(customElement) {
//     this._customElements.push(customElement);
//     const customAttrs = Object.assign({ businessObject: customElement }, customElement);
//     const customShape = this.elementFactory.create('shape', customAttrs);
//     return this.canvas.addShape(customShape);
//   }

//   _addCustomConnection(customElement) {
//     this._customElements.push(customElement);

//     const customAttrs = Object.assign({ businessObject: customElement }, customElement);

//     const connection = this.elementFactory.create(
//       'connection',
//       assign(customAttrs, {
//         source: this.elementRegistry.get(customElement.source),
//         target: this.elementRegistry.get(customElement.target)
//       }),
//       elementRegistry.get(customElement.source).parent
//     );

//     return canvas.addConnection(connection);
//   }

//   addCustomElements(customElements) {
//     if (!Array.isArray(customElements)) {
//       throw new Error('argument must be an array');
//     }

//     const shapes = [];
//     const connections = [];

//     customElements.forEach(function (customElement) {
//       if (isCustomConnection(customElement)) {
//         connections.push(customElement);
//       } else {
//         shapes.push(customElement);
//       }
//     });

//     // add shapes before connections so that connections
//     // can already rely on the shapes being part of the diagram
//     shapes.forEach(this._addCustomShape, this);

//     connections.forEach(this._addCustomConnection, this);
//   }

//   getCustomElements() {
//     return this._customElements;
//   }

// }
