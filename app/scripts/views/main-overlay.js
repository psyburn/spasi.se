define([
    'app',
    'views/location/list'
  ], function(
    app,
    LocationList
  ) {
    'use strict';

    var MainOverlayView = Backbone.View.extend({
      className: 'main-overlay-view',
      template: app.fetchTemplate('main-overlay'),

      events: {
        'click .list-toggle': 'onListToggle'
      },

      render: function() {
        this.$el.html(this.template());
        return this;
      },

      onListToggle: function() {
        var locationList = new LocationList({
          collection: new Backbone.Collection({item: 1})
        });
        app.setActiveView(locationList);

      }

    });

    return MainOverlayView;
  });
