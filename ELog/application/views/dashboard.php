<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtmll/DT/xhtmll-strict.dtd>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Business Permit </title>
		<meta name="author" content="luther" />

		<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">		
		<link rel="stylesheet" type="text/css" href="../css/bootstrap-responsive.min.css">		
		<link rel="stylesheet" type="text/css" href="../css/app.css">
                <link rel="stylesheet" type="text/css" href="../css/order.css">    
                    
		

		<script type="text/javascript" src ="../ap/jquery_1.5.2.min.js"></script>
		<script type="text/javascript" src ="../ap/oauth2.js"></script>
		
                <script type="text/javascript" src ="../ap/jquery-1.9.0.min.js"></script>	
	
		<script type='text/javascript' src='../ap/jquery-ui.min.js'></script>
                <script type="text/javascript" src ="../ap/ap.js"></script>
                
                <style type="text/css">
	 
	 #map-v { width: 100%; height: 600px; border: 0px; padding: 0px; }
	 </style>
	 <script src="http://maps.google.com/maps/api/js?sensor=true" type="text/javascript"></script>
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
	 var marker=null;
	 var currentPopup=null;
	 var bounds = new google.maps.LatLngBounds();
	 function addMarker(id,err,lat, lng, info) {
	 var pt = new google.maps.LatLng(lat, lng);
	 bounds.extend(pt);
         if(err>=1)
             {
               marker = new google.maps.Marker({
	 position: pt,
	  title:info,
	 icon: icon2,
	 
	 map: map
	 });   
             }
             else
                 {
                  marker = new google.maps.Marker({
	 position: pt,
	  title:info,
	 icon: icon,
	 map: map,
	
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
	// popup.open(map, marker);
	 //currentPopup = popup;
      // alert(id);
           $("#add_more_notes").show();
           $("#new_equip_frm").load("loaddata?id="+id+"");
           $("#new_equip_frm").empty().html('<img src="../img/preview.gif" />Loading....');
	 });
         
         google.maps.event.addListener(marker, "mouseover", function() {
	 if (currentPopup != null) {
	 currentPopup.close();
	 currentPopup = null;
	 }
	 popup.open(map,marker);
	 currentPopup = popup;
      
	 });
        
	 google.maps.event.addListener(popup, "closeclick", function() {
	 map.panTo(center);
	 currentPopup = null;
         $("#add_more_notes").hide();
	 });
	 google.maps.event.addListener(marker, "dragend", function(event) {

       var point = marker.getPosition();
       map.panTo(point);
alert(point.lat);
        });
	 }
	 function initMap() {
	 map = new google.maps.Map(document.getElementById("map-v"), {
	 center: new google.maps.LatLng(0, 0),
	zoom:10,
mapTypeId: google.maps.MapTypeId.ROADMAP,
disableAutoPan:false,
navigationControl:true,
navigationControlOptions: {style:google.maps.NavigationControlStyle.SMALL },
mapTypeControl:true,
mapTypeControlOptions: {style:google.maps.MapTypeControlStyle.DROPDOWN_MENU}
	 });
	 <?php
	// $query = mysql_query("SELECT * FROM poi_example");
	// while ($row = mysql_fetch_array($query)){
	// $name=$row['name'];
	// $lat=$row['lat'];
	 //$lon=$row['lon'];
	// $desc=$row['desc'];
        // -1.283249, 36.816663
         $lat= 0;
         $lon=0;
         $i=0;//pnd
         //($i=0;$i<5;$i++)
         foreach ($pnd as $row){
             
         $i++;
              $time=$this->location->Get_last_log($row->station_name);
           // $coin=$this->location->Get_coin($row->stationno);
                 $your_date = strtotime($time);
     $datediff = time() - $your_date;
     //echo floor($datediff/(60*60));
     //echo 'Machine '.$rows->stationno.' Last Log Data';
     $deco=floor($datediff/(60*60));
     
         $name=$row->station_name;
         $lat=$row->latitude;//$row->latitude;//0.313084;//0.3155556;
          $lon=$row->longitude;//$row->longitude;//32.588781;//32.5655556;
         $desc=$row->street_name;
	 echo ("addMarker('$name','$deco',$lat, $lon,'<b>$name</b><br/>$desc');\n");
         }
	 ////}
	 ?>
	 center = bounds.getCenter();
	 map.fitBounds(bounds);
	 
	 }
	 </script>
	</head>
	<body onload="initMap()">
            <div id="headers">
                <div id="userid">
            <?php
                     echo $this->session->userdata("username");
                     
            ?>
                    <a href="logout" >Logout</a>
                </div>
            </div>
            <div id="holder">
                <div id="left_span">
                    <div id="menu">Menu </div>  
                    
                    <div id="maps"> <img src="../img/data.png" id="map" />View All Logs</div>
                    <div id="mapsz"> <img src="../img/map.png" id="map" />View Map</div>   
 <div id="menu">Minute Log </div>
 <div id="minute_log"></div>
                </div>
                <div id="middle_span">
                    <div id="middle_span1">
                           
                        
                    </div>
                    
                  <div id="map-v"></div>  
                </div>
                
                
            </div>

	   		 <div class="modal hide" id="add_more_notes">

		        <div class="modal-header">
		            
		           
                           <button type="button" class="close" id="closes" data-dismiss="modal">
	                &times;
	            </button>
                             <h3 class ="edit">Equipment Status</h3>
		        </div>
		        <div class="modal-body" id ="new_equip_frm">

                        
		            
		        </div>
		        <div class="modal-footer">
		        	
		            <a href="#" class="btn btn-primary edt_od_ctx" id = "save_status_chng">Save Changes</a>
		        </div>
	   		 </div>
	</body>
</html>
