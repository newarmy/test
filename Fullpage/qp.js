(function($) {
	var _default = {
		container: '.container',
		section: '.page',
		easing: 'ease',
		duration: 1000
	};
	var curIndex = 0;
	var length = 0;
	var pages = null;
	var arr = [];
	var yarr = [];//存储各个页面的位置
	var height = $(window).height();
	var canScroll = true;
	var opts;
	$.fn.pageSwitch = function (opt) {
		opts = $.extend({}, _default, opt||{});
		return this.each(function () {
			pages = $(this).find(opts.section);
			pages.each(function () {
				var t = $(this);
				arr.push(t);
				yarr.push(t.offset().top);
			});
			length = arr.length;
			arr[curIndex].addClass('cur');
			event($(this), pages);
		});
	};
	//判断css3前缀
	function getPrefix () {
		var style = document.createElement('div').style;
		for(var tempStr, arr = 'webkitT,MozT,msT,OT'.split(","), index = 0, len = arr.length; len > index; index++) {
			if(tempStr = arr[index] +"ransform", tempStr in style) {
				return arr[index].substr(0,arr[index].length - 1);
			}
		}
		return !1;
	}
	function todown(that) {
		if(curIndex == length-1) {
			return;
		}
		canScroll = false;
		curIndex++;
		var cur = arr[curIndex];
		pages.removeClass('cur');
		cur.addClass('cur');
		//var y = cur.offset().top;
		var y = yarr[curIndex];
		//console.log("down " + y +";  index = "+ curIndex);
		var prefix = getPrefix() ? '-'+getPrefix().toLowerCase()+'-': '';
		if(!prefix) {
			ieToDown(that, y);
			return;
		}
		var translate = 'translate3d(0, -'+y+'px ,0)';
		that.css({
			'transform': translate,
			'transition': prefix+'transform 1s '+ opts.easing
		});
		that.on('webkitTransitionEnd mozTransitionEnd msTransitionEnd transitionend', function () {
			canScroll = true;
		});
	}
	//不支持css3时执行
	function ieToDown (that, y) {
		that.animate({
			marginTop: -y	
		}, function () {
				canScroll = true;
			});
	}
	//不支持css3时执行
	function ieToup (that, y) {
		that.animate({
			marginTop: -y	
		}, function () {
				canScroll = true;
			});
	}
	function toup(that) {
		if(curIndex == 0) {
			return;
		}
		canScroll = false;
		curIndex--;
		var cur = arr[curIndex];
		pages.removeClass('cur');
		cur.addClass('cur');
		var y = yarr[curIndex];
		//console.log("up " + y + ";  index = "+ curIndex);
		var translate = 'translate3d(0, -'+y+'px, 0)';
		var prefix = getPrefix() ? '-'+getPrefix().toLowerCase()+'-': '';
		if(!prefix) {
			ieToup(that, y);
			return;
		}
		var translate = 'translate3d(0, -'+y+'px ,0)';
		that.css({
			'transform': translate,
			'transition': prefix+'transform 1s '+ opts.easing
		});
		that.on('webkitTransitionEnd mozTransitionEnd msTransitionEnd transitionend', function () {
			canScroll = true;
		});
	}
	function event(that, pages) {
		$(document).on('mousewheel DOMMouseScroll', function (e) {
			e.preventDefault();
			var value = e.originalEvent.wheelDelta || - e.originalEvent.detail;
			//console.log('wheel = '+ value);
			if(canScroll) {
				if(value > 0) {
					toup(that);

				} else {
					todown(that);					
				}
			}
		})
	}
})(jQuery);

$('.container').pageSwitch({section: '.page'});