'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var form = document.querySelector('.ad-form');
  var mapElement = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var successModalEl = document.querySelector('.success');
  var pinsContainerEl = document.querySelector('.map__pins');

  var mainPinInitCoord = {
    x: mainPin.style.left,
    y: mainPin.style.top
  };
  var setInitCoords = function (el, coords) {
    el.style.left = coords.x;
    el.style.top = coords.y;
  };

  var disableMap = function () {
    if (!mapElement.classList.contains('map--faded')) {
      mapElement.classList.add('map--faded');
    }
  };
  var setFormState = function (switcher) {
    var disabledFields = form.querySelectorAll('fieldset');
    disabledFields.forEach(function (elem) {
      elem.disabled = switcher === 'disabled';
      if (elem.disabled) {
        form.classList.add('ad-form--disabled');
      }
    });
  };

  setFormState('disabled');

  var address = form.querySelector('#address');
  var mapFilters = document.querySelector('.map__filters-container');

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
    window.renderPins(window.filter(window.data.ads), window.data.PINS_COUNT);
  };

  var setInitAppState = function () {
    form.reset();
    setInitCoords(mainPin, mainPinInitCoord);
    getAddress(mainPin);
    setFormState('disabled');
    disableMap();
    pinsContainerEl.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (elem) {
      window.util.removeElement(elem);
    });
    var existPopup = mapElement.querySelector('.popup');
    if (existPopup) {
      existPopup.remove();
    }
  };

  var setMessageTimeout = function (messageEl, timeout) {
    if (timeout) {
      var timeoutID = setTimeout(function () {
        window.util.removeElement(messageEl);
        clearTimeout(timeoutID);
      }, timeout);
    }
  };

  var showErrorMessage = function (error, showTime) {
    var messageNode = document.createElement('div');

    messageNode.id = 'error';
    messageNode.style.position = 'fixed';
    messageNode.style.zIndex = '100';
    messageNode.style.left = 0;
    messageNode.style.right = 0;
    messageNode.style.margin = '0 auto';
    messageNode.style.padding = '5px';
    messageNode.style.fontSize = '24px';
    messageNode.style.color = 'white';
    messageNode.style.textAlign = 'center';
    messageNode.style.backgroundColor = 'red';
    messageNode.textContent = error;

    var prevError = document.querySelector('#error');

    if (prevError) {
      window.util.removeElement(prevError);
    }

    document.body.insertAdjacentElement('afterbegin', messageNode);
    setMessageTimeout(messageNode, showTime);
  };

  var showSubmitMessage = function (messageNode, timeout) {
    var hideSubmitMessage = function () {
      window.util.toggleModal(messageNode);
      clearTimeout(timeoutID);
      document.removeEventListener('keydown', onSubmitMessageEscPress);
    };

    var onSubmitMessageEscPress = function (evt) {
      evt.preventDefault();

      window.util.isEscPressed(evt, hideSubmitMessage);
    };

    window.util.toggleModal(messageNode);
    document.addEventListener('keydown', onSubmitMessageEscPress);

    var timeoutID = setTimeout(function () {
      hideSubmitMessage();
    }, timeout);
  };

  var onXHRError = function (errorMessage) {
    showErrorMessage(errorMessage, window.data.MESSAGE_TIMEOUT);
  };

  form.addEventListener('submit', function (evt) {
    var onSubmitSuccess = function () {
      setInitAppState();
      showSubmitMessage(successModalEl, window.data.MESSAGE_TIMEOUT);
    };

    window.backend.save({
      url: URL_UPLOAD,
      data: new FormData(evt.target),
      onLoad: onSubmitSuccess,
      onError: onXHRError
    });
    evt.preventDefault();
  });

  var formResetEl = document.querySelector('.ad-form__reset');

  formResetEl.addEventListener('click', function (evt) {
    evt.preventDefault();
    setInitAppState();
  });

})();
