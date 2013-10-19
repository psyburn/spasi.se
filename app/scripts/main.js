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
  'jquery',
  'backbone',
  'underscore',
  'routers/main',

  //plugins
  'backbone-parse',
  'backbonelist',
  'Points'
  ], function (
    app,
    $,
    _,
    Backbone,
    MainRouter
  ) {
    'use strict';
    // use app here

    console.log(app);
  });

  // Localize or create a new JavaScript Template object.
  var JST = window.JST = window.JST || {};

  new MainRouter();


  Backbone.history.start({
      pushState: false,
      root: app.root
    });
});
