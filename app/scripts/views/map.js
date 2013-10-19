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
    positionMarker: null,
    currentPosition: null,

    initialize: function() {
      app.loadGmaps(this, this.initMap);
      this.listenTo(app.collections.locations, 'reset', this.refreshLocations, this);
      app.mapView = this;
    },

    render: function() {
      return this;
    },

    initMap: function() {
      var me = this;
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

      google.maps.event.addListener(this.map, 'bounds_changed', function() {
        Backbone.trigger('map:bounds:change', {
          ne: {
            lat: me.map.getBounds().getNorthEast().lat(),
            lng: me.map.getBounds().getNorthEast().lng(),
          },
          sw: {
            lat: me.map.getBounds().getSouthWest().lat(),
            lng: me.map.getBounds().getSouthWest().lng(),
          }
        });
      });

      this.places = new google.maps.places.PlacesService(this.map);
      this.showCurrentLocation();
    },

    getPosition: function() {
      return this.center;
    },

    setPosition: function(lat, lng) {
      console.log('setting position: ' + lat + ' ' + lng);
      this.center = new google.maps.LatLng(lat, lng);
      this.map.panTo(this.center);
      app.currentLocation = {
        title: '',
        location: {
          lat: lat,
          lng: lng
        }
      };
      if (!this.positionMarker) {
        this.positionMarker = new google.maps.Marker({
          position: this.center,
          map: this.map,
          icon: {
            url: 'images/marker_position.png',
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(25, 50),
            scaledSize: new google.maps.Size(50,50)
          }
        });
      } else {
        this.positionMarker.setPosition(this.center);
      }
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
      this.currentPosition = position;
      this.setPosition(position.coords.latitude, position.coords.longitude);
    },

    searchPlaces: function(keyword) {
      this.performNearbySearch(keyword);
    },

    performNearbySearch: function(keyword) {
      var me = this;
      this.places.nearbySearch({
        location: this.center,
        radius: 2000,
        keyword: keyword
      }, function(result, status) {
        me.onPlacesSearchResults.call(me, result, status);
      });
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
      }
    },

    refreshLocations: function() {
      this.deleteMarkers();
      app.collections.locations.forEach(function(location) {
        this.displayLocation(location);
      }, this);
    },

    displayLocation: function(location) {
      var me = this;
      var latLng = new google.maps.LatLng(location.get('location').latitude, location.get('location').longitude);
      var marker = this.addMarker(latLng, {
        url: 'images/markers/marker_' + location.get('category') + '.png',
        size: new google.maps.Size(32, 46),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 23),
        scaledSize: new google.maps.Size(32,46)
      });
      marker.locationModel = location;
    },

    onMarkerClick: function(index) {
      var marker = this.markers[index];
      if (marker.locationModel) {
        Backbone.trigger('map:marker:click', marker.locationModel);
      }
    },

    refreshPlaces: function(results) {
      var places = [];
      for(var i=0; i<results.length; i++) {
        places.push({
          title: results[i].name ? results[i].name : 'Untitled',
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

    addMarker: function(latLng, icon) {
      var me = this;
      var marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: icon
      });
      this.markers.push(marker);
      this.attachMarkerListener(marker, this.markers.length-1);
      return marker;
    },

    attachMarkerListener: function(marker, index) {
      var me = this;
      google.maps.event.addListener(marker, 'click', function(event) {
        console.log('Marker click');
        me.onMarkerClick.call(me, index);
      });
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
;
