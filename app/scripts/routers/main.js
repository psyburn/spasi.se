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

    initialize: function() {
      var me = this;
      Backbone.on('map:marker:click', function(model) {
        me.mainView.showPreviewCard(model);
      });
    },


    index: function() {
      this.mainView = new MainView();
      $('#main-content').html(this.mainView.render().el);
    },

    map: function() {
      this.mapView = new MapView();
      $('body').html(this.mapView.render().$el);
    },

    filter: function() {
      var me = this;
      this.filterView = new FilterView();
      Backbone.on('filter:change', function() {
        me.navigate('', false);
      });
      app.setActiveView(this.filterView);
    }

  });

  return Router;
});
