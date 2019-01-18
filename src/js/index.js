'use strict';

import '../css/style.styl';
import '../audio/new-message.mp3';

import { App } from './App';

window.onload = function() {
  const app = new App();

  document.onclick = () => {
    if (app._isLoaded && !app.messenger.isViewedFirstMessege) {
      app.messenger.sendFirstMessege();
    }
  }

  app.DOM.volumeTrigger.onclick = function() {
    app.ofOnSound(this);
  }

  // change lang when clicl lang selector
  for (let langSelector of app.DOM.langSelectors) {
    langSelector.onclick = function() {
      if (app._isLoaded) app.clickLangSelector(this);
    }
  }
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
