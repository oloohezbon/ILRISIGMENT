<!DOCTYPE html>
<html>
	 <head>
	 <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	 <title>Google Map API V3 with markers</title>
	 <style type="text/css">
	 
	 #map-v { width: 100%; height: 600px; border: 0px; padding: 0px; }
	 </style>
	 <script src="http://maps.google.com/maps/api/js?v=3&sensor=false" type="text/javascript"></script>
	 <script type="text/javascript">
	 //Sample code written by August Li
	 var icon = new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/micons/blue.png",
          
	 new google.maps.Size(64, 64), new google.maps.Point(0, 0),
	 new google.maps.Point(16, 32));
         
         var icon2 = new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/micons/red.png",
          
	 new google.maps.Size(64, 64), new google.maps.Point(0, 0),
	 new google.maps.Point(16, 32));
         
	 var center = null;
	 var map = null;
	 var currentPopup;
	 var bounds = new google.maps.LatLngBounds();
	 function addMarker(err,lat, lng, info) {
	 var pt = new google.maps.LatLng(lat, lng);
	 bounds.extend(pt);
         if(err>2)
             {
              var marker = new google.maps.Marker({
	 position: pt,
	 icon: icon,
	 map: map
	 });   
             }
             else
                 {
                 var marker = new google.maps.Marker({
	 position: pt,
	 icon: icon2,
	 map: map
	 });      
                 }
	 
	 var popup = new google.maps.InfoWindow({
	 content: info,
	 maxWidth: 300
	 });
	 google.maps.event.addListener(marker, "click", function() {
	 if (currentPopup != null) {
	 currentPopup.close();
	 currentPopup = null;
	 }
	 popup.open(map, marker);
	 currentPopup = popup;
	 });
	 google.maps.event.addListener(popup, "closeclick", function() {
	 map.panTo(center);
	 currentPopup = null;
	 });
	 }
	 function initMap() {
	 map = new google.maps.Map(document.getElementById("map-v"), {
	 center: new google.maps.LatLng(0, 0),
	 zoom: 20,
	 mapTypeId: google.maps.MapTypeId.ROADMAP,
	 mapTypeControl: false,
	 mapTypeControlOptions: {
	 style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
	 },
	 navigationControl: true,
	 navigationControlOptions: {
	 style: google.maps.NavigationControlStyle.SMALL
	 }
	 });
	 <?php
	// $query = mysql_query("SELECT * FROM poi_example");
	// while ($row = mysql_fetch_array($query)){
	// $name=$row['name'];
	// $lat=$row['lat'];
	 //$lon=$row['lon'];
	// $desc=$row['desc'];
        // -1.283249, 36.816663
         $lat= -1.283249;
         $lon=36.816663;
         for($i=0;$i<5;$i++){
             
         
         $name="gagag";
         $desc="vampire";
	 echo ("addMarker($i,$lat, $lon+$i,'<b>$name</b><br/>$desc');\n");
         }
	 ////}
	 ?>
	 center = bounds.getCenter();
	 map.fitBounds(bounds);
	 
	 }
         initMap();
	 </script>
	 </head>
	 <body >
	 <div id="map-v"></div>
         
         </body>
	 </html>
