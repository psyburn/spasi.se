define([
  'models/location'
],
  function (Model) {
    'use strict';

    var LocationsCollection = Backbone.Collection.extend({
      _parse_class_name: 'Location',
      model: Model,

      load: function(options, callback) {
        // Categories
        // Location
        // Work hours
        var query = {
          'category': {'$in': options.categories},
          'location': {
            '$within': {
              '$box': [
                {
                  '__type': 'GeoPoint',
                  'latitude': options.location.sw.lat,
                  'longitude': options.location.sw.lon
                },
                {
                  '__type': 'GeoPoint',
                  'latitude': options.location.ne.lat,
                  'longitude': options.location.ne.lon
                }
              ]
            }
          }
        };
        // TOO: Work hours
        this.fetch({
          query: query,
          success: callback
        });
      }
    });

    return LocationsCollection;
  });
