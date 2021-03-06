var supportsOrientationChange = "onorientationchange" in window,
orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, function(e) {
    scale();
    window.setTimeout(function() {
        scale();
    }, 200);
    window.setTimeout(function() {
        scale();

    }, 400);
}, false);

function multiCircle(e) {
    jQuery("body").addClass("multi").remove("mono");
    jQuery('.circle-container').fadeIn();
    jQuery(".current a").css("color", "transparent");
    var a = jQuery("a", this.children[0]);
    jQuery(e.currentTarget).parent(".circle-container").animate({"width": "50%", "height": "50%"}, 200, function() {
        var circleSize = jQuery(".circle", this).height();
        var fontSize = circleSize / 3;
        var marginTop = fontSize - (fontSize * 0.2);
        jQuery("a", this).css({"margin-top": marginTop, "font-size": fontSize, "height": (fontSize * 1.05), "line-height": fontSize + "px"});
        jQuery(e.currentTarget).unbind("click.toggle").parent(".circle-container").removeClass("current");
    });
}
function monoCircle(e) {
    console.log(e);
    jQuery("body").removeClass("multi").addClass("mono");
    jQuery(".circle a").hide();
    jQuery(e.currentTarget).parent(".circle-container").addClass("current");
    jQuery('.circle-container:not(.current)').fadeOut();
    jQuery(e.currentTarget).parent(".circle-container").animate({"width": "100%", "height": "100%", "opacity": 1}, function() {
        var circleSize = jQuery(".circle", this).height();
        var fontSize = circleSize / 3;
        var marginTop = fontSize - (fontSize * 0.2);
        jQuery("#formMsg,a", e.currentTarget).css({"margin-top": marginTop, "font-size": fontSize, "height": (fontSize * 1.05), "line-height": fontSize + "px"});
        jQuery("a", e.currentTarget).fadeIn("fast");
    });
}
function scale(e) {
    var fullWidth = jQuery(window).width();
    var fullHeight = window.innerHeight;
    if (fullWidth > fullHeight) {
        jQuery("body").addClass("horiz").removeClass("verti");
        var size = fullHeight;
        var horizMargin = ((fullWidth - fullHeight) / 2);
        if(horizMargin > 150){
//            jQuery("#logo").css({"width": horizMargin, "height": horizMargin});
            jQuery("#logo_container").css({"height": horizMargin});
        }
    }
    if (fullHeight > fullWidth) {
        jQuery("body").addClass("verti").removeClass("horiz");
        var size = fullWidth;
        var verticalMargin = (fullHeight - fullWidth) * 0.6;
        if(verticalMargin > 150){
//            jQuery("#logo").css({"width": verticalMargin, "height": verticalMargin});
            jQuery("#logo_container").css({"height": verticalMargin});
        }
    }
    //scale down container for the logo
    size = (size / 100) * 85;

    jQuery("#container").css({"width": size, "height": size});//.text(fullWidth).css("font-size","50px");
    
    if (jQuery("body.multi").length === 1) {
        jQuery(".circle-container").css({"width": size / 2, "height": size / 2});
    }
    var circleSize = jQuery(".circle:first-child").height();
    var fontSize = circleSize / 5;
    var marginTop = fontSize*1.5 ;

    jQuery("#formMsg,a.circle_link").css({"padding-top": marginTop,
        "font-size": fontSize,
        "height": (fontSize * 1.05),
        "line-height": fontSize + "px"});
//    ##  TOPBAR - go away...
//    scrollAmount = 20;
//    var bodyHeight = jQuery("body").height(fullHeight+scrollAmount );
//    jQuery("body").css("height",bodyHeight+scrollAmount );
//    window.scrollTo(0, scrollAmount ); 
        jQuery("body.screen.horiz #container").css({"top": "10%"});
        ;
        
    
}
function home() {
    jQuery("body").removeClass("poll form").addClass("home");
    jQuery('.circle,.circle a').unbind(".poll, .form, .results");
    jQuery("#container").removeClass("rotate").html(mimi.mainHtml);
    jQuery(".webform-client-form").remove();jQuery("#form_input").remove();

    jQuery("body").addClass("multi home").removeClass("mono");
    jQuery(".circle.poll");
    scale();
    bindHomeEvents();
    mimi.timers = {};
    mimi.currentVote = {};
    
}
function bindHomeEvents() {
    jQuery(".circle a.poll_request").bind("click.home", function(e) {
        e.preventDefault();
        jQuery(".circle a").text("");
        getPoll();
        return false;
    });
    jQuery(".circle.form_request").bind("click.home", function(e) {
        e.preventDefault();
        jQuery(".circle a").text("");
        jQuery(".circle.form_request").unbind("click.home");
        getForm(e);
        return false;
    });
    jQuery(".circle.results").bind("click.results", function(e) {
        window.location= '/screen';
    });
}
function getPoll() {
    jQuery('.circle,.circle a').unbind("click");
    jQuery('.circle').removeClass("pulseScale ");
    jQuery('#container').addClass("rotate");
    jQuery('body').addClass("poll").removeClass("form home");
    jQuery.getJSON("/json_vote", function(data) {
        var counter = 1;
        jQuery.each(data.choices, function(key, val) {
            jQuery("#circle_" + counter).parent(".circle").addClass("active");
            jQuery("#circle_" + counter).addClass("active").text(val).attr("choice", key);
            counter++;
        });
        mimi.poll = data.form;
        bindPollEvents();
        jQuery('#container').removeClass("rotate");
    });
}
function bindPollEvents() {
    jQuery("body").addClass("poll").removeClass("form home");
    jQuery('.circle.active').bind("click.poll", function(e) {
    jQuery(e.currentTarget).unbind("click.poll").bind("click.poll",function(){
            if(typeof(mimi.timers.pollThanks ) !== "undefined"){
                clearTimeout(mimi.timers.pollThanks);
            }
            home();
        });
    mimi.currentVote = e.currentTarget;    
    sendVote(e);
    monoCircle(e);
    jQuery("a", mimi.currentVote).text("תודה!");
    mimi.timers.pollThanks = setTimeout(function( ){
        home();
    }, 5000);
    });
}
function sendVote(e) {
    if (typeof(mimi.poll) !== "undefined") {
        jQuery("#container").addClass("rotate");
        mimi.poll.ajax_url = '/mimi_poll/ajax/vote/' + mimi.poll.nid + '/0/0';
        mimi.poll.choice = jQuery("a", e.currentTarget).attr("choice");
        jQuery(".current a").fadeOut("fast");
        jQuery.ajax({
            type: "POST",
            url: mimi.poll.ajax_url,
            data: mimi.poll,
            success: function(data) {
                var out = jQuery.parseJSON(data);
                jQuery("#container").removeClass("rotate");
                jQuery(".current").bind("click.poll", function(){
                    
                }); 
                console.log("sendVote");
            },
            dataType: "html"
        });
        jQuery('.circle,.circle a').unbind(".poll, .form, .results");        
    }
}
function getPollResults() {
    jQuery("#container").load("/node/52/results #node-52");
}
function getForm(e) {
    jQuery('.circle,.circle a').unbind(".poll").unbind("form").unbind("results");
    jQuery('.circle:not(.form_request)').each(function(i, val){
        jQuery(val).parent().remove();
    });
    if(!jQuery(e.curentTarget).hasClass("load") ){
    jQuery(e.curentTarget).addClass("load");
    
    jQuery.getJSON("/getForm", function(data) {
        var html = jQuery(data.content);
        mimi.form= {};
        
        mimi.form.form_build_id = jQuery("input[name=form_build_id]", html).val();
        mimi.form.form_id = jQuery("input[name=form_id]", html).val();
        mimi.form.details = {"page_num" : 1, "page_count" : 1, "finished" : 0, "sid" : ""};
        mimi.form.op = "שלח";
        
        jQuery("a", e.currentTarget).html('שלח');
        
        jQuery('#container').after(jQuery('<div id="form_input"><input type="text" id="formMsgText" placeholder="שלח טקסט לדי ג\'יי"/></div>'
                                ).bind("change", function(e){
                                        mimi.form.msg = jQuery("input" ,e.currentTarget).val();
        }));
        
        //jQuery("body").append(jQuery(html));
        bindFormEvents();
        scale();
        jQuery(".circle.form_request").addClass("pulseScale");
        
        var circleSize = jQuery(".circle.form_request").height();
        var fontSize = circleSize / 3;
        var marginTop = fontSize - (fontSize * 0.2);
        jQuery("a", e.currentTarget).css({"margin-top": marginTop, "font-size": fontSize, "height": (fontSize * 1.05), "line-height": fontSize + "px"});
    });
    }
}
function bindFormEvents() {
    jQuery("body").addClass("form").removeClass("poll home");
    jQuery(".form_request").bind("click.form", function(e) {
        var msg = jQuery("#form_input input").val() ;
        if(msg !== ""){
            jQuery("#form_input").remove();
            jQuery(".form_request").children().css("cursor","default");
            sendForm(e, jQuery("#formMsgText").val());
            mimi.timers.formThanks = setTimeout(function( ){
                home();
            }, 5000);
            return false;
        }else {
            jQuery("#form_input input").addClass("pulseScale");
        }
        e.preventDefault();
    });
}
function sendForm(e, input) {
if(mimi.form.msg !== ""){
jQuery("#form_input").blur().remove();
jQuery("#formMsgText").blur().css("opacity","0").remove();

jQuery.ajax({
    type: "POST",
    url: "/send_form",
    data: mimi.form,
    success: function(data) {
        var circleSize = jQuery(".circle.form_request").height();
        var fontSize = circleSize / 3;
        var marginTop = fontSize - (fontSize * 0.2);
        jQuery("a",e.currentTarget).css({"margin-top": marginTop, "font-size": fontSize, "height": (fontSize * 1.05), "line-height": fontSize + "px"}).text("תודה!");
        jQuery(e.currentTarget).animate({"font-size":"300%","width":"100%","height":"100%"}).removeClass("pulseScale").unbind('.form').bind("click",function(){
            home();
            clearTimeout(mimi.timers.formThanks);
        });
        monoCircle(e);
        scale();
    },
    dataType: "html"
});
}
}

jQuery(document).ready(function() {
    
    if (mimi.page === "user") {
        mimi.mainHtml = jQuery("#container").html();
        home();
    }
    jQuery("#logo").bind("click", function() {
        home();
    });
    
home();
    scale();
});

mimi = {};
mimi.form = {};
mimi.page = "user";
mimi.timers = {};
settings = {"webform_ajax": {"url": "X"}};
//            console.log(settings.webform_ajax.url);

// Hides mobile browser's address bar when page is done loading.
window.addEventListener('load', function(e) {
    setTimeout(function() {
        window.scrollTo(0, 20);
        //  window.alert("nuni");
    }, 1);
}, false);
//
//jQuery('#container').css({
////for firefox
//"-moz-animation-name":"rotatebox",
//"-moz-animation-duration":"0.8s",
//"-moz-animation-iteration-count":"1",
//"-moz-animation-fill-mode":"forwards",
////for safari & chrome
//"-webkit-animation-name":"rotatebox",
//"-webkit-animation-duration":"0.8s",
//"-webkit-animation-iteration-count":"1",
//"-webkit-animation-fill-mode" : "forwards",
//
//});
setTimeout(function() {   scale();    }, 100);
