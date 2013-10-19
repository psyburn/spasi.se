define([
    'app',

    'views/map',
    'views/mainOverlay'
  ], function(
    app,

    MapsView,
    MainOverlayView
  ) {
  "use strict";

    var CompositeView = new Backbone.View.extend({
    className: 'composite-view',
    template: app.fetchTemplate('main'),

    mapsView: null,
    overlayView: null,

    render: function() {
      this.$el.html(this.template());

      this.overlayView = new MainOverlayView();
      this.$('.overlay-container').html(this.overlayView.render().el);

      this.mapsView = new MapsView();
      this.$('.map-container').html(this.mapsView.render().el);
      return this;
    }

  });

  return CompositeView;
});