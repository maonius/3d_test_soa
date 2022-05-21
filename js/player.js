
let player_x, player_y;
let player_pos = Vec3.create(0, 0, 0);
let player_mom = Vec3.create(0, 0, 0);
let player_pit, player_yaw;
let player_ray = Vec3.create(0, 0, 0);
let player_angle_ratio = 128;


function initPlayer()
{
	player_pit = 0;
	player_yaw = 0;
}

let player_speed = 10;
function updatePlayer()
{
	Vec3.init(player_mom, 0, 0, 0);
	let vx = 0; let vy = 0; let vz = 0;
	const pit = player_pit / player_angle_ratio;
	const yaw = player_yaw / player_angle_ratio;
	
	if (keyBuff.d) { vx = -Math.sin(yaw); vz = Math.cos(yaw); }
	else if (keyBuff.w) { vx = Math.cos(yaw); vz = Math.sin(yaw); }
	else if (keyBuff.a) { vx = Math.sin(yaw); vz = -Math.cos(yaw); }
	else if (keyBuff.s) { vx = -Math.cos(yaw); vz = -Math.sin(yaw); }
	if (keyBuff[' ']) { vy = -1; }
	else if (keyBuff.Shift) { vy = 1; }
	
	vx *= player_speed; vy *= player_speed; vz *= player_speed;
	Vec3.init(player_mom, vx, vy, vz);
	Vec3.add(player_pos, player_mom, player_pos);
	camera_pit = pit;
	camera_yaw = yaw;
}

function rotatePlayerAngle(yaw, pit)
{
	const maybe_yaw = player_yaw + yaw;
	const maybe_pit = player_pit + pit;
	const ROUND = Math.PI * 2;
	const deg_PI = Math.PI * player_angle_ratio;
	
	if (maybe_yaw < 0) {
		player_yaw = Math.floor(2 * deg_PI - maybe_yaw)
	} else if (maybe_yaw > 2 * deg_PI ) {
		player_yaw = Math.floor(player_yaw - deg_PI * 2);
	} else {
		player_yaw = maybe_yaw;
	}
	if (Math.abs(maybe_pit) < deg_PI * 0.5) {
		player_pit = maybe_pit;
	}
}