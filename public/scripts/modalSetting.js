// Open Modal

document.getElementById("").addEventListener("click", (e) => {
    document.querySelector("#loginModal").style.display = "block";
});

document.getElementById("").addEventListener("click", (e) => {
    document.querySelector("#registerModal").style.display = "block";
});

document.getElementById("loginhagi").addEventListener("click", (e) => {
    document.querySelector("#loginModal").style.display = "block";
    document.querySelector("#registerModal").style.display = "none";
});

document.getElementById("registerhagi").addEventListener("click", (e) => {
    document.querySelector("#registerModal").style.display = "block";
    document.querySelector("#loginModal").style.display = "none";
});


// Close Modal

document.getElementById("close_loginModal").addEventListener("click", (e) => {
    document.querySelector("#loginModal").style.display = "none";
});

document.getElementById("close_registerModal").addEventListener("click", (e) => {
    document.querySelector("#registerModal").style.display = "none";
});


// Close Modal(clicked outside the modal)
document.getElementById("registerModal").addEventListener("click", (e) => {
    if(e.target.className == "modal in modal_site_login") {
        document.getElementById("registerModal").style.display = "none";
    }
});

document.getElementById("loginModal").addEventListener("click", (e) => {
    if(e.target.className == "memberModalLogin modal fade in") {
        document.getElementById("loginModal").style.display = "none";
    }
});
