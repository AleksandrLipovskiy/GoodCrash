'use strict';

export function getDOM () {
  return {
    body: document.getElementById('body'),
    dataTimeEl: document.querySelector('.data-time'),
    langSelectors: document.querySelectorAll('.lang-selectors'),
    gettext: document.getElementsByName('i18n')
  }
}
