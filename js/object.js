let visible_obj = [];
function initObject() {
	let o = Vec3.create(100, 0, 0  );
	let a = Vec3.create(100, 100, 0);
	let b = Vec3.create(100, 0, 100);
	let tri = new Polygon(o, a, b);
	visible_obj.push(tri);
	
	
	let cube = new Cube(o, 30);
	visible_obj.push(cube);
}


