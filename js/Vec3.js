
let Vec3 = {
	__arr: new Float64Array(256),
	__len: 0,
	
	create: function (x, y, z) {
		let res = this.__len;
		let idx = res << 2;
		this.__len += 1;
		this.__arr[idx++] = x;
		this.__arr[idx++] = y;
		this.__arr[idx++] = z;
		return res;
	},
	init: function (v, x, y, z) {
		let idx = v << 2;
		this.__arr[idx++] = x;
		this.__arr[idx++] = y;
		this.__arr[idx++] = z;
	},
	getX: function (v) {
		return this.__arr[v << 2];
	},
	getY: function (v) {
		return this.__arr[(v << 2) + 1];
	},
	getZ: function (v) {
		return this.__arr[(v << 2) + 2];
	},
	setX: function (v, x) {
		this.__arr[v << 2] = x;
	},
	setY: function (v, y) {
		this.__arr[(v << 2) + 1] = y;
	},
	setZ: function (v, z) {
		this.__arr[(v << 2) + 2] = z;
	},
	printPos: function (v) {
		let idx = v << 2;
		let arr = this.__arr;
		console.log(arr[idx++], arr[idx++], arr[idx++])
	},
	print: function (v) {
		let idx = v << 2;
		let arr = this.__arr;
		console.log(arr[idx++], arr[idx++], arr[idx++])
	},
	copy: function (a, b) {
		// b = a
		let idx_a = a << 2;
		let idx_b = b << 2;
		let arr = this.__arr;
		arr[idx_a++] = arr[idx_b++]
		arr[idx_a++] = arr[idx_b++]
		arr[idx_a++] = arr[idx_b++]
	},
	add: function (a, b, c) {
		// c = a + b
		let idx   = a << 2;
		let idx_c = c << 2;
		this.__arr[idx_c++] = this.__arr[idx++];
		this.__arr[idx_c++] = this.__arr[idx++];
		this.__arr[idx_c++] = this.__arr[idx++];
		idx   = b << 2;
		idx_c = c << 2;
		this.__arr[idx_c++] += this.__arr[idx++];
		this.__arr[idx_c++] += this.__arr[idx++];
		this.__arr[idx_c++] += this.__arr[idx++];
	},
	sub: function (a, b, c) {
		// c = a - b
		let idx   = a << 2;
		let idx_c = c << 2;
		this.__arr[idx_c++] = this.__arr[idx++];
		this.__arr[idx_c++] = this.__arr[idx++];
		this.__arr[idx_c++] = this.__arr[idx++];
		idx   = b << 2;
		idx_c = c << 2;
		this.__arr[idx_c++] -= this.__arr[idx++];
		this.__arr[idx_c++] -= this.__arr[idx++];
		this.__arr[idx_c++] -= this.__arr[idx++];
	},
	cross: function (a, b, c) {
		let idx_a = a << 2;
		let idx_b = b << 2;
		let idx_c = c << 2;
		let arr = this.__arr;
		arr[idx_c++] = arr[idx_a+1] * arr[idx_b+2]
			- arr[idx_a+2] * arr[idx_b+1];
		arr[idx_c++] = arr[idx_a+2] * arr[idx_b  ]
			- arr[idx_a  ] * arr[idx_b+2];
		arr[idx_c++] = arr[idx_a  ] * arr[idx_b+1]
			- arr[idx_a+1] * arr[idx_b  ];
	},
	inner: function (a, b) {
		let idx_a = a << 2;
		let idx_b = b << 2;
		let arr = this.__arr;
		let res = 0;
		res += arr[idx_a++] * arr[idx_b++];
		res += arr[idx_a++] * arr[idx_b++];
		res += arr[idx_a] * arr[idx_b];
		return res;
	},
	det: function (a, b, c) {
		let idx_a = a << 2;
		let idx_b = b << 2;
		let idx_c = c << 2;
		let arr = this.__arr;
		let res = 0;
		res += arr[idx_a] * (
			arr[idx_b+1] * arr[idx_c+2] - 
			arr[idx_b+2] * arr[idx_c+1] );
		res -= arr[idx_b] * (
			arr[idx_a+1] * arr[idx_c+2] -
			arr[idx_a+2] * arr[idx_c+1] );
		res += arr[idx_c] * (
			arr[idx_a+1] * arr[idx_b+2] -
			arr[idx_a+2] * arr[idx_b+1] );
		return res;
	},
}

