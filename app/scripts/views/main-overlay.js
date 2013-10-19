define([
    'app'
  ], function(
    app
  ) {
    'use strict';

    var MainOverlayView = Backbone.View.extend({
      className: 'main-overlay-view',
      template: app.fetchTemplate('main-overlay'),

      events: {
        'pointerend .list-toggle': 'onListToggle'
      },

      render: function() {
        this.$el.html(this.template());
        return this;
      },

      onListToggle: function() {

      }

    });

    return MainOverlayView;
  });