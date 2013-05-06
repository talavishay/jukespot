/* 
 * js for the results screen ( poll -timed out)
 */
jQuery(document).ready(function(){
      if(typeof(Drupal.settings.mimi) === "undefined"){
          jQuery(".field-name-field-timer").remove();
      }
});
jQuery(document).live("pageload ready", function (){
    
    if(typeof(jQuery.mobile ) !== "undefined"){
        jQuery("div:jqmData(role='page'):last");
    }
      if(typeof(Drupal.settings.mimi) === "undefined"){
          jQuery(".field-name-field-timer").remove();
      }
});
function pageScript(func) {
        if(typeof(jQuery.mobile ) !== "undefined"){
            var $context = jQuery("div:jqmData(role='page'):last");
            func($context);
    }
}

pageScript(function($context){
  $context.bind("pageshow", function(event, ui) {
      //~ window.alert("dDd");
      //remove the timer field 
      if(typeof(Drupal.settings.mimi) === "undefined"){
          jQuery(".field-name-field-timer").remove();
      }
  });

  $context.bind("pagebeforehide", function(event, ui) {
//    window.alert("Before hide");
  });

});
