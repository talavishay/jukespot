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

function multiCircle(e){
    jQuery("body").addClass("multi").remove("mono");
    jQuery('.circle-container').fadeIn();
    jQuery(".current a").css("color", "transparent");
    var a = jQuery("a", this.children[0]);
    jQuery(e.currentTarget).parent(".circle-container").animate({"width": "50%", "height": "50%"}, 200, function() {
        var circleSize = jQuery(".circle", this).height();
        var fontSize = circleSize / 3;
        var marginTop = fontSize - (fontSize * 0.2);
//        jQuery("a", this).css({"margin-top": marginTop, "font-size": fontSize, "height": (fontSize * 1.05), "line-height": fontSize + "px"});
        jQuery("a", this).css({"margin-top": marginTop, "font-size": fontSize,  "line-height": fontSize + "px"});
        jQuery(e.currentTarget).unbind("click.toggle").parent(".circle-container").removeClass("current");
    });
}
function monoCircle(e) {
    
    jQuery("body").removeClass("multi").addClass("mono");
    jQuery(".circle a").hide();
    jQuery(e.currentTarget).css("width","82%").parent(".circle-container").addClass("current");
    jQuery('.circle-container:not(.current)').fadeOut();
    scale("mono");
    jQuery(e.currentTarget).parent(".circle-container").animate({"width": "100%", "height": "100%", "opacity": 1}, function() {
         jQuery("#bottom").show();
//        var circleSize = jQuery(".circle", this).height();
//        var fontSize = circleSize / 3;
//        var marginTop = fontSize - (fontSize * 0.2);
//         jQuery("a", e.currentTarget).css({"line-height": "normal","height":"auto","padding-top":"0px","font-size":"inherit"});
        
        if(typeof(e) !== "undefined"){
            jQuery("a", e.currentTarget).css("opacity", 0);
            jQuery("a", e.currentTarget).fadeIn("fast",function(){
                    fitTextInBox(jQuery("a", e.currentTarget));
                     var val = jQuery("a", e.currentTarget);
                    var circleTextHeight = jQuery(val).height();
                    var circleHeight = jQuery(val).parent().height();
                    var circleMargin =circleHeight-circleTextHeight;
                    jQuery(val).css("margin-top", circleMargin/2);
                    jQuery("a", e.currentTarget).css("opacity", 1);
            });
        }
            
    });
}
function scale(mono) {
    var fullWidth = 320;
     var fullHeight = 460;
    fullWidth = jQuery(window).width() < 320 ? jQuery(window).width() : fullWidth;
    fullHeight =  window.innerHeight < 460 ? window.innerHeight: fullHeight;
   
    jQuery("body").css({"min-height":fullHeight-20 });
    if (fullWidth > fullHeight) {
        jQuery("body").addClass("horiz").removeClass("verti");
        var size = fullHeight;
        var horizMargin = ((fullWidth - fullHeight) / 2);
        if(horizMargin > 150){
            jQuery("#logo").css({"width": horizMargin, "height": horizMargin});
            jQuery("#logo_container").css({"height": horizMargin});
        }
    }
    if (fullHeight > fullWidth) {
        jQuery("body").addClass("verti").removeClass("horiz");
        var size = fullWidth;
        var verticalMargin = (fullHeight - fullWidth) * 0.6;
        if(verticalMargin > 150){
            jQuery("#logo").css({"width": verticalMargin, "height": verticalMargin});
            jQuery("#logo_container").css({"height": verticalMargin});
        }
    }
    //scale down container for the logo
    size = (size / 100) * 75;
    if(mono === "mono"){
        size = (size / 100) * 70;
    }
    var containter_margin_top  = (window.innerHeight-size ) / 2 ;

//    jQuery("#container").css({"width": size, "height": size, "margin-top": containter_margin_top  });//.text(fullWidth).css("font-size","50px");
    jQuery("#container").css({"width": size, "height": size});//.text(fullWidth).css("font-size","50px");
    
    if (jQuery("body.multi").length === 1) {
        jQuery(".circle-container").css({"width": size / 2.05, "height": size / 2.05});
    }
//    var circleSize = jQuery(".circle:first-child").height();
//    var fontSize = circleSize / 5;
//    var marginTop = fontSize*1.5 ;
//
//    jQuery("a.circle_link:visible").each(function(i, val){
//        fitTextInBox(val);
//        var circleTextHeight = jQuery(val).height();
//        var circleHeight = jQuery(val).parent().height();
//        var circleMargin =circleHeight-circleTextHeight;
//        jQuery(val).css("margin-top", circleMargin/2);
//
//    });
    

//    jQuery("#formMsg,a.circle_link").css({"padding-top": marginTop,
//        "font-size": fontSize,
//        "height": (fontSize * 1.05),
//        "line-height": fontSize + "px"}
//);
//    ##  TOPBAR - go away...
//    scrollAmount = 20;
//    var bodyHeight = jQuery("body").height(fullHeight+scrollAmount );
//    jQuery("body").css("height",bodyHeight+scrollAmount );
//    window.scrollTo(0, scrollAmount ); 
        jQuery("body.screen.horiz #container").css({"top": "10%"});
        ;
        
    
}
function home() {
    jQuery("#bottom").hide();
    jQuery("body").removeClass("poll form").addClass("home");
    jQuery('.circle,.circle a').unbind(".poll, .form, .results");
    jQuery("#container").html(mimi.mainHtml);
    jQuery(".webform-client-form").remove();jQuery("#form_input").remove();

    jQuery("body").addClass("multi home").removeClass("mono");
    jQuery(".circle").hide();
    
    scale();
    bindHomeEvents();
    mimi.timers = {};
    mimi.currentVote = {};
    jQuery(".circle a.poll_request").click();
    
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
//    jQuery('#container').addClass("rotate");
    jQuery('body').addClass("poll").removeClass("form home");
    jQuery("#loading").show();
    mimi.timers.loading = window.setInterval(function(){
        jQuery("#loading").append(".");
    },500);
    jQuery.getJSON("/json_vote", function(data) {
        jQuery("#loading").hide().text("connect");
        clearTimeout(mimi.timers.loading);
        var counter = 1;
        jQuery.each(data.choices, function(key, val) {
            jQuery("#circle_" + counter).parent(".circle").addClass("active");
            jQuery("#circle_" + counter).addClass("active").attr("choice", key);
//            jQuery("#circle_" + counter + " span").children("span").text(val);
            jQuery("#circle_" + counter).append('<span class="word">'+val.replace(/ /i,'</span><br/><span class="word">')+'</span>');
                    fitTextInBox(jQuery("#circle_" + counter).removeClass("selected").parent(".circle").show().removeClass("selected"));
                    var val = jQuery("#circle_" + counter);
                    var circleTextHeight = jQuery(val).height();
                    var circleHeight = jQuery(val).parent().height();
                    var circleMargin =circleHeight-circleTextHeight;
                    jQuery(val).css("margin-top", circleMargin/2);
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
    var background_color = jQuery(e.currentTarget).css("background-color");
    var parent = jQuery(e.currentTarget).parent(".circle");
   
//    jQuery("body").css({"background-color": background_color });
    jQuery(parent).addClass("selected");
    mimi.currentVote = e.currentTarget;    
    sendVote(e);
    monoCircle(e);
     jQuery(e.currentTarget).addClass("selected").css({"border-color": background_color, "background-color" : "transparent"}).find("span").css({"color": background_color });
    });
}
function sendVote(e) {
    if (typeof(mimi.poll) !== "undefined") {
        jQuery("#container");
//        jQuery("#container").addClass("rotate");
        mimi.poll.ajax_url = '/mimi_poll/ajax/vote/' + mimi.poll.nid + '/0/0';
        mimi.poll.choice = jQuery("a", e.currentTarget).attr("choice");
        jQuery(".current a").fadeOut("fast");
        jQuery.ajax({
            type: "POST",
            url: mimi.poll.ajax_url,
            data: mimi.poll,
            success: function(data) {
                var out = jQuery.parseJSON(data);
//                jQuery("#container").removeClass("rotate");
                jQuery(".current").bind("click.poll", function(){
                    
                }); 
                console.log("sendVote");
            },
            dataType: "html"
        });
        jQuery('.circle,.circle a').unbind(".poll, .form, .results");       
     
       

//    jQuery("a", mimi.currentVote).text("תודה!");
        mimi.timers.pollThanks = setTimeout(function( ){
            home();
        }, 7000);
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
//        home();
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
/************************************************************************************************************
	(C) www.dhtmlgoodies.com, October 2005
	
	This is a script from www.dhtmlgoodies.com. You will find this and a lot of other scripts at our website.	
	
	Terms of use:
	You are free to use this script as long as the copyright message is kept intact. However, you may not
	redistribute, sell or repost it without our permission.
	
	Thank you!
	
	www.dhtmlgoodies.com
	Alf Magne Kalleland
	
	************************************************************************************************************/	
	
	function fitTextInBox(fitTextInBox_currentBox, maxHeight){
            Drupal.fitTextInBox = {};
            if(jQuery("a", fitTextInBox_currentBox).length === 1){
                fitTextInBox_currentBox = jQuery("a", fitTextInBox_currentBox);
            }
// var fitTextInBox_maxWidth = false;//	var fitTextInBox_currentWidth = false;//	var fitTextInBox_currentBox = false;//	var fitTextInBox_currentTextObj = false;
	var fitTextInBox_maxHeight = false;
        if(maxHeight){
            fitTextInBox_maxHeight=maxHeight;
        } else {
            fitTextInBox_maxHeight = 10000;
        }
        
//        var fitTextInBox_currentBox= jQuery("a", e.currentTarget);
        Drupal.fitTextInBox.maxWidth = jQuery(fitTextInBox_currentBox).width()*0.8;	
        Drupal.fitTextInBox.maxHeight = jQuery(fitTextInBox_currentBox).parents(".circle-container").height()*0.8;	
        Drupal.fitTextInBox.TextObjects = jQuery("span", fitTextInBox_currentBox);
        Drupal.fitTextInBox.wordCount = Drupal.fitTextInBox.TextObjects.length;
        
        jQuery(Drupal.fitTextInBox.TextObjects).each(function(key ,fitTextInBox_currentTextObj){
            jQuery(fitTextInBox_currentTextObj).addClass("fix");
                    //.css("font-size","1px");
            var fitTextInBox_currentWidth = jQuery(fitTextInBox_currentTextObj).width();
            if(typeof(fitTextInBox_currentTextObj)!== "undefined"){
                Drupal.fitTextInBox.wordHeight = parseInt(Drupal.fitTextInBox.maxHeight) / parseInt(Drupal.fitTextInBox.wordCount);
               fitTextInBoxAutoFit(fitTextInBox_currentTextObj, Drupal.fitTextInBox.maxWidth ,fitTextInBox_currentWidth );
            };
        });
	}	
	
	function fitTextInBoxAutoFit(fitTextInBox_currentTextObj, fitTextInBox_maxWidth ,fitTextInBox_currentWidth, fitTextInBox_maxHeight,fitTextInBox_wordHeight  ){
            	if(typeof(fitTextInBox_currentTextObj)!== "undefined"){
                    var tmpFontSize = jQuery(fitTextInBox_currentTextObj).css("font-size").replace('px','')/1;
                    var fontsize = tmpFontSize + 1 + 'px';
                    jQuery(fitTextInBox_currentTextObj).css("font-size", fontsize);
                    var tmpWidth = jQuery(fitTextInBox_currentTextObj).width();
                    var tmpHeight  = jQuery(fitTextInBox_currentTextObj).height();
                    if(tmpWidth>=fitTextInBox_currentWidth && tmpWidth<fitTextInBox_maxWidth && tmpHeight<Drupal.fitTextInBox.wordHeight  && tmpFontSize<300){		
                            fitTextInBox_currentWidth = tmpWidth;	
                           fitTextInBoxAutoFit(fitTextInBox_currentTextObj, fitTextInBox_maxWidth ,fitTextInBox_currentWidth, fitTextInBox_maxHeight);
                    }else{
                            var finalfontSize = fontsize.replace('px','')/1 - 1 + 'px';
                            jQuery(fitTextInBox_currentTextObj).css("font-size", finalfontSize );
                    }		
                }
        }
