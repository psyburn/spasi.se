define([
    'app'
  ],
  function (app) {
    'use strict';

    var LocationModel = Backbone.Model.extend({
      _parse_class_name: "Location",
      defaults: {
      }
    });

    return LocationModel;
  });
