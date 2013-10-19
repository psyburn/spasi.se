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
      'click': 'onLocationClick'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    onLocationClick: function() {
      this.trigger('click', this.model);
    }

  });

  return LocationItem;
});
