'use strict';

import * as createDOM from '../services/createDOM';

export class WindowPage {
  constructor() {}

  openWindowError (msg, container) {
    let els = this._createWindowError();
    this.windowError = this._buildWindowError(this._fillWindowError(els, msg));

    if (this._isHasNotWindowError()) {
      container.appendChild(this.windowError);
      this._canCloseWindowError();
    }
  }

  _createWindowError () {
    return createDOM.createDOMElements('window-error', ['window', 'title', 'close', 'window-body']);
  }

  _fillWindowError (els, msg) {
    return createDOM.fillDOMElements(els, [msg, 'Error'], ['window-body', 'title']);
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
