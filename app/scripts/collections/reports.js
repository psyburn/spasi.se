define([
    'models/report'
  ],
  function(Model) {
    'use strict';

    var ReportsCollection = Backbone.Collection.extend({
      _parse_class_name: 'Report',
      model: Model
    });

    return ReportsCollection;
  });
