'use strict';
(function () {

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

})();
