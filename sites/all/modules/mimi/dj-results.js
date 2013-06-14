
jQuery(document).ready(function(){
//    scale("mono");
    mimi = {};
mimi.color = new Array("#33cccc","#ffff00","#FF6699","#00ff00");
//mimi.counter = 10;
mimi.counter = 1;
    start();    
window.setInterval(function(){
    //refresh();    
    start();    
},10000);

});
function start(){
    jQuery(".content").html("");
    jQuery.ajax({
        type: "GET",
        url: '/get_results' ,
        ifModified : true,
        beforeSend: function(){        },
        complete: function(){        },
        success: function(data){
                    jQuery(".content").html("");
                    mimi.runtime = data.runtime;
                    mimi.time = data.time;
                    mimi.deadline = mimi.time +mimi.runtime ;
                    delete data.time;
                    delete data.runtime;
                    mimi.respondData = data;
                     var dataArray = new Array();
                jQuery.each(data,function(key, val){
                   
                    dataArray.push(val.votes);
                });
                mimi.winner = Math.max.apply(Math, dataArray); // 306
                jQuery.each(data,function(i, option){
                    jQuery.each(option,function(key, val){
                    if(key === "votes" && mimi.winner === parseInt(val)){
                        mimi.winner = data[i];
                        mimi.winner.color = mimi.color[i]; 
                    };
                });
                });
                
countdown();
refresh();
        },
        dataType: "json"
    });
    
};
function refresh(){
            var data = mimi.respondData;
            mimi.data = new Array();
            var i =0;
            var teko = 0;
            jQuery.each(data,function(key, val){
                mimi.data.push([val.percentage, val.title, mimi.color[i]]);            
                i++;
            });
            jQuery(".content").html("");
            jQuery('.content').jqBarGraph({
                                        data: mimi.data, 
                                        colors: mimi.color, 
                                        sort:false,
                                        speed:4.5, 
                                        width:jQuery(window).width()-100,
                                        height:window.innerHeight-200
            });
            delete mimi.data;
}
function countdown(){
    jQuery(".kkcount-down").remove();
    jQuery("#countdown").append(jQuery('<div class="kkcount-down" ></div>').attr("data-time",mimi.deadline));
    jQuery(".kkcount-down").kkcountdown({
        dayText : 'day ',
        daysText : 'days ',
        hoursText : '',
        minutesText : ':',
        secondsText : '',
        displayZeroDays : false,
        oneDayClass : 'one-day',
        callback: timeup
    });
};
function timeup(){
    jQuery(".kkcount-down").remove();
    jQuery("#countdown").text("הזמן נגמר!");
}
function dream(){

var color = Math.round(0xffffff * Math.random()).toString(16);

//alert(color);

var x = Math.floor(Math.random()*jQuery(window).width());

var y = Math.floor(Math.random()*jQuery(window).height());

//alert(x+"--"+y);

drawingpix = jQuery('<span>').attr({class: 'drawingpix'}).hide();

							 jQuery(document.body).append(drawingpix);

							 drawingpix.css({

											'background-color':color,

											'border-radius':'100px',

											'-moz-border-radius': '100px',

											'-webkit-border-radius': '100px',

											'z-index':-1,

											top: y-14,	//offsets

											left: x-14 //offsets

											}).show().animate({

																height:'500px',

																width:'500px',

																'border-radius':'500px',

																'-moz-border-radius': '500px',

																'-webkit-border-radius': '500px',

																opacity: 0.1,

																top: y-250,	//offsets

																left: x-250

						   

							}, 5000).fadeOut(2000);

							 window.setTimeout('dream()',2000);

							


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

    fullWidth =  jQuery(window).width() ;
    fullHeight =  window.innerHeight;
   
    jQuery("body").css({"min-height":fullHeight-20 });
    if (fullWidth > fullHeight) {
        jQuery("body").addClass("horiz").removeClass("verti");
        var size = fullHeight;
        var horizMargin = ((fullWidth - fullHeight) / 2);
        if(horizMargin > 150){
    
            jQuery("#logo_container").css({"height": horizMargin});
        }
    }
    if (fullHeight > fullWidth) {
        jQuery("body").addClass("verti").removeClass("horiz");
        var size = fullWidth;
        var verticalMargin = (fullHeight - fullWidth) * 0.6;
        if(verticalMargin > 150){
          
            jQuery("#logo_container").css({"height": verticalMargin});
        }
    }
    //scale down container for the logo
//    size = (size / 100) * 75;
    if(mono === "mono"){
        size = (size / 100) * 70;
    }
    var containter_margin_top  = (window.innerHeight-size ) / 2 ;
size = size *1.1;
//    jQuery("#container").css({"width": size, "height": size, "margin-top": containter_margin_top  });//.text(fullWidth).css("font-size","50px");
    jQuery("#container").css({"width": size, "height": size});//.text(fullWidth).css("font-size","50px");

        ;
        
    
}

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
                    if(tmpWidth>=fitTextInBox_currentWidth && tmpWidth<fitTextInBox_maxWidth && tmpHeight<Drupal.fitTextInBox.wordHeight  && tmpFontSize<400){		
                            fitTextInBox_currentWidth = tmpWidth;	
                           fitTextInBoxAutoFit(fitTextInBox_currentTextObj, fitTextInBox_maxWidth ,fitTextInBox_currentWidth, fitTextInBox_maxHeight);
                    }else{
                            var finalfontSize = fontsize.replace('px','')/1 - 1 + 'px';
                            jQuery(fitTextInBox_currentTextObj).css("font-size", finalfontSize );
                    }		
                }
        }
