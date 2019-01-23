'use strict';

const request = new XMLHttpRequest();
const response = {
  url: null,
  error: null,
  ok: null
};

export const getRequest = async (url, dir) => {
  await _sendRequest(url, dir);
}

function _sendRequest (url, dir) {
  return new Promise((resolve, reject) => {
    request.open('GET', `${ __dirname + dir + '/' + url }.html`, true);
    request.setRequestHeader('Content-Type', 'text/html');
    request.send();

    request.onreadystatechange = () => {
      if (request.status != 200) {
        _returnError(url, request.status, request.statusText);
      }
      else {
        try {
          _returnOk(request.responseText);
        }
        catch (e) {
          _returnError(url, request.status, e.message);
        }
      }

      resolve();
    }
  });
}

function _returnError (url, status, msg) {
  response.error = { url: url, status: status, msg: msg };
}

function _returnOk (content) {
  response.ok = { content: content };
}

export function getResponse () {
  return response;
}
