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
  window.app = app;

  _.extend(app, {
    fetchTemplate: function(path) {
      var fullPath = 'app/templates/' + path + '.html';
      if (!JST[fullPath]) {
        $.ajax({
          url: app.root + fullPath,
          async: false,
          success: function(contents) {
            JST[fullPath] = _.template(contents);
          }
        });
      }

      return JST[fullPath];
    }
  });

  // Localize or create a new JavaScript Template object.
  var JST = window.JST = window.JST || {};

  new MainRouter();


  Backbone.history.start({
      pushState: false,
      root: app.root
    });
});
