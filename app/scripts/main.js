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

<<<<<<< HEAD
    console.log(app);
  });

  // Localize or create a new JavaScript Template object.
  var JST = window.JST = window.JST || {};
=======
  console.log(app);
  window.app = app;
>>>>>>> c815ded9274a4eab1006f90bd1c55985dd0d39d2

  new MainRouter();


  Backbone.history.start({
      pushState: false,
      root: app.root
    });
});
