define([
  'jquery'
  ],

function($) {
  'use strict';
  var Toucher = (function() {
    var TOUCH_TIMEOUT = 50;
    var boundSelectors = {};
    return {
      bind: function(selector) {
        $(document).on('touchstart', selector, function() {
          var that = this;
          boundSelectors[selector] = setTimeout(function() {
            $(that).addClass('active');
          }, TOUCH_TIMEOUT);
        });
        $(document).on('touchend', selector, function() {
          clearTimeout(boundSelectors[selector]);
          $(this).removeClass('active');
        });
        $(document).on('touchmove', selector, function() {
          clearTimeout(boundSelectors[selector]);
          $(this).removeClass('active');
        });
      }
    };
  })();
  return Toucher;
});
