
let r_o = Vec3.create(0, 0, 0);
class Polygon {
	constructor (o, a, b)
	{
		this.o = o;
		this.a = a;
		this.b = b;
		
		this.oa = Vec3.create(0, 0, 0);
		this.ob = Vec3.create(0, 0, 0);
		this.cross_ab = Vec3.create(0, 0, 0);
		
		this.update();
		
		this.cnt = 0;
	}
	update()
	{
		Vec3.sub(this.a, this.o, this.oa);
		Vec3.sub(this.b, this.o, this.ob);
		Vec3.cross(this.oa, this.ob, this.cross_ab);
	}
	calcIntersection(ray_pos, ray, res)
	{
		this.cnt += 1;
		
		Vec3.sub(ray_pos, this.o, r_o);
		let rev_detA = -1/Vec3.inner(this.cross_ab, ray);
		
		let z = Vec3.det(this.oa, this.ob, r_o) * rev_detA;
		if (z < 0) return false;
		
		
		let x = -Vec3.det(r_o, this.ob, ray) * rev_detA;
		if (x < 0 || 1 < x) return false;
		
		let y = -Vec3.det(this.oa, r_o, ray) * rev_detA;
		if (y < 0 || 1 < y) return false;
		if (x + y > 1) return false;
		
		
		
		Vec3.init(res, x, y, z);
		return true;
	}
}

class PolygonSquare {
	constructor (o, a, b)
	{
		this.o = o;
		this.a = a;
		this.b = b;
		
		this.oa = Vec3.create(0, 0, 0);
		this.ob = Vec3.create(0, 0, 0);
		this.cross_ab = Vec3.create(0, 0, 0);
		
		this.update();
		
		this.cnt = 0;
	}
	update()
	{
		Vec3.sub(this.a, this.o, this.oa);
		Vec3.sub(this.b, this.o, this.ob);
		Vec3.cross(this.oa, this.ob, this.cross_ab);
	}
	calcIntersection(ray_pos, ray, res)
	{
		this.cnt += 1;
		
		Vec3.sub(ray_pos, this.o, r_o);
		let rev_detA = -1/Vec3.inner(this.cross_ab, ray);
		
		let z = Vec3.det(this.oa, this.ob, r_o) * rev_detA;
		if (z < 0) return false;
		
		
		let x = -Vec3.det(r_o, this.ob, ray) * rev_detA;
		if (x < 0 || 1 < x) return false;
		
		let y = -Vec3.det(this.oa, r_o, ray) * rev_detA;
		if (y < 0 || 1 < y) return false;
		
		Vec3.init(res, x, y, z);
		return true;
	}
}


