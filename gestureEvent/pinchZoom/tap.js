function tap(el, callback) {
    let x = 0;
    let y = 0;
    let isTap = false;
    el.addEventListener('touchstart', function (e) {
        let touches = e.touches;
        let len = touches.length;
        if(len === 1) {
            isTap = true;
            x = touches[0].clientX;
            y = touches[0].clientY;
        }
    });
    el.addEventListener('touchend', function (e) {
        if(!isTap) {
            return;
        }
        let cx = e.changedTouches[0].clientX;
        let cy = e.changedTouches[0].clientY;
        if(Math.abs(cx-x) < 20 && Math.abs(cy -y ) < 20) {
           setTimeout(function () {
               callback(e, el);
           }, 301);
        }
    })

}