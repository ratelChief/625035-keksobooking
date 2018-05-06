'use strict';
(function () {
  window.data = {
    MAIN_PIN_SIZE: 65,
    MAIN_PIN_SHARP_END: 20,
    MESSAGE_TIMEOUT: 5000,
    ads: [],
    createAd: function (settings) {
      for (var i = 0; i < settings.length; i++) {
        var settingsItem = settings[i];
        var ad = {
          author: {},
          offer: {},
          location: {},
          id: i
        };
        ad.location.x = settingsItem.location.x;
        ad.location.y = settingsItem.location.y;
        ad.author.avatar = settingsItem.author.avatar;
        ad.offer.title = settingsItem.offer.title;
        ad.offer.price = settingsItem.offer.price;
        ad.offer.type = settingsItem.offer.type;
        ad.offer.rooms = settingsItem.offer.rooms;
        ad.offer.guests = settingsItem.offer.guests;
        ad.offer.checkin = settingsItem.offer.checkin;
        ad.offer.checkout = settingsItem.offer.checkout;
        ad.offer.features = settingsItem.offer.features;
        ad.offer.address = settingsItem.offer.address;
        ad.offer.photos = settingsItem.offer.photos;
        ad.offer.description = settingsItem.offer.description;
        ad.index = i;
        window.data.ads.push(ad);
      }
    }
  };
})();
