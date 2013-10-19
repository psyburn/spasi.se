define([
    'app',
    'views/location/list',
    'views/search/list',
    'views/details/preview',
    'views/details/main'
  ], function(
    app,
    LocationList,
    SearchList,
    DetailsPreview,
    DetailView
  ) {
    'use strict';

    var MainOverlayView = Backbone.View.extend({
      className: 'main-overlay-view',
      template: app.fetchTemplate('main-overlay'),

      events: {
        'click .list-toggle': 'onListToggle',
        'focus .search-field': 'onSearchFieldFocus',
        'keyup .search-field': 'onSearchKeyUp',
        'click .filter-btn': 'onFilterClick',
        'click .location-clear': 'onLocationClearClick'
      },

      original: null,

      initialize: function() {
        Backbone.on('search:reset', this.resetSearch, this);
      },

      render: function() {
        this.initDetailsPreviewCard();
        this.$el.html(this.template());
        return this;
      },

      initDetailsPreviewCard: function() {
        var me = this;
        this.detailsPreview =  new DetailsPreview();
        this.detailsPreview.hide();
        this.listenTo(this.detailsPreview, 'click', function(model) {
          me.trigger('details:show', model);
          var view = new DetailView({model: model});
          app.setActiveView(view);
        });
      },

      showPreviewCard: function(model) {
        console.log(model)
        this.detailsPreview.render(model);
      },

      onListToggle: function() {
        var me = this;
        var overlayFooter = this.$('.footer');
        if (overlayFooter.hasClass('list')) {
          overlayFooter.removeClass('list');
          app.hideActiveView();
        } else {
          overlayFooter.addClass('list');
          var locationList = new LocationList({
            collection: app.collections.locations
          });
          app.setActiveView(locationList);
          this.listenTo(locationList, 'click:item', function(model) {
            me.trigger('details:show', model);
            var view = new DetailView({model: model});
            app.setActiveView(view);
            me.$('.footer').removeClass('list');
          });
          locationList.addAll();
        }
      },

      onSearchFieldFocus: function() {
        // Show autocomplete
        var me = this;
        this.searchList = new SearchList({
          collection: app.collections.places
        });
        this.searchList.on('map:search', function(query) {
          me.trigger('map:search', query);
        });
        this.searchList.on('place:set', this.setPlace, this);
        app.setActiveView(this.searchList);
        this.$('.header').addClass('searching');
        this.trigger('search:focus');

        this.original = this.$('.search-field').val();
      },

      onSearchKeyUp: function(e) {
        var query = this.$('.search-field').val().trim();
        this.$('.search')[query.length ? 'removeClass' : 'addClass']('nearby');
        if (this.searchList) {
          if (e.keyCode === 13) {
            this.searchList.enterPress();
          } else {
            this.searchList.keyPress(query);
          }
        }
      },

      onFilterClick: function() {
        app.router.navigate('filter', true);
      },

      onLocationClearClick: function() {
        this.setPlace();
        this.trigger('place:set');
      },

      setPlace: function(place) {
        var position = {};
        if (this.searchList) {
          app.hideActiveView();
        }
        this.$('.header').removeClass('searching');
        if (place) {
          this.$('.search-field').val(place.get('title'));
          position = place.get('location');
          this.trigger('map:position:set', position);
        } else {
          this.$('.search').addClass('nearby');
          this.$('.search-field').val('');
          app.collections.places.reset([]);
          this.trigger('map:position:reset');
        }
      },

      resetSearch: function() {
        this.$('.search-field').val(this.original).blur();
        this.$('.searching').removeClass('searching');
      }

    });

    return MainOverlayView;
  });
