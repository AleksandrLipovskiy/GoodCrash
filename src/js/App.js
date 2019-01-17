'use strict';

import { getDOM } from './services/getDOM';
import { runClock } from './services/clock';
import { getCurrentLang, changeLang } from './services/i18n';
import { locale } from './gettext/locale';
import * as animate from './services/animate';

export class App {
  constructor(isLoaded) {
    this._isLoaded = isLoaded;

    this.DOM = getDOM();
    this.lang = getCurrentLang();
    this.timePrintText = 60;

    this.init();
  }

  get isLoaded () {
    return this._isLoaded;
  }

  set isLoaded (value) {
    this._isLoaded = value;
  }

  init () {
    runClock(this.DOM.dataTimeEl);
    this.loadWithCurrentLang();
    this.sayHello();
  }

  loadWithCurrentLang () {
    if (document.documentElement.getAttribute('lang') != this.lang) {
      changeLang(this.DOM.body, this.lang, this.DOM.gettext, true);
    }
  }

  clickLangSelector (langSelector) {
    this.lang = langSelector.textContent;
    changeLang(this.DOM.body, this.lang, this.DOM.gettext);
  }

  sayHello () {
    const printHello = async () => {
      await animate.pauseBetween();
      await animate.printText(this.DOM.sayHelloHello, locale[this.lang]['main']['hello'], this.timePrintText);
      await animate.printText(this.DOM.sayHelloIndie, locale[this.lang]['main']['indie'], this.timePrintText);
      await animate.printText(this.DOM.sayHelloDev, locale[this.lang]['main']['dev'], this.timePrintText);
      await animate.pauseBetween();
    }

    printHello().then(() => {
      this.DOM.body.classList.add('load');
      this.isLoaded = true;
    }).catch((err) => { console.log(err.message) });
  }
}
