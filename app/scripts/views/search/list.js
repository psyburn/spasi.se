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

    original: null,

    initialize: function() {
      Backbone.on('search:reset', this.resetSearch, this);
    },

    render: function() {
      var me = this;
      this.on('click:item', function(model) {
        me.selectPlace(model);
      });

      this.original = $('.search-field').val();

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
      app.collections.places.once('reset', function() {
        me.selectPlace(app.collections.places.first());
      });
      this.trigger('map:search', this.lastValue);
    },

    updateAutocomplete: function() {
      this.trigger('map:search', this.lastValue);
    },

    selectPlace: function(place) {
      this.trigger('place:set', place);
    },

    resetSearch: function() {
      $('.search-field').val(this.original).blur();
    }
  });

  return SearchList;
});
