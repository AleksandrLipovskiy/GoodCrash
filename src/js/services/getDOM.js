'use strict';

export function getDOM () {
  return {
    body: document.getElementById('body'),
    dataTimeEl: document.querySelector('.data-time'),
    sayHelloHello: document.querySelector('.say-hello-hello'),
    sayHelloIndie: document.querySelector('.say-hello-indie'),
    sayHelloDev: document.querySelector('.say-hello-dev'),
    langSelectors: document.querySelectorAll('.lang-selectors'),
    gettext: document.getElementsByName('i18n')
  }
}
