/*
 * jQuery.simple.thumbchanger - jQuery Plugin
 * 
 * 2014-04-14 Tomohiro Uno
 * 
 */

(function($){
	$.fn.thumbchanger = function(options){
		var settings = $.extend({
			mainImageArea: '.main-image',
			subImageArea:  '.sub-image',
			animateTime:   300,
			easing:        'easeOutCubic',
			trigger:       'click'
		}, options);

		$(this).each(function(){
			$(this).find('.main-image div:first').show().css({'z-index': '1', 'opacity': 1});
			var maxHeight = 0;
			var thisHeight = 0;
			$(this).find('.main-image div img').each(function(){
				thisHeight = $(this).height();
				if (maxHeight < thisHeight) {
					maxHeight = thisHeight;
				}
			});
			$(this).find('.main-image').height(maxHeight);
			
			$('.sub-image div:first').addClass('active');
			$('.sub-image div:last').addClass('last');
		});

		$('.sub-image div').on(settings.trigger, function(){
			var thisIndex = $(this).index();
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
			$('.main-image div').hide().css({'z-index': '-1'}).animate({'opacity': 0}, {'duration': settings.animateTime, 'easing': settings.easing, 'queue': false});
			$('.main-image div').eq(thisIndex).show().css({'z-index': '1'}).animate({'opacity': 1}, {'duration': settings.animateTime, 'easing': settings.easing, 'queue': false});
		});

		return this;
	};
})(jQuery);