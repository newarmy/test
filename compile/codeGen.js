//------------------代码生成-----------------------------

function codeGen(dom, input, data) {
	this.dom = dom;
	this.parse = new parse(input);
	this.tree = this.parse.tree;
	this.data = data;
	
}
cp = codeGen.prototype;

// 模板替换
cp.replace = function () {
	var tree = this.tree;
	var reg = /\{\{([\w-\d]+)\}\}/;
	   for(var k in tree) {
	       if(k === 'parent') {
			continue;
		   }
		   let v = tree[k]; 
		   if(typeof v === 'object') {
				this.replaceChild(v);
		   } else {
				if(v.indexOf('{') > -1) {
					var res = v.match(reg);
					v = v.replace(reg, this.data[res[1]]);
					tree[k] = v;
			    }
		   }
		   
	   }
	   
	   this.tree = tree;
	   console.log(this.tree);
};
cp.replaceChild = function (obj) {
    var reg = /\{\{([\w-\d]+)\}\}/;
	if(obj.length) {
		for(var i = 0 ; i < obj.length; i++) {
			var temp = obj[i];
			for(var k in temp){
				if(k === 'parent') {
				continue;
			   }
			   let v = temp[k]; 
			   if(typeof v === 'object') {
					this.replaceChild(v);
			   } else {
					if(v.indexOf('{') > -1) {
						var res = v.match(reg);
						v = v.replace(reg, this.data[res[1]]);
						temp[k] = v;
					}
			   }
			}
		}
	} else {
		for(var k in obj){
			if(k === 'parent') {
			continue;
		   }
		   let v = obj[k]; 
		   if(typeof v === 'object') {
				this.replaceChild(v);
		   } else {
				if(v.indexOf('{') > -1) {
					var res = v.match(reg);
					v = v.replace(reg, this.data[res[1]]);
					obj[k] = v;
			    }
		   }
		}
	}
};

//生成dom
cp.genCode = function () {

     var root = null;
	 for(var k in this.tree) {
	      switch(k) {
		      case 'tagName':
			      root = document.createElement(this.tree[k]);    
			      break;
			  case 'attr':
				for(var i = 0, len = this.tree[k].length; i < len; i++) {
					var temp = this.tree[k][i];
					for(var n in temp) {
						root.setAttribute(n, temp[n]);
					}
				}
				break;
			  case 'text':
					root.innerHTML = this.tree[k];
					break;
			  case 'children':
			     genChild(root, this.tree[k]);
				break;
		  }
	   }
	   
	   if(this.dom) {
		  this.dom.appendChild(root);
	   }
};

var genChild = function (parent, list) {
    for(var x = 0, len1 = list.length; x < len1; x++) {
	 var child = list[x];
     var dom = null;
	 for(var k in child) {
	      switch(k) {
		      case 'tagName':
			      dom = document.createElement(child[k]);    
			      break;
			  case 'attr':
				for(var i = 0, len = child[k].length; i < len; i++) {
					var temp = child[k][i];
					for(var n in temp) {
						dom.setAttribute(n, temp[n]);
					}
				}
				break;
			  case 'text':
					dom.innerHTML = child[k];
					break;
			  case 'children':
			    genChild(dom, child[k]);
				break;
		  }
	   }
	   parent.appendChild(dom);
	}
};