import translations, { Translate } from './translationsGerman';
type Template = keyof Translate;


export default function customTranslate(template: Template, replacements: { [x: string]: string; }) {
  replacements = replacements || {};

  // Translate
  let targetTranslate = translations[template] || template;

  // Replace
  return targetTranslate.replace(/{([^}]+)}/g, function (_, key: Template) {

    var str = replacements[key];
    if (translations[replacements[key] as Template] != null && translations[replacements[key] as Template] != 'undefined') {
      str = translations[replacements[key] as Template];
    }
    console.log(replacements)
    return str || '{' + key + '}';

  });
}