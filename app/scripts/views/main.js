define([
    'app',

    'views/map',
    'views/main-overlay'
  ], function(
    app,

    MapsView,
    MainOverlayView
  ) {
    'use strict';

    var CompositeView = Backbone.View.extend({
      className: 'composite-view',
      template: app.fetchTemplate('main'),

      mapsView: null,
      overlayView: null,

      render: function() {
        var me = this;
        this.$el.html(this.template());

        this.overlayView = new MainOverlayView();
        this.$('.overlay-container').html(this.overlayView.render().el);
        this.overlayView.on('map:search', function(query) {
          me.mapsView.searchPlaces(query);
        });
        this.overlayView.on('map:position:set', function(position) {
          me.mapsView.setPosition(position.lat, position.lng);
        });
        this.overlayView.on('map:position:reset', function(position) {
          me.mapsView.showCurrentLocation();
        });
        this.overlayView.on('search:focus', function() {
          me.trigger('search:focus');
        });

        this.mapsView = new MapsView();
        this.$('.map-container').html(this.mapsView.render().el);
        return this;
      },

      showPreviewCard: function(model) {
        this.overlayView.showPreviewCard(model);
      }

    });

    return CompositeView;
  });
