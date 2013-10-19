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
    className: 'search-item touchable',
    template: app.fetchTemplate('search/item'),

    events: {
      'click': 'onSearchClick'
    },

    initialize: function() {
    },

    render: function() {
      var data = this.model.toJSON();
      this.$el.html(this.template(data));

      return this;
    },

    onSearchClick: function() {
      this.trigger('click', this.model);
    }

  });

  return LocationItem;
});
