$(document).ready(() => {
    // var editbutton = document.getElementById("edit");
    // var confirmbutton = document.getElementById("confirm");
    // var cancelbutton = document.getElementById("cancel");
    var editbuttons = document.querySelectorAll("#edit");
    var confirmbuttons = document.querySelectorAll("#confirm");
    var cancelbuttons = document.querySelectorAll("#cancel");

    editbuttons.forEach((editbutton) => {
        $(editbutton).click((e) => {
            e.preventDefault();

            var parentDivision = editbutton.parentElement;
            var parentDivisionClass = parentDivision.className.split(" ");
            var allButtons = parentDivision.querySelectorAll("button");
            allButtons.forEach((button) => {
                $(button).toggleClass("activebutton");
            });

            if(parentDivisionClass[1] === "basicinfo") {
                var spans = document.querySelectorAll(".switch");
                spans.forEach((span) => {
                    $(span).toggleClass("active");
                });
            }
        });
    });


    confirmbuttons.forEach((confirmbutton) => {
        $(confirmbutton).click((e) => {
            var parentDivision = confirmbutton.parentElement;
            var parentDivisionClass = parentDivision.className.split(" ");
            var allButtons = parentDivision.querySelectorAll("button");
            allButtons.forEach((button) => {
                $(button).toggleClass("activebutton");
            });

            if(parentDivisionClass[1] === "basicinfo") {

                var basicinfoform = $("#basicinfoform");
                // console.log($(basicinfoform).serialize());
                $.ajax({
                    type: basicinfoform.attr("method"),
                    url: basicinfoform.attr("action"),
                    data: basicinfoform.serialize()
                });
                basicinfoform.reset();

                var spans = document.querySelectorAll(".switch");
                spans.forEach((span) => {
                    $(span).toggleClass("active");
                });
            }
        });
    });

    cancelbuttons.forEach((cancelbutton) => {
        $(cancelbutton).click((e) => {
            e.preventDefault();
            var parentDivision = cancelbutton.parentElement;
            var parentDivisionClass = parentDivision.className.split(" ");
            var allButtons = parentDivision.querySelectorAll("button");
            allButtons.forEach((button) => {
                $(button).toggleClass("activebutton");
            });

            if(parentDivisionClass[1] === "basicinfo") {
                var spans = document.querySelectorAll(".switch");
                spans.forEach((span) => {
                    $(span).toggleClass("active");
                });
            }
        });
    })
});
