'use strict';

export function getDOM () {
  return {
    body: document.getElementById('body'),
    main: document.getElementById('main'),
    navTrigger : document.querySelector('.nav-trigger'),
    dataTimeEl: document.querySelector('.data-time'),
    volumeTrigger: document.querySelector('.volume-trigger'),
    sayHelloHello: document.querySelector('.say-hello-hello'),
    sayHelloIndie: document.querySelector('.say-hello-indie'),
    sayHelloDev: document.querySelector('.say-hello-dev'),
    langSelectors: document.querySelectorAll('.lang-selectors'),
    gettext: document.getElementsByName('i18n'),
    chatIcon: document.querySelector('.main-chat'),
    chatCount: document.querySelector('.main-chat-count-new'),
    messengerClose: document.querySelector('.messenger-header-close'),
    messengerBody: document.querySelector('.messenger-body'),
    messengerMessage: document.querySelector('.messenger-message-body'),
    messengerInput: document.getElementById('messenger'),
    messengerBtn: document.querySelector('.messenger-send-btn')
  }
}
