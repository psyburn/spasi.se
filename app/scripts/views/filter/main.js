define([
    'app'
  ], function(
    app
  ) {
    'use strict';

    var MainOverlayView = Backbone.View.extend({
      className: 'filter-view',
      template: app.fetchTemplate('filter/main'),

      render: function() {
        this.$el.html(this.template());
        return this;
      }
    });

    return MainOverlayView;
  });
