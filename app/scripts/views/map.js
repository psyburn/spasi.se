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

    initialize: function() {
      app.loadGmaps(this, this.initMap);
      // this.listenTo(app.collections.locations, 'reset', this.refreshLocations, this);
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
      app.collections.locations.loadMock();
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
      this.setPosition(position.coords.latitude, position.coords.longitude);
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
      }
    },

    refreshLocations: function() {
      this.deleteMarkers();
      app.collections.locations.forEach(function(location) {
        this.displayLocation(location);
      }, this);
    },

    displayLocation: function(location) {
      this.addMarker(location, {
        url: 'images/marker_' + location.get('category') + '.png',
        size: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(30, 30),
        scaledSize: new google.maps.Size(30,30)
      });
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

    addMarker: function(latLng, icon) {
      var marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: icon
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
