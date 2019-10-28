var gets = function (parent, tag) {
	return parent.querySelectorAll(tag);
};
var toArray = function (arr) {
	var temp = [].slice.call(arr, 0);
	return temp;
};

var getTop = function (dom) {
	var top = dom.offsetTop;
    var p = dom.offsetParent;
	while(p) {
        top += p.offsetTop;
        p = p.offsetParent;
	}
	return top;
}
/**
 * 参数:
 * opt.parent {dom} 图片元素的父级dom
 *
 * 怎么用?
 *
 * var LazyObj = new Lazy({
 *    parent : dom
 * })
 * //初始执行显示屏幕内的图片
 * LazyObj.loadImgs();
 * */
export default function Lazy(opt) {
	this.parent = opt.parent;
	this.imgs = null;
	this.init();
}
Lazy.prototype = {
	init: function () {
		var k = this;
		k.getImgs();
		k.lazyEvent();

	},
	reset: function() {
		var k = this;
		k.getImgs();
	},
	getImgs: function() {
		var k = this;
		var arr = [];
		var imgs = gets(k.parent, 'img');
        imgs = toArray(imgs);
        imgs.forEach(function (e, i) {
        	var attr = e.getAttribute('data-src');
        	if(attr) {
                arr.push(e);
			}
		});
		k.imgs = arr;
	},
	lazyEvent: function (){
		var k = this;
		window.addEventListener('scroll', function () {
            k.loadImgs.call(k);
		})


	},
	loadImgs: function() {
		var k = this;
		var len = k.imgs.length;
		if(len === 0){
			return ;
		}
		var win = window;
		var wh = win.innerHeight;
		var stop = win.pageYOffset;
		var curH = stop + wh;
		
		var cur , pos;
		
		for(var i = 0; i < len; i++) {
			cur = k.imgs[i];
			pos = getTop(cur);
			if(pos <= curH) {
				cur.src = cur.getAttribute('data-src');
				cur.removeAttribute('data-src');
			}
		}
		k.getImgs();
	}
};

