define([
    'app',

    'views/map'
  ], function(
    app,

    MapsView
  ) {
  "use strict";

  var CompositeView = new Backbone.View.extend({
    className: 'composite-view',

    mapsView: null,

    render: function() {
      this.mapsView = new MapsView();
      this.$el.append(this.mapsView.render().el);
      return this;
    }

  });

  return CompositeView;
});