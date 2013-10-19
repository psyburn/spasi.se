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
        'focus .search-field': 'onSearchFieldFocus',
        'keyup .search-field': 'onSearchKeyUp'
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

      },

      onSearchFieldFocus: function() {
        // Show autocomplete
        var me = this;
        this.searchList = new SearchList({
          collection: app.collections.places
        });
        this.searchView.on('map:search', function(query) {
          me.trigger('map:search', query);
        });
        this.$('.header').addClass('searching');
        app.collections.places.trigger('reset');
        app.setActiveView(this.searchList);
      },

      onSearchKeyUp: function() {
        if (this.searchList) {
          this.searchList.keyPress(this.$('.search-field').val());
        }
      }

    });

    return MainOverlayView;
  });
