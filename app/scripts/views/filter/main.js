define([
    'app'
  ], function(
    app
  ) {
    'use strict';

    var MainOverlayView = Backbone.View.extend({
      className: 'filter-view',
      template: app.fetchTemplate('filter/main'),

      events: {
        'click .category-list .row div': 'onCategorySelect',
        'click .filter-btn': 'onFilterClick'
      },

      render: function() {
        this.$el.html(this.template());
        return this;
      },

      onCategorySelect: function(e) {
        var targetEl = $(e.target);
        targetEl[targetEl.hasClass('selected')? 'removeClass': 'addClass']('selected');
      },

      onFilterClick: function() {
        //set filter setings and trigger filterin
        var els = this.$('.category-list .row div');
        var curEl;
        var selectedTypes = [];
        for (var i = els.length - 1; i >= 0; i--) {
          curEl = $(els[i]);
          if (curEl.hasClass('selected')) {
            selectedTypes.push(curEl.data('type'));
          }
        }

        app.filter.categories = selectedTypes;
        Backbone.trigger('filter:change');
      }
    });

    return MainOverlayView;
  });
