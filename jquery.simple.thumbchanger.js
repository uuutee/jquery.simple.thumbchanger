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
			trigger:       'click',
			easing:        'linear',
			animateTime:   300,
			fixHeight:     true,
			onload:        true
		}, options);

		var $_this          = $(this),
			$mainImages     = $(this).find(settings.mainImageArea + ' div'),
			$mainImageFirst = $(this).find(settings.mainImageArea + ' div:first'),
			$subImages      = $(this).find(settings.subImageArea + ' div'),
			$subImageFirst  = $(this).find(settings.subImageArea + ' div:first');

		function init(obj){
			obj.each(function(){
				$mainImageFirst.css({'z-index': '1', 'opacity': 1});
				$subImageFirst.addClass('active');
				$(settings.subImageArea + ' div:last').addClass('last');

				// fixHeight
				if (settings.fixHeight) {
					var maxHeight = 0;
					var thisHeight = 0;
					obj.find(settings.mainImageArea + ' div img').each(function(){
						thisHeight = $(this).height();
						if (maxHeight < thisHeight) {
							maxHeight = thisHeight;
						}
					});
					obj.find(settings.mainImageArea).height(maxHeight);
				}
			});
		}

		if (settings.onload) {
			$(window).on('load', function(){
				init($_this);
			});
		} else {
			init($_this);
		}

		$subImages.on(settings.trigger, function(){
			var thisIndex = $(this).index();
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
			$mainImages.hide().css({'z-index': '-1'}).animate({'opacity': 0}, {'duration': settings.animateTime, 'easing': settings.easing, 'queue': false});
			$mainImages.eq(thisIndex).show().css({'z-index': '1'}).animate({'opacity': 1}, {'duration': settings.animateTime, 'easing': settings.easing, 'queue': false});
		});
	};
})(jQuery);