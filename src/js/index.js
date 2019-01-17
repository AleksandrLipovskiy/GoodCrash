'use strict';

import '../css/style.styl';

import { App } from './App';

window.onload = function() {
  const app = new App;

  // change lang when clicl lang selector
  for (let langSelector of app.DOM.langSelectors) {
    langSelector.onclick = function() {
      if (app.isLoaded) app.clickLangSelector(this);
    }
  }
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
