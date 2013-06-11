
jQuery(document).ready(function(){
    mimi = {};
mimi.color = new Array("#33cccc","#ffff00","#FF6699","#00ff00");
mimi.counter = 10;
    refresh();    
//window.setInterval(function(){
//    refresh();    
//},7000);

});
function refresh(){
jQuery(".content").html("");
    jQuery.ajax({
        type: "GET",
        url: '/get_results' ,
        ifModified : true,
        beforeSend: function(){
  
        },
        complete: function(){
  
        },

        success: function(data){
            arrayOfData1 = new Array();
            mimi.data = new Array();
            jQuery.each(data ,function(key, val){
                counter = parseInt(key)+1;
      //          jQuery(".content").append(val.title+"<br/>"+val.percentage+"%");
            
            arrayOfData1.push([1, val.title, mimi.color[counter-1]]);
            
            mimi.data.push([val.percentage, val.title, mimi.color[counter-1]]);
            
            });
            jQuery('.content').jqBarGraph({  data: arrayOfData1 ,colors: mimi.color ,sort:false,speed:0.1, width:jQuery(window).width()-100,height:220});
            jQuery('.content').append(jQuery('<div id="counter"><span>The<br/>Winner<br/>Is</span></div>'));
            window.setTimeout(function(){
            jQuery('#couner span').remove();    
            
            mimi.timer = window.setInterval(function(){
                
                jQuery("#counter").text(mimi.counter);
                if(mimi.counter === 0){
                    jQuery(".content").html("");
                    jQuery('.content').jqBarGraph({ data: mimi.data, colors: mimi.color, sort:false,speed:3, width:jQuery(window).width()-100,height:window.innerHeight-100});
                    delete mimi.data;
                    clearInterval(mimi.timer);
                }
                mimi.counter = mimi.counter -1;
            },1000);
            delete arrayOfData1 ;
            }, 2000);
            
        },
        dataType: "json"
    });
    
};