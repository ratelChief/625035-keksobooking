'use strict';

(function () {
  window.util = {

    Keycode: {
      ESC: 27,
      ENTER: 13
    },

    removeElement: function (el) {
      el.parentElement.removeChild(el);
    },

    isEscPressed: function (evt, action) {
      if (evt.keyCode === this.Keycode.ESC) {
        action();
      }
    },

    drainContainer: function (container, selector) {
      var collection = (selector) ? container.querySelectorAll(selector) : container.querySelectorAll('*');
      var that = this;

      this.forEach(collection, function (it) {
        that.removeElement(it);
      });
    },

    forEach: function (collection, cb) {
      [].forEach.call(collection, cb);
    },

    toggleModal: function (modal) {
      modal.classList.toggle('hidden');
    }
  };
})();
