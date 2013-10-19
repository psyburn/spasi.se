define([
    'models/location'
  ],
  function(Model) {
    'use strict';

    var LocationsCollection = Backbone.Collection.extend({
      _parse_class_name: 'Location',
      model: Model,
      url: 'mock/data.json',
      load: function(options, callback) {
        // Categories
        // Location
        // Work hours
        var query = {
          'category': {
            '$in': options.categories
          },
          'location': {
            '$within': {
              '$box': [{
                '__type': 'GeoPoint',
                'latitude': options.location.sw.lat,
                'longitude': options.location.sw.lon
              }, {
                '__type': 'GeoPoint',
                'latitude': options.location.ne.lat,
                'longitude': options.location.ne.lon
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