define(['app'], function(app) {

  var MapView = new Backbone.View.extend({
    className: 'gmap-view',

    render: function() {
      return this;
    },

    initMap: function() {
      this.map = new google.maps.Map(this.el, {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true,
        zoom: 18,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        }
      });
      app.map = this.map;
      this.places = new google.maps.places.PlacesService(this.map);
    }

  });

  return MapView;
});