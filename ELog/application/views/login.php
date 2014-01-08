<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtmll/DT/xhtmll-strict.dtd>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Log Monitor </title>
                <link rel="shortcut icon" href="img/ipco.ico" />
		<meta name="author" content="Reviloera" />

		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">		
		<link rel="stylesheet" type="text/css" href="css/bootstrap-responsive.min.css">		
		<link rel="stylesheet" type="text/css" href="css/app.css">
                <link rel="stylesheet" type="text/css" href="css/order.css">    
                    
		

		<script type="text/javascript" src ="ap/jquery_1.5.2.min.js"></script>
		<script type="text/javascript" src ="ap/oauth2.js"></script>
		
                <script type="text/javascript" src ="ap/jquery-1.9.0.min.js"></script>	
	
		<script type='text/javascript' src='ap/jquery-ui.min.js'></script>
                <script type="text/javascript" src ="ap/ap.js"></script>
                
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
	 function addMarker(id,err,lat, lng, info) {
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
	 //currentPopup = popup;
        // alert(id);
           $("#add_more_notes").show();
           $("#new_equip_frm").load("index.php/loaddata");
           $("#new_equip_frm").empty().html('<img src="img/preview.gif" />Loading....');
	 });
	 google.maps.event.addListener(popup, "closeclick", function() {
	 map.panTo(center);
	 currentPopup = null;
         $("#add_more_notes").hide();
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
	 echo ("addMarker($i,$i,$lat, $lon+$i,'<b>$name</b><br/>$desc');\n");
         }
	 ////}
	 ?>
	 center = bounds.getCenter();
	 map.fitBounds(bounds);
	 
	 }
	 </script>
	</head>
	<body>
            <div id="headers">
                
                
            </div>
            <div id="log_holder">
                <div id="log_img">
                    <div id="msg">
                        
                    </div>
                      
                </div>
                <div id="log_d">
                    <div id="carrier">
                        <img src="img/logini.png" id="logini" />
                        <form class="form-horizontal" method="post" action="index.php/oath">
				  <div class="control-group2">
				    <label class="control-label" for="inputDescription">Username</label>
				    <div class="controls1">
                                        <input type="text" name="name" class="taskname" value="" id="inputDescriptionname" placeholder ="">
				    </div>
				  </div>
				 		  
<div class="control-grou3">
     <label class="control-label" for="inputDescription">Password</label>
				    <div class="controls2">
                                        <input type="password" name="pass" class="projid" id="inputDescriptionid" placeholder =" "/>
				    </div>
</div>
                            <input type="submit" id="_sublog" value="Login" class="btn btn-primary edt_od_ctx" />
                 </form>
                        
                    </div>
                    
                </div>
                <div id="log_d2"></div>
            </div>
	</body>
</html>
