


let image_srcs = [
	'17undertones.PNG',
	'6-bit rgb.PNG',
	'aap-64.PNG',
	'aap-splendor128.PNG',
	'afternoon.PNG',
	'amtrad cpc.PNG',
	'apple ii.PNG',
	'arcade standard 29.PNG',
	'atapki-baby32.PNG',
	'banana split.PNG',
	'battery 24.PNG',
	'blk 36.PNG',
	'blk neo.PNG',
	'blue seni.PNG',
	'bubblegum 16.PNG',
	'castpixel 16.PNG',
	'cave.PNG',
	'cga 0 hi.PNG',
	'cga 0 lo.PNG',
	'cga 1 hi.PNG',
	'cga 1 lo.PNG',
	'cga 2 hi.PNG',
	'cga 2 lo.PNG',
	'chromatic 16.PNG',
	'copper tech.PNG',
	'crimso 11.PNG',
	'darudda 22.PNG',
	'dawnbringer 16.PNG',
	'dawnbringer 32.PNG',
	'db-iso22.PNG',
	'doom.PNG',
	'dw17.PNG',
	'endesga 8.PNG',
	'equipix15.PNG',
	'famicube.PNG',
	'fantastic 8.PNG',
	'fantasy 16.PNG',
	'fantasy 24.PNG',
	'faraway48.PNG',
	'firestorm.PNG',
	'fleja master palette.PNG',
	'froste 16.PNG',
	'greenstar32.PNG',
	'hallow pumpkin.PNG',
	'humers.PNG',
	'indecision.PNG',
	'journey.PNG',
	'juice 32.PNG',
	'juice 56.PNG',
	'jungle level.PNG',
	'lux3k.PNG',
	'macintosh ii.PNG',
	'marshamallow32.PNG',
	'matriax8c.PNG',
	'mspaint xp.PNG',
	'nature\'s embrace 55.PNG',
	'nes.PNG',
	'nt1h.PNG',
	'oak21.PNG',
	'pear36.PNG',
	'pineapple 32.PNG',
	'pixelwave.PNG',
	'resurrect 32.PNG',
	'rkbv.PNG',
	'rosey 42.PNG',
	'rude goldberg.PNG',
	'sheltzy32.PNG',
	'slso8.PNG',
	'slso-clr17.PNG',
	'space haze.PNG',
	'star 29.PNG',
	'starmancer.PNG',
	'steam lords.PNG',
	'superb 8.PNG',
	'superfuture25.PNG',
	'sweetie 16.PNG',
	'taffy16.PNG',
	'tanquil fantasy 23.PNG',
	'ufo 50.PNG',
	'vic 20.PNG',
	'vinik24.PNG',
	'zughy 32.PNG',
	'zykro-32.PNG',
];


let palettes, palette_picker = document.getElementById('palette_picker');

image_srcs.forEach(function(img, i) {
	let name = img.replace('.PNG', '');
	let p = document.createElement('p');
	p.innerHTML = name + '<br>' + '<img src="images/' + img + '">';
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

