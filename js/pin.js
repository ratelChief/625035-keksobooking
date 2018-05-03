'use strict';

window.pin = (function () {
  return {
    createPinElement: function (ad, template) {
      var pinElement = template.cloneNode(true);
      var imageElement = pinElement.querySelector('img');

      pinElement.style.left = (ad.location.x - window.data.MAIN_PIN_SHARP_END) + 'px';
      pinElement.style.top = (ad.location.y - window.data.MAIN_PIN_SIZE) + 'px';
      pinElement.dataset.indexOfPin = ad.index;

      imageElement.src = ad.author.avatar;
      imageElement.alt = ad.offer.title;

      return pinElement;
    }
  };
})();
