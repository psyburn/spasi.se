define([
  'app',
  'backbone',

  'views/main',
  'views/map',
  'views/filter/main'
],

function(
    app,
    Backbone,

    MainView,
    MapView,
    FilterView
  ) {
  'use strict';
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'map': 'map',
      'filter': 'filter'
    },

    index: function() {
      console.log('home!');
      this.mainView = new MainView();
      $('#main-content').html(this.mainView.render().el);
    },

    map: function() {
      this.mapView = new MapView();
      $('body').html(this.mapView.render().$el);
    },

    filter: function() {
      this.filterView = new FilterView();
      $('body').html(this.filterView.render().$el);
    }

  });

  return Router;
});
