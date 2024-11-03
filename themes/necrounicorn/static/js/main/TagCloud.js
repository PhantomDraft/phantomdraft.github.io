window.onload = function() {
	try {
		TagCanvas.Start('root', 'memory_root', {
			activeAudio: true, 
			audioVolume: '1.0', 
			dragControl: true, 
			initial: [0.030, -0.070], 
			lock: 'xy', 
			maxSpeed: '0.05', 
			outlineMethod: "colour", 
			outlineColour: '#b22222', 
			textFont: null, 
			textColour: null, 
		});
	} catch(e) {
		// something went wrong, hide the canvas container
		document.getElementById('b_memory_section').style.display = 'none';
	}
};

function selectBiopunk() {
	TagCanvas.Start('root_biopunk', 'associative_biopunk', {
		activeAudio: true, 
		centreImage: 'https://associative-connection.github.io/img/main/icon/biohazard.png', 
		dragControl: true, 
		initial: [0.200, 0.000], 
		lock: 'y', 
		shape: 'DblHelix', 
		textFont: '"Press Start 2P", system-ui', 
		textColour: null, 
	});
}

function selectCulture() {
	TagCanvas.Start('root_culture', 'associative_culture', {
		activeAudio: true, 
		centreImage: 'https://associative-connection.github.io/img/main/icon/culture.png', 
		dragControl: true, 
		initial: [0.200, 0.000], 
		shape: "vring(0.5)", 
		lock: "x", 
		offsetY: -60, 
		textFont: '"Rye", serif', 
	});
}

function selectDreams() {
	TagCanvas.Start('root_dreams', 'associative_dreams', {
		activeAudio: true, 
		centreImage: 'https://associative-connection.github.io/img/main/icon/arkham.png', 
		dragControl: true, 
		initial: [0.200, 0.000], 
		shape: "hcylinder", 
		lock: "x", 
		textFont: '"Henny Penny", system-ui', 
	});
}

function DblHelix(n, rx, ry, rz) {

	let a = Math.PI / n, i, j, p = [], z = rz * 2 / n;

	for (i = 0; i < n; ++i) {
		j = a * i;
		if (i % 2)
			j += Math.PI;
			p.push([rx * Math.cos(j), rz - z * i, ry * Math.sin(j)]);
		}
	return p;
}