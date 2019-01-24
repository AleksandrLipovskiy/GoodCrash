'use strict';

import * as createDOM from '../services/createDOM';

export class WindowPage {
  constructor() {}

  openWindowError (title, content, container) {
    const baseClass = 'window-error';
    const createClases = ['window', 'title', 'close', 'window-body'];
    const windowError = this._createWindow(title, content, baseClass, createClases);

    this._viewWindow(container, windowError);
    this._canCloseWindow(windowError, true);
  }

  openWindowPage (url, title, content, container) {
    const baseClass = 'window-page';
    const createClases = ['window', 'title', 'full-screen', 'close', 'window-body'];
    const windowPage = this._createWindow(title, content, baseClass, createClases);
    
    windowPage.classList.add(url);

    this._viewWindow(container, windowPage);
    this._setActiveWhenClickThisWindow(windowPage);
    this._canCloseWindow(windowPage, false);
  }

  _createWindow (title, content, baseClass, createClases) {
    let els = createDOM.createDOMElements(baseClass, createClases);

    return createDOM.buildDOMElement(
      createDOM.fillDOMElements(els, [title, content], ['title', 'window-body'])
    );
  }

  _viewWindow (container, windowForOpen) {
    this._setActive(windowForOpen);

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

  _setActive (el) {
    let allWindows = this._getAllElementsForSelector(el.classList);

    for (let windowInAll of allWindows) {
      if (!windowInAll.classList.contains(el.classList[1])) {
        if (windowInAll) windowInAll.classList.add('not-active');
      } else {
        windowInAll.classList.remove('not-active');
      }
    }
  }

  _setActiveWhenClickThisWindow (el) {
    el.onclick = () => {
      this._setActive(el);
    }
  }

  _canCloseWindow (windowForClose, remove = true) {
    let clasesForSelect = windowForClose.classList[0].split('-');
    clasesForSelect.length = 2;
    let closeSelector = clasesForSelect.join('-') + '-close';
    
    windowForClose.querySelector(`.${ closeSelector }`).onclick = () => {
      if (remove) {
        windowForClose.remove();
      } else {
        windowForClose.classList.add('closed-window');
      }
    }
  }

  _showHidenWindow (classesForSelect) {
    let windowForShow = this._getElementForSelector(classesForSelect).classList.remove('closed-window');
  }

  _getElementForSelector (classesForSelect) {
    let selector = classesForSelect.split(' ').join('.');
    return document.querySelector(`.${ selector }`);
  }

  _getAllElementsForSelector (classesForSelect) {
    let selector = classesForSelect[0];
    return document.querySelectorAll(`.${ selector }`);
  }
}
