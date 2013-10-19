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
    }
  }
});

require(['app',
  'jquery',
  'backbone',
  'routers/main'
  ], function (
    app,
    $,
    Backbone,
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
