define([
    'app',
    'views/location/list',
    'views/search/list'
  ], function(
    app,
    LocationList,
    SearchList
  ) {
    'use strict';

    var MainOverlayView = Backbone.View.extend({
      className: 'main-overlay-view',
      template: app.fetchTemplate('main-overlay'),

      events: {
        'click .list-toggle': 'onListToggle',
        'focus .search-field': 'onSearchFieldFocus'
      },

    render: function() {
        this.$el.html(this.template());
        return this;
      },

      onListToggle: function() {
        var locationList = new LocationList({
          collection: app.locations
        });
        app.setActiveView(locationList);
        this.listenTo(locationList, 'click:item', function() {
          console.log('clicked on location');
        });
        locationList.addAll();
      },

      onSearchFieldFocus: function() {
        // Show autocomplete

        var searchList = new SearchList({
          collection: app.collections.places
        });
        this.$('.header').addClass('searching');
        app.collections.places.trigger('reset');
        app.setActiveView(searchList);
      }

    });

    return MainOverlayView;
  });
