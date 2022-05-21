
let debug_elm;
function initDebug() {
	debug_elm = document.getElementById('debug');
}

window.onload = function () {
	initCanvas();
	initObject();
	initCamera();
	initPlayer();
	initDebug();
	loop();
	setInterval(loop, 1000/5);
}

function loop() {
	updatePlayer();
	updateCamera();
	drawAll();
}

let isMousedown = false;
window.onmousedown = function (e) {
	isMousedown = true;
}
window.onmousemove = function (e) {
	if (isMousedown) {
		let vx = e.movementX;
		let vy = e.movementY;
		//rotateCamera(-vx, -vy);
		rotatePlayerAngle(-vx, -vy);
	}
}
window.onmouseup = function (e) {
	isMousedown = false;
}



let keyBuff = {};
window.onkeydown = function (e) {
	keyBuff[e.key] = true;
}

window.onkeyup = function (e) {
	keyBuff[e.key] = false;
}







