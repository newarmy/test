/*
 input： '<div class="cls" id="dd" :click="handler" ><span>ddd</span> <div> ddd{{name}}</div></div>'

 output: {
     tagName: 'div',
     events: {
         click: handler
     },
     attrs: {
         class: 'cls',
         id: 'dd'
     }
     var: {
         name: name
     }
     text: 'ddd',
     children: []
 }


*/
let tagBeginStartReg =/^<([a-zA-Z]+[1-6]?)/;
let tagBeginEndReg = /^>/;
let attrReg = /^([a-zA-Z]+[1-6]?)="([a-zA-Z]+[1-6]?)"/;
let eventReg = /^:([a-zA-Z]+[1-6]?)="([a-zA-Z]+[1-6]?)"/;
let tagTailReg =/^<\/[a-zA-Z]+[1-6]?>/;
let textReg = /^[^<>]+/;
let varReg = /\{\{([a-zA-Z]+)\}\}/g;
let state; //tagSStart attr event tagSEnd tagEEnd 
let stack = [];
function parse(str) {
  str = str.trimStart();
  let element = {};
  let res = null;
  while(str) {
    if(res = str.match(tagBeginStartReg)) {
        state = 'tagSStart';
        
        element = {};
        
        str = handlerTagSStart(res, element, str);
        continue;
    }
    if(res = str.match(attrReg)) {
        state = 'tagAttr';
        str = handlerAttr(res, element, str);
        continue;
    }
    if(res = str.match(eventReg)) {
        state = 'tagEvent';
        str = handlerEvent(res, element, str);
        continue;
    }
    if(res = str.match(tagBeginEndReg)) {
        state = 'tagSEnd';
        str = handlerTagSEnd(res, element, str);
        continue;
    }
    if(res = str.match(tagTailReg)) {
        let result = stack.pop();
      //  console.log(result);
        state = 'tagEnd';
        str = handlerTagEnd(res, str);
        if(!str) {
            element = result;
        }
        continue;
        //parse end
    }
    if(res = str.match(textReg)) {
        state = 'text';
        str = handlerText(res, element, str);
        continue;
    }
    
  }
  return element;

}

function handlerTagSStart(res, element, str) {
    let parent = stack.pop();
        if(parent) {
            parent.children.push(element);
            stack.push(parent);
        }
    element.tagName = res[1];
    let len = res[0].length;
    str = str.substring(len);
    str = str.trimStart();
    return str;
}
function handlerTagSEnd(res, element, str) {
    stack.push(element);
    element.children = [];
    let len = res[0].length;
    str = str.substring(len);
    str = str.trimStart();
    return str;
}
function handlerTagEnd(res, str) {
    
    let len = res[0].length;
    str = str.substring(len);
    str = str.trimStart();
    return str;
}
function handlerAttr(res, element, str) {
    if(!element.attrs) {
        element.attrs ={};
    }
    let len = res[0].length;
    element.attrs[res[1]] = res[2];
    str = str.substring(len);
    str = str.trimStart();
    return str;
    
}
function handlerEvent(res, element, str) {
    if(!element.events) {
        element.events ={};
    }
    let len = res[0].length;
    element.events[res[1]] = res[2];
    str = str.substring(len);
    str = str.trimStart();
    return str;
    
}
function handlerText(res, element, str) {
    element.text = res[0];
    let len = res[0].length;
    str = str.substring(len);
    str = str.trimStart();
    return str;
}

let vm = {
    data: {
        name: 'xinjun',
        corp: 'sohu'
    },
    methods: {
        handler: function(e) {
            alert('click');
        }
    }
}

/**
 * {
     tagName: 'div',
     events: {
         click: handler
     },
     attrs: {
         class: 'cls',
         id: 'dd'
     }
     var: {
         name: name
     }
     text: 'ddd',
     children: [
         {
             tagName: 'span',
             text: 'ddd'
         }
     ]
 }
 * 
 * 
*/
function g(tag) {
    return document.createElement(tag);
}
function a(dom, k, v) {
    dom.setAttribute(k, v);
}
function setE(dom, k, v) {
    dom.addEventListener(k, v);
}
function html(dom, text) {
    dom.innerHTML = text;
}
function setC(p, c) {
    p.appendChild(c);
}
function generate(vm, vDom) {
    let element ;
    for(let item in vDom) {
        if(item === 'tagName') {
            element = g(vDom[item]);
            continue;
        }
        
        if(item === 'attrs' ) {
            for( let k in vDom[item]) {
                a(element, k,  vDom[item][k]);
            }
            continue;
        }
        if(item === 'events' ) {
            for(let e in vDom[item]) {
                setE(element, e, vm.methods[vDom[item][e]].bind(vm));
            }
            continue;
        }
        if(item === 'text' ) {
            if(vDom.text) {
                vDom.text = vDom.text.replace(varReg, function(m, p1, c, d) {
                    console.log(m, p1, c, d);
                     return vm.data[p1];
                });
                html(element, vDom.text);
            }
            continue;
        }
        if(item === 'children' ) {
            if(vDom.children.length > 0) {
                generateChild(vm, vDom.children, element);
            }
        }
    }
    return element;
}

function generateChild(vm, children, parent) {
   for(let i = 0, len = children.length; i < len; i++) {
       let vDom = children[i];
       let e = generate(vm, vDom);
       setC(parent, e);
   }
}


let dom = parse('<div class="cls" id="dd" :click="handler" ><span>ddd</span> <div> ddd{{name}}-{{corp}}</div></div>');
let resEle = generate(vm, dom);
console.log(resEle);
document.querySelector('body').appendChild(resEle);