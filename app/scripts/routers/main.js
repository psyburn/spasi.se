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
      '': 'index'
    },


    index: function() {
      console.log('home!');
    }
  });

  return Router;

});
