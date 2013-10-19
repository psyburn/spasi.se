define([
    'app',

    'views/map'
  ], function(
    app,

    MapsView
  ) {
  "use strict";

  var MainOverlayView = new Backbone.View.extend({
    className: 'main-overlay-view',

    render: function() {
      return this;
    }

  });

  return MainOverlayView;
});