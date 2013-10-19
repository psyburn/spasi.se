define([
  'app'
], function(
  app

) {

  var MapView = Backbone.View.extend({
    className: 'map-view',
    map: null,
    places: null,
    center: null,
    markers: [],

    initialize: function() {
      app.loadGmaps(this, this.initMap);
      this.listenTo(app.collections.locations, 'reset', this.refreshLocations, this);
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
        zoom: 16,
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
      var me = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
          me.onGetCurrentLocation.call(me, pos);
        });
      } else {
        console.log('Geo Location is not supported');
      }
    },

    onGetCurrentLocation: function(position) {
      console.log(position);
      this.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.panTo(this.center);
      this.addMarker(this.center);
      this.searchPlaces('test');
    },

    searchPlaces: function(keyword) {
      this.performRadarSearch(keyword);
    },

    performRadarSearch: function(keyword) {
      var me = this;
      var radius = 2000;

      this.places.radarSearch({
        location: this.center,
        radius: radius,
        keyword: keyword
      }, function(results, status) {
        me.onPlacesSearchResults.call(me, results, status);
      });
    },

    onPlacesSearchResults: function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.refreshPlaces(results);
        this.createMarkers(results);
      }
    },

    refreshLocations: function() {
      this.deleteMarkers();
      app.locations.forEach(function(location) {
        this.displayLocation(location);
      }, this);
    },

    displayLocation: function(location) {

    },

    refreshPlaces: function(results) {
      var places = [];
      for(var i=0; i<results.length; i++) {
        places.push({
          title: results[i].html_attributions.length > 0 ? results[i].html_attributions[0] : 'Untitled',
          location: {
            lat: results[i].geometry.location.lb,
            lng: results[i].geometry.location.mb
          }
        });
      }
      app.collections.places.reset(places);
    },

    createMarkers: function(places) {
      for(var i=0; i < places.length; i++) {
        this.addMarker(places[i].geometry.location);
      }
    },

    addMarker: function(latLng) {
      var marker = new google.maps.Marker({
        position: latLng,
        map: this.map
        // icon: {
        //   url: filter.icon,
        //   size: new google.maps.Size(30, 30),
        //   origin: new google.maps.Point(0, 0),
        //   anchor: new google.maps.Point(30, 30),
        //   scaledSize: new google.maps.Size(30,30)
        // },
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
