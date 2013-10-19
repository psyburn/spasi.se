define(['backbone'],
  function (Backbone) {
    'use strict';

    var PlaceModel = Backbone.Model.extend({
      defaults: {
        'title': '',
        'location': {
          'lat': 0,
          'lng': 0
        }
      }
    });

    return PlaceModel;
  });
