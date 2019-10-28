
import eventObj from './touchEvent'
	/*
	  说明： 用touch事件和transform :"translate3d(0,0,0)"样式实现移动端滑动效果
	  参数：
	   opt.el :焦点图容器dom
	   opt.tagName:子元素标签名
	   opt.swipe：横向还是纵向滑动
	   opt.nav:导航容器dom
	*/
	var Slide = function(opt) {
        this.el = opt.el;
		this.elParent = null;
		this.tagName = opt.tagName || 'li';
		this.chirdren = null;
		this.navis = null;
        this.swipe = opt.swipe || "X";
        this.nav = opt.nav || null;
		this.numNav = null;
		this.callback = opt.callback;
        this.navType = opt.navType || 'normal';// normal表示普通的导航，num，表示数字导航
        this.prevBtn = opt.prevBtn || null;
        this.nextBtn = opt.nextBtn || null;
		this.urllist = opt.urllist || null; //add shop btnlist
		this.urlbtn = opt.urlbtn || null;  //add shop btn
		this.autoflag=opt.auto||null;
		this.isNoFullScreen = opt.isNoFullScreen || null;// 是否为全屏滑动， 默认全屏
        this.flag = undefined;
        this.currentIndex = 0;//索引
        this.chirdW = 0;
		this.chirdH = 0;
		this.elWidth = 0;//积累el的总宽度
		this.elHeight = 0;//积累el的总高度
        this.parentWidth = 0;//el.parentNode的宽度
		this.interval = opt.interval || 400;
        this.pageX = 0;
        this.pageY = 0;
        this.fangxiang = "";// 向哪个方向滑动
		this.left = 0;//this.swipe = 'X'
		this.top = 0;//this.swipe = 'Y'
		this.count = 0;//子元素的个数
		this.pcMoveFlag = true;
		this.isInertia = false;//是否有惯性
		this.inertiaLength = 300;
        this.init();
    };
	Slide.prototype = {
        init: function(index) {
			var k = this;
			k.elParent = k.el.parentNode;
            k.chirdren = k.el.getElementsByTagName(k.tagName);
			k.chirdren = Array.prototype.slice.call(k.chirdren, 0);
			k.count = k.chirdren.length;
			if(k.isNoFullScreen){
		      k.resizeLayoutNoScreen();
		   }else{
			   k.resizeLayout();
                if(k.nav) {
                    if(k.navType === 'normal') {
                        k.createNav();
                    } else if(k.navType === 'num') {
                        k.createNumNav();
                    }

                }
			}
            this.events();
			if(k.autoflag){
				k.automove();
			}
			if(k.urllist){this.changeUrl();} //xly
			//this.automove();
        },
		resizeLayout: function () {
			var k = this;
            k.parentWidth = k.elParent.offsetWidth;
			if(k.swipe == 'X') {
				k.chirdW = k.getW(k.elParent); //window.innerWidth;//
				//console.log('k.chirdW ='+k.chirdW);
				for (var i = 0; i < k.count; i++) {
					k.chirdren[i].style.width = k.chirdW + "px";
					k.elWidth += k.chirdW;
				}
				k.el.style.width = k.elWidth + "px";
			} else if(k.swipe == 'Y') {
				k.chirdH = k.getH(k.elParent);
				for (var i = 0; i < k.count; i++) {
					k.chirdren[i].style.height = k.chirdH + "px";
					k.elHeight += k.chirdH;
				}
				k.el.style.height = k.elHeight + "px";
			}
		},
		resizeLayoutNoScreen: function () {
			var k = this;
            k.parentWidth = k.elParent.offsetWidth;
			if(k.swipe == 'X') {
				k.elWidth = 0;
				k.chirdren.forEach(function(ele, idx) {
					var extW = k.getStyleValue(ele, 'padding-left') +k.getStyleValue(ele, 'padding-right') +k.getStyleValue(ele, 'margin-left') +k.getStyleValue(ele, 'margin-right');
					k.elWidth += (k.getW(ele) + extW);
				});
				k.el.style.width = k.elWidth + "px";
			} else if(k.swipe == 'Y') {
				k.elHeight= 0;
				k.chirdren.forEach(function(ele, idx) {
					k.elHeight += k.getH(ele);
				});
				k.el.style.height = k.elHeight + "px";
			}
			
		},
		createNumNav: function () {
			var k = this;

			k.numNav = k.nav.querySelector('.cur');
			k.nav.querySelector('.total').innerHTML = k.count;
			k.numNav.innerHTML = 1;
		},
		createNav: function () {
			var k = this;
			var span = null;
			k.nav.innerHTML = '';
			for(var i = 0; i < k.count; i++) {
				span = document.createElement('span');
				if(i == 0) {
					span.className = "box-size on";
					k.nav.appendChild(span);
				} else {
					span.className = "box-size";
					k.nav.appendChild(span);
				}
			}
			k.navis = k.nav.getElementsByTagName('span');
			k.navis = Array.prototype.slice.call(k.navis, 0);
		},
        getW: function(e) {
            return Number(window.getComputedStyle(e, "").width.replace("px", ""));
        },
		getH: function(e) {
            return Number(window.getComputedStyle(e, "").height.replace("px", ""));
        },
        getStyleValue: function (e, name) {
        	return Number(window.getComputedStyle(e, "")[name].replace("px", ""));
        },
        automove: function() {//自动滑动到下一个item
            var k = this;
            k.flag =  setInterval(function() {
                k.next.call(k);
            }, 4e3);
        },
		clear: function() {
			clearInterval(this.flag);
            this.flag = null;
		},
        events: function() {
            var k = this;
			k.el.addEventListener(eventObj.touchStart, function(e) {
				//e.preventDefault();
				k.touchstart.call(k, e);
			},false);
			k.el.addEventListener(eventObj.touchMove, function(e) {
				//e.preventDefault();
				k.touchmove.call(k, e);
			},false);
			k.el.addEventListener(eventObj.touchEnd, function(e) {
				//e.preventDefault();
				k.touchend.call(k, e);
			},false);
			k.el.addEventListener(eventObj.touchCancel, function(e) {
				//e.preventDefault();
				k.touchcancel.call(k, e);
			},false);
			if(k.prevBtn) {
				k.prevBtn.addEventListener(eventObj.touchEnd, function(e) {
					k.prev();
				},false);
			}
			if(k.nextBtn) {
				k.nextBtn.addEventListener(eventObj.touchEnd, function(e) {
					k.next();
				},false);
			}
        },
        touchstart: function(e) {
			var k = this;
            var t = eventObj.getPoint(e);
            k.clear();
            k.move = 0;
            k.pageX = t.x;
            k.pageY = t.y;
			k.fangxiang = '';
			k.pcMoveFlag = false;
            if (window.PointerEvent || window.MSPointerEvent) {
                var sleft = k.el.style.msTransform || k.el.style.transform;
                k.left = k.getInitPosition(sleft, "x");
				k.top = k.getInitPosition(sleft, "y");
            } else {
                k.left = k.getInitPosition(k.el.style.webkitTransform, "x");
				k.top = k.getInitPosition(k.el.style.webkitTransform, "y");
            }
		},
        touchmove: function(e) {
		   var k = this;
		   if(k.pcMoveFlag) {
			   return;
		   }
           var t = eventObj.getChangedPoint(e);
           var px = t.x;
           var py = t.y;
           var lenX = px - k.pageX;
           var lenY = py - k.pageY;
		   if(k.swipe == 'X') {
			   if(Math.abs(lenY) > Math.abs(lenX)) {
				  return;
			   }
               e.preventDefault();
			   k.move = lenX;
               k.isInertia = false;
			   //if(Math.abs(lenX) <= 80) {//小于80，就会有惯性滑动
                   k.isInertia = true;
			   //}
			   if(lenX > 5 ) {
				 k.fangxiang = "left";
			   } else if (lenX < -5) {
				 k.fangxiang = 'right';
			   }
			   k.setX(k.el, k.left+lenX, 0);
		   } else if(k.swipe == 'Y') {
			   if(Math.abs(lenY) < Math.abs(lenX)) {
				  return;
			   }
               e.preventDefault();
			   k.move = lenY;
               k.isInertia = false;
              // if(Math.abs(lenY) >= 30) {
                   k.isInertia = true;
               //}
			   if(lenY > 5 ) {//top
				 k.fangxiang = "top";
			   } else if (lenY < -5) {//bottom
				 k.fangxiang = 'bottom';
			   }
			   k.setY(k.el, k.top+lenY, 0);
		   }
        },
        touchend: function(e) {
		   var k = this;
		   k.pcMoveFlag = true;
		  if(k.isNoFullScreen){ 
		    	k.setNewPositionNoScreen();
		   }else{
			   k.setNewPosition(); 
			}
        },
        touchcancel: function(e) {
           var k = this;
		    k.pcMoveFlag = true;
		    if(k.isNoFullScreen){ 
		    	k.setNewPositionNoScreen(e);
		    }else{
			   k.setNewPosition(); 
			}
        },
		setNewPosition: function () {
		    var k = this;
			if(k.swipe == 'X') {
			   if(k.fangxiang == 'left') {
					if(k.currentIndex == 0) {
						k.setX(k.el, 0, k.interval);
					} else {
						k.prev();
					}
				} else if(k.fangxiang == "right") {
					  if(k.currentIndex == k.count -1) {
						k.setX(k.el, -(k.chirdW*(k.count-1)), k.interval);
					  } else {
						k.next();
					  }
				} else {
					this.setX(this.el, this.left, 0);
				}
		    } else if(k.swipe == 'Y') {
			   if(k.fangxiang == 'top') {
					if(k.currentIndex == 0) {
						k.setY(k.el, 0, k.interval);
					} else {
						k.prev();
					}
				} else if(k.fangxiang == "bottom") {
					  if(k.currentIndex == k.count -1) {
						k.setY(k.el, -(k.chirdH*(k.count-1)), k.interval);
					  } else {
						k.next();
					  }
				} else {
					this.setY(this.el, this.top, 0);
				}
		    }
            k.callback && k.callback(k.currentIndex);
			k.automove();
		},
		setNewPositionNoScreen: function (e) { //isNoFullScreen
			
		    var k = this, smallest;
			if (window.PointerEvent || window.MSPointerEvent) {
                var sleft = k.el.style.msTransform || k.el.style.transform;
                k.left = k.getInitPosition(sleft, "x");
				k.top = k.getInitPosition(sleft, "y");
            } else {
                k.left = k.getInitPosition(k.el.style.webkitTransform, "x");
				k.top = k.getInitPosition(k.el.style.webkitTransform, "y");
            }
			if(k.swipe == 'X') {
			   if(k.fangxiang == 'left') {

					if( k.left >=0) {
						k.setX(k.el, 0, k.interval);
					} else {
						if(k.isInertia) {
                            k.left += k.inertiaLength;
                            if(k.left >=0) {
                                k.setX(k.el, 0, k.interval);
                            } else {
                                k.setX(k.el, k.left, k.interval);
                            }
						}

					}
				} else if(k.fangxiang == "right") {
                   smallest   = -(k.elWidth- k.parentWidth);
				   if( k.left <= smallest) {
						k.setX(k.el, smallest, k.interval);
				   } else {
                       if(k.isInertia) {
                           k.left -= k.inertiaLength;
                           if (k.left <= smallest) {
                               k.setX(k.el, smallest, k.interval);
                           } else {
                               k.setX(k.el, k.left, k.interval);
                           }
                       }
				   }
				} else {
					this.setX(this.el, this.left, 0);
				}
		    } else if(k.swipe == 'Y') {
			   if(k.fangxiang == 'top') {
					
					if( k.top >=0) {
						k.setY(k.el, 0, k.interval);
					}
				} else if(k.fangxiang == "bottom") {
					  if( k.left<=-(k.elHeight-window.innerHeight)) {
						k.setY(k.el, -(k.elHeight-window.innerHeight), k.interval);
					}
					
				} else {
					this.setY(this.el, this.top, 0);
				}
		    }
            k.callback && k.callback(k.currentIndex);
		},
        setX: function(el, len, time) {
			el.style.webkitTransitionDuration = time + "ms";
			el.style.msTransitionDuration = time + "ms";
			el.style.transitionDuration = time + "ms";
            el.style.webkitTransform = "translate3d(" + len +"px,0,0)";
			el.style.msTransform = "translate3d(" + len +"px,0,0)";
			el.style.transform = "translate3d(" + len +"px,0,0)";
        },
        setY: function(el, len, time) {
			el.style.webkitTransitionDuration = time + "ms";
			el.style.msTransitionDuration = time + "ms";
			el.style.transitionDuration = time + "ms";
            el.style.webkitTransform = "translate3d(0," + len +"px,0)";
			el.style.msTransform = "translate3d(0," + len +"px,0)";
			el.style.transform = "translate3d(0," + len +"px,0)";
        },
        next: function() {
            this.go(this.currentIndex + 1);
        },
        prev: function() {
            this.go(this.currentIndex - 1);
        },
        go: function(idx) {
        	var k = this;
            var len = 0;//肯定是负值， 最大值为 0，最小值为 -((this.count - 1) * this.chirdW)
            if (idx === this.currentIndex) {
                return;
            }
            if (idx >= this.count) {
                idx = 0;
            }
            if (idx < 0) {
                idx = this.count - 1;
            }
            this.currentIndex = idx;
			if(this.swipe == 'X') {
				len = -(idx * this.chirdW);
				this.setX(this.el, len, this.interval);
			} else if(this.swipe == 'Y') {
				len = -(idx * this.chirdH);
				this.setY(this.el, len, this.interval);
			}
			if(this.nav) {
               if( this.navType === 'normal') {
                   this.changeNavi();  //2017.3.6 xly
				} else {
                   if(this.numNav) {
                       this.numNav.innerHTML = (this.currentIndex+1);
                   }
			   }

			}
            k.callback && k.callback(k.currentIndex);
			if(this.urllist){this.changeUrl();} //add xly
        },
		changeNavi: function () {
			var k = this;
			k.navis.forEach(function(e) {
				e.className = 'box-size';
			});
			k.navis[k.currentIndex].className = 'box-size on';
		},
		changeUrl: function () {  //add xly
			var k = this;
			k.urlbtn.attr("href",k.urllist[k.currentIndex]);
		},
        getInitPosition: function(c, f) {
			//console.log('--------------'+c+'---------------');
            var a = 0, d = /([0-9-\.]+)+(?![3d]\()/gi, e = c.toString().match(d);
            if (!e) {
                return a;
            }
			//console.log(e);
            if (e.length) {
                var b = f == "x" ? 0 : f == "y" ? 1 : 2;
                a = parseFloat(e[b]);
            }
            return a;
        }
    };

export default Slide;
