require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/lodash/dist/lodash',

    toucher: 'plugins/toucher',
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone-parse': {
      deps: ['backbone']
    },
    'Points': {},
    'scooch': {
      deps: ['jquery']
    }
  }
});

require([
  'app',

  'routers/main',

  'collections/locations',
  'collections/places',

  //plugins
  'toucher',
  'backbone-parse',
  'Points',
  'scooch',
], function(
    app,
    MainRouter,
    LocationsCollection,
    PlacesCollection,
    Toucher
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
      categories: [
        'emergency',
        'defibrilator',
        'hospital'
      ],
      location: {
        sw: {
          lat: 0,
          lng: 0
        },
        ne: {
          lat: 0,
          lng: 0
        }
      },
      workingHours: false
    };
    Toucher.bind('.touchable');
    Backbone.history.start({
      pushState: false,
      root: app.root
    });

  });
