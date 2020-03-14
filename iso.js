
 var arr=[];
 var strtemp;
function showHint(){
          /**
     * Adds a polyline between Dublin, London, Paris and Berlin to the map
     *
     * @param  {H.Map} map      A HERE Map instance within the application
     */  
                 
$.ajax({
    url: 'https://isoline.route.ls.hereapi.com/routing/7.2/calculateisoline.json',
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'jsoncallback',
    data: {
      mode: 'fastest;pedestrian',
      start: '19.060,73.0140',
      rangetype: 'distance',
      range: '2000',
      apiKey: 'rXAyYu_Hn6X5ZOqgQZV9N93iLwpXsyg36mssPBEUl5U'
    },
    success: function (data) {
        document.getElementById('map').innerHTML='';
        for(var i=0;i<(data.response.isoline[0].component[0].shape).length;i++){
            strtemp = data.response.isoline[0].component[0].shape[i];
            arr.push(strtemp.slice(0,9))
            arr.push(strtemp.slice(11,20))
        }
        /**

    //}
      /** 
    * Adds markers to the map highlighting the locations of the captials of

       * Boilerplate map initialization code starts below:
       */
      
      //Step 1: initialize communication with the platform
      // In your own code, replace variable window.apikey with your own apikey
      var platform = new H.service.Platform({
        apikey:'rXAyYu_Hn6X5ZOqgQZV9N93iLwpXsyg36mssPBEUl5U'
      });
      var defaultLayers = platform.createDefaultLayers();
      
      //Step 2: initialize a map - this map is centered over Europe
      var map = new H.Map(document.getElementById('map'),
        defaultLayers.vector.normal.map,{
        center: {lat:19.434, lng:73.},
        zoom: 5,
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
      // Now use the map as required...
     // addPolylineToMap(map);
     
     var newarr=[19.127472,  72.939967,
        19.069347,  73.014278,
        19.141877,  72.931406,
        19.119185,  72.911080,
        19.063510,  72.999858,
        19.099494,  72.916749,                 
        19.064197,  73.000545,               
        19.153296,  72.884591,
        19.141236,  72.830889,
        19.068145,  73.014450,
        19.202830,  72.965376,                                 
        19.068317,  73.013935,
        19.021366,  73.018359,
        19.159325,  72.936084,
        19.118890,  72.905527,
        19.070377,  73.022174];
        // console.log(arr);
    var k=0;
    var newnew=[];
    for(var i=0;i<(newarr.length-2);i+=2){
        for(var j=0;j<(arr.length-2);j+=2){
            if(newarr[i]==arr[j] && newarr[i+1]==arr[j+1]){
                // alert(newarr[i]);
                newnew[k]=newarr[i];
                newnew[k+1]=newarr[i+1];
                k+=2;}
            else
                continue;
        }
    }
    // console.log(newnew);
    for(var i=0;i<newnew.length;i+=2){
        // alert(newnew[i]);
        var mark = new H.map.Marker({lat:newnew[i], lng:newnew[i+1]}) ;
        map.addObject(mark);
        // alert("done");
    }
     
    function showHint(newnew) {
            var xmlhttp = new XMLHttpRequest();
            var obj = JSON.stringify(newnew);
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("txtHint").innerHTML = this.responseText;
                }
            };
            xmlhttp.open("GET", "index.php?obj=" + obj, true);
            xmlhttp.send();
        }
    }

    /**
     * Boilerplate map initialization code starts below:
     */
    
    //Step 1: initialize communication with the platform
    // In your own code, replace variable window.apikey with your own apikey
    
      //Step 3: make the map interactive
      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)     
      // Create the default UI components
}
)
    
}
