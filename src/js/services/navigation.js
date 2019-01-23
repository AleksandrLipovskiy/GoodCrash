'use strict';

import { locale } from '../gettext/locale';
import { WindowPage } from '../models/WindowPage';
import { getRequest, getResponse } from './xhRequest';

const windowPage = new WindowPage();
const dir = 'pages';

export function getCurrentUrl () {
  return (window.location.pathname != '/') ? window.location.pathname.substring(1) : '/';
}

export function navigation (url, lang, container) {
  if (url != getCurrentUrl()) _loadPage(url, lang, container);
}

function _loadPage (url, lang, container) {
  getRequest(url, dir).then(() => {
    _fillPage(lang, container, getResponse());
  }).catch((err) => { console.log(err.message) });
}

function _fillPage (lang, container, response) {
  if (response.error) windowPage.openWindowError(locale[lang]['error load'], container);
  else windowPage.openWindowPage(lang, container, response.ok);
}

