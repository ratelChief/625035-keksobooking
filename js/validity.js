'use strict';

(function () {
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  var setupPrice = function (priceForNight) {
    price.min = priceForNight;
    price.placeholder = price.min;
  };

  var onTypeChange = function () {
    switch (type.value) {
      case 'flat':
        setupPrice('1000');
        break;
      case 'bungalo':
        setupPrice('0');
        break;
      case 'house':
        setupPrice('5000');
        break;
      case 'palace':
        setupPrice('10000');
        break;
    }
  };

  type.addEventListener('change', onTypeChange);

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var onCheckInTimeChage = function (evt) {
    var indexIn = evt.currentTarget.selectedIndex;
    timeOut.selectedIndex = indexIn;
  };

  var onCheckOutTimeChage = function (evt) {
    var indexOut = evt.currentTarget.selectedIndex;
    timeIn.selectedIndex = indexOut;
  };

  timeIn.addEventListener('change', onCheckInTimeChage);
  timeOut.addEventListener('change', onCheckOutTimeChage);

  var room = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var initialStateOfOptions = function () {
    var capacityOptions = capacity.querySelectorAll('option');
    for (var i = 1; i < capacityOptions.length; i++) {
      capacityOptions[i].disabled = true;
    }
  };
  initialStateOfOptions();

  var onRoomChange = function (evt) {
    var roomsCount = Number(evt.target.value);
    var options = capacity.querySelectorAll('option');
    var index = evt.currentTarget.selectedIndex;
    capacity.selectedIndex = index;

    for (var i = 0; i < options.length; i++) {
      if (roomsCount === 100) {
        options[i].disabled = options[i].value > 0;
      } else {
        options[i].disabled = options[i].value < 1 || options[i].value > roomsCount;
      }
    }
  };

  room.addEventListener('change', onRoomChange);
})();
