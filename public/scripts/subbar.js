// $(document).ready(() => {
    window.onscroll = () => {myFunction()};
    var navbar = document.querySelector(".sectionbar");
    var sticky = navbar.offsetTop;

    var myFunction = () => {
        if(window.pageYOffset >= sticky) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    }

// });


$(document).ready(function(){
// Add smooth scrolling to all links
$("a").on('click', function(event) {

  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {
    if(this.hash !== "#login" && this.hash !== "#signup" && this.hash !== "#profile") {
        //console.log(this.hash);
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top - 45
        }, 800, function(){

          // Add hash (#) to URL when done scrolling (default click behavior)
          // window.location.hash = hash;
        });
    }
  } // End if
});
});
