'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var TYPES = ['palace', 'flat', 'house', 'bungalo'];

var CHECKINS = ['12:00', '13:00', '14:00'];

var CHECKOUTS = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var ads = [
  {
    'author': {
      'avatar': ''
    },

    'offer': {
      'title': '',
      'address': '',
      'price': '',
      'type': '',
      'rooms': '',
      'guests': '',
      'checkin': '',
      'checkout': '',
      'features': '',
      'description': '',
      'photos': ''
    },

    'location': {
      'x': '',
      'y': ''
    }
  },
  {
    'author': {
      'avatar': ''
    },

    'offer': {
      'title': '',
      'address': '',
      'price': '',
      'type': '',
      'rooms': '',
      'guests': '',
      'checkin': '',
      'checkout': '',
      'features': '',
      'description': '',
      'photos': ''
    },

    'location': {
      'x': '',
      'y': ''
    }
  },
  {
    'author': {
      'avatar': ''
    },

    'offer': {
      'title': '',
      'address': '',
      'price': '',
      'type': '',
      'rooms': '',
      'guests': '',
      'checkin': '',
      'checkout': '',
      'features': '',
      'description': '',
      'photos': ''
    },

    'location': {
      'x': '',
      'y': ''
    }
  },
  {
    'author': {
      'avatar': ''
    },

    'offer': {
      'title': '',
      'address': '',
      'price': '',
      'type': '',
      'rooms': '',
      'guests': '',
      'checkin': '',
      'checkout': '',
      'features': '',
      'description': '',
      'photos': ''
    },

    'location': {
      'x': '',
      'y': ''
    }
  },
  {
    'author': {
      'avatar': ''
    },

    'offer': {
      'title': '',
      'address': '',
      'price': '',
      'type': '',
      'rooms': '',
      'guests': '',
      'checkin': '',
      'checkout': '',
      'features': '',
      'description': '',
      'photos': ''
    },

    'location': {
      'x': '',
      'y': ''
    }
  },
  {
    'author': {
      'avatar': ''
    },

    'offer': {
      'title': '',
      'address': '',
      'price': '',
      'type': '',
      'rooms': '',
      'guests': '',
      'checkin': '',
      'checkout': '',
      'features': '',
      'description': '',
      'photos': ''
    },

    'location': {
      'x': '',
      'y': ''
    }
  },
  {
    'author': {
      'avatar': ''
    },

    'offer': {
      'title': '',
      'address': '',
      'price': '',
      'type': '',
      'rooms': '',
      'guests': '',
      'checkin': '',
      'checkout': '',
      'features': '',
      'description': '',
      'photos': ''
    },

    'location': {
      'x': '',
      'y': ''
    }
  },
  {
    'author': {
      'avatar': ''
    },

    'offer': {
      'title': '',
      'address': '',
      'price': '',
      'type': '',
      'rooms': '',
      'guests': '',
      'checkin': '',
      'checkout': '',
      'features': '',
      'description': '',
      'photos': ''
    },

    'location': {
      'x': '',
      'y': ''
    }
  }
];

var getAvatar = function (i) {
  var avatar = 'img/avatars/user0' + i + '.png';
  return avatar;
};

var getTitle = function (titles) {
  var title = titles[Math.ceil(Math.random() * (titles.length))];

  return title;
};

var getPrice = function () {
  var price = Math.round(Math.random() * (1000000 - 1000)) + 1000;

  return price;
};

var getType = function (types) {
  var type = types[Math.floor(Math.random() * (4))];

  return type;
};

var getChekins = function (chekins) {
  var checkin = chekins[Math.floor(Math.random() * (3))];

  return checkin;
};

var getCheckouts = function (checkouts) {
  var checkout = checkouts[Math.floor(Math.random() * (3))];

  return checkout;
};

var getRooms = function () {
  var room = Math.floor(Math.random() * (5 - 1)) + 1;

  return room;
};

var getGuests = function () {
  var guest = Math.floor(Math.random());

  return guest;
};

var getFeatures = function (FEATURES) {
  var countOfFeatures = Math.floor(Math.random() * (FEATURES.length));
  var features = [];
  for (var i = 0; i < countOfFeatures; i++) {
    features[i] = FEATURES[Math.floor(Math.random() * (FEATURES.length))];
  }
  return features;
};

var getX = function () {
  var x = Math.floor(Math.random() * (900 - 300)) + 300;

  return x;
};

var getY = function () {
  var y = Math.floor(Math.random() * (500 - 150)) + 150;

  return y;
};

var getAdress = function (ad, x, y) {
  var address = x + ', ' + y;

  return address;
};

var createAd = function (ad) {
  ad.author.avatar = getAvatar(i);
  ad.offer.title = getTitle(TITLES);
  ad.offer.price = getPrice();
  ad.offer.type = getType(TYPES);
  ad.offer.rooms = getRooms();
  ad.offer.guests = getGuests();
  ad.offer.checkin = getChekins(CHECKINS);
  ad.offer.checkout = getCheckouts(CHECKOUTS);
  ad.offer.features = getFeatures(FEATURES);
  ad.location.x = getX();
  ad.location.y = getY();
  ad.offer.address = getAdress(ad, ad.location.x, ad.location.y);
};

var showMap = document.querySelector('.map');
showMap.classList.remove('map--faded');

var similarListElement = document.querySelector('.map__pins');
var mapCardTemplate = document.querySelector('template');

var createPin = function (ad) {
  var pin = adElement.querySelector('.map__pin');
  var pinStyle = {
    left: ad.location.x,
    top: ad.location.y
  };
  pin.style = pinStyle;
  var pinIcon = pin.querySelector('img');
  pinIcon.src = ad.author.avatar;
  pinIcon.alt = ad.offer.title;
};

for (var i = 0; i < ads.length; i++) {
  var adElement = mapCardTemplate.cloneNode(true);
  createAd(ads[i]);

  createPin(ads[i]);
  similarListElement.appendChild(adElement);
  debugger;
}
