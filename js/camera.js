

let camera_pos = Vec3.create(0, 0, 0);
let camera_pit, camera_yaw;
let cos_camera_pit, sin_camera_pit;
let cos_camera_yaw, sin_camera_yaw;
const camera_ratio  = 128;
let camera_ray = Vec3.create(0, 0, 0);

let camera_can, camera_ctx;
let camera_w, camera_h;
let camera_cx, camera_cy;
let camera_map, camera_map_dat;
let camera_diff_arr;

function initCamera()
{
	Vec3.init(camera_pos, 0, 0, 0);
	camera_pit = 0;
	camera_yaw = 0;
	Vec3.init(camera_ray, 0, 0, 0);

	camera_can = document.createElement('canvas');
	camera_ctx = camera_can.getContext('2d');
	camera_w = camera_can.width;
	camera_h = camera_can.height;
	camera_cx = camera_w >> 1;
	camera_cy = camera_h >> 1;
	
	camera_map = camera_ctx.createImageData(camera_w, camera_h);
	camera_map_dat = camera_map.data;
	
	// init camera diff array (view angle)
	camera_diff_arr = new Float64Array((camera_h + camera_w)<<1);
	ray_sincos = new Float64Array((camera_h + camera_w)<<1);
	for (let i=0; i<camera_h; i++) {
		let idx = i << 1;
		// cos diff_pit
		// sin diff_pit
		camera_diff_arr[idx  ] = Math.cos((i-camera_cy)/camera_h);
		camera_diff_arr[idx+1] = Math.sin((i-camera_cy)/camera_h);
	}
	for (let j=camera_h; j<camera_w+camera_h; j++) {
		let idx = j << 1;
		// cos diff_yaw
		// sin diff_yaw
		camera_diff_arr[idx]   = Math.cos((j-camera_cx)/camera_w);
		camera_diff_arr[idx+1] = Math.sin((j-camera_cx)/camera_w);
	}
}

function updateCamera() {
	const x = Vec3.getX(camera_pos);
	const y = Vec3.getY(camera_pos);
	const z = Vec3.getZ(camera_pos);
	// pitch and yaw
	const pit = camera_pit;
	const yaw = camera_yaw;
	cos_camera_pit = Math.cos(pit);
	sin_camera_pit = Math.sin(pit);
	cos_camera_yaw = Math.cos(yaw);
	sin_camera_yaw = Math.sin(yaw);
	
	Vec3.init(camera_ray, cos_camera_pit*cos_camera_yaw,
		-sin_camera_pit, cos_camera_pit*sin_camera_yaw);
}

let ray     = Vec3.create(0, 0, 0);
let ray_pos = Vec3.create(0, 0, 0);
let intersects = Vec3.create(0, 0, 0);
let ray_sincos;
function draw_on_camera() {
	
	
	for (let j=0; j<camera_w; j++) {
		const cos_diff_yaw = camera_diff_arr[(camera_h+j<<1)];
		const sin_diff_yaw = camera_diff_arr[(camera_h+j<<1)+1];
		
		ray_sincos[(camera_h+j<<1)] = 
			(cos_camera_yaw * cos_diff_yaw
			- sin_camera_yaw * sin_diff_yaw);
		ray_sincos[(camera_h+j<<1)+1] =
			(sin_camera_yaw * cos_diff_yaw
			+ cos_camera_yaw * sin_diff_yaw);
	}
	
	let nearest_d, nearest_obj, nearest_intersect;
	let i, j, k, idx=0;
	let obj_len = visible_obj.length;
	for (i=0; i<camera_h; i++) {
		
		const cos_diff_pit = camera_diff_arr[i<<1];
		const sin_diff_pit = camera_diff_arr[(i<<1)+1];
		
		const cos_ray_pit = (cos_camera_pit * cos_diff_pit
				- sin_camera_pit * sin_diff_pit);
		const sin_ray_pit = (sin_camera_pit * cos_diff_pit
				+ cos_camera_pit * sin_diff_pit);
		
		for (j=0; j<camera_w; j++) {
			
			const cos_ray_yaw = ray_sincos[(camera_h+j<<1)];
			const sin_ray_yaw = ray_sincos[(camera_h+j<<1)+1];
			
			const x = cos_ray_pit * cos_ray_yaw;
			const y = sin_ray_pit;
			const z = cos_ray_pit * sin_ray_yaw;
			
			Vec3.init(ray, x, y, z);
			Vec3.copy(ray_pos, player_pos)
			
			nearest_d = 1000000;
			nearest_obj = null;
			
			for (k=0; k<obj_len; k++) {
				const obj = visible_obj[k];
				const isIntersect =
					obj.calcIntersection(
						ray_pos, ray, intersects);
				
				if (isIntersect) {
					const d = Vec3.getZ(intersects);
					if (0 < d && d < nearest_d) {
						nearest_d = d;
						nearest_obj = obj;
					}
				}
			}
			
			if (nearest_obj) {
				camera_map_dat[idx  ] = 100;
				camera_map_dat[idx+1] = 100;
				camera_map_dat[idx+2] = 100;
			} else {
				camera_map_dat[idx  ] = 20;
				camera_map_dat[idx+1] = 20;
				camera_map_dat[idx+2] = 20;
			}
			camera_map_dat[idx+3] = 255;
			idx += 4;
		}
	}
}



