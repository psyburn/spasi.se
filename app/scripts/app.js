/*global define */
define([
    'jquery',
    'underscore',
    'backbone'
  ], function(
    $,
    _,
    Backbone
  ) {
    'use strict';

    var app = {
      root: '/',
      gmaps: {
        url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyANYgRiD8Ra92P08fC0rm3v_TPLkRitLQw&sensor=true'
      }
    };

    _.extend(app, {
      fetchTemplate: function(path) {
        var fullPath = 'templates/' + path + '.html';
        if (!JST[fullPath]) {
          $.ajax({
            url: app.root + fullPath,
            async: false,
            success: function(contents) {
              JST[fullPath] = _.template(contents);
            }
          });
        }

        return JST[fullPath];
      },

      setActiveView: function(view) {
        var oldView = this.currentView;

        if (oldView && oldView.cleanup) {
          //view cleanup custom events
          oldView.cleanup();
        }
        var viewEl = view.render();
        $('#secondary-content').html(viewEl.el).addClass('visible');
        //scroll to top on every screen change
        setTimeout(function () {
          window.scrollTo(0,1);
        }, 0);
        this.currentView = view;
      },

      hideActiveView: function() {
        $('#secondary-content').removeClass('visible');
      },

      loadGmaps: function(context, callback) {
        if (!this.gmaps.loaded) {
          this.gmaps.loadContext = context;
          this.gmaps.loadCallback = callback;

          $('<script>')
            .attr('type', 'text/javascript')
            .attr('src', this.gmaps.url + '&libraries=places&callback=app.onGmapsLoad')
            .appendTo('head');

          this.gmaps.loaded = true;
        }
      },

      onGmapsLoad: function() {
        if (this.gmaps.loadCallback && this.gmaps.loadContext) {
          this.gmaps.loadCallback.call(this.gmaps.loadContext);
        }
      }
    });

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    return app;
  });
