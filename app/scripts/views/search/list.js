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
      var me = this;
      this.on('click:item', function(model) {
        me.selectPlace(model);
      });

      return this;
    },

    keyPress: function(query) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.lastValue = query;
      if (query) {
        this.timeout = setTimeout($.proxy(this.updateAutocomplete, this), this.autocompleteTimeout);
      } else {
        app.collections.places.reset();
      }
    },

    enterPress: function() {
      var me = this;
      if (this.lastValue) {
        app.collections.places.once('reset', function() {
          me.selectPlace(app.collections.places.first());
        });
        this.trigger('map:search', this.lastValue);
      } else {
        this.selectPlace();
      }
    },

    updateAutocomplete: function() {
      this.trigger('map:search', this.lastValue);
    },

    selectPlace: function(place) {
      this.trigger('place:set', place);
    }
  });

  return SearchList;
});
