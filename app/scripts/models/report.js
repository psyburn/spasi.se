define([
    'app'
  ],
  function (app) {
    'use strict';

    var ReportModel = Backbone.Model.extend({
      _parse_class_name: "Report",
      defaults: {
      }
    });

    return ReportModel;
  });
