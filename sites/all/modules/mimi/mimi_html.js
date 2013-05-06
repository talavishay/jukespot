var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, function(e) {
       scale();
    setTimeout(function() {
       scale();
    }, 1000);
}, false);
function home(){
    console.log("home");
    jQuery('.circle').unbind("click.vote");
    jQuery("#container").html(mimi.mainHtml );
    jQuery("body").addClass("multi").removeClass("mono");
    scale();
    bindHomeEvents();
}
function sendVote(e){
if(typeof(mimi.poll) !== "undefined"){
    mimi.poll.ajax_url = '/poll/ajax/vote/'+mimi.poll.nid+'/0/0';
    mimi.poll.choice = jQuery("a", e.currentTarget).attr("choice");
    
    jQuery.ajax({
        type: "POST",
        url: mimi.poll.ajax_url,
        data: mimi.poll,
        success: function(data){
            var out = jQuery.parseJSON(data);
        },
        dataType: "html"
    });
    jQuery("a", this).fadeIn("fast").text("thanks")
    jQuery(e.currentTarget).unbind("click.vote");
}
}
function multiCircle(e){
    jQuery("body").addClass("multi").remove("mono");
    jQuery('.circle-container').fadeIn();
    jQuery(".current a" ).css("color", "transparent");
    var a = jQuery("a", this.children[0]);
    jQuery(e.currentTarget).parent(".circle-container").animate({"width": "50%", "height": "50%"}, 200, function() {                 
        var circleSize = jQuery(".circle", this).height();
        var fontSize = circleSize/3;
        var marginTop = fontSize - (fontSize*0.2);
        jQuery("a", this).css({"margin-top": marginTop  ,"font-size":fontSize,"height":(fontSize*1.05), "line-height":fontSize+"px"});
        jQuery(e.currentTarget).unbind("click.toggle").parent(".circle-container").removeClass("current");
    });
}
function monoCircle(e){
    console.log(e);
    jQuery("body").removeClass("multi").addClass("mono");
    jQuery("a", e.currentTarget).fadeOut("fast");
    jQuery(e.currentTarget).parent(".circle-container").addClass("current");
    jQuery('.circle-container:not(.current)').fadeOut();
    jQuery(e.currentTarget).parent(".circle-container").animate({"width": "100%", "height": "100%", "opacity": 1},function(){
            var circleSize = jQuery(".circle",this).height();
            var fontSize = circleSize/3;
            var marginTop = fontSize - (fontSize*0.2);
            jQuery("a", e.currentTarget).css({"margin-top": marginTop  ,"font-size":fontSize,"height":(fontSize*1.05), "line-height":fontSize+"px"});
            jQuery("a", e.currentTarget).fadeIn("fast");
    });
}
function scale(e){
    var fullWidth = jQuery(window).width();
    var fullHeight = window.innerHeight;
    if (fullWidth > fullHeight) {
        jQuery("body").addClass("horiz").removeClass("verti");
        var size = fullHeight;
        var horizMargin = ((fullWidth-fullHeight) / 2);
        jQuery("#logo").css({"width":  horizMargin , "height":  horizMargin });
        jQuery("#logo_container").css({ "height":  horizMargin });
    }
    if (fullHeight > fullWidth) {
        jQuery("body").addClass("verti").removeClass("horiz");
        var size = fullWidth;
        var verticalMargin = (fullHeight - fullWidth) *0.6;
        jQuery("#logo").css({"width": verticalMargin, "height": verticalMargin});
        jQuery("#logo_container").css({ "height": verticalMargin});
    }
    //scale down container for the logo
    size = (size/100)*85;
    
    jQuery("#container").css({"width": size, "height": size});//.text(fullWidth).css("font-size","50px");
    if(jQuery("body.multi").length === 1){
        jQuery(".circle-container").css({"width": size / 2, "height": size / 2});    
    }
    var circleSize = jQuery(".circle:first-child").height();
    var fontSize = circleSize/4;
    var marginTop = fontSize - (fontSize*0.2);
    
    jQuery("a.circle_link").css({   "margin-top": marginTop,
                        "font-size":fontSize,
                        "height":(fontSize*1.05),
                        "line-height":fontSize+"px"});
//    ##  TOPBAR - go away...
//    scrollAmount = 20;
//    var bodyHeight = jQuery("body").height(fullHeight+scrollAmount );
//    jQuery("body").css("height",bodyHeight+scrollAmount );
//    window.scrollTo(0, scrollAmount ); 
}
function getPollResults(){
        jQuery("#container").load("/node/52/results #node-52");
}
function getPoll(){
        jQuery.getJSON("/json_vote", function(data) {
        var counter = 1;
        jQuery.each(data.choices, function(key, val) {
            jQuery("#circle_" + counter).text(val).attr("choice",key);
            counter++;
        });
        console.log(data);
        mimi.poll = data.form;
        bindPollEvents();
    });
}
function getForm(e){          
    jQuery.getJSON("/getForm", function(data) {
        var html = jQuery(data.content);
        jQuery("#edit-submitted-msg", html).css({"margin-top": "25%", "width": "75%"});
        jQuery(e.currentTarget).html(html);
        bindFormEvents();
    });
}
function sendForm(e){
    jQuery.ajax({
        type: "POST",
        url: "/send_form",
        data: {"msg":e},
        success: function(data){
            var out = jQuery.parseJSON(data);
            window.alert("thanks!");
        },
        dataType: "html"
    });
}
function bindFormEvents() {
    jQuery(".circle a.poll_request").unbind("click.poll_request");
    jQuery(".circle.form_request").unbind("click.form");
    jQuery("input[type=submit]").bind("click", function(e){
                e.preventDefault();
                sendForm(jQuery("#edit-submitted-msg").val());
                console.log("click");
                return false;
            });
}
function bindPollEvents() {
jQuery(".circle.form_request").unbind("click.form").removeClass("form_request");
    jQuery('.circle').bind("click.vote", function(e) {
       sendVote(e);
        monoCircle(e);
        

    });
}
function bindHomeEvents(){
    jQuery('.circle').unbind("click.vote");
    jQuery(".circle a.poll_request").bind("click.poll_request", function(e){
            e.preventDefault();
            jQuery(".circle a").text("");
            getPoll();
            return false;
    });
    jQuery(".circle.form_request").bind("click.form", function(e){
            e.preventDefault();
            jQuery(".circle a").text("");
            monoCircle(e);
            getForm(e);
            return false;
    });
}    
jQuery(document).ready(function() {
    scale();
    if(mimi.page === "user"){
        mimi.mainHtml = jQuery("#container").html();
        
    }
    jQuery("#logo").bind("click",function(){
        home();
    });
    bindHomeEvents();
    
});
