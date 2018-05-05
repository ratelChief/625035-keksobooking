'use strict';
(function () {
  window.data = {
    MAIN_PIN_SIZE: 65,
    MAIN_PIN_SHARP_END: 20,
    ads: [],
    createAd: function (settings) {
      for (var i = 0; i < settings.length; i++) {
        var ad = {
          author: {},
          offer: {},
          location: {}
        };
        ad.location.x = settings.location.x;
        ad.location.y = settings.location.y;
        ad.author.avatar = settings.author.avatar;
        ad.offer.title = settings.offer.title;
        ad.offer.price = settings.offer.price;
        ad.offer.type = settings.offer.type;
        ad.offer.rooms = settings.offer.rooms;
        ad.offer.guests = settings.offer.guests;
        ad.offer.checkin = settings.offer.checkin;
        ad.offer.checkout = settings.offer.checkout;
        ad.offer.features = settings.offer.features;
        ad.offer.address = settings.offer.address;
        ad.offer.photos = settings.offer.photos;
        ad.offer.description = settings.offer.description;
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
