define([
    'app'
  ], function(
    app
  ) {
    'use strict';

    var Details = Backbone.View.extend({
      className: 'details-view',
      template: app.fetchTemplate('details/main'),

      events: {
      },

      render: function() {
        this.$el.html(this.template());
        return this;
      },

    });

    return Details;
  });
