import customTranslate from '../customTranslate/customTranslate';
import paletteProvider from '../custionPalette'
import customRenderer from '../customRender';
import CustomElementFactory from '../customElementFactory';
import CustomRules from '../customRules';
import CustomOrderingProvider from '../customOrderingProvider';
import CustomContextPadProvider from '../customContextPadProvider';
import CustomUpdater from '../customUpdater';

/**
 * bpmn支持对所有的函数、数据进行扩展（覆盖重写）
 * 为此我们的扩展也主要包含两个种方式；
 *  a、针对模块级别的覆盖： 此时，我们需要直接去覆盖掉源码中对应的模块key（e.g. translate（翻译模块），paletteProvider（工具栏图标模块））
 *  b、功能函数级别的覆盖： 此时我们可以自定义模块名称，但是为必须保持函数名的一致以确保覆盖原来逻辑
 */
export default {
  __init__: [
    'translate',
    'contextPadProvider',
    'customOrderingProvider',
    'customRenderer',
    'customRules',
    'customUpdater',
    'elementFactory',
    'paletteProvider' // 覆盖原始流程图标
  ],
  translate: ['value', customTranslate],
  contextPadProvider: [ 'type', CustomContextPadProvider ],
  customOrderingProvider: [ 'type', CustomOrderingProvider ],
  customRenderer: ["type", customRenderer],
  customRules: ['type', CustomRules],
  customUpdater: [ 'type', CustomUpdater ],
  elementFactory: [ 'type', CustomElementFactory ],
  paletteProvider: ["type", paletteProvider],
}
