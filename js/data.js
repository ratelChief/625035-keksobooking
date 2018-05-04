'use strict';
(function () {
  window.data = {
    TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    TYPES: ['palace', 'flat', 'house', 'bungalo'],
    CHECKINS: ['12:00', '13:00', '14:00'],
    CHECKOUTS: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    MAIN_PIN_SIZE: 65,
    MAIN_PIN_SHARP_END: 20,
    ads: [],
    createAd: function (adsCount) {
      for (var i = 0; i < adsCount; i++) {
        var ad = {
          author: {},
          offer: {},
          location: {}
        };
        ad.location.x = getX();
        ad.location.y = getY();
        ad.author.avatar = getAvatar(i);
        ad.offer.title = getTitle(window.data.TITLES, i);
        ad.offer.price = getPrice();
        ad.offer.type = getType(window.data.TYPES);
        ad.offer.rooms = getRooms();
        ad.offer.guests = getGuests();
        ad.offer.checkin = getChekins(window.data.CHECKINS);
        ad.offer.checkout = getCheckouts(window.data.CHECKOUTS);
        ad.offer.features = getFeatures(window.data.FEATURES);
        ad.offer.address = getAdress(ad, ad.location.x, ad.location.y);
        ad.offer.photos = window.data.PHOTOS;
        ad.offer.description = ' ';
        ad.index = i;
        window.data.ads.push(ad);
      }
    }
  };

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
    var features = window.data.FEATURES.slice();

    features.splice(
        getRandomValue(0, window.data.FEATURES.length - 1),
        getRandomValue(1, window.data.FEATURES.length - 1)
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

})();
