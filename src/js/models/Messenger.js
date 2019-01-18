'use strict';

import { locale } from '../gettext/locale';

export class Messenger {
  constructor(app) {
    this.app = app;
    this.gettext = locale[app.lang]["messenger"];
    this.rington = new Audio('../../audio/new-message.mp3');

    this._isViewedFirstMessege = false;
  }

  get isViewedFirstMessege () {
    return this._isViewedFirstMessege;
  }

  set isViewedFirstMessege (value) {
    this._isViewedFirstMessege = value;
  }

  sendFirstMessege () {
    this._playRigton();
    this._greetingFromGoodCrash();
    this._increaseAmountInIcon(1);

    this.isViewedFirstMessege = true;
  }

  _playRigton () {
    if (this.app.isSoundVolue) this.rington.play().catch();
  }

  _greetingFromGoodCrash () {
    this.app.DOM.messegeBody.textContent = this.gettext["hello"];
  }

  _increaseAmountInIcon (numberOfNewMessege) {
    setTimeout(() => {
      this.app.DOM.chatIcon.classList.add('new-message-arrived');
      this.app.DOM.chatCount.textContent = this._getCurrentAmountInIcon() + numberOfNewMessege;
    }, 1000);
  }

  _getCurrentAmountInIcon () {
    return parseInt(this.app.DOM.chatCount.textContent, 10);
  }
}
