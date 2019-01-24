'use strict';

import { getDOM } from './services/getDOM';
import { getCurrentUrl, navigation } from './services/navigation';
import { runClock } from './services/clock';
import { getCurrentLang, changeLang } from './services/i18n';
import { locale } from './gettext/locale';
import * as animate from './services/animate';
import { Messenger } from './models/Messenger';

export class App {
  constructor() {
    this.DOM = getDOM();
    this.lang = getCurrentLang();
    this.timePrintText = 60;
    this.messenger = new Messenger(this);
    this._isLoaded = false;
    this._isSoundVolue = true;
    this.init();
  }

  get isLoaded () {
    return this._isLoaded;
  }

  set isLoaded (value) {
    this._isLoaded = value;
  }

  get isSoundVolue () {
    return this._isSoundVolue;
  }

  set isSoundVolue (value) {
    this._isSoundVolue = value;
  }

  init () {
    runClock(this.DOM.dataTimeEl);
    this.loadPage();
    this.sayHello();
  }

  loadPage () {
    console.log(getCurrentUrl());
    this.loadWithCurrentLang();
  }

  navigate (url) {
    this._removeClassListForNav();
    navigation(url, this.lang, this.DOM.main);
  }

  loadWithCurrentLang () {
    if (document.documentElement.getAttribute('lang') != this.lang) {
      changeLang(this.DOM.body, this.lang, this.DOM.gettext, true);
    }
  }

  openCloseNav() {
    this.DOM.body.classList.toggle('nav-is-open');

    this.DOM.main.onclick = () => {
      this._removeClassListForNav();
    }
  }

  _removeClassListForNav() {
    if (this.DOM.body.classList.contains('nav-is-open')) {
      this.DOM.body.classList.remove('nav-is-open');
    }
  }

  clickLangSelector (langSelector) {
    this.lang = langSelector.textContent;
    changeLang(this.DOM.body, this.lang, this.DOM.gettext);
  }

  ofOnSound (el) {
    el.setAttribute('volume', !this.isSoundVolue);
    this.isSoundVolue = !this.isSoundVolue;
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
