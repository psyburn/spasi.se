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

require(['app',
  'routers/main',

  //plugins
  'backbone-parse',
  'Points'
  ], function (
    app,
    MainRouter
  ) {
    'use strict';
    // use app here

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    new MainRouter();
    window.app = app;

    Backbone.history.start({
      pushState: false,
      root: app.root
    });

});
