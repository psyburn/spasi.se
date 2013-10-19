/*global define */
define([
    'jquery',
    'underscore',
    'backbone'
  ], function(
    $,
    _,
    Backbone
  ) {
  'use strict';

  var app = {
    root: '/',
    gmaps: {
      url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyANYgRiD8Ra92P08fC0rm3v_TPLkRitLQw&sensor=true'
    }
  };

  _.extend(app, {
    fetchTemplate: function(path) {
      var fullPath = 'app/templates/' + path + '.html';
      if (!JST[fullPath]) {
        $.ajax({
          url: app.root + fullPath,
          async: false,
          success: function(contents) {
            JST[fullPath] = _.template(contents);
          }
        });
      }

      return JST[fullPath];
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
  });

  _.extend(app, {
    fetchTemplate: function(path) {
      var fullPath = 'app/templates/' + path + '.html';
      if (!JST[fullPath]) {
        $.ajax({
          url: app.root + fullPath,
          async: false,
          success: function(contents) {
            JST[fullPath] = _.template(contents);
          }
        });
      }

      return JST[fullPath];
    }
  });

  // Localize or create a new JavaScript Template object.
  var JST = window.JST = window.JST || {};

  return app;
});
