define([
  'app',
  'backbone',

  'views/map'
],

function(
    app,
    Backbone,

    MapView
  ) {
  'use strict';
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'map': 'map'
    },

    index: function() {
      console.log('home!');
    },

    map: function() {
      this.mapView = new MapView();
      $('body').html(this.mapView.render().$el);
    }

  });

  return Router;
});
