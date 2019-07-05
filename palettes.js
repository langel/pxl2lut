


let image_srcs = [
	'images/17undertones.PNG',
	'images/aap-64.PNG',
	'images/afternoon.PNG',
	'images/amtrad cpc.PNG',
	'images/apple ii.PNG',
	'images/banana split.PNG',
	'images/battery 24.PNG',
	'images/blue seni.PNG',
	'images/bubblegum 16.PNG',
	'images/castpixel 16.PNG',
	'images/cave.PNG',
	'images/cga 0 hi.PNG',
	'images/cga 0 lo.PNG',
	'images/cga 1 hi.PNG',
	'images/cga 1 lo.PNG',
	'images/cga 2 hi.PNG',
	'images/cga 2 lo.PNG',
	'images/chromatic 16.PNG',
	'images/copper tech.PNG',
	'images/crimso 11.PNG',
	'images/darudda 22.PNG',
	'images/dawnbringer 16.PNG',
	'images/db-iso22.PNG',
	'images/dw17.PNG',
	'images/endesga 8.PNG',
	'images/equipix15.PNG',
	'images/fantastic 8.PNG',
	'images/fantasy 16.PNG',
	'images/fantasy 24.PNG',
	'images/firestorm.PNG',
	'images/froste 16.PNG',
	'images/hallow pumpkin.PNG',
	'images/humers.PNG',
	'images/indecision.PNG',
	'images/jungle level.PNG',
	'images/macintosh ii.PNG',
	'images/matriax8c.PNG',
	'images/nt1h.PNG',
	'images/oak21.PNG',
	'images/pixelwave.PNG',
	'images/rkbv.PNG',
	'images/rude goldberg.PNG',
	'images/sheltzy32.PNG',
	'images/slso-clr17.PNG',
	'images/slso8.PNG',
	'images/space haze.PNG',
	'images/steam lords.PNG',
	'images/superb 8.PNG',
	'images/superfuture25.PNG',
	'images/sweetie 16.PNG',
	'images/taffy16.PNG',
	'images/tanquil fantasy 23.PNG',
	'images/vic 20.PNG',
	'images/vinik24.PNG',
];


let palettes, palette_picker = document.getElementById('palette_picker');

image_srcs.forEach(function(img, i) {
	let name = img.replace('images/', '').replace('.PNG', '');
	let p = document.createElement('p');
	p.innerHTML = name + '<br>' + '<img src="' + img + '">';
	palette_picker.appendChild(p);
	print(name + ' loaded');

	// are we done? let's do some stuff!
	if (i == image_srcs.length - 1) {
		print(image_srcs.length + ' total imagers loadeded.');
		palettes = document.querySelectorAll('#palette_picker img');

		// init palette clicks
		palettes.forEach(function(palette) {
			palette.addEventListener('click', e => { 
				print('ANALyzing ' + e.target.src + ' . . . ');
				image_to_lut(image_to_canvas(e.target));
			});
		});
	}
});

