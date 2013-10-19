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

    timeout: null,
    autocompleteTimeout: 500,
    lastValue: '',

    render: function() {
      return this;
    },

    keyPress: function(query) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.lastValue = query;
      this.timeout = setTimeout($.proxy(this.updateAutocomplete, this), this.autocompleteTimeout);
    },

    updateAutocomplete: function() {
      this.trigger('map:search', this.lastValue);
    }
  });

  return SearchList;
});
