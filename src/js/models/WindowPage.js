'use strict';

import * as createDOM from '../services/createDOM';

export class WindowPage {
  constructor() {
    
  }

  openWindowError (msg) {
    let els = this._createWindowError();
    this._fillWindowError(els, msg);
    this.windowError = this._buildWindowError(els);

    console.log(this.windowError);
  }

  _createWindowError () {
    return createDOM.createDOMElements('window', ['window', 'title', 'full-screen', 'close', 'window-body']);
  }

  _fillWindowError (els, msg) {
    createDOM.fillDOMElements(els, [msg], ['window-body']);
  }

  _buildWindowError (els) {
    els['window'].appendChild(els['title']);
    els['window'].appendChild(els['full-screen']);
    els['window'].appendChild(els['close']);
    els['window'].appendChild(els['window-body']);

    return els['window'];
  }
}
