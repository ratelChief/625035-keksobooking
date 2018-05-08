'use strict';

(function () {
  window.Pin = function (data) {
    this.location = {
      x: data.location.x,
      y: data.location.y
    };
    this.id = data.id;
    this.src = data.author.avatar;
    this.alt = data.offer.title;
  };
})();
