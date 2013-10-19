define([
  'app',
  'backbone',

  'views/main',
  'views/map'
],

function(
    app,
    Backbone,

    MainView,
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
      this.mainView = new MainView();
      $('body').html(this.mainView.render().el);
    },

    map: function() {
      this.mapView = new MapView();
      $('body').html(this.mapView.render().$el);
    }

  });

  return Router;
});
