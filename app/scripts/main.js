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
    backbonelist: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone.List'
    }
  }
});

require(['app',
  'jquery',
  'backbone',
  'routers/main',

  //plugins
  'backbonelist'
  ], function (
    app,
    $,
    Backbone,
    MainRouter
  ) {
  'use strict';
  // use app here

  console.log(app);

  new MainRouter();


  Backbone.history.start({
      pushState: false,
      root: app.root
    });
});
