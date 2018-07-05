var tokenTypes = {
	tagOpenStart: 1,
	tagOpenEnd: 2,
	attrName: 3,
	attrEqual: 4,
	attrValue: 5,
	eventName: 6,
	eventValue: 7,
	tagClose:8,
	text: 10,
	eof: 11
 };
 
 
 // 词法分析
 var TokenClass = function (input) {
	this.input = input;
	this.index = 0;
	this.eof = false;
	this.content = null;
 }
 var tp = TokenClass.prototype;
 tp.char = function() {
    return this.input[this.index];
 };
 tp.setContext = function (type) {
	this.context = type;
 };
 tp.inContext = function (type) {
	return this.context === type;
 };
 tp.eatSpaces = function () {
	while(/\s/.test(this.char())) {
		this.index ++;
	}
 };
 
 tp.nextToken = function () {
	this.eatSpaces();
	return (
		this.readTagOpenStart() ||
		this.readTagOpenEnd() ||
		this.readAttrName() ||
		this.readAttrEqual() ||
		this.readAttrValue() ||
		//this.readEventName() ||
		//this.readEventValue() ||
		this.readTagClose() ||
		this.readText() ||
		this.readEOF() ||
		this.error()
	);
 };
 

 
 
 tp.peekToken = function () {
	var index = this.index;
	var token = this.nextToken();
	//this.index = index;
	return token;
 };
 
 tp.readTagOpenStart = function () {
	if(this.char() === '<') {
	   this.index++;
	   if(this.char() === '/') {
	      this.index --;
		  return ;
	   }
	   this.eatSpaces();
	   var start = this.index;
	   var tagReg = /[\w\d]/;
	   while(this.char().match(tagReg)) {
		 this.index++;
	   }
	   
	   var tagName = this.input.slice(start, this.index);
	   this.setContext(tokenTypes.tagOpenStart);
	   return {
		type: tokenTypes.tagOpenStart,
		label: tagName
	   }
	}
 };
  tp.readText = function () {
    // console.log('text = '+ this.char());
	if(this.inContext(tokenTypes.tagOpenEnd) && (this.char() !== '<')) {
		 var start = this.index
		 if (!this.char()) return
		 this.index++;
		 while(this.char() && !(/[\<\/\>]/.test(this.char()))) {
			this.index ++;
		 }
		 // console.log(this.index + ' = ' +this.char());
		return {
			type: tokenTypes.text,
			label: this.input.slice(start, this.index)
		}
	}
 };
 tp.readTagOpenEnd = function () {
	if(this.inContext(tokenTypes.tagOpenStart) && this.char() === '>') {
		this.setContext(tokenTypes.tagOpenEnd);
		this.index++;
		return {
			type: tokenTypes.tagOpenEnd,
			label: '>'
		}
	}
 };
 
 tp.readAttrName = function() {
	if(this.inContext(tokenTypes.tagOpenStart) && this.char()) {
		var attrReg = /[\w-\d:]/;
		//console.log("readAttrName = "+this.char());
		if(!attrReg.test(this.char())) return ;
		//console.log("readAttrName2 = "+this.char());
		var start = this.index;
		
		while ( this.char() && attrReg.test(this.char())) {
		   this.index ++;
		}
		return {
			type: tokenTypes.attrName,
			label: this.input.slice(start, this.index)
		}
	}
 };
  tp.readAttrEqual = function() {
	if(this.inContext(tokenTypes.tagOpenStart) && this.char() === '=') {
		this.index++;
		
		return {
			type: tokenTypes.attrEqual,
			label: '='
		}
	}
 };
  tp.readAttrValue = function() {
	if(this.inContext(tokenTypes.tagOpenStart) && this.char() === '"') {
		
		var quote = this.char();
		var start = this.index;
		
		this.index ++;
		while ( this.char() && this.char() !== quote) {
		   this.index ++;
		}
		this.index ++;
		return {
			type: tokenTypes.attrValue,
			label: this.input.slice(start+1, this.index-1)
		}
	}
 };
 
 tp.readTagClose = function () {
	if( (this.inContext(tokenTypes.tagOpenEnd) || this.inContext(tokenTypes.tagClose)) && this.char() === '<') {
	console.log("tagClose = "+this.char());
		this.index++;
		if(this.char() === '/') {
			this.index++;
			var start = this.index;
			while ( this.char() && /[\w-\d]/.test(this.char())) {
			   this.index ++;
			}
			
			if(this.char() === '>') {
			    this.setContext(tokenTypes.tagClose);
				this.index ++;
				return {
					type: tokenTypes.tagClose,
					label: '</'+this.input.slice(start, this.index-1)+'>'
				}
			}
			
		}
	}
 };
 tp.readEOF = function () {
  if (this.index >= this.input.length) {
    this.eof = true
    return {
      type: tokenTypes.eof,
      label: '$'
    }
  }
};
tp.error = function () {
  throw new Error('Unexpected token: \'' + this.char() + '\'')
};
