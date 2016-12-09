function CallWebAPI()
{
	 var request = new XMLHttpRequest();
	 var num = Math.floor((Math.random() * 10) )%4 + 8;
	 request.open("get", "http://192.168.160.124:29607/ImageLDL/?Id="+num, false);
	 request.send();
	 var obj = JSON.parse(request.responseText);
 	 return obj[0];
}

function CreateDragableElement()
{
	var draggable_element = document.createElement("div");
	draggable_element.setAttribute("id", "draggable-element");
	draggable_element.setAttribute("class", "ui-widget-content");
	draggable_element.setAttribute("style", "position: absolute; color: White; top: 15%; left: 30%;");
	document.body.appendChild(draggable_element);
	//console.log(draggable_element);
	return draggable_element;
}

function LoadNewImage(){
	var draggable_element = CreateDragableElement();
	var image = document.createElement("img");
	image.setAttribute("height", "200");
	image.setAttribute("width", "200");
	draggable_element.appendChild(image);
	var downloadingImage = new Image();
	downloadingImage.onload = function(){
	    image.src = downloadingImage.src;
	}
	img = CallWebAPI();
	downloadingImage.src = img.location;
}
var selected = null, // Object of the element to be moved
    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0, y_elem = 0, // Stores top, left values (edge) of the element
    x_original_pos=0;

// Will be called when user starts dragging an element
function _drag_init(elem) {
    // Store the object of the element which needs to be moved
    selected = elem;
    //console.log("selected element "+ selected);
    x_original_pos = selected.offsetLeft;
    x_elem = x_pos - selected.offsetLeft;  
}

// Will be called when user dragging an element
function _move_elem(e) {
    x_pos = document.all ? window.event.clientX : e.pageX;

    if (selected !== null) {
        x_new_pos = (x_pos - x_elem);
        selected.style.left = (x_pos - x_elem) + 'px';
    }
}

function LoadNewImageWithController(){
	LoadNewImage();
	// Bind the functions...
	document.getElementById('draggable-element').onmousedown = function () {
	    _drag_init(this);
	    return false;
	};
	document.onmousemove = _move_elem;
	document.onmouseup = _destroy;
}

// Destroy the object when we are done
function _destroy() {
    if (selected !== null && Math.abs(x_original_pos - x_new_pos) > 100) {
		msg = (x_original_pos > x_new_pos) ? "disliked the image: " : "liked the image ";
		msg = msg + selected.getElementsByTagName('img')[0].getAttribute('src')
		console.log(msg);
		//console.log("selected.style.left: "+selected.style.left);
		selected = null;
		var elem = document.getElementById("draggable-element");
		elem.parentNode.removeChild(elem);
		LoadNewImageWithController();
	}
}

LoadNewImageWithController();

