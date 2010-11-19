(function($) {
var div = document.createElement('div');

$.fx.updateInterval = function(i) {
  $.fx.interval = i;
  $.fx.stop();
  // Lunch dummy animation to continue running current animations.
  $(div).animate({top: 0}, 1);
};

})(jQuery);