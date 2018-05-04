'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var form = document.querySelector('.ad-form');

  var setFormState = function (switcher) {
    var disabledFields = form.querySelectorAll('fieldset');
    for (var i = 0; i < disabledFields.length; i++) {
      var disabledInput = disabledFields[i];
      if (switcher === 'disabled') {
        disabledInput.disabled = true;
      } else {
        disabledInput.disabled = false;
      }
    }
  };

  setFormState('disabled');

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

      if ((mainPin.offsetLeft + window.data.MAIN_PIN_SIZE / 2) < 0) {
        mainPin.style.left = 0 - window.data.MAIN_PIN_SIZE / 2 + 'px';
      }

      if (mainPin.offsetLeft + window.data.MAIN_PIN_SIZE / 2 > mapElement.offsetWidth) {
        mainPin.style.left = mapElement.offsetWidth - window.data.MAIN_PIN_SIZE / 2 + 'px';
      }

      if (mainPin.offsetTop + window.data.MAIN_PIN_SIZE + window.data.MAIN_PIN_SHARP_END > mapElement.offsetHeight - mapFilters.offsetHeight) {
        mainPin.style.top = mapElement.offsetHeight - mapFilters.offsetHeight - window.data.MAIN_PIN_SIZE - window.data.MAIN_PIN_SHARP_END + 'px';
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
    var x = Math.round(parseInt(pinElem.style.left, 10) + (window.data.MAIN_PIN_SIZE / 2));
    var y = Math.round(parseInt(pinElem.style.top, 10) + (window.data.MAIN_PIN_SIZE + window.data.MAIN_PIN_SHARP_END));

    return x + ', ' + y;
  };

  var activatePage = function () {
    mapElement.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    setFormState('enabled');
    address.value = getAddress(mainPin);
  };
})();
