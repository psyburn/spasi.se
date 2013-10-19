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
    className: 'search-item',
    template: app.fetchTemplate('search/item'),

    events: {
    },

    initialize: function() {
    },

    render: function() {
      var data = this.model.toJSON();
      this.$el.html(this.template(data));

      return this;
    }

  });

  return LocationItem;
});
