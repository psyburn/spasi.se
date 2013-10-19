define([
    'models/location'
  ],
  function(Model) {
    'use strict';

    var LocationsCollection = Backbone.Collection.extend({
      _parse_class_name: 'Location',
      model: Model,
      url: 'mock/data.json',

      throttleTimer: 100,
      timer: null,

      initialize: function() {
        Backbone.on('map:bounds:change', this.onPositionChange, this);
        Backbone.on('filter:change', this.onFilterChange, this);
        // this.doLoad = $.proxy(this.load, this);
      },

      onPositionChange: function(options) {
        var me = this;
        app.filter.location = options;
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(function() {
          me.load();
        }, this.throttleTimer);
      },

      onFilterChange: function() {
        this.load();
      },

      load: function(callback) {
        var me = this;
        var query = {
          'category': {
            '$in': app.filter.categories
          },
          'location': {
            '$within': {
              '$box': [{
                '__type': 'GeoPoint',
                'latitude': app.filter.location.sw.lat,
                'longitude': app.filter.location.sw.lng
              }, {
                '__type': 'GeoPoint',
                'latitude': app.filter.location.ne.lat,
                'longitude': app.filter.location.ne.lng
              }]
            }
          }
        };
        // TODO: Work hours
        if (!callback) {
          callback = function() {
            me.trigger('reset');
          };
        }
        this.fetch({
          query: query,
          success: callback
        });
      }
    });

    return LocationsCollection;
  });
