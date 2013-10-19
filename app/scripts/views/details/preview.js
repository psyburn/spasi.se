define([
    'app'
  ], function(
    app
  ) {
    'use strict';

    var Preview = Backbone.View.extend({
      el: '#card-preview',
      className: 'preview-details-view',
      template: app.fetchTemplate('details/preview'),

      events: {
        'click': 'onClick'
      },

      render: function(model) {
        this.model = model;
        this.$el.html(this.template(model.toJSON()));
        return this;
      },

      onClick: function() {
        this.trigger('click', this.model);
      }

    });

    return Preview;
  });
