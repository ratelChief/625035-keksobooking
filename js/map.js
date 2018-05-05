'use strict';
(function () {
  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';

  var template = document.querySelector('template');
  var pinElement = template.content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < window.data.ads.length; i++) {
    fragment.appendChild(window.pin.createPinElement(window.data.ads[i], pinElement));
  }

  var mapPins = document.querySelector('.map__pins');
  var mapElement = document.querySelector('.map');

  var onMapPinClick = function (evt) {
    var target = evt.target;
    var currentTarget = evt.currentTarget;
    while (target.parentElement !== currentTarget) {
      if (!target.parentElement.classList.contains('map__pin--main') && target.parentElement.classList.contains('map__pin')) {
        var cardElement = template.content.querySelector('.map__card').cloneNode(true);
        var photoElement = cardElement.querySelector('.popup__photo');
        var existPopup = mapElement.querySelector('.popup');
        if (existPopup) {
          existPopup.remove();
        }
        debugger;
        window.card.renderAdCard(window.data.ads[target.parentElement.dataset.indexOfPin], cardElement, photoElement);
        mapElement.insertBefore(cardElement, document.querySelector('.map__filters-container'));

        var popup = mapElement.querySelector('.popup');
        var popupCloseButton = popup.querySelector('.popup__close');

        popupCloseButton.addEventListener('click', function () {
          popup.remove();
        });
      }
      target = target.parentElement;
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };

  mapPins.addEventListener('click', onMapPinClick);

  var setMessageTimeout = function (messageEl, timeout) {
    if (timeout) {
      var timeoutID = setTimeout(function () {
        window.util.removeElement(messageEl);
        clearTimeout(timeoutID);
      }, timeout);
    }
  };

  var showErrorMessage = function (error, showTime) {
    var messageNode = document.createElement('div');

    messageNode.id = 'error';
    messageNode.style.position = 'fixed';
    messageNode.style.zIndex = '100';
    messageNode.style.left = 0;
    messageNode.style.right = 0;
    messageNode.style.margin = '0 auto';
    messageNode.style.padding = '5px';
    messageNode.style.fontSize = '24px';
    messageNode.style.color = 'white';
    messageNode.style.textAlign = 'center';
    messageNode.style.backgroundColor = 'red';
    messageNode.textContent = error;

    var prevError = document.querySelector('#error');

    if (prevError) {
      window.util.removeElement(prevError);
    }

    document.body.insertAdjacentElement('afterbegin', messageNode);
    setMessageTimeout(messageNode, showTime);
  };

  var onXHRSuccess = function (data) {
    console.log(data);
    window.data.createAd(data);
  };

  var onXHRError = function (errorMessage) {
    showErrorMessage(errorMessage, window.data.MESSAGE_TIMEOUT);
  };

  window.backend.load({
    url: URL_DOWNLOAD,
    onLoad: onXHRSuccess,
    onError: onXHRError
  });
})();
