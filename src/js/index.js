'use strict';

import '../css/style.styl';
import '../audio/new-message.mp3';

import { App } from './App';

window.onload = function() {
  const app = new App();

  app.DOM.navTrigger.onclick = () => {
    app.openCloseNav();
  }

  document.onclick = () => {
    if (app.isLoaded && !app.messenger.isSendedFirstMessage) {
      app.messenger.sendFirstMessage();
    }
  }

  app.DOM.chatIcon.onclick = () => {
    if (app.isLoaded && app.messenger.isSendedFirstMessage) app.messenger.openMessenger();
  }

  app.DOM.messengerClose.onclick = () => {
    if (app.isLoaded && app.messenger.isSendedFirstMessage) app.messenger.closeMessenger();
  }

  app.DOM.volumeTrigger.onclick = function() {
    app.ofOnSound(this);
  }

  // change lang when clicl lang selector
  for (let langSelector of app.DOM.langSelectors) {
    langSelector.onclick = function() {
      app.clickLangSelector(this);
    }
  }

  // navigation when click nav-links
  for (let link of app.DOM.navLinks) {
    link.onclick = function(event) {
      event.preventDefault();
      app.navigate(this.getAttribute('href'));
    }
  }
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
