import customTranslate from '../customTranslate/customTranslate';
import paletteProvider from '../custionPalette/paletteprovider'
import customRenderer from '../customRender/render';
import CustomElementFactory from '../customElementFactory';
import CustomRules from '../customRules';
import CustomOrderingProvider from '../customOrderingProvider';
import CustomContextPadProvider from '../customContextPadProvider';
import CustomUpdater from '../customUpdater';

export default {
  __init__: [
    // 'translate',
    'contextPadProvider',
    'customOrderingProvider',
    'customRenderer',
    'customRules',
    'customUpdater',
    'elementFactory',
    'customPalette'
  ],
  // translate: ['value', customTranslate],
  contextPadProvider: [ 'type', CustomContextPadProvider ],
  customOrderingProvider: [ 'type', CustomOrderingProvider ],
  customRenderer: ["type", customRenderer],
  customRules: ['type', CustomRules],
  customUpdater: [ 'type', CustomUpdater ],
  elementFactory: [ 'type', CustomElementFactory ],
  customPalette: ["type", paletteProvider],
}
