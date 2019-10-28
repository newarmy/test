  //touch事件相关
	var isPointer = navigator.msPointerEnabled;
	var start = "ontouchstart" in window ? "touchstart" : (isPointer ? "MSPointerDown" : "mousedown");
	var move = "ontouchmove" in window ? "touchmove" : (isPointer ? "MSPointerMove" : "mousemove");
	var end = "ontouchend" in window ? "touchend" : (isPointer ? "MSPointerUp" : "mouseup");
	var cancel = "ontouchcancel" in window ? "touchcancel" : "MSPointerCancel";
	/*if(window.PointerEvent) {
		start = "pointerdown";
		move = "pointermove";
		end = "pointerup";
		cancel = "pointercancel";
	} else if (window.MSPointerEvent) {
		start = "MSPointerDown";
		move = "MSPointerMove";
		end = "MSPointerUp";
	} */
	function getPoint (e) {
		if(e.type === 'touchstart' ) {
			e.x = e.touches[0].clientX;
			e.y = e.touches[0].clientY;
		} else {
			e.x = e.clientX;
			e.y = e.clientY;
		}
		return e;
	}
  function getChangedPoint (e) {
      if(e.type === 'touchmove' || e.type === 'touchend'|| e.type === 'touchcancel') {
          e.x = e.changedTouches[0].clientX;
          e.y = e.changedTouches[0].clientY;
      } else {
          e.x = e.clientX;
          e.y = e.clientY;
      }
      return e;
  }
	export default  {
		touchStart: start,
		touchMove : move,
		touchEnd : end,
		touchCancel : cancel,
		getPoint : getPoint,
        getChangedPoint: getChangedPoint
	};
