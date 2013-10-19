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
    template: app.fetchTemplate('main-overlay'),

    events: {
      ''
    }

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return MainOverlayView;
});