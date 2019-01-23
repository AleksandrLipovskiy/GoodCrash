'use strict';

import * as createDOM from '../services/createDOM';

export class WindowPage {
  constructor() {}

  openWindowPage (url, title, content, container) {
    let els = this._createWindowPage();
    els['window'].classList.add(url);
    this.windowPage = this._buildWindowPage(this._fillWindowPage(els, title, content));

    if (this._isHasNotWindowPage()) {
      container.appendChild(this.windowPage);
      this._canCloseWindowPage();
    }
  }

  _createWindowPage () {
    return createDOM.createDOMElements('window-page', ['window', 'title', 'full-screen', 'close', 'window-body']);
  }

  _fillWindowPage (els, title, content) {
    return createDOM.fillDOMElements(els, [title, content], ['title', 'window-body']);
  }

  _buildWindowPage (els) {
    return createDOM.buildDOMElement(els);
  }

  _isHasNotWindowPage () {
    if (document.querySelector('.window-page-window')) return false;
    
    return true;
  }

  _canCloseWindowPage () {
    document.querySelector('.window-page-close').onclick = () => {
      this.windowPage.remove();
    }
  }

  openWindowError (msg, container) {
    let els = this._createWindowError();
    this.windowError = this._buildWindowError(this._fillWindowError(els, 'Error', msg));

    if (this._isHasNotWindowError()) {
      container.appendChild(this.windowError);
      this._canCloseWindowError();
    }
  }

  _createWindowError () {
    return createDOM.createDOMElements('window-error', ['window', 'title', 'close', 'window-body']);
  }

  _fillWindowError (els, title, msg) {
    return createDOM.fillDOMElements(els, [title, msg], ['title', 'window-body']);
  }

  _buildWindowError (els) {
    return createDOM.buildDOMElement(els);
  }

  _isHasNotWindowError () {
    if (document.querySelector('.window-error-window')) return false;
    
    return true;
  }

  _canCloseWindowError () {
    document.querySelector('.window-error-close').onclick = () => {
      this.windowError.remove();
    }
  }
}
