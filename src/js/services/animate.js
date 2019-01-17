'use strict';

export function printText(ctx, text, time) {
  return new Promise(resolve => {
    let countStrings = Object.keys(text).length;
    let i = 0;

    let printStrings = (string, print) => {
      print();
    }

    let printWords = () => {
      let chars = text[i].split("");
      let n = 0;

      setTimeout(function animate() {
        printChar(chars[n]);

        if (n < chars.length - 1) setTimeout(animate, time);
        else if (n == chars.length - 1) {
          clearTimeout(animate);
          i++;
          if (i < countStrings) {
            setTimeout(() => {
              addLineBreak();
              printStrings(text[i], () => { printWords(); });
            }, 250);
          } else if (i == countStrings) {
            resolve();
          }
        }

        n++;
      }, time);
    }

    let printChar = (char) => {
      ctx.innerHTML += char;
    }

    let addLineBreak = () => {
      ctx.innerHTML += ' </br>';
    }

    printStrings(text[i], () => {
      printWords();
    });
  });
}

export function deleteText(ctx, text, time) {
  return new Promise((resolve, reject) => {
    let countStrings = Object.keys(text).length;
    let i = countStrings - 1;

    let deleteStrings = (string, backspaceText) => {
      backspaceText();
    }

    let deleteChar = (n) => {
      ctx.innerHTML = '';
      ctx.innerHTML = text[i].substring(0, n);
    }

    let deleteWords = () => {
      let n = text[i].length -1;

      setTimeout(function animate() {
        deleteChar(n);

        if (n > 0) setTimeout(animate, time);
        else if (n == 0) {
          clearTimeout(animate);
          if (i != 0) i--;
          if (i < countStrings && i != 0) {
            setTimeout(() => {
              deleteStrings(text[i], () => { deleteWords(); });
            }, 250);
          } else if (i == 0) {
            resolve();
          }
        }

        n--;
      }, time);
    }

    deleteStrings(text[i], () => {
      deleteWords();
    });
  });
}

export function pauseBetween() {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve() }, 2000);
  });
}

export function dragAndDrop(element, event) {
  const coords = getCoords(element);
  const shiftX = event.pageX - coords.left;
  const shiftY = event.pageY - coords.top;

  moveAt(event);

  document.onmousemove = function(e) {
    moveAt(e);
  };

  element.onmouseup = function() {
    document.onmousemove = null;
    element.onmouseup = null;
  };

  function getCoords(elem) {
    const box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  function moveAt(event) {
    element.style.left = event.pageX - shiftX + 'px';
    element.style.top = event.pageY - shiftY + 'px';
  }

  element.ondragstart = function() {
    return false;
  };
}
