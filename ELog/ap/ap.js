$( document ).ready(function() {
var tasks=new Tasks();
tasks.Map_Pop();
setInterval("my_function();",240000);
/*if ($("#minute_log").is(":visible")) {
      // change content

setTimeout(function(){
   //window.location.reload(1);
   //alert("oo");
   $("#minute_log").load("load_min");
    $("#minute_log").empty().html('<img src="../img/preview.gif" />Loading....');
}, 30000);    
}*/  
});
 
    function my_function(){
     $("#minute_log").load("load_min");
    $("#minute_log").empty().html('<img src="../img/preview.gif" />Loading Latest Log....');
    }
var Tasks =function(){
    
    return{
    Map_Pop:function(){
      $('#maps').css( 'cursor', 'pointer' ); 
      $('#mapsz').css( 'cursor', 'pointer' );
      $("#middle_span1").hide();
    $("#maps").click(function(){
    $("#map-v").hide();
    $("#middle_span1").show();
    $("#middle_span1").load("load_all");
    $("#middle_span1").empty().html('<img src="../img/preview.gif" />Loading....');
    }) 
    
     $("#mapsz").click(function(){
    $("#map-v").show();
  $("#middle_span1").hide();
    })  
    $("#closes").click(function(){
        $("#add_more_notes").slideUp();
    })
    }    
        
    }
}
