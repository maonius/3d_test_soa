class Obj {
	constructor ()
	{
		
	}
}

class Cube {
	constructor (pos, d)
	{
		this.pos = pos;
		this.vertex = [
			Vec3.create(d, 0, 0),
			Vec3.create(0, d, 0),
			Vec3.create(0, 0, d),
			Vec3.create(-d,0, 0),
			Vec3.create(0,-d, 0),
			Vec3.create(0, 0,-d)
		];
		let p = this.vertex;
		this.faces = [
			new PolygonSquare(p[0], p[1], p[2]),
			new PolygonSquare(p[0], p[4], p[2]),
			new PolygonSquare(p[0], p[4], p[5])
		];
	}
	calcIntersection(ray_pos, ray, res)
	{
		let flag = false;
		for (let i=0; i<this.faces; i++) {
			flag = this.faces[i].calcIntersection(ray_pos, ray, res);
		}
		return flag;
	}
}