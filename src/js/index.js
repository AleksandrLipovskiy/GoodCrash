'use strict';

import '../css/style.styl';

import { App } from './App';

window.onload = function() {
  const app = new App;
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
