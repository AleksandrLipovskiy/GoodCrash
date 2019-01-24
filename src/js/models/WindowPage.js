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
    this._canFullScreenSize(windowPage);
    this._canDragAndDrop(windowPage);
    this._canCloseWindow(windowPage, false);
  }

  _createWindow (title, content, baseClass, createClases) {
    let els = createDOM.createDOMElements(baseClass, createClases);

    return createDOM.buildDOMElement(
      createDOM.fillDOMElements(els, [title, content], ['title', 'window-body'])
    );
  }

  _viewWindow (container, el) {
    this._setActive(el);

    if (this._isMissingInContainer(el.classList.value)) {
      container.appendChild(el);
    } else {
      this._showHidenWindow(el.classList.value);
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

  /**
   * Toggle class in classList el, as a result el change css style
   * @param { object | DOM el } el
   */
  _canFullScreenSize (el) {
    let fullScreenTrigger = this._getChildNodeForSelector(el.classList, 'full-screen');

    el.querySelector(`.${ fullScreenTrigger }`).onclick = () => {
      el.classList.toggle('full-screen');
      el.style.top = 31 + 'px';
      el.style.left = 1 + 'px';
    }
  }

  /**
   * Changes position el in the capture of title in el, if el
   * hasn't class full-screen
   * @param { object | DOM el } el
   */
  _canDragAndDrop (el) {
    let titleTrigger = this._getChildNodeForSelector(el.classList, 'title');

    el.querySelector(`.${ titleTrigger }`).onmousedown = (event) => {
      if (!el.classList.contains('full-screen')) this._dragAndDrop(el, event);
    }
  }

  /**
   * Drag and Drop effect witn el
   * @param { object | DOM el } el
   * @param { event | event mouse/touchpad } event
   */
  _dragAndDrop (el, event) {
    const coords = _getCoords(el);
    const shiftX = event.pageX - coords.left;
    const shiftY = event.pageY - coords.top;

    _moveAt(event);

    document.onmousemove = function(e) {
      _moveAt(e);
    };

    el.onmouseup = function() {
      document.onmousemove = null;
      el.onmouseup = null;
    };

    function _getCoords(element) {
      const box = element.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }

    function _moveAt(e) {
      el.style.left = e.pageX - shiftX + 'px';
      el.style.top = e.pageY - shiftY + 'px';
    }

    el.ondragstart = function() {
      return false;
    };
  }

  _canCloseWindow (el, remove = true) {
    let clasesForSelect = el.classList[0].split('-');
    clasesForSelect.length = 2;
    let closeSelector = clasesForSelect.join('-') + '-close';
    
    el.querySelector(`.${ closeSelector }`).onclick = () => {
      if (remove) {
        el.remove();
      } else {
        el.classList.add('closed-window');
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

  /**
   * Return building class selector for find child in el
   * @param { object | DOMTokenList } classList
   * @param { string } key
   * @returns { string }
   */
  _getChildNodeForSelector (classList, key) {
    let firstPartForBuildSelector = classList[0].split('-');
    firstPartForBuildSelector.length = 2;

    return firstPartForBuildSelector.join('-') + '-' + key;
  }

  _getAllElementsForSelector (classesForSelect) {
    let selector = classesForSelect[0];
    return document.querySelectorAll(`.${ selector }`);
  }
}
