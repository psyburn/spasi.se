define([
    'app'
  ], function(
    app
  ) {
    'use strict';

    var MainOverlayView = Backbone.View.extend({
      className: 'filter-view',
      template: app.fetchTemplate('filter/main'),
      timeFilter: false,

      events: {
        'click .category-list .row div': 'onCategorySelect',
        'click .filter-btn': 'onFilterClick',
        'click .time-toggle': 'onTimeToggleClick'
      },

      render: function() {
        this.$el.html(this.template());
        for (var i = 0; i < app.filter.categories.length; i++) {
          this.$('[data-type=' + app.filter.categories[i] + ']').addClass('selected');
        }
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

        if (this.timeFilter) {
          var timeFrom = this.$('.time-from').val() || 8;
          var timeTo = this.$('.time-to').val() || 20;
          var day = this.$('.day').val() ? new Date(this.$('.day').val()) : new Date();
          app.filter.time = {
            from: timeFrom,
            to: timeTo,
            day: day.getDay()
          };
        } else {
          app.filter.time = null;
        }

        Backbone.trigger('filter:change');
        app.hideActiveView();
      },

      onTimeToggleClick: function() {
        if (this.timeFilter) {
          this.$('.time-chooser').removeClass('expanded');
          this.timeFilter = false;
        } else {
          this.$('.time-chooser').addClass('expanded');
          this.timeFilter = true;
        }
      },

      getFilter: function() {

      }

    });

    return MainOverlayView;
  });
