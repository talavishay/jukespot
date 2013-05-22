jQuery('.views-field-rendered-entity').each(function(i,val){
	jQuery(val).parent().append(	jQuery(val).children().filter('div').children().filter('div.node').children().filter('.link-wrapper').children().filter('ul').children().filter('.flag-bookmarks'));
	jQuery(val).parent().append(jQuery('<div class="hidden"></div>'));
	jQuery(val).parent().children().filter('.hidden').append(jQuery(val));


	
});
