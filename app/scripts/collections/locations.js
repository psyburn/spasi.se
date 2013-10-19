define([
  'models/location'
],
  function (Model) {
    'use strict';

    var LocationsCollection = Backbone.Collection.extend({
      _parse_class_name: "Location",
      model: Model
    });

    return LocationsCollection;
  });
