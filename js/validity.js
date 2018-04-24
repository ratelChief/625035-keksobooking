'use strict';

(function () {
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  var getPrice = function (priceForNight) {
    price.min = priceForNight;
    price.placeholder = price.min;
  };

  var onTypeChange = function () {
    if (type.value === 'flat') {
      getPrice('1000');
    } else if (type.value === 'bungalo') {
      getPrice('0');
    } else if (type.value === 'house') {
      getPrice('5000');
    } else {
      getPrice('10000');
    }
  };

  type.addEventListener('change', onTypeChange);
})();

(function () {
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var onTimeInChange = function (evt) {
    var indexIn = evt.currentTarget.selectedIndex;
    timeOut.selectedIndex = indexIn;
  };

  var onTimeOutChange = function (evt) {
    var indexOut = evt.currentTarget.selectedIndex;
    timeIn.selectedIndex = indexOut;
  };

  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
})();

(function () {
  var room = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  for (var i = 1; i < capacityOptions.length; i++) {
    capacityOptions[i].disabled = true;
  }
  var enableOptions = function (index) {
    i = 0;
    while (i < index + 1) {
      capacityOptions[i].disabled = false;
      i++;
    }
  };

  var onRoomChange = function (evt) {
    var index = evt.currentTarget.selectedIndex;
    capacity.selectedIndex = index;

    for (i = 0; i < capacity.length; i++) {
      capacityOptions[i].disabled = true;
    }
    if (index < 3) {
      enableOptions(index);
    } else {
      capacityOptions[index].disabled = false;
    }
  };

  room.addEventListener('change', onRoomChange);
})();
