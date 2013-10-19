define([
  'app',
  'backbone',
  'views/abstract/list',
  'views/search/item'
],

function(
  app,
  Backbone,
  List,
  Item
  ) {
  'use strict';
  //create a list using the defined item view and collectio
  var SearchList = List.extend({
    tagName: 'ul',
    className: 'search-list',
    singleItem: Item,

    render: function() {
      return this;
    }
  });

  return SearchList;
});
