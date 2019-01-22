'use strict';

import { locale } from '../gettext/locale';
import { WindowPage } from '../models/WindowPage';

const windowPage = new WindowPage();

export function getCurrentUrl () {
  return (window.location.pathname != '/') ? window.location.pathname.substring(1) : '/';
}

export function navigation (url, lang) {
  if (url != getCurrentUrl()) _loadPage(url, lang);
}

function _loadPage (url, lang) {
  _xhRequest(url, lang);
}

function _xhRequest (url, lang) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `${ __dirname + 'pages/' + url }.html`, true);
  xhr.setRequestHeader('Content-Type', 'text/html');
  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
      _viewRequestError(lang, `loadPage: ${url}`, xhr.status, xhr.statusText);
    } else {
      try {
        _fillPage(xhr.responseText);
      } catch (e) {
        _viewRequestError(lang, `loadPage: ${url}`, xhr.status, e.message);
      }
    }
  }
}

function _fillPage (content) {
  console.log(content);
}

function _viewRequestError (lang, ...values) {
  windowPage.openWindowError(locale[lang]['error load']);
  // TODO: send me message about error
}
