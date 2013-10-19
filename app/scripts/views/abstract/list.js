define([
  'app',
  'backbone'
],

function(
    app,
    Backbone
  ) {
  'use strict';
  var List = Backbone.View.extend({
    className: 'list',

    events: {
      'all': 'onEventTrigger'
    },

    initialize: function() {
      this.collection.on('reset', this.addAll, this);
    },

    render: function() {
      return this;
    },

    addAll: function() {
      this.$el.html('');
      if (this.showInfo) {
        this.$el.prepend(app.infoContainer.$el.clone());
      }
      this.collection.each(function(item) {
        this.addItem(new this.singleItem({
          model: item
        }));
      }, this);
      this.trigger('change');
    },

    addItem: function(item) {
      item.on('all', this.onEventTrigger,this);
      this.$el.append(item.render().el);
    },

    cleanup: function() {
      this.collection.off('reset', this.addAll, this);
      this.off();
    },

    onEventTrigger: function(eventName, item) {
      //propagate events on list items
      this.trigger(eventName + ':item' , item);
    }

  });

  return List;
});
