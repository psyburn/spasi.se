require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/lodash/dist/lodash'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone-parse': {
      deps: ['backbone']
    },
    'Points': {}
  }
});

require([
  'app',

  'routers/main',

  'collections/locations',
  'collections/places',

  //plugins
  'backbone-parse',
  'Points'
  ], function (
    app,
    MainRouter,
    LocationsCollection,
    PlacesCollection
  ) {
    'use strict';
    // use app here

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    app.router = new MainRouter();
    window.app = app;

    app.collections = {
      locations: new LocationsCollection(),
      places: new PlacesCollection()
    };

    app.filter = {
      categories: [],
      location: {
        sw: {
          lat: 0,
          lon: 0
        },
        ne: {
          lat: 0,
          lon: 0
        }
      },
      workingHours: false
    };

    Backbone.history.start({
      pushState: false,
      root: app.root
    });

  });
