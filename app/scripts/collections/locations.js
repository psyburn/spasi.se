define([
    'models/location'
  ],
  function(Model) {
    'use strict';

    var LocationsCollection = Backbone.Collection.extend({
      _parse_class_name: 'Location',
      model: Model,
      url: 'mock/data.json',

      initialize: function() {
        Backbone.on('map:bounds:change', this.onPositionChange, this);
        Backbone.on('filter:change', this.onFilterChange, this);
      },

      onPositionChange: function(options) {
        var me = this;
        app.filter.location = options;
        this.load(function() {
          me.trigger('reset');
        });
      },

      onFilterChange: function() {
        this.load(function() {
          me.trigger('reset');
        });
      },

      load: function(callback) {
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
        // TOO: Work hours
        this.fetch({
          query: query,
          success: callback
        });
      },

      loadMock: function() {
        this.reset([{
          "name": "Bolnica 1",
          "description": "Prva bolnica",
          "location": {
            "__type": "GeoPoint",
            "latitude": 45.8,
            "longitude": 16
          },
          "working_hours": {
            "start": [0, 0, 0, 0, 0, 0, 0],
            "end": [24, 24, 24, 24, 24, 24, 24]
          },
          "category": "hospital"
        }, {
          "name": "Ljekarna 1",
          "description": "Prva ljekarna",
          "location": {
            "__type": "GeoPoint",
            "latitude": 45.7,
            "longitude": 16.1
          },
          "working_hours": {
            "start": [7, 7, 7, 7, 7, 8, 25],
            "end": [20, 20, 20, 20, 20, 14, 25]
          },
          "category": "pharmacy"
        }, {
          "name": "Defibrilator 1",
          "description": "Prvi defibrilator",
          "location": {
            "__type": "GeoPoint",
            "latitude": 45.8,
            "longitude": 15.9
          },
          "category": "defibrilator"
        }, {
          "name": "Hitna pomoc 1",
          "description": "Prva hitna pomoc",
          "location": {
            "__type": "GeoPoint",
            "latitude": 45.7,
            "longitude": 15.9
          },
          "category": "emergency"
        }, {
          "name": "Ambulanta 1",
          "description": "Prva ambulanta",
          "location": {
            "__type": "GeoPoint",
            "latitude": 45.8,
            "longitude": 16.1
          },
          "working_hours": {
            "start": [7, 13, 7, 13, 7, 25, 25],
            "end": [15, 21, 15, 21, 15, 25, 25]
          },
          "category": "office"
        }, {
          "name": "Dom zdravlja 1",
          "description": "Prvi dom zdravlja",
          "location": {
            "__type": "GeoPoint",
            "latitude": 45.9,
            "longitude": 16
          },
          "category": "center"
        }, {
          "name": "Defibrilator 2",
          "description": "Drugi defibrilator",
          "location": {
            "__type": "GeoPoint",
            "latitude": 45.9,
            "longitude": 16.1
          },
          "category": "defibrilator"
        }]);
      }
    });

    return LocationsCollection;
  });
