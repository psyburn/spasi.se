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

    mapsView: null,
    overlayView: null,

    render: function() {
      this.overlayView = new MainOverlayView();
      this.$el.append(this.overlayView.render().el);

      this.mapsView = new MapsView();
      this.$el.append(this.mapsView.render().el);
      return this;
    }

  });

  return CompositeView;
});