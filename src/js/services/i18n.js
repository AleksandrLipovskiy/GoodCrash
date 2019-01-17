'use strict';

import { locale } from '../gettext/locale';

export function getCurrentLang () {
  const userLanguage = (navigator.language || navigator.userLanguage).toLowerCase();

  return (!!(~userLanguage.indexOf('en'))) ? 'en' : 'ru';
}

export function changeLang (body, lang, gettext) {
  body.setAttribute('lang', lang);

  _gettextTranslate(lang, gettext);
}

function _gettextTranslate (lang, gettext) {
  for (let el of gettext) {
    el.textContent = locale[lang][el.getAttribute('data-i18n')];
  }
}
