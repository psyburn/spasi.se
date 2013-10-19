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
      $('#main-content').html(this.mainView.render().el);
    },

    map: function() {
      this.mapView = new MapView();
      app.locations.fetch();
      $('body').html(this.mapView.render().$el);
    }

  });

  return Router;
});
