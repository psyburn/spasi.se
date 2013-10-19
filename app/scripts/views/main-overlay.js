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
        'pointerend .list-toggle': 'onListToggle',
        'focus .search-field': 'onSearchFieldFocus'
      },

      render: function() {
        this.$el.html(this.template());
        // this.onListToggle();
        return this;
      },

      onListToggle: function() {
        var locationList = new LocationList({
          collection: new Backbone.Collection({item: 1})
        });
        this.$el.html(locationList.render().el);

      },

      onSearchFieldFocus: function() {
        // Show autocomplete
        console.log('search')
      }

    });

    return MainOverlayView;
  });
