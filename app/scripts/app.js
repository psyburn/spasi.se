/*global define */
define([], function() {
  'use strict';

  var app = {
    root: '/',

    gmaps: {
      url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyANYgRiD8Ra92P08fC0rm3v_TPLkRitLQw&sensor=true'
    },

    loadGmaps: function(context, callback) {
      if (!this.gmaps.loaded) {
        this.gmaps.loadContext = context;
        this.gmaps.loadCallback = callback;

        $('<script>')
          .attr('type', 'text/javascript')
          .attr('src', this.gmaps.url + '&libraries=places&callback=app.onGmapsLoad')
          .appendTo('head');

        this.gmaps.loaded = true;
      }
    },

    onGmapsLoad: function() {
      if (this.gmaps.loadCallback && this.gmaps.loadContext) {
        this.gmaps.loadCallback.call(this.gmaps.loadContext);
      }
    }
  };

  return app;
});