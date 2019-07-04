

let pixel_get = function(ctx, x, y) {
	return ctx.getImageData(x, y, 1, 1).data;
}

let pixel_set = function(ctx, x, y, data) {
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
		}
	}
}

let LUT;
let lutsrc = image_to_canvas(document.querySelector('#lutsrc img'));

let canvas_wrapper = document.getElementById('canvas_wrapper');
let palettes = document.querySelectorAll('#palette_picker img');

// init palette clicks
palettes.forEach(function(palette) {
	palette.addEventListener('click', e => { 
		let input = image_to_canvas(e.target);
		scrub_colors(input.getContext('2d'));
		console.log(input);
	/*
		let LUT = image_to_canvas(e.target);
		canvas_wrapper.innerHTML = '';
		canvas_wrapper.appendChild(LUT);
		*/
	});
});

// load lutter
let init_lutter = function() {
	lutsrc = image_to_canvas(lutsrc);
	canvas_wrapper.appendChild(lutsrc);
}

init_lutter();
