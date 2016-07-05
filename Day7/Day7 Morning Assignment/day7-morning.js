var lightbox = document.querySelectorAll(".lightbox")[0];
var color = document.querySelectorAll(".change-color")[0];
function getFormValues() {
	console.log(document.getElementById("first").value);
	console.log(document.getElementById("last").value);
}

function changeColor() {
	color.classList.add("isRed");
}

function toggleImage() {
	lightbox.classList.add("isVisible");
}
function imageBeGone() {
	lightbox.classList.remove("isVisible");
}

document.getElementById("name-btn").onclick = function() {
	getFormValues();
};
document.getElementById("image-btn").onclick = function() {
	toggleImage();
}
document.getElementById("color-btn").onclick = function() {
	changeColor();
}
lightbox.onclick = function() {
	imageBeGone();
} 