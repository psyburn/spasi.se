define([
  'app',
  'backbone'
],

function(
    app,
    Backbone
  ) {
  'use strict';
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'map': 'map'
    },


    index: function() {
      console.log('home!');
    },

    map: function() {

    }

  });

  return Router;
});
