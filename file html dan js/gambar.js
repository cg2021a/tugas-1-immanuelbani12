function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    //definisi bentuk (posisi x, posisi y, warna)
    var gambar1 = [
        -0.9,   -0.8,  0.45, 0.44, 0.42, //1
        -0.6,  -0.95,  0.45, 0.44, 0.42, //2
        -0.9,   -0.1,  0.45, 0.44, 0.42, //5

        -0.6,  -0.95,  0.45, 0.44, 0.42, //2
        -0.9,   -0.1,  0.45, 0.44, 0.42, //5
        -0.6,  -0.25,  0.45, 0.44, 0.42, //4

        -0.6,  -0.25,  0.39,  0.38,  0.37, //4
        -0.6,  -0.95,  0.39, 0.38, 0.37, //2
        -0.1,   -0.5,  0.39, 0.38, 0.37, //3

        -0.6,  -0.25,  0.39, 0.38, 0.37, //4
        -0.1,   0.15,  0.39, 0.38, 0.37, //6
        -0.1,   -0.5,  0.39, 0.38, 0.37, //3

        
        -0.6,  -0.25,  0.64, 0.63, 0.6, //4
        -0.1,   0.15,  0.64, 0.63, 0.6, //6
        -0.9,   -0.1,  0.64, 0.63, 0.6, //5

        -0.37,  0.33,  0.64, 0.63, 0.6, //7
        -0.1,   0.15,  0.64, 0.63, 0.6, //6
        -0.9,   -0.1,  0.64, 0.63, 0.6, //5

        -0.6,  -0.2,  1, 1, 1, //9
        -0.15,   0.15,  1, 1, 1, //10
        -0.85,   -0.08,  1, 1, 1, //8

        -0.381,  0.287,  1, 1, 1, //11
        -0.15,   0.15,  1, 1, 1, //10
        -0.85,   -0.08,  1, 1, 1, //8

        -0.37,  0.33,  0.64, 0.63, 0.6, //7
        -0.9,   -0.1,  0.64, 0.63, 0.6, //5
        -0.84,  0.45,  0.64, 0.63, 0.6, //12

        -0.37,  0.33,  0.64, 0.63, 0.6, //7
        -0.3,   0.8,  0.64, 0.63, 0.6, //13
        -0.84,  0.45,  0.64, 0.63, 0.6, //12

        
    ];

    var gambar2 = [
        0.3,  -0.5,  0.39,  0.38,  0.37, //3
        0.7,  -0.5,  0.39,  0.38,  0.37, //4
        0.1,     0,  0.39,  0.38,  0.37, //1
        
        0.9,     0,  0.39,  0.38,  0.37, //2
        0.7,  -0.5,  0.39,  0.38,  0.37, //4
        0.1,     0,  0.39,  0.38,  0.37, //1

        0.2,     0,  0.45, 0.44, 0.42, //7
        0.4,   0.5,  0.45, 0.44, 0.42, //10
        0.1,     0,  0.45, 0.44, 0.42, //1

        0.4,   0.5,  0.45, 0.44, 0.42, //10
        0.1,     0,  0.45, 0.44, 0.42, //1
        0.3,   0.5,  0.45, 0.44, 0.42, //5

        0.2,     0,  1, 1, 1, //7
        0.4,   0.5,  1, 1, 1, //10
        0.6,   0.5,  1, 1, 1, //9

        0.6,   0.5,  1, 1, 1, //9
        0.8,     0,  1, 1, 1, //8
        0.2,     0,  1, 1, 1, //7

        0.6,   0.5,  0.45, 0.44, 0.42, //9
        0.8,     0,  0.45, 0.44, 0.42, //8
        0.9,     0,  0.45, 0.44, 0.42, //2
        
        0.6,   0.5,  0.45, 0.44, 0.42, //9
        0.7,   0.5,  0.45, 0.44, 0.42, //6
        0.9,     0,  0.45, 0.44, 0.42, //2

        0.45,   -0.05,  1, 1, 1, //11
        0.55,   -0.05,  1, 1, 1, //14
        0.525,   -0.1,  1, 1, 1, //13

        0.45,   -0.05,  1, 1, 1, //11
        0.475,    -0.1,  1, 1, 1, //12
        0.525,   -0.1,  1, 1, 1, //13
    ];

    var vertices = [...gambar1, ...gambar2];

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying  vec3 vColor;
        uniform mat4 uTranslate;
        void main(){
            gl_Position = uTranslate * vec4(aPosition, 0.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main(){
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,fragmentShaderSource);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5*Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5*Float32Array.BYTES_PER_ELEMENT, 2*Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);

    var kecepatan = 0.0090;
    var a = 0;
    const uTranslate = gl.getUniformLocation(shaderProgram, 'uTranslate');
    
    function render() {
        if (a >= 0.2 || a <= -0.2) kecepatan = -kecepatan;
		a += kecepatan;
        
		const kiri = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0, 0.0, 0.0, 1.0,
		]
		
		const kanan = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0, a, 0.0, 1.0,
		]
		
		gl.clearColor(0.7, 0.5, 1.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniformMatrix4fv(uTranslate, false, kiri);
        gl.drawArrays(gl.TRIANGLES, 0, gambar1.length/5);

		gl.uniformMatrix4fv(uTranslate, false, kanan);
        gl.drawArrays(gl.TRIANGLES, gambar1.length/5, gambar2.length/5);
            
        requestAnimationFrame(render);
    }
    render();
}