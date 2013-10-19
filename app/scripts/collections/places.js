define([
  'backbone',
  'models/place'
],
  function (Backbone, Model) {
    'use strict';

    var PlacesCollection = Backbone.Collection.extend({
      model: Model
    });

    return PlacesCollection;
  });
