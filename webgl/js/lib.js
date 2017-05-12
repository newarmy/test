function initProgram(ctx, vertexShaderStr, fragmentShaderStr) {
	var vertexShader = ctx.createShader(ctx.VERTEX_SHADER);
	var flagShader = ctx.createShader(ctx.FRAGMENT_SHADER);
	ctx.shaderSource(vertexShader, vertexShaderStr);
	ctx.shaderSource(flagShader, fragmentShaderStr);
	ctx.compileShader(vertexShader);
	ctx.compileShader(flagShader);
	
	var shaderProgram = ctx.createProgram();
	ctx.attachShader(shaderProgram, vertexShader);
	ctx.attachShader(shaderProgram, flagShader);
	ctx.linkProgram(shaderProgram);
	ctx.useProgram(shaderProgram);
	return shaderProgram;
}
function g(selector){
	return document.querySelector(selector);
}
function getCtx(canvas){
	var gl = null;
	try{
	
		gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	}catch(e) {
	}
	if(!gl) {
		gl = null;
	}
	return gl;
}