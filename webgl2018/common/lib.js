/**
 * Created by xinjundong on 2018/1/3.
 */

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
/**
 * 生成和编译着色器的函数
 * {{param}}
 * gl： webgl的context
 * id： 存放着色器的script的id
 */
function createShader(gl, id) {
    var shader; //  存着色器的变量
    var scriptDom = document.getElementById(id);
    if(! scriptDom) {
        return null;
    }
    //创建着色器
    switch (scriptDom.type) {
        case 'x-shader/x-vertex' :
            shader = gl.createShader(gl.VERTEX_SHADER);
            break;
        case 'x-shader/x-fragment' :
            shader = gl.createShader(gl.FRAGMENT_SHADER);
            break;
        default:
            return null;
    }
    // 将标签中的代码分配给生成的着色器
    gl.shaderSource(shader, scriptDom.text);

    // 编译着色器
    gl.compileShader(shader);

    // 判断一下着色器是否编译成功
    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        // 编译成功，则返回着色器
        return shader;
    } else {
        // 编译失败, 显示错误信息
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
}

/**
 * 程序对象的生成和连接,
 * 程序对象是管理顶点着色器和片段着色器，
 * 或者WebGL程序和各个着色器之间进行数据的互相通信的重要的对象。
 * {{param}}
 * gl： webgl的context
 * vs： 顶点着色器对象
 * fs： 片段着色器对象
 * {{return}}
 * program 程序对象
 * */
function createProgram(gl, vs, fs) {
    // 程序对象的生成
    var program = gl.createProgram();

    //向程序对象里分配着色器
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    // 将着色器连接
    gl.linkProgram(program);
    // 判断着色器的连接是否成功
    if(gl.getProgramParameter(program, gl.LINK_STATUS)) {

        // 成功的话，将程序对象设置为有效
        gl.useProgram(program);
        return program;
    } else {
        // 如果失败，弹出错误信息
        alert(gl.getProgramInfoLog(program));
        return null;
    }
}

/**
 * 生成顶点缓存对象
 * {{param}}
 * gl： webgl的context
 * data： 顶点数据
 * */
function createVBD(gl, data) {

    // 生成缓存对象
    var vbo = gl.createBuffer();

    // 绑定缓存
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    //  向缓存中写入数据
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    // 将绑定的缓存设为无效  数据写入结束之后，要将WebGL中绑定的缓存无效化。
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    // 返回生成的VBO
    return vbo;
}

/**
 * 将VBO进行绑定并添加
 * {{param}}
 * gl: webgl的context
 * vboArray: vertex buffer object array,
 * posArray: 顶点数据对应的指针的数组
 * strideArray: 每个顶点指针数据用到的数据步幅的数据
 * */
function setAttribute(gl, vboArray, posArray, strideArray) {
    var len = vboArray.length;
    for(var i = 0; i < len; i++) {
        // 绑定VBO(位置情报)
        gl.bindBuffer(gl.ARRAY_BUFFER, vboArray[i]);
        // 设定attrLocation指针属性有効
        gl.enableVertexAttribArray(posArray[i]);
        // 添加attribute属性
        gl.vertexAttribPointer(posArray[i], strideArray[i], gl.FLOAT, false, 0, 0);
    }
}

/**
 * 生成索引缓存对象（index buffer object）
 * {{param}}
 * gl： webgl的context
 * data： 顶点数据
 * */

function createIBD(gl, data) {
    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return ibo;
}