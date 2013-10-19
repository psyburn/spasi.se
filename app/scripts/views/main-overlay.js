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
        'keyup .search-field': 'onSearchKeyUp',
        'click .filter-btn': 'onFilterClick'
      },

    render: function() {
        this.$el.html(this.template());
        return this;
      },

      onListToggle: function() {
        var locationList = new LocationList({
          collection: app.collections.locations
        });
        app.setActiveView(locationList);
        this.listenTo(locationList, 'click:item', function() {
          console.log('clicked on location');
        });
        locationList.addAll();
      },

      onSearchFieldFocus: function() {
        // Show autocomplete
        var me = this;
        this.searchList = new SearchList({
          collection: app.collections.places
        });
        this.searchList.on('map:search', function(query) {
          me.trigger('map:search', query);
        });
        this.$('.header').addClass('searching');
        app.collections.places.trigger('reset');
        app.setActiveView(this.searchList);
      },

      onSearchKeyUp: function(e) {
        if (this.searchList) {
          if (e.keyCode == 13) {
            this.searchList.enterPress();
          } else {
            this.searchList.keyPress(this.$('.search-field').val());
          }
        }
      },

      onFilterClick: function() {
        app.router.navigate('filter', true);
      }

    });

    return MainOverlayView;
  });
