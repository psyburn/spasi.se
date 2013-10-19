
define([
  'app',
  'backbone',
  'views/abstract/list',
  'views/location/item'
],

function(
  app,
  Backbone,
  List,
  Item
  ) {
  'use strict';
  //create a list using the defined item view and collectio
  var LocationList = List.extend({
    tagName: 'ul',
    className: 'location-list',
    singleItem: Item,
    empty: app.fetchTemplate('location/empty'),
    report: app.fetchTemplate('location/report'),

    render: function() {
      return this;
    },

    emptyView: function() {
      this.$el.html(this.empty());
    },

    addReport: function() {
      this.$el.after(this.report());
      $('.report').click(function() {
        Backbone.trigger('report', null);
      });
    }
  });

  return LocationList;
});
