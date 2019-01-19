'use strict';

import { locale } from '../gettext/locale';

export class Messenger {
  constructor(app) {
    this.app = app;
    this.gettext = locale[app.lang]["messenger"];
    this.rington = new Audio('../../audio/new-message.mp3');
    this.i = 0;
    this._isSendedFirstMessage = false;
    this._isFirstAnswer = true;
  }

  get isSendedFirstMessage () {
    return this._isSendedFirstMessage;
  }

  set isSendedFirstMessage (value) {
    this._isSendedFirstMessage = value;
  }

  get isFirstAnswer () {
    return this._isFirstAnswer;
  }

  set isFirstAnswer (value) {
    this._isFirstAnswer = value;
  }

  openMessenger () {
    this._decreaseAmountInIcon();
    this._messegerWindow();
    this._startDialogue();
  }

  closeMessenger () {
    this._messegerWindow();
  }

  sendFirstMessage () {
    this._playRigton();
    this._greetingFromGoodCrash();
    this._increaseAmountInIcon(1);
    this.isSendedFirstMessage = true;
  }

  _playRigton () {
    if (this.app.isSoundVolue) this.rington.play().catch();
  }

  _messegerWindow() {
    this.app.DOM.body.classList.toggle('messenger-open');
  }

  _greetingFromGoodCrash () {
    this.app.DOM.messengerMessage.textContent = this.gettext["hello"];
  }

  _increaseAmountInIcon (numberOfNewMessage) {
    setTimeout(() => {
      this.app.DOM.chatIcon.classList.add('new-message-arrived');
      this.app.DOM.chatCount.textContent = this._getCurrentAmountInIcon() + numberOfNewMessage;
    }, 1000);
  }

  _getCurrentAmountInIcon () {
    return parseInt(this.app.DOM.chatCount.textContent, 10);
  }

  _decreaseAmountInIcon () {
    this.app.DOM.chatIcon.classList.remove('new-message-arrived');
    this.app.DOM.chatCount.textContent = 0;
  }

  _startDialogue () {
    this.app.DOM.messengerBtn.onclick = () => {
      let value = this.app.DOM.messengerInput.value;

      if (value != '') this._sendMessageFromUser(value);
      this.app.DOM.messengerInput.value = '';
    }
  }

  _sendMessageFromUser (value) {
    let message = this._createNewMessage('you', this._validValue(value));
    this._viewNewMessage(message);
    this._goodCrashAnswers();
  }

  _goodCrashAnswers () {
    this._startAnimateAnswer();

    setTimeout(() => {
      this._stopAnimateAnswer();
      this._viewNewMessage(this._getAnswresMessage());

      if (this.isFirstAnswer) this.isFirstAnswer = false;
    }, 2000);
  }

  _startAnimateAnswer () {
    let elsClases = ['animate-box', 'animate-pen', 'animate-dotted'];
    let els = [];

    this._createDOMElements(els, elsClases);

    els['animate-dotted'].textContent = '...';

    els['animate-box'].appendChild(els['animate-pen']);
    els['animate-box'].appendChild(els['animate-dotted']);

    this._viewNewMessage(els['animate-box']);
  }

  _stopAnimateAnswer () {
    document.querySelector('.messenger-message-animate-box').remove();
  }

  _getAnswresMessage () {
    return this._createNewMessage('GoodCrash', this._getAnswresMessageValue());
  }

  _getAnswresMessageValue () {
    let value = this.isFirstAnswer ? this.gettext["first message"] : this.gettext["second message"][this.i];
    if (!this.isFirstAnswer && this.i < 8) this.i += 1;
    if (this.i == 8) this.i = 0;

    return value;
  }

  _createNewMessage (author, value) {
    let elsClases = ['box', 'ctx', 'author', 'body'];
    let els = [];

    this._createDOMElements(els, elsClases);
    this._fillMessageWithContent(els, author, value);
    this._buildMessage(els);

    return els['box'];
  }

  _createDOMElements (els, elsClases) {
    elsClases.forEach(i => {
      els[i] = document.createElement('div');
      els[i].className = `messenger-message-${ i }`;
    });
  }

  _fillMessageWithContent (els, author, value) {
    if (author == 'you') els['ctx'].classList.add(author);
    els['author'].textContent = author;
    els['body'].textContent = value;
  }

  _buildMessage (els) {
    els['ctx'].appendChild(els['author']);
    els['ctx'].appendChild(els['body']);
    els['box'].appendChild(els['ctx']);
  }

  _validValue (value) {
    return value.replace( /</g, " " ).replace( />/g, " " );
  }

  _viewNewMessage (message) {
    const messengerBody = this.app.DOM.messengerBody;

    messengerBody.appendChild(message);

    if (messengerBody.clientHeight < messengerBody.scrollHeight) {
      messengerBody.scrollTop += messengerBody.scrollHeight - messengerBody.clientHeight;
    }
  }
}
