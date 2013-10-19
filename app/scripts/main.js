require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/lodash/dist/lodash',
    backbonelist: 'plugins/backbone.list'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone-parse': {
      deps: ['backbone']
    },
    backbonelist: {
      deps: ['backbone'],
      exports: 'Backbone.List'
    },
    'Points': {}
  }
});

require(['app',
  'routers/main',

  //plugins
  'backbone-parse',
  'backbonelist',
  'Points'
  ], function (
    app,
    MainRouter
  ) {
  'use strict';
  // use app here

  console.log(app);
  window.app = app;

  new MainRouter();


  Backbone.history.start({
      pushState: false,
      root: app.root
    });
});
