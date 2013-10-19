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

    initialized: false,

    init: function() {
      if (this.initialized) {
        return;
      }
      this.initialized = true;
      console.log('home!');
      var me = this;
      this.mainView = new MainView();
      this.mainView.on('search:focus', function() {
        me.navigate('search', false);
      });
      this.mainView.on('place:set', function() {
        me.navigate('', false);
      });
      $('#main-content').html(this.mainView.render().el);
    },

    initialize: function() {
      var me = this;
      Backbone.on('map:marker:click', function(model) {
        me.mainView.showPreviewCard(model);
      });
    },

    index: function() {
      this.init();
      app.hideActiveView();
      Backbone.trigger('search:reset');
    },

    map: function() {
      this.init();
      this.mapView = new MapView();
      $('body').html(this.mapView.render().$el);
    },

    filter: function() {
      this.init();
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
