function Countdown(options) {
  var timer,
  instance = this,
  seconds = options.seconds || 10,
  updateStatus = options.onUpdateStatus || function () {},
  counterEnd = options.onCounterEnd || function () {};

  function decrementCounter() {
    updateStatus(seconds);
    if (seconds === 0) {
      counterEnd();
      instance.stop();
    }
    seconds--;
  }

  this.start = function () {
    clearInterval(timer);
    timer = 0;
    seconds = options.seconds;
    timer = setInterval(decrementCounter, 1000);
  };

  this.stop = function () {
    clearInterval(timer);
  };
}

function pageScript(func) {
        if(typeof(jQuery.mobile ) !== "undefined"){
            
            var $context = jQuery("div:jqmData(role='page'):last");
            
            func($context);
 
    }
}

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
                //~ window.alert(Drupal.settings.mimi.remaining);
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


jQuery(document).live("pageload ready", function (){
    if(typeof(jQuery.mobile ) !== "undefined"){
        jQuery("div:jqmData(role='page'):last");
    }
    
    
});
jQuery(document).ready( function (){
    if (Drupal.settings.mimi.remaining <= 0){
        Drupal.settings.mimi.end = true;
    } else {
        Drupal.settings.mimi.end = false;
    }
     
    var myCounter = new Countdown({  
        seconds:Drupal.settings.mimi.remaining,  // number of seconds to count down
        onUpdateStatus: function(sec){// callback for each second
                var minutes = Math.floor(sec / 60);
                var secremianing  = sec-Math.round(minutes *60);
                jQuery("div.field-name-field-timer").html("<h2>M:" + minutes + "             S:"+secremianing+"</h2>" );

        },
        onCounterEnd: function(){ 
                
                if(!Drupal.settings.mimi.end){
                    window.alert("Poll closed - Time UP!");

                    if(typeof(jQuery.mobile) === "undefined"){
                        jQuery.mobile.changePage( "/", { transition: "slideup"} );	
                    }   else {
                        window.loaction("/");
                    }
                }
                
                
        } // final action 
    //jQuery("div.field-name-field-timer").countdown({until: Drupal.settings.mimi.remaining, compact: true});
    });
});

jQuery.ajaxSetup ({
// Disable caching of AJAX responses
cache: false
});
