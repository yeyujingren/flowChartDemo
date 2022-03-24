// import paletteProvider from "../customPalette/paletteprovider";
import customTranslate from '../customTranslate/customTranslate';
// import customPalette from '../custionPalette/palette';
import paletteProvider from '../custionPalette/paletteprovider'
import customRenderer from '../customRender/render';
import CustomElementFactory from '../customElementFactory';

export default {
  __init__: [
    'translate',
    'customPalette',
    'customRenderer',
    'elementFactory'
  ],
  translate: ['value', customTranslate],
  customPalette: ["type", paletteProvider],
  customRenderer: ["type", customRenderer],
  elementFactory: [ 'type', CustomElementFactory ],
}
