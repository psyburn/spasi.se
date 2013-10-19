
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

    render: function() {
      return this;
    }
  });

  return LocationList;
});
