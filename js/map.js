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
  var type = getRandomValue(0, types.length - 1);

  return type;
};

var getChekins = function (chekins) {
  var checkin = getRandomValue(0, chekins.length - 1);

  return checkin;
};

var getCheckouts = function (checkouts) {
  var checkout = getRandomValue(0, checkouts.length - 1);

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

    ads.push(ad);
  }
};

var createPinElement = function (ad, template) {
  var pinElement = template.cloneNode(true);
  var imageElement = pinElement.querySelector('img');

  pinElement.style.left = (ad.location.x - 25) + 'px';
  pinElement.style.top = (ad.location.y - 70) + 'px';

  imageElement.src = ad.author.avatar;
  imageElement.alt = ad.offer.title;

  return pinElement;
};

createAd(8);

var template = document.querySelector('template');

var pinElement = template.content.querySelector('.map__pin');
var cardElement = template.content.querySelector('.map__card').cloneNode(true);
var photoElement = cardElement.querySelector('.popup__photo');
var mapElement = document.querySelector('.map');

var fragment = document.createDocumentFragment();

for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(createPinElement(ads[i], pinElement));
}

document.querySelector('.map-pins').appendChild(fragment);
var showMap = document.querySelector('.map');
showMap.classList.remove('map--faded');
