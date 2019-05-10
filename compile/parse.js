// 语法分析
 function parse(input) {
    this.input = input;
	this.tokenObj = new TokenClass(input);
	this.arr = [];
	this.index = 0;
	this.len = 0;
	this.tree = null;
	this.attr = [];
	this.tag = {};
	this.tags = [];
	this.lastToken = null;
	this.parseToken();
	this.parseRoot();
 }
 pp = parse.prototype;
 
 // 去词法分析
 pp.parseToken = function() {
	while(this.tokenObj.index < this.input.length) {
		this.arr.push(this.tokenObj.peekToken());
	}
	console.log('-----------------------------------');
	console.log(this.arr);
 };
 // 去语法分析
 pp.parseRoot = function () {
	this.len = this.arr.length;
	while(this.index < this.len) {
		this.startParse(this.arr[this.index]);
		this.index ++;
	}
	console.log('-----------------------------------');
	console.log(this.tag);
 };
 pp.startParse = function (obj) {
	switch(obj.type) {
		case 1:
		    this.parseTagName(obj.label);
			this.lastToken = 1;
			break;
		case 3:
			this.parseAttr(obj.label);
			this.lastToken = 3;
			break;
		case 2:
		    this.parseTagOpenEnd();
			 this.lastToken = 2;
			 break;
		case 8:
		    this.parseTagClose();
			 this.lastToken = 8;
			 break;
		case 10:
		    this.parseText(obj.label);
			this.lastToken = 8;
			break;
	}
 };
 // 解析tagName
 pp.parseTagName = function (label) {
	this.tag = Object.create(null);
    if(this.lastToken && this.lastToken === 2) {
	    this.tag.relative = 'child'; // 与前一个节点对象的关系
	} else if(this.lastToken && this.lastToken === 8) {
		this.tag.relative = 'sibling';// 与前一个节点对象的关系
	} else {
		this.tag.relative = 'null'; // 跟节点
		this.tree = this.tag;
	}
	this.tag.tagName = label;
 };
  // 解析属性
 pp.parseAttr = function (label) {
	var obj = {};
	this.index++;
	this.index++;
	var v = this.arr[this.index].label;
	obj[label] = v;
	this.attr.push(obj);
 };
   // 解析TagOpenEnd
 pp.parseTagOpenEnd = function () {
	this.tag.attr = this.attr;
	this.attr = [];
	switch(this.tag.relative) {
		case 'child':
			var parent = this.tags[this.tags.length-1];
			if(parent.children) {
				parent.children.push(this.tag);
			} else{
				parent.children = [this.tag];
			}
			this.tag.parent = parent;
			delete this.tag.relative;
			break;
		case 'sibling':
			var lastTag = this.tags[this.tags.length-1];
			if(lastTag.parent.children) {
				lastTag.parent.children.push(this.tag);
			} else{
				lastTag.parent.children = [this.tag];
			}
			delete this.tag.relative;
			this.tag.parent = lastTag.parent;
			break;
		case 'null':
			this.tree = this.tag;
			delete this.tag.relative;
			break;
	}
	this.tags.push(this.tag);
 };
 pp.parseTagClose = function () {
	
 };
  // 解析文本
 pp.parseText = function(label) {
    this.tag.text = label;
 };
