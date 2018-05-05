'use strict';
(function () {
  window.data = {
    MAIN_PIN_SIZE: 65,
    MAIN_PIN_SHARP_END: 20,
    MESSAGE_TIMEOUT: 5000,
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
})();
