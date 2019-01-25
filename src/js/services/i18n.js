'use strict';

import { locale } from '../gettext/locale';

/**
 * Return current language user browser
 * @returns { string }
 */
export function getCurrentLang () {
  const userLanguage = (navigator.language || navigator.userLanguage).toLowerCase();

  return (!!(~userLanguage.indexOf('en'))) ? 'en' : 'ru';
}

/**
 * Run translate DOM els with data-i18n
 * @param { object | DOM el } body, in this <body>
 * @param { string } lang
 * @param { object | DOM els } gettext, with data-i18n
 * @param { boolean } pageLoad, default: false, (false -> translate say-hello els)
 */
export function changeLang (body, lang, gettext, pageLoad = false) {
  body.setAttribute('lang', lang);

  if (pageLoad) _gettextTranslateWithoutAnimation(lang, gettext);
  else _gettextTranslate(lang, gettext);
}

/**
 * Translate in loop DOM els with data-i18n and without say-hello els
 * @param { string } lang
 * @param { object | DOM els } gettext, with data-i18n
 */
function _gettextTranslateWithoutAnimation(lang, gettext) {
  for (let el of gettext) {
    if (el.getAttribute('load') != 'false') {
      _elementTranslate(el, lang);
    }
  }
}

/**
 * Translate in loop DOM els with data-i18n and with say-hello els
 * @param { string } lang
 * @param { object | DOM els } gettext, with data-i18n
 */
function _gettextTranslate (lang, gettext) {
  for (let el of gettext) {
    _elementTranslate(el, lang);
  }
}

/**
 * Translate single DOM el
 * @param { object | DOM el } el
 * @param { string } lang
 */
function _elementTranslate (el, lang) {
  el.textContent = locale[lang][el.getAttribute('data-i18n')];
}
