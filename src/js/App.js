'use strict';

import { getDOM } from './services/getDOM';
import { runClock } from './services/clock';
import { getCurrentLang, changeLang } from './services/i18n'; 

export class App {
  constructor() {
    this.isLoaded = true;

    this.DOM = getDOM();
    this.lang = getCurrentLang();

    this.init();
  }

  init () {
    this.loadWithCurrentLang();
    runClock(this.DOM.dataTimeEl);
  }

  loadWithCurrentLang () {
    if (document.documentElement.getAttribute('lang') != this.lang) {
      changeLang(this.DOM.body, this.lang, this.DOM.gettext);
    }
  }

  clickLangSelector (langSelector) {
    this.lang = langSelector.textContent;
    changeLang(this.DOM.body, this.lang, this.DOM.gettext);
  }
}
