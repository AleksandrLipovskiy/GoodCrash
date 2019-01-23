'use strict';

import * as createDOM from '../services/createDOM';

export class WindowPage {
  constructor() {}

  openWindowPage (url, title, content, container) {
    const baseClass = 'window-page';
    const createClases = ['window', 'title', 'full-screen', 'close', 'window-body'];
    const windowPage = this._createWindow(title, content, baseClass, createClases);
    
    windowPage.classList.add(url);

    this._viewWindow(container, windowPage);
    this._canCloseWindow(windowPage, false);
  }

  _createWindow (title, content, baseClass, createClases) {
    let els = createDOM.createDOMElements(baseClass, createClases);

    return createDOM.buildDOMElement(
      createDOM.fillDOMElements(els, [title, content], ['title', 'window-body'])
    );
  }

  _viewWindow (container, windowForOpen) {
    if (this._isMissingInContainer(windowForOpen.classList.value)) {
      container.appendChild(windowForOpen);
    } else {
      this._showHidenWindow(windowForOpen.classList.value);
    }
  }

  _isMissingInContainer (classesForSelect) {
    if (this._getElementForSelector(classesForSelect)) return false;
    
    return true;
  }

  _canCloseWindow (windowForClose, remove = true) {
    let clasesForSelect = windowForClose.classList[0].split('-');
    clasesForSelect.length = 2;
    let closeSelector = clasesForSelect.join('-') + '-close';
    
    windowForClose.querySelector(`.${ closeSelector }`).onclick = () => {
      if (remove) windowForClose.remove();
      else windowForClose.classList.add('closed-window');
    }
  }

  _showHidenWindow (classesForSelect) {
    this._getElementForSelector(classesForSelect).classList.remove('closed-window');
  }

  _getElementForSelector (classesForSelect) {
    let selector = classesForSelect.split(' ').join('.');
    return document.querySelector(`.${ selector }`);
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
