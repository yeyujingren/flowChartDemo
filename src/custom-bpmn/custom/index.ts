// import paletteProvider from "../customPalette/paletteprovider";
import customTranslate from '../customTranslate/customTranslate';

export default {
  __init__: [
    'translate'
  ],
  translate: ['value', customTranslate]
  // paletteProvider: ["type", paletteProvider],
  // palette: [ 'type', customPalette ],
}
