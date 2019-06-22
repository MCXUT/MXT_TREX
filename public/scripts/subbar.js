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
