/**
 * Calculates and displays the address details of 200 S Mathilda Ave, Sunnyvale, CA
 * based on a free-form text
 *
 *
 * A full list of available request parameters can be found in the Geocoder API documentation.
 * see: http://developer.here.com/rest-apis/documentation/geocoder/topics/resource-geocode.html
 *
 * @param   {H.service.Platform} platform    A stub class to access HERE services
 */
function main() {
  // var pr = prompt("Enter");
  // document.getElementById("blank").value = pr;
  // var start =  document.getElementById("blank").value;
  // alert(start);
  var inp = document.getElementById("inp").value;
  // alert(start+inp);
  $('.maper').contents(':not(.inpu)').remove();
  //document.getElementById("map").innerHTML = "";
  function geocode(platform) {
    var geocoder = platform.getGeocodingService(),
      geocodingParameters = {
        searchText: inp,
        jsonattributes: 1
      };

    geocoder.geocode(
      geocodingParameters,
      onSuccess,
      onError
    );
  }
  /**
   * This function will be called once the Geocoder REST API provides a response
   * @param  {Object} result          A JSONP object representing the  location(s) found.
   *
   * see: http://developer.here.com/rest-apis/documentation/geocoder/topics/resource-type-response-geocode.html
   */
  function onSuccess(result) {
    var locations = result.response.view[0].result;
    /*
     * The styling of the geocoding response on the map is entirely under the developer's control.
     * A representitive styling can be found the full JS + HTML code of this example
     * in the functions below:
     */
    addLocationsToMap(locations);
    addLocationsToPanel(locations);
    // ... etc.
  }



  /**
   * This function will be called if a communication error occurs during the JSON-P request
   * @param  {Object} error  The error message received.
   */
  function onError(error) {
    alert('Can\'t reach the remote server');
  }

  /**
   * Boilerplate map initialization code starts below:
   */

  //Step 1: initialize communication with the platform
  // In your own code, replace variable window.apikey with your own apikey
  var platform = new H.service.Platform({
    apikey: "wEQ83cW4Tqkwx7fAg0RLzaThLElgi6vHxdyqCbhMrrU"
  });
  var defaultLayers = platform.createDefaultLayers();

  //Step 2: initialize a map - this map is centered over California
  var map = new H.Map(document.getElementById('map'),
    defaultLayers.vector.normal.map, {
      center: {
        lat: 19.0601,
        lng: 73.0140
      },

      zoom: 15,
      pixelRatio: window.devicePixelRatio || 1
    });
  // add a resize listener to make sure that the map occupies the whole container
  window.addEventListener('resize', () => map.getViewPort().resize());

  var locationsContainer = document.getElementById('panel');

  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  // Hold a reference to any infobubble opened
  var bubble;

  /**
   * Opens/Closes a infobubble
   * @param  {H.geo.Point} position     The location on the map.
   * @param  {String} text              The contents of the infobubble.
   */
  function openBubble(position, text) {
    if (!bubble) {
      bubble = new H.ui.InfoBubble(
        position, {
          content: text
        });
      ui.addBubble(bubble);
    } else {
      bubble.setPosition(position);
      bubble.setContent(text);
      bubble.open();
    }
  }

  /**
   * Creates a series of list items for each location found, and adds it to the panel.
   * @param {Object[]} locations An array of locations as received from the
   *                             H.service.GeocodingService
   */
  function addLocationsToPanel(locations) {

    var nodeOL = document.createElement('ul'),
      i;

    nodeOL.style.fontSize = 'small';
    nodeOL.style.marginLeft = '5%';
    nodeOL.style.marginRight = '5%';


    for (i = 0; i < locations.length; i += 1) {
      var li = document.createElement('li'),
        divLabel = document.createElement('div'),
        address = locations[i].location.address,
        content = '<strong style="font-size: large;">' + address.label + '</strong></br>';
      position = {
        lat: locations[i].location.displayPosition.latitude,
        lng: locations[i].location.displayPosition.longitude
      };

      content += '<strong>houseNumber:</strong> ' + address.houseNumber + '<br/>';
      content += '<strong>street:</strong> ' + address.street + '<br/>';
      content += '<strong>district:</strong> ' + address.district + '<br/>';
      content += '<strong>city:</strong> ' + address.city + '<br/>';
      content += '<strong>postalCode:</strong> ' + address.postalCode + '<br/>';
      content += '<strong>county:</strong> ' + address.county + '<br/>';
      content += '<strong>country:</strong> ' + address.country + '<br/>';
      content += '<br/><strong>position:</strong> ' +
        Math.abs(position.lat.toFixed(4)) + ((position.lat > 0) ? 'N' : 'S') +
        ' ' + Math.abs(position.lng.toFixed(4)) + ((position.lng > 0) ? 'E' : 'W');

      divLabel.innerHTML = content;
      li.appendChild(divLabel);

      nodeOL.appendChild(li);
    }

    locationsContainer.appendChild(nodeOL);
  }


  /**
   * Creates a series of H.map.Markers for each location found, and adds it to the map.
   * @param {Object[]} locations 
   * @param {Object[]} locations1
   * An array of locations as received from the
   *                             H.service.GeocodingService
   */
  function addLocationsToMap(locations) {
    var group = new H.map.Group(),
      position,
      i;

    // Add a marker for each location found
    for (i = 0; i < locations.length; i += 1) {
      position = {
        lat: locations[i].location.displayPosition.latitude,
        lng: locations[i].location.displayPosition.longitude
      };
      marker = new H.map.Marker(position);
      marker.label = locations[i].location.address.label;
      group.addObject(marker);
    }

    group.addEventListener('tap', function (evt) {
      map.setCenter(evt.target.getGeometry());
      openBubble(
        evt.target.getGeometry(), evt.target.label);
    }, false);
  
    // Add the locations group to the map
    map.addObject(group);
    map.setCenter(group.getBoundingBox().getCenter());
    route(locations);
  }
  
  function route(loca){
    // alert(loca[0].location.displayPosition.longitude);
    // alert(loca1[0].location.displayPosition.longitude);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    var longi = loca[0].location.displayPosition.longitude;
    var lati = loca[0].location.displayPosition.latitude;
    var join = lati + "," + longi;
    // alert(join);
    $('.maper').contents(':not(.inpu)').remove();
    //  var inp = document.getElementById("inp").value;
    function calculateRouteFromAtoB(platform) {
      // alert(join);
      var router = platform.getRoutingService(),
        routeRequestParams = {
          mode: 'fastest;car',
          representation: 'display',
          routeattributes: 'waypoints,summary,shape,legs',
          maneuverattributes: 'direction,action',
          waypoint0: "19.0601,73.0140", // Brandenburg Gate 28.7041, 77.1025
          waypoint1: join // Friedrichstraße Railway Station
        };
      router.calculateRoute(
        routeRequestParams,
        onSuccess,
        onError
      );
    }
    /**
     * This function will be called once the Routing REST API provides a response
     * @param  {Object} result          A JSONP object representing the calculated route
     *
     * see: http://developer.here.com/rest-apis/documentation/routing/topics/resource-type-calculate-route.html
     */
    function onSuccess(result) {
      var route = result.response.route[0];
      // var locations = result.response.view[0].result;
      /*
       * The styling of the route response on the map is entirely under the developer's control.
       * A representitive styling can be found the full JS + HTML code of this example
       * in the functions below:
       */
      addRouteShapeToMap(route);
      addManueversToMap(route);

      addWaypointsToPanel(route.waypoint);
      addManueversToPanel(route);
      addSummaryToPanel(route.summary);
      // ... etc.
    }

    /**
     * This function will be called if a communication error occurs during the JSON-P request
     * @param  {Object} error  The error message received.
     */
    function onError(error) {
      alert('Can\'t reach the remote server');
    }

    /**
     * Boilerplate map initialization code starts below:
     */

    // set up containers for the map  + panel
    var mapContainer = document.getElementById('map'),
      routeInstructionsContainer = document.getElementById('panel');

    //Step 1: initialize communication with the platform
    // In your own code, replace variable window.apikey with your own apikey
    var platform = new H.service.Platform({
      apikey: "wEQ83cW4Tqkwx7fAg0RLzaThLElgi6vHxdyqCbhMrrU"
    });

    var defaultLayers = platform.createDefaultLayers();

    //Step 2: initialize a map - this map is centered over Berlin
    var map = new H.Map(mapContainer,
      defaultLayers.vector.normal.map, {
        center: {
          lat: 52.5160,
          lng: 13.3779
        },
        zoom: 13,
        pixelRatio: window.devicePixelRatio || 1
      });
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());

    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
    var ui = H.ui.UI.createDefault(map, defaultLayers);

    // Hold a reference to any infobubble opened
    var bubble;

    /**
     * Opens/Closes a infobubble
     * @param  {H.geo.Point} position     The location on the map.
     * @param  {String} text              The contents of the infobubble.
     */
    function openBubble(position, text) {
      if (!bubble) {
        bubble = new H.ui.InfoBubble(
          position,
          // The FO property holds the province name.
          {
            content: text
          });
        ui.addBubble(bubble);
      } else {
        bubble.setPosition(position);
        bubble.setContent(text);
        bubble.open();
      }
    }


    /**
     * Creates a H.map.Polyline from the shape of the route and adds it to the map.
     * @param {Object} route A route as received from the H.service.RoutingService
     */
    function addRouteShapeToMap(route) {
      var lineString = new H.geo.LineString(),
        routeShape = route.shape,
        polyline;

      routeShape.forEach(function (point) {
        var parts = point.split(',');
        lineString.pushLatLngAlt(parts[0], parts[1]);
      });

      polyline = new H.map.Polyline(lineString, {
        style: {
          lineWidth: 4,
          strokeColor: 'rgba(0, 128, 255, 0.7)'
        }
      });
      // Add the polyline to the map
      map.addObject(polyline);
      // And zoom to its bounding rectangle
      map.getViewModel().setLookAtData({
        bounds: polyline.getBoundingBox()
      });
    }


    /**
     * Creates a series of H.map.Marker points from the route and adds them to the map.
     * @param {Object} route  A route as received from the H.service.RoutingService
     */
    function addManueversToMap(route) {
      var svgMarkup = '<svg width="18" height="18" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="8" cy="8" r="8" ' +
        'fill="#1b468d" stroke="white" stroke-width="1"  />' +
        '</svg>',
        dotIcon = new H.map.Icon(svgMarkup, {
          anchor: {
            x: 8,
            y: 8
          }
        }),
        group = new H.map.Group(),
        i,
        j;

      // Add a marker for each maneuver
      for (i = 0; i < route.leg.length; i += 1) {
        for (j = 0; j < route.leg[i].maneuver.length; j += 1) {
          // Get the next maneuver.
          maneuver = route.leg[i].maneuver[j];
          // Add a marker to the maneuvers group
          var marker = new H.map.Marker({
            lat: maneuver.position.latitude,
            lng: maneuver.position.longitude
          }, {
            icon: dotIcon
          });
          marker.instruction = maneuver.instruction;
          group.addObject(marker);
        }
      }

      group.addEventListener('tap', function (evt) {
        map.setCenter(evt.target.getGeometry());
        openBubble(
          evt.target.getGeometry(), evt.target.instruction);
      }, false);

      // Add the maneuvers group to the map
      map.addObject(group);
    }


    /**
     * Creates a series of H.map.Marker points from the route and adds them to the map.
     * @param {Object} route  A route as received from the H.service.RoutingService
     */
    function addWaypointsToPanel(waypoints) {



      var nodeH3 = document.createElement('h3'),
        waypointLabels = [],
        i;


      for (i = 0; i < waypoints.length; i += 1) {
        waypointLabels.push(waypoints[i].label)
      }

      nodeH3.textContent = waypointLabels.join(' - ');

      routeInstructionsContainer.innerHTML = '';
      routeInstructionsContainer.appendChild(nodeH3);
    }

    /**
     * Creates a series of H.map.Marker points from the route and adds them to the map.
     * @param {Object} route  A route as received from the H.service.RoutingService
     */
    function addSummaryToPanel(summary) {
      var summaryDiv = document.createElement('div'),
        content = '';
      content += '<b>Total distance</b>: ' + summary.distance + 'm. <br/>';
      content += '<b>Travel Time</b>: ' + summary.travelTime.toMMSS() + ' (in current traffic)';


      summaryDiv.style.fontSize = 'small';
      summaryDiv.style.marginLeft = '5%';
      summaryDiv.style.marginRight = '5%';
      summaryDiv.innerHTML = content;
      routeInstructionsContainer.appendChild(summaryDiv);
    }

    /**
     * Creates a series of H.map.Marker points from the route and adds them to the map.
     * @param {Object} route  A route as received from the H.service.RoutingService
     */
    function addManueversToPanel(route) {



      var nodeOL = document.createElement('ol'),
        i,
        j;

      nodeOL.style.fontSize = 'small';
      nodeOL.style.marginLeft = '5%';
      nodeOL.style.marginRight = '5%';
      nodeOL.className = 'directions';

      // Add a marker for each maneuver
      for (i = 0; i < route.leg.length; i += 1) {
        for (j = 0; j < route.leg[i].maneuver.length; j += 1) {
          // Get the next maneuver.
          maneuver = route.leg[i].maneuver[j];

          var li = document.createElement('li'),
            spanArrow = document.createElement('span'),
            spanInstruction = document.createElement('span');

          spanArrow.className = 'arrow ' + maneuver.action;
          spanInstruction.innerHTML = maneuver.instruction;
          li.appendChild(spanArrow);
          li.appendChild(spanInstruction);

          nodeOL.appendChild(li);
        }
      }

      routeInstructionsContainer.appendChild(nodeOL);
    }


    Number.prototype.toMMSS = function () {
      return Math.floor(this / 60) + ' minutes ' + (this % 60) + ' seconds.';
    }

    // Now use the map as required...
    calculateRouteFromAtoB(platform);

  }
  
  // function fun(loca){

  // }
  // Now use the map as required...
  geocode(platform);
}

