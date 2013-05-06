jQuery(document).ready(function(){
//    window.alert("ssss");
    

   jQuery("#main-wrapper").css("display","none");

    if(typeof(jQuery.mobile) === "undefined"){
        jQuery.mobile.changePage( "vote?id=1765", { transition: "slideup"} );	
    }   else {
        window.loaction("vote?id=1765");
    }
    
});

jQuery(document).bind("mobileinit", function(){
        jQuery.mobile.page.prototype.options.domCache = false;
    });