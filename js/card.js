'use strict';

(function () {
  var fragment = document.createDocumentFragment();

  var translateOfferType = function (offerType) {
    switch (offerType) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
    }
    return offerType;
  };

  var createFeatureElements = function (features) {
    for (var i = 0; i < features.length - 1; i++) {
      var element = document.createElement('li');
      element.className = 'popup__feature popup__feature--' + features[i];
      fragment.appendChild(element);
    }

    return fragment;
  };

  var createPhotoElements = function (photos, template) {
    var element;

    for (var i = 0; i < photos.length; i++) {
      element = template.cloneNode(true);
      element.src = photos[i];
      fragment.appendChild(element);
    }
    return fragment;
  };

  window.card = {
    renderAdCard: function (ad, cardElement, photoElement) {
      var offer = ad.offer;
      var features = cardElement.querySelector('.popup__features');
      var photos = cardElement.querySelector('.popup__photos');

      cardElement.querySelector('.popup__title').textContent = offer.title;
      cardElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
      cardElement.querySelector('.popup__text--address').textContent = offer.address;
      cardElement.querySelector('.popup__type').textContent = translateOfferType(offer.type);
      cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ' , выезд до ' + offer.checkout;
      cardElement.querySelector('.popup__description').textContent = offer.description;

      cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

      features.innerHTML = '';
      features.appendChild(createFeatureElements(offer.features));

      photos.innerHTML = '';
      photos.appendChild(createPhotoElements(offer.photos, photoElement));
    }
  };
})();
