
jQuery(document).ready(function(){
    mimi = {};
  mimi.mainHtml = jQuery("#container").html();
//    jQuery(".foreground:first-child").live("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(e){ 
//         if(e.originalEvent.animationName === "scaleUp") {
//                 jQuery("#bar .result").addClass("minimize");
//
//         }
//     });    
//    jQuery(".result").live("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(e){ 
//         if(e.originalEvent.animationName === "minimize") {
//             //console.log(e.originalEvent.animationName);
//            setTimeout(function(){refresh();},100);
//            jQuery("#bar").remove();
//         }
//     });
    if(jQuery('.views-field-nid .field-content').length !== 0 ){
         nid = jQuery('.views-field-nid .field-content').first().text(); 
     } else {
          if(jQuery('.node-mimi-poll').length){
                nid =  jQuery('.node-mimi-poll').first().attr("id").replace(/node-(.*)/i, "$1");
          } else{
            jQuery.ajax({
                type: "GET",
                url: '/current_poll' ,
                success: function(data){
                    console.log(data);
                    setup(data);
                    nid = data.poll[0].result.nid;
                    refresh();
                    },
                    dataType: "json"
            
                });
          }
     } 
    var refreshTimer = setInterval(function(){
        if(typeof(nid) !== "undefined" ){
                refresh();
        }
     }, 3000);        
    var refreshTickerTimer = setInterval(function(){
        
        
        jQuery('iframe').contents().find("#views-ticker-liScroll-sub").animate({"opacity":"0"},2000,  function(e){
            jQuery( 'iframe' ).attr( 'src', function ( i, val ) { return val; }).ready(function(e){
            setTimeout(function(){
                console.log(jQuery('iframe').contents().find("#views-ticker-liScroll-sub"));
//                jQuery('iframe').contents().find("#views-ticker-liScroll-sub").css({"opacity":"0"});
//                jQuery('iframe').contents().find("#views-ticker-liScroll-sub").animate({"opacity":"1"},9500);
                jQuery('iframe').css({"opacity":"0"});
                jQuery('iframe').animate({"opacity":"1"},15500);
            },2000)
             });
        });//fadeOut("slow");
            
            console.log("after");
//        jQuery( 'iframe' ).animate({"opacity":"1"});//fadeOut("slow");
        
     },30000);        
     
     
function setup(data){
       
}
function refresh(){


    
//    jQuery('#bar .foreground').addClass("minimize");
    jQuery("#page-title").text("מעדכן . . .");
             
jQuery.ajax({
    type: "GET",
    url: '/get_results' ,
    ifModified : true,
    beforeSend: function(){
        jQuery(".circle").addClass("pulseScale");
    },
    complete: function(){
        jQuery(".circle").removeClass("pulseScale");
    },
    
    success: function(data){
        jQuery(".circle-container a").html(""); 
        var title = jQuery("#page-title").text();
        jQuery.each(data ,function(key, val){
            counter = parseInt(key)+1;
            jQuery(".circle-container a#circle_"+counter).html(val.title+"<br/>"+val.percentage+"%");
        });       
//        var submissions = jQuery('#block-views-sub-block-1', data);
//        jQuery('.region-sidebar-first').html(submissions );
        },
        dataType: "json"
    });
    
    

};
});