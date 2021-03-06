<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">

<script src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js"></script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: -apple-system, Roboto, "Helvetica Neue", sans-serif;
}
#map {
    margin:auto;
    margin-top:60px;
  height: 60%; 
  width: 60%;
}
</style>

</head>

<body>
<div id="map"><h2>Map Test</h2></div>

        
<script>
// Initialise map and fetch token 
    mapkit.init({
        authorizationCallback: function(done) {
            fetch("/token")
                .then(res => res.text())
                .then(token => done(token)) /* If successful, return your token to MapKit JS */ 
                .catch(error => { /* Handle error */ });
            //done("long term JWT"); //alternative to short term token fetched above
        }
    });
    //let map = new mapkit.Map("map", { center: new mapkit.Coordinate(55.8642, -4.2518)  });

// Set default region of map    
    var region = new mapkit.CoordinateRegion(
        new mapkit.Coordinate(55.8642, -4.2518),
        new mapkit.CoordinateSpan(.05, .05)
    );
    
// Generate Map    
    var map = new mapkit.Map("map", {
        center: new mapkit.Coordinate(55.8642, -4.2518),
        region: region,
        showsUserLocation: true,
        showsUserLocationControl: true
    });

// Geocode Mad Hatters Paisley    
    let geocoder = new mapkit.Geocoder();
geocoder.lookup("Mad Hatters Paisley", (error, data) => {
    if (error) {
        return;
}

// Search for coffee near user's location

let search = new mapkit.Search({ getsUserLocation: true }); 
search.search("coffee", (error, data) => {
if (error) {
// handle search error return;
}
let annotations = data.places.map(place => {
let annotation = new mapkit.MarkerAnnotation(place.coordinate); 
annotation.title = place.name;
return annotation;
});
map.showItems(annotations); });



map.addAnnotation(new mapkit.MarkerAnnotation(data.results[0].coordinate)); });
    //controls
    map.showsUserLocationControl = true; 
    map.showsScale = mapkit.FeatureVisibility.Visible; 
    //map.tintColor = "#ff4040";
    //map.isZoomEnabled = false; 
    //map.isScrollEnabled = false; 
    //map.isRotateEnabled = false;
    
</script>
</body>
</html>

<!--eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjI0OU5KQk4ySkoifQ.eyJpc3MiOiJGVVhRWjYyWjlNIiwiaWF0IjoxNTMxNTg0ODg0Ljc0OCwiZXhwIjoxNTMxNTg2Njg0Ljc0OX0.syY6i1KbZNT0ehYpmHWw2l2Zc-lIrGiHFsDWHkiD2l_w5dSBy1PpO79-c1Wo8Yz4jDW23RnWslJZ1SZJnU4qqQ-->