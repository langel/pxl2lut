
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
	if (typeof image.naturalWidth !== 'undefined') {
		canvas.width = image.naturalWidth;
		canvas.height = image.naturalHeight;
	}
	console.log(image.width);
	console.log(image.naturalWidth);
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
let lutsrc = image_to_canvas(document.querySelector('#lut_src'));

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
	console.log(input_colors);
	let input_colors_keys = Object.keys(input_colors);
	console.log(input_colors_keys);
	let input_colors_count = input_colors_keys.length;
	// output colors info
	print(input_colors_count + ' colors found');
	let avg = { r:0, g:0, b:0 };
	let brightest = { r:0, g:0, b:0, avg:0 };
	let darkest = { r:255, g:255, b:255, avg:255 };
	let swatches = '';
	// and get average too
	input_colors_keys.forEach(function(color) {
		let data = int_to_color_data(color);
		console.log(data);
		// track average data
		avg.r += data[0];
		avg.g += data[1];
		avg.b += data[2];
		// track brightest data
		c_avg = Math.round((data[0] + data[1] + data[2]) / 3)
		if (c_avg > brightest.avg) {
			brightest = { r:data[0], g:data[1], b:data[2], avg:c_avg };
		}
		// track darkest data
		if (c_avg < darkest.avg) {
			darkest = { r:data[0], g:data[1], b:data[2], avg:c_avg };
		}
		swatches += '<span class="swatch" style="background: rgb(' + data[0] + ', ' + data[1] + ', ' + data[2] + ');"></span>';
	});
	print(swatches);
	// show average color
	avg.r = Math.round(avg.r / input_colors_keys.length);
	avg.g = Math.round(avg.g / input_colors_keys.length);
	avg.b = Math.round(avg.b / input_colors_keys.length);
	let avgrgb = 'rgb(' + avg.r + ', ' + avg.g + ', ' + avg.b + ')';
	print('average color: ' + avgrgb + ' <span class ="swatch" style="background: ' + avgrgb + '">');
	let brtrgb = 'rgb(' + brightest.r + ', ' + brightest.g + ', ' + brightest.b + ')';
	print('brightest color: ' + brtrgb + ' <span class ="swatch" style="background: ' + brtrgb + '">');
	let drkrgb = 'rgb(' + darkest.r + ', ' + darkest.g + ', ' + darkest.b + ')';
	print('darkest color: ' + drkrgb + ' <span class ="swatch" style="background: ' + drkrgb + '">');
	// get lutter into action!
	init_lutter();
	ctx = LUT.getContext('2d');
	console.log(ctx);
	// let's launch this sucka!
	print('Processing . . . .');
	setTimeout(recursive_process_x, 10, 0, ctx, input_colors);
}

let recursive_process_x = function(x, ctx, input_colors) {
	console.log(x);
	for (var y =0; y < ctx.canvas.height; y++) {
		let p = pixel_get(ctx, x, y);
		//p = closest_value(p, input_colors_keys);
		p = nearest_color(p, input_colors);
		pixel_set(ctx, x, y, p);
	}
	x++;
	if (x < ctx.canvas.width) setTimeout(recursive_process_x, 10, x, ctx, input_colors);
	else print('LUT render complete. :D/');
}



