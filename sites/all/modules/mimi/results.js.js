/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

jQuery(document).live("pageload ready", function (){
    if(typeof(jQuery.mobile ) !== "undefined"){
        jQuery("div:jqmData(role='page'):last");
    }
    
    
});
function pageScript(func) {
        if(typeof(jQuery.mobile ) !== "undefined"){
            
            var $context = jQuery("div:jqmData(role='page'):last");
            
            func($context);
 
    }
}

jQuery(".field-name-field-timer").text("Drupal.settings.mimi.remaining");



pageScript(function($context){
//  $context.bind("pagebeforecreate", function(event, ui) {
//    window.alert("The DOM is untouched by jQM");
//  });

//  $context.bind("pagebeforeshow", function(event, ui) {
//    window.alert("Before show");
//  });

  $context.bind("pageshow", function(event, ui) {
    jQuery(".field-name-field-timer").text("Drupal.settings.mimi.remaining");
      if (Drupal.settings.mimi.remaining <= 0){
        Drupal.settings.mimi.end = true;
        
        delete myCounter;
    } else {
        Drupal.settings.mimi.end = false;
    }
    var myCounter = new Countdown({  
        seconds:Drupal.settings.mimi.remaining,  // number of seconds to count down
        onUpdateStatus: function(sec){// callback for each second
                var minutes = Math.floor(sec / 60);
                var secremianing  = sec-Math.round(minutes *60);
                jQuery("div.field-name-field-timer").text("M:" + minutes + "__S:"+secremianing );
        },
        onCounterEnd: function(){ 
                window.alert(Drupal.settings.mimi.remaining);
                window.alert("Poll closed - Time UP!");
                if(typeof(jQuery.mobile) !== "undefined"){
                    jQuery.mobile.changePage( "/node/"+Drupal.settings.mimi.nid+"/results", { transition: "slideup"} );	
                    delete myCounter;
                }   else {
                    window.loaction("/");
                    delete myCounter;
                }
                
        } // final action
    });
   if(Drupal.settings.mimi.end === false){
        myCounter.start();
        if (Drupal.settings.mimi.remaining <= 0){
            Drupal.settings.mimi.end = true;
            jQuery("div.field-name-field-timer").text("XXXX");
            delete myCounter;
        }
   }
    

  });

  $context.bind("pagebeforehide", function(event, ui) {
//    window.alert("Before hide");
  });

  $context.bind("pagehide", function(event, ui) {
//    window.alert("Hide");
  });
});


