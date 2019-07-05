
let closest_value = function(val, vals) {
	return vals.reduce(function(prev, curr) {
  		return (Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev);
	});
}

let color_diff = function(r1, g1, b1, r2, g2, b2) {
	let diff = 0;
	diff += Math.pow(r1 - r2, 2);
	diff += Math.pow(g1 - g2, 2);
	diff += Math.pow(b1 - b2, 2);
	return Math.sqrt(diff);
	// corruption algo :D
	//return Math.sqrt((r1 - r2) * (g1 - g2) * (b1 - b2));
}

let nearest_color = function(color, palette) {
	let best_diff = 9001;
	let best_id = 0;
//	console.log('target color');
//	console.log(color);
	for (let [key, value] of Object.entries(palette)) {
//		console.log(palette[key].data);
		let diff = color_diff(color[0], color[1], color[2],
			palette[key].data[0], palette[key].data[1], palette[key].data[2]);
		//console.log(diff);
		if (best_diff > Math.abs(diff) || best_id == 0) {
			best_diff = Math.abs(diff);
			best_id = key;
//			console.log(best_id);
		}
	}
	//console.log(best_id);
	return palette[best_id].data;
}

let color_data_to_int = function(data) {
	return data.reduce(function(ipInt, octet) { return (ipInt<<8) + parseInt(octet, 10)}, 0) >>> 0;
}

let int_to_color_data = function(cint) {
	let data = [];
	data[0] = cint >>> 24;
	data[1] = cint >> 16 & 255;
	data[2] = cint >> 8 & 255;
	data[3] = cint & 255;
	return data;
}

let pixel_get = function(ctx, x, y) {
	return ctx.getImageData(x, y, 1, 1).data;
}

let pixel_set = function(ctx, x, y, data) {
	var r = data[0];
	var g = data[1];
	var b = data[2];
	var a = data[3];
	ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
	ctx.fillRect(x, y, 1, 1);
}


let image_to_canvas = function(image) {
	var canvas = document.createElement('canvas');
	console.log(image);
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext('2d').drawImage(image, 0, 0);
	canvas.setAttribute('crossOrigin', '');
	return canvas;
}

let scrub_colors = function(ctx) {
	let colors = {};
	console.log(ctx);
	for (var x = 0; x < ctx.canvas.width; x++) {
		for (var y = 0; y < ctx.canvas.height; y++) {
			let color = pixel_get(ctx, x, y);
			let color_id = color_data_to_int(color);
			if (typeof colors[color_id] === 'undefined') {
				colors[color_id] = {
					count: 1,
					data: color,
				}
			}
			else colors[color_id].count++;
		}
	}
	console.log(colors);
	return colors;
}

let LUT;
let lutsrc = image_to_canvas(document.querySelector('#lutsrc img'));

let canvas_wrapper = document.getElementById('canvas_wrapper');

// load lutter
let init_lutter = function() {
	LUT = image_to_canvas(lutsrc);
	canvas_wrapper.innerHTML = '';
	canvas_wrapper.appendChild(LUT);
}
setTimeout(init_lutter(), 100);


let image_to_lut = function(image) {
	let input_colors = scrub_colors(image.getContext('2d'));
	let input_colors_keys = Object.keys(input_colors);
	let input_colors_count = input_colors_keys.length;
	print(input_colors_count + ' colors found');
	init_lutter();
	ctx = LUT.getContext('2d');
	console.log(ctx);
	for (var x = 0; x < ctx.canvas.width; x++) {
	//for (var x = 0; x < 1; x++) {
		console.log(x);
		for (var y =0; y < ctx.canvas.height; y++) {
			let p = pixel_get(ctx, x, y);
			//p = closest_value(p, input_colors_keys);
			p = nearest_color(p, input_colors);
			pixel_set(ctx, x, y, p);
		}
	}
}





