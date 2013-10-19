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
    }
  }
});

require(['app',
  'jquery',
  'backbone',
  'routers/main',
  'backbone-parse'
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
