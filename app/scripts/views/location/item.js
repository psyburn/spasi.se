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
    tagName: 'li',
    className: 'location-item touchable',
    template: app.fetchTemplate('location/item'),

    events: {
      'click': 'onLocationClick'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.addClass('cat-' + this.model.get('category'));
      return this;
    },

    onLocationClick: function() {
      this.trigger('click', this.model);
    }

  });

  return LocationItem;
});
