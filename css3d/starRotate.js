function _gs(selector) {
    let nodes = document.querySelectorAll(selector);
    let array = [];
    for(let i = 0, len = nodes.length; i < len; i++) {
        array.push(nodes.item(i));
    }
    return array;
}
function _g(selector) {
    return document.querySelector(selector);
}

// 模拟近大远小的数据
let scales = [
    {
        start: 0.8,
        end: 1.0
    },
    {
        start: 0.6,
        end: 0.8
    },
    {
        start: 0.6,
        end: 0.6
    },
    {
        start: 0.8,
        end: 0.6,
    },
    {
        start: 1,
        end: 0.8
    },
    
];

let queue = [
    6, 7, 8, 9, 10
];

function StarRotate(opt) {
   this.bolls = opt.bolls; // 球dom数组
   this.bollParent = opt.bollParent;
   this.bollWidth = opt.bollWidth;
   this.bollHeight = opt.bollHeight;
   this.radiusW = opt.bollParentWidth/2; //外接圆半径
   this.radiusH = opt.bollParentHeight/2; //外接圆半径
   this.leftBtn = _g('.left');
   this.rightBtn = _g('.right');
   this.btnBoxDom = _g('.btn-box')
   this.angle36 = 36*Math.PI/180;
   this.angle72 = 72*Math.PI/180;
   this.currentPosition = 0; //当前显示在最前面的元素索引
   this.direction = 'right'; //转动的方向
   this.isRunning = false; //是否正在运动
   this.timerLimit = 72; //每次运动的Timer次数限制 
   this.count = 0;//计数器
   this.baseAngle = 1; 
   this.sortArr = [];// 每旋转72度后的bolls排序
   this.scaleNumPerRotate = 0.2/72;//每旋转1度 scale的增量值 
   this.initAngle = 36; //初始角度
   this.stopAutoRotate = false; //停止自动旋转
   this.init();
}
StarRotate.prototype = {
    constructor: StarRotate,
    init() {
        this.renderBollsPosition();
        this.eventFunc();
        this.autoRotate();
    },
    renderBollsPosition() {
        let k = this;
        let sin = k.radiusW*Math.sin(k.angle36);
        let cos = k.radiusH*Math.cos(k.angle36);
        let sin2 = k.radiusW*Math.sin(k.angle72);
        let cos2 = k.radiusH*Math.cos(k.angle72);

        let len = k.bolls.length;
        let r = k.radiusW;
        let rH = k.radiusH;
        let halfW = k.bollWidth/2;
        let halfH = k.bollHeight/2;
        for (let i = 0; i < len; i++) {
            let item = k.bolls[i];
            switch(i) {
                case 0:
                    item.style.left = (r + sin -halfW)+'px';
                    item.style.top = (rH + cos - halfH)+'px';
                    break;
                    case 1:
                    item.style.left = (r + sin2 -halfW)+'px';
                    item.style.top = (rH - cos2 - halfH)+'px';
                    break;
                    case 2:
                    item.style.left = (r - halfW)+'px';
                    item.style.top = ( - halfH)+'px';
                    break;
                
                    case 3:
                    item.style.left = (r - sin2 -halfW)+'px';
                    item.style.top = (rH - cos2 - halfH)+'px';
                    break;
                    case 4:
                    item.style.left = (r - sin -halfW)+'px';
                    item.style.top = (rH + cos - halfH)+'px';
                    break;
          }
        }
    },
    //从队列中更新内容
    updateNewItems() {
       let k = this;
       let num = k.sortArr[2].dom.innerHTML;
       k.sortArr[2].dom.innerHTML = queue.shift();
       queue.push(Number(num));
    },
    //每次旋转72后，根据currentPosition排序bolls，计算显示近大远小效果
    sortBollsPerRotate72(dir) {
        let k = this;
        let pos = 0;
        k.sortArr = [];
		if (dir === 'right') {
            k.currentPosition -= 1;
			if(k.currentPosition < 0) {
				k.currentPosition = 4;
			}
			pos = k.currentPosition;
			for(let i = 0; i < 5; i++) {
				if(pos < 0) {
					pos = 4;
				}
				k.sortArr.push({
					dom: k.bolls[pos],
                    animate: scales[i]
				});
				pos--;
				
			}
		} else if(dir === 'left'){

			k.currentPosition += 1;
			if(k.currentPosition >= 5) {
				k.currentPosition = 0;
			}
			pos = k.currentPosition;
			for(let i = 0; i < 5; i++) {
				if(pos > 4) {
					pos = 0;
				}
				k.sortArr.push({
					dom: k.bolls[pos],
                    animate: scales[i]
				});
				pos++;
			}
		}
    },
    eventFunc() {
        let k = this;
        k.leftBtn.addEventListener('click', function(e) {
            if(k.isRunning) {
                return;
            }
           k.direction = 'left';
           k.sortBollsPerRotate72(k.direction);
           k.isRunning = true;
           requestAnimationFrame(k.eventRotateFunc.bind(k));
           
        });
        k.rightBtn.addEventListener('click', function (e) {
            if(k.isRunning) {
                return;
            }
            k.direction = 'right';
            k.sortBollsPerRotate72(k.direction);
            k.isRunning = true;
            requestAnimationFrame(k.eventRotateFunc.bind(k));
        });
        let startAutoRotateTimer = null;
        k.btnBoxDom.addEventListener('mouseenter', function (e) {
            k.stopAutoRotate = true;
        })
        k.btnBoxDom.addEventListener('mouseleave', function (e) {
            clearTimeout(startAutoRotateTimer);
            startAutoRotateTimer = null;
            if(k.isRunning) {
                startAutoRotateTimer = setTimeout(function () {
                    console.log(k.isRunning);
                    if(!k.isRunning) {
                        k.stopAutoRotate = false;	
                        k.autoRotate();
                    }
                }, 1500);
                return;
            }
            k.stopAutoRotate = false;	
            k.autoRotate();
            
        })
    },
    //事件响应旋转
    eventRotateFunc() {
		let k = this;
        k.bollParent.style.transform = 'rotateY(6deg) rotateZ('+(k.initAngle+k.baseAngle)+'deg)';
        let sortArr = k.sortArr;
        let copyCount = k.count;
        let scale = k.scaleNumPerRotate*copyCount;
        sortArr[0].dom.style.transform = 'rotateX(-90deg)  rotateY('+(k.initAngle+k.baseAngle)+'deg) rotateZ(13deg) scale('+(sortArr[0].animate.start+scale)+')';
        sortArr[1].dom.style.transform = 'rotateX(-90deg)  rotateY('+(k.initAngle+k.baseAngle)+'deg) rotateZ(13deg)  scale('+(sortArr[1].animate.start+scale)+')';
        sortArr[2].dom.style.transform = 'rotateX(-90deg)  rotateY('+(k.initAngle+k.baseAngle)+'deg) rotateZ(13deg)  scale('+(sortArr[2].animate.start)+')';
        sortArr[3].dom.style.transform = 'rotateX(-90deg)  rotateY('+(k.initAngle+k.baseAngle)+'deg) rotateZ(13deg)  scale('+(sortArr[3].animate.start-scale)+')';
        sortArr[4].dom.style.transform = 'rotateX(-90deg)  rotateY('+(k.initAngle+k.baseAngle)+'deg) rotateZ(13deg)   scale('+(sortArr[4].animate.start-scale)+')';
        if(k.direction === 'left') {
            k.baseAngle += 1;
            k.count += 1;
            if(k.baseAngle >= 360) {
                k.baseAngle = 0;
            }
            if(k.count === k.timerLimit) {
                k.count = 0;
                k.isRunning = false;
                k.updateNewItems();
                return;
            }
            
        } else if(k.direction === 'right') {
            k.baseAngle-=1;
            k.count += 1;
            if(k.baseAngle <= -360) {
                k.baseAngle = 0;
            }
            if(k.count === k.timerLimit) {
                //baseAngle++;
                k.count = 0;
                k.isRunning = false;
                k.updateNewItems();
                return;
            }
        }
        requestAnimationFrame(k.eventRotateFunc.bind(k));
    },
    //自动旋转函数
    autoRotateFunc() {
        let k = this;    
    
        k.bollParent.style.transform = ' rotateZ('+(k.initAngle+k.baseAngle)+'deg)';
        let sortArr = k.sortArr;
        let copyCount = k.count;
        let scale = k.scaleNumPerRotate*copyCount;
        sortArr[0].dom.style.transform = 'rotateX(-90deg)  rotateY('+(k.initAngle+k.baseAngle)+'deg) rotateZ(13deg) scale('+(sortArr[0].animate.start+scale)+')';
        sortArr[1].dom.style.transform = 'rotateX(-90deg)  rotateY('+(k.initAngle+k.baseAngle)+'deg) rotateZ(13deg)  scale('+(sortArr[1].animate.start+scale)+')';
        sortArr[2].dom.style.transform = 'rotateX(-90deg)  rotateY('+(k.initAngle+k.baseAngle)+'deg) rotateZ(13deg) scale('+(sortArr[2].animate.start)+')';
        sortArr[3].dom.style.transform = 'rotateX(-90deg)  rotateY('+(k.initAngle+k.baseAngle)+'deg) rotateZ(13deg)  scale('+(sortArr[3].animate.start-scale)+')';
        sortArr[4].dom.style.transform = 'rotateX(-90deg)  rotateY('+(k.initAngle+k.baseAngle)+'deg) rotateZ(13deg)  scale('+(sortArr[4].animate.start-scale)+')';

        k.baseAngle -= 1;
        k.count += 1;
        if(k.baseAngle <= -360) {
            k.baseAngle = 0;
        }
        if(k.count === k.timerLimit) {
            k.count = 0;
            k.updateNewItems();
            if(k.stopAutoRotate) {
                k.isRunning = false;
                return;
            }
            //console.log('k.currentposition = ', k.currentPosition);
            k.sortBollsPerRotate72('right');
            
        }
        requestAnimationFrame(k.autoRotateFunc.bind(k));
    },
    autoRotate() {
        let k = this;
		if(k.isRunning) {
			return;
		}
        k.isRunning = true;
        k.direction = 'right';
		k.sortBollsPerRotate72('right');
	    requestAnimationFrame(k.autoRotateFunc.bind(k));
	}
}




new StarRotate({
    bolls: _gs('.boll'),
    bollParent: _g('.circle'),
    bollWidth: 60,
    bollHeight: 60,
    bollParentWidth: 400,
    bollParentHeight: 400
})