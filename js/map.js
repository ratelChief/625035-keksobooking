'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var ads = [];

var getRandomValue = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getAvatar = function (i) {
  var avatar = 'img/avatars/user0' + (i + 1) + '.png';
  return avatar;
};

var getTitle = function (titles, i) {
  var title = titles[i];
  return title;
};

var getPrice = function () {
  var price = getRandomValue(1000, 1000000);

  return price;
};

var getType = function (types) {
  var type = types[getRandomValue(0, types.length - 1)];

  return type;
};

var getChekins = function (chekins) {
  var checkin = chekins[getRandomValue(0, chekins.length - 1)];

  return checkin;
};

var getCheckouts = function (checkouts) {
  var checkout = checkouts[getRandomValue(0, checkouts.length - 1)];

  return checkout;
};

var getRooms = function () {
  var room = getRandomValue(1, 5);

  return room;
};

var getGuests = function () {
  var guest = getRandomValue(0, 20);

  return guest;
};

var getFeatures = function () {
  var features = FEATURES.slice();

  features.splice(
      getRandomValue(0, FEATURES.length - 1),
      getRandomValue(1, FEATURES.length - 1)
  );

  return features;
};

var getX = function () {
  var x = getRandomValue(300, 900);

  return x;
};

var getY = function () {
  var y = getRandomValue(150, 500);

  return y;
};

var getAdress = function (ad, x, y) {
  var address = x + ', ' + y;

  return address;
};

var createAd = function (adsCount) {
  for (var i = 0; i < adsCount; i++) {
    var ad = {
      author: {},
      offer: {},
      location: {}
    };
    ad.location.x = getX();
    ad.location.y = getY();
    ad.author.avatar = getAvatar(i);
    ad.offer.title = getTitle(TITLES, i);
    ad.offer.price = getPrice();
    ad.offer.type = getType(TYPES);
    ad.offer.rooms = getRooms();
    ad.offer.guests = getGuests();
    ad.offer.checkin = getChekins(CHECKINS);
    ad.offer.checkout = getCheckouts(CHECKOUTS);
    ad.offer.features = getFeatures(FEATURES);
    ad.offer.address = getAdress(ad, ad.location.x, ad.location.y);
    ad.offer.photos = PHOTOS;
    ad.offer.description = ' ';
    ad.index = i;
    ads.push(ad);
  }
};

var createPinElement = function (ad, template) {
  var pinElement = template.cloneNode(true);
  var imageElement = pinElement.querySelector('img');

  pinElement.style.left = (ad.location.x - 25) + 'px';
  pinElement.style.top = (ad.location.y - 70) + 'px';
  pinElement.dataset.indexOfPin = ad.index;

  imageElement.src = ad.author.avatar;
  imageElement.alt = ad.offer.title;

  return pinElement;
};

createAd(8);

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
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < features.length - 1; i++) {
    var element = document.createElement('li');
    element.className = 'popup__feature popup__feature--' + features[i];
    fragment.appendChild(element);
  }

  return fragment;
};

var createPhotoElements = function (photos, template) {
  var element;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    element = template.cloneNode(true);
    element.src = photos[i];
    fragment.appendChild(element);
  }
  return fragment;
};

var renderAdCard = function (ad, cardElement, photoElement) {
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
};

var template = document.querySelector('template');

var pinElement = template.content.querySelector('.map__pin');

var mapElement = document.querySelector('.map');

var fragment = document.createDocumentFragment();

for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(createPinElement(ads[i], pinElement));
}

var form = document.querySelector('.ad-form');

var setFormState = function (switcher) {
  var disabledFields = form.querySelectorAll('fieldset');
  for (i = 0; i < disabledFields.length; i++) {
    var disabledInput = disabledFields[i];
    if (switcher === 'disabled') {
      disabledInput.disabled = true;
    } else {
      disabledInput.disabled = false;
    }
  }
};

setFormState('disabled');

var MAIN_PIN_SIZE = 65;
var MAIN_PIN_SHARP_END = 20;

var mapPins = document.querySelector('.map__pins');
var address = form.querySelector('#address');
var mapFilters = document.querySelector('.map__filters-container');
var mainPin = document.querySelector('.map__pin--main');

mainPin.addEventListener('mousedown', function (mevt) {
  activatePage();
  mevt.preventDefault();

  var startCoords = {
    x: mevt.clientX,
    y: mevt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

    if (mainPin.offsetTop < 0) {
      mainPin.style.top = 0 + 'px';
    }

    if ((mainPin.offsetLeft + MAIN_PIN_SIZE / 2) < 0) {
      mainPin.style.left = 0 - MAIN_PIN_SIZE / 2 + 'px';
    }

    if (mainPin.offsetLeft + MAIN_PIN_SIZE / 2 > mapElement.offsetWidth) {
      mainPin.style.left = mapElement.offsetWidth - MAIN_PIN_SIZE / 2 + 'px';
    }

    if (mainPin.offsetTop + MAIN_PIN_SIZE + MAIN_PIN_SHARP_END > mapElement.offsetHeight - mapFilters.offsetHeight) {
      mainPin.style.top = mapElement.offsetHeight - mapFilters.offsetHeight - MAIN_PIN_SIZE - MAIN_PIN_SHARP_END + 'px';
    }

    address.value = getAddress(mainPin);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var getAddress = function (pinElem) {
  var x = Math.round(parseInt(pinElem.style.left, 10) + (MAIN_PIN_SIZE / 2));
  var y = Math.round(parseInt(pinElem.style.top, 10) + (MAIN_PIN_SIZE + MAIN_PIN_SHARP_END));

  return x + ', ' + y;
};

var activatePage = function () {
  mapElement.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  setFormState('enabled');
  document.querySelector('.map__pins').appendChild(fragment);
  address.value = getAddress(mainPin);
};

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

      renderAdCard(ads[target.parentElement.dataset.indexOfPin], cardElement, photoElement);
      mapElement.insertBefore(cardElement, document.querySelector('.map__filters-container'));

      var popup = mapElement.querySelector('.popup');
      var popupCloseButton = popup.querySelector('.popup__close');

      popupCloseButton.addEventListener('click', function () {
        popup.remove();
      });
    }
    target = target.parentElement;
  }
};

mapPins.addEventListener('click', onMapPinClick);
