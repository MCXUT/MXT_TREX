window.onscroll = () => {myFunction()};
var navbar = document.querySelector(".sectionbar");
var sticky = navbar.offsetTop;

var myFunction = () => {
    console.log("navbaroffset: " + sticky + ", windowOffset: " + window.pageYOffset);
    if(window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}
