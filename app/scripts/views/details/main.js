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
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      },

    });

    return Details;
  });
