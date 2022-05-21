// canvas and draw

let screen_can, screen_ctx;
let screen_w, screen_h;
let can, ctx;
let can_w, can_h;
let can_cx, can_cy;
let can_map, can_dat;

function initCanvas() {
	screen_can = document.getElementById('can');
	screen_ctx = screen_can.getContext('2d');
	screen_w = screen_can.width  *= 2;
	screen_h = screen_can.height *= 2;
	screen_ctx.scale(2, 2);
	can = document.getElementById('vcan');
	ctx = can.getContext('2d');
	can_w = can.width;
	can_h = can.height;
	can_cx = can_w >> 1;
	can_cy = can_h >> 1;
	can_map = ctx.createImageData(can_w, can_h);
	can_dat = can_map.data;
}

function drawAll() {
	
	let start_t = new Date();
	draw_on_camera();
	ctx.putImageData(camera_map, 0, 0);
	
	screen_ctx.drawImage(can, 0, 0);
	screen_ctx.fillStyle = "white";
	screen_ctx.font = '10px courier'
	screen_ctx.fillText(`ms/frame: ${new Date() - start_t}`, 10, 20);
	screen_ctx.fillText(`x:${Vec3.getX(player_pos)}
y:${Vec3.getY(player_pos)}
z:${Vec3.getZ(player_pos)}`, 10, 30);

	screen_ctx.fillText(`x:${Vec3.getX(camera_ray).toFixed(3)}
y:${Vec3.getY(camera_ray).toFixed(3)}
z:${Vec3.getZ(camera_ray).toFixed(3)}`, 10, 40);
	
	
}

