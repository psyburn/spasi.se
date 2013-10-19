define(['app'], function(app) {

  var MapView = Backbone.View.extend({
    className: 'map-view',
    map: null,
    places: null,
    center: null,
    markers: [],

    initialize: function() {
      app.loadGmaps(this, this.initMap);
    },

    render: function() {
      return this;
    },

    initMap: function() {
      console.log('Init map');
      this.map = new google.maps.Map(this.el, {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        zoom: 8,
        zoomControl: false,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        }
      });
      app.map = this.map;
      this.places = new google.maps.places.PlacesService(this.map);
      this.showCurrentLocation();
    },

    showCurrentLocation: function() {
      this.center = new google.maps.LatLng(-34.397, 150.644);
      this.map.panTo(this.center);
    },

    performRadarSearch: function() {
      var me = this;
      var radius = 500;

      this.places.radarSearch({
        location: this.center,
        radius: radius,
        types: ['cafe']
      }, function(results, status) {
        me.onPlacesSearch.call(me, results, status);
      });
    },

    onPlacesSearchResults: function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.createMarkers(results);
      }
    },

    createMarkers: function(results) {
      for(var i=0; i < places.length; i++) {
        this.markers.push(new google.maps.Marker({
          map: this.map,
          position: places[i].geometry.location,
          // icon: {
          //   url: filter.icon,
          //   size: new google.maps.Size(30, 30),
          //   origin: new google.maps.Point(0, 0),
          //   anchor: new google.maps.Point(30, 30),
          //   scaledSize: new google.maps.Size(30,30)
          // },
        }));
      }
    },

    addMarker: function(place) {
      var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: this.map
      });
      this.markers.push(marker);
    },

    showMarker: function(marker) {
      marker.setMap(this.map);
    },

    clearMarker: function(marker) {
      marker.setMap(null);
    },

    clearMarkers: function() {
      for(var i=0; i<this.markers.length; i++) {
        this.clearMarker(this.markers[i]);
      }
    },

    deleteMarkers: function() {
      this.clearMarkers();
      this.markers = [];
    }

  });

  return MapView;
});
