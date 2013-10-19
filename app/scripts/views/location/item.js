define([
  'app',
  'backbone'
],

function(
  app,
  Backbone
  ) {
  'use strict';
  var LocationItem = Backbone.View.extend({
    className: 'location-item',
    template: app.fetchTemplate('location/item'),

    events: {
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(this.template());
      this.updateStatus();

      return this;
    }

  });

  return LocationItem;
});
