'use strict';

(function () {
  var TIMEOUT = 10000;
  var STATUS_OK = 200;

  var prepareXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response, xhr.status);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    return xhr;
  };

  window.backend = {
    load: function (settings) {
      var xhr = prepareXhr(settings.onLoad, settings.onError);
      xhr.open('GET', settings.url);
      xhr.send();
    },

    save: function (settings) {
      var xhr = prepareXhr(settings.onLoad, settings.onError);
      xhr.open('POST', settings.url);
      xhr.send(settings.data);
    }
  };
})();
