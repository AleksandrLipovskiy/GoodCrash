'use strict';

import { getDOM } from './services/getDOM';
import { runClock } from './services/clock';

export class App {
  constructor() {
    this.DOM = getDOM();

    this.init();
  }

  init () {
    runClock(this.DOM.dataTimeEl);
  }
}
