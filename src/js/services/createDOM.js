'use strict';

export function createDOMElements (baseClass, createdClasses) {
  let els = [];

  createdClasses.forEach(i => {
    els[i] = document.createElement('div');
    els[i].className = `${ baseClass }-${ i }`;
  });

  return els;
}

export function fillDOMElements (els, ctx, ...value) {
  value.forEach((arg, i) => {
    els[arg].innerHTML = ctx[i];
  });
}
