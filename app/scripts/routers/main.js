define([
  'app',
  'backbone',

  'views/main',
  'views/map',
  'views/filter/main',
  'views/report/main'
],

function(
    app,
    Backbone,

    MainView,
    MapView,
    FilterView,
    ReportView
  ) {
  'use strict';
  var Router = Backbone.Router.extend({
    routes: {
      'filter': 'filter',
      'search': 'search',
      'details': 'details',
      'report': 'report',
      '': 'index'
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
      this.mainView.on('details:show', function(model) {
        me.navigate('details', false);
      });
      $('#main-content').html(this.mainView.render().el);
    },

    initialize: function() {
      var me = this;
      Backbone.on('map:marker:click', function(model) {
        me.mainView.showPreviewCard(model);
      });
      $('.footer').removeClass('list');
      Backbone.on('report', function(model) {
        me.navigate('report', false);
        var report = new ReportView(model);
        app.setActiveView(report);
        report.on('report:add', function(model, text) {
          app.collections.reports.add({
            model: model,
            text: text,
            date: new Date()
          });
        });
      });
    },

    index: function() {
      this.init();
      app.hideActiveView();
      Backbone.trigger('search:reset');
    },

    search: function() {
      this.navigate('', true);
    },

    details: function() {
      this.navigate('', true);
    },

    report: function() {
      this.navigate('', true);
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
