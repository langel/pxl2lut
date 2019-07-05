
let stdout = document.getElementById('stdout');
let stdout_counter = 0;

let print = function(wordages) {
	let p = document.createElement('p');
	let counter = (stdout_counter + '').padStart(4, '0');
	p.innerHTML = counter + ': ' + wordages;
	stdout.prepend(p);
	stdout_counter++;
}

print('initializing . . . .');
