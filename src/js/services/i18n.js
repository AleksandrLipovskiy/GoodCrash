'use strict';

import { locale } from '../gettext/locale';

export function getCurrentLang () {
  const userLanguage = (navigator.language || navigator.userLanguage).toLowerCase();

  return (!!(~userLanguage.indexOf('en'))) ? 'en' : 'ru';
}

export function changeLang (body, lang, gettext, pageLoad = false) {
  body.setAttribute('lang', lang);

  if (pageLoad) _gettextTranslateWithoutAnimation(lang, gettext);
  else _gettextTranslate(lang, gettext);
}

function _gettextTranslateWithoutAnimation(lang, gettext) {
  for (let el of gettext) {
    if (el.getAttribute('load') != 'false') {
      _elementTranslate(el, lang);
    }
  }
}

function _gettextTranslate (lang, gettext) {
  for (let el of gettext) {
    _elementTranslate(el, lang);
  }
}

function _elementTranslate (el, lang) {
  el.textContent = locale[lang][el.getAttribute('data-i18n')];
}
