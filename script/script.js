// JS lib. SuperSlides copycat atempt
// studied this example: https://www.youtube.com/watch?v=7ZO2RTMNSAY&ab_channel=TraversyMedia

/*
"let" was introduced in ECMAScript6
and the main difference between "let" and "var" is scoping rules. 
Variables declared by var keyword are scoped to the immediate function body 
(hence the function scope) while let variables are scoped to the 
immediate enclosing block denoted by { }
*/

let sliderImages = document.querySelectorAll('.slide'), //selects all the DOM nodes with the "slide" class
	arrowLeft = document.querySelector('#arrow-left'), //selects the DOM node with the "arrow-left" id
	arrowRight = document.querySelector('#arrow-right'), //selects the DOM node with the "arrow-right" id
	current = 0; //variable with an assigned value

function reset() {
	for (let i = 0; i < sliderImages.length; i++) { //iterates within all the sliderImages DOM nodes, and stays within the range 0 and the number of sliderImages
		sliderImages[i].style.display = 'none'; //changes the CSS of the indexed element ([i] is the index)
	}
}

function startSlide() {
	reset(); //calls the reset() function
	sliderImages[0].style.display = 'block'; //changes the CSS of the first element of the array (arrays starts at 0)
}

function slideLeft() {
	reset(); //calls the reset() function
	sliderImages[current - 1].style.display = 'block'; //changes the CSS of the previous element of the array (if current=1, CSS is changed on the sliderImage with index=0)
	current--; //subtracts 1 to the "current" variable (it's the same as current=current-1. So if current=1, then current=current-1 equals 0)
}

function slideRight() {
	reset(); //calls the reset() function
	sliderImages[current + 1].style.display = 'block'; //changes the CSS of the next element of the array (if current=1, CSS is changed on the sliderImage with index=2)
	current++; //adds 1 to the "current" variable (it's the same as current=current+1. So if current=1, then current=current+1 equals 2)
}
arrowLeft.addEventListener('click', function() { //click event on the arrow left button
	if (current === 0) { 
		/*
		"===" signal compares variable type and it's value
		"==" only compares value
		So:
		current === 0 checks if current is a number and if it's equal to 0
		current == 0 is the same as current == '0'
		*/
		current = sliderImages.length; //equals the variable to the number of sliderImages and moves the slider to the end
	}
	slideLeft(); //calls slideLeft() function
});
arrowRight.addEventListener('click', function() { //click event on the arrow right button
	if (current === sliderImages.length - 1) {
		current = -1; //moves the slider to the start
	}
	slideRight(); //calls slideLeft() function
});

startSlide(); //calls the startSlide() function




// JS lib. typeWriter copycat atempt
//followed this example https://www.youtube.com/watch?v=POX3dT-pB4E&ab_channel=TraversyMedia
class TypeWriter { 
	/*
	classes in JS are comparable to a Lego block. 
	You create the lego block here, but you don't assign the color, size, or number of sockets.
	*/
	
	constructor(txtElement, words, wait = 3000) { //this is a special method that exists in a class. txtElement, words, and wait ar its arguments.
		//"this" is a reference to the scope
		this.txtElement = txtElement;
		this.words = words;
		this.txt = '';
		this.wordIndex = 0;
		this.wait = parseInt(wait, 10);
		this.type();
		this.isDeleting = false;
	}

	type() { //created function with no arguments
		// Current index of word
		const current = this.wordIndex % this.words.length;
		// Get full text of current word
		const fullTxt = this.words[current];
		// Check if deleting
		if (this.isDeleting) {
			// Remove char
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			// Add char
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}
		// Insert txt into element
		this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
		// Initial Type Speed
		let typeSpeed = 300;
		if (this.isDeleting) {
			typeSpeed /= 2;
		}
		// If word is complete
		if (!this.isDeleting && this.txt === fullTxt) {
			// Make pause at end
			typeSpeed = this.wait;
			// Set delete to true
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			// Move to next word
			this.wordIndex++;
			// Pause before start typing
			typeSpeed = 500;
		}
		setTimeout(() => this.type(), typeSpeed); //waits the time correspondent typeSpeed variable. If typeSpeed=500, then this function runs after 0.5secs.
	}
}

// https://developer.mozilla.org/pt-BR/docs/Web/Events/DOMContentLoaded
document.addEventListener('DOMContentLoaded', init); //listens for the loaded dom content. If "true", then init() function runs.

// init app
function init() {
	const txtElement = document.querySelector('.txt-type'); //const refers to a constant variable
	const words = JSON.parse(txtElement.getAttribute('data-words')); //getAttribute gets the 'data-word' attribute value.
	//JSON.parse converts a JSON object into a JS array
	const wait = txtElement.getAttribute('data-wait');
	// Init TypeWriter
	new TypeWriter(txtElement, words, wait); //calls the class and assigns values to its arguments, that're read in the class to return the TypeWriter
}

// gallery 
const lightbox = document.createElement('div'); //creates a DOM node. In this case, is a div
lightbox.id = 'lightbox'; //assigns an id to the element
document.body.appendChild(lightbox); //appends the created element to the body. This means the element will be added in the end of the body.
const images = document.querySelectorAll('.image-row img');
images.forEach(function(image) { //iterates within the images elements and runs a function for each element
	image.addEventListener('click', function() { //listens for a click event on the image
		lightbox.classList.add('active'); //adds class to the lightbox element
		const img = document.createElement('img'); //creates img DOM element
		img.src = image.src; //assigns the image's source (src="some-value" in the DOM)
		while (lightbox.firstChild) { //checks if the lightbox is the first element inside the images element,
			lightbox.removeChild(lightbox.firstChild); // and while that's true it removes it
		}
		lightbox.appendChild(img); //appends image in the lightbox
	});
});
lightbox.addEventListener('click', function(e) { //listens for a click event on the lightbox
	if (e.target !== e.currentTarget) { //"e" is en event variable in the function's argument. When this argument is true, nothing happens
		return;
	} else { //when the argument is false, removes class from the lightbox element
		lightbox.classList.remove('active');
	}
});



// sound config
var track = new Audio();
/*
The Audio() constructor creates and returns a new HTMLAudioElement which can be either 
attached to a document for the user to interact with and/or listen to, or can be used 
offscreen to manage and play audio.
*/
track.volume = 0.013; //assings value to the track variable
track.src = "assets/Guile_Theme.mp3"; //assings the source of the track variable

var trackwiggle = new Audio();
trackwiggle.volume = 0.025;
trackwiggle.src = "assets/wiggle_wiggle.mp3";

/*function stopAudio() {
	track.stop();
	trackwiggle.stop();
}*/




// nav configs
let navWrap = document.querySelector('.nav-wrapper'), //TODO
	checkBox = document.querySelector('.checkbox'),
	navUl = document.querySelector('.nav-list');
navUl.addEventListener('click', function(e) { //TODO
	if (checkBox.checked) { //checks if checkbox is checked
		checkBox.checked = false; //assigns checkbox attribute to false, which unchecks it
	}
});



//sort
const sort1 = document.querySelector('.gallery-filter1'),
	image1 = document.querySelector('.image-row1'),
	image2 = document.querySelector('.image-row2'),
	projectRow = document.querySelector('.project-row'), //TODO
	sort2 = document.querySelector('.gallery-filter2');
image2.style.display = 'none'; //changes the css display attribute


sort1.addEventListener('click', function(e) {
	e.preventDefault();
	if (image1.classList.contains('sort')) { //verifies if the DOM element has 'sort' in its class list
	} else { //if not, runs next block
		if (image2.classList.contains('sort')) {
			image2.classList.remove('sort');
		}
		image1.classList.add('sort');
		image1.style.display = 'none';
		image2.style.display = 'grid';
	}
});

sort2.addEventListener('click', function(e) {
	e.preventDefault();
	if (image2.classList.contains('sort')) {} else {
		if (image1.classList.contains('sort')) {
			image1.classList.remove('sort');
		}
		image2.classList.add('sort');
		image2.style.display = 'none';
		image1.style.display = 'grid';
	}
});
