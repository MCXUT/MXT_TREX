

$(document).ready(() => {
    var editbuttons = document.querySelectorAll("#edit");
    var confirmbuttons = document.querySelectorAll("#confirm");
    var cancelbuttons = document.querySelectorAll("#cancel");

    // editbuttons.forEach((editbutton) => {
    //     $(editbutton).click((e) => {
    //         // e.preventDefault();
    //
    //         var parentDivision = editbutton.parentElement;
    //         var parentDivisionClass = parentDivision.className.split(" ");
    //         var allButtons = parentDivision.querySelectorAll("button");
    //         allButtons.forEach((button) => {
    //             $(button).toggleClass("activebutton");
    //         });
    //
    //         if(parentDivisionClass[1] === "basicinfo") {
    //             var spans = document.querySelectorAll(".switch");
    //             spans.forEach((span) => {
    //                 $(span).toggleClass("active");
    //             });
    //         } else if(parentDivisionClass[1] === "languageinfo") {
    //             $(".language").remove();
    //
    //             var langinfo = "";
    //             console.log(langinfo);
    //             // for(var i = 0; )
    //             $(".lang").append(manipulateAdd);
    //
    //
    //             var addbutton = $(".lang").find(".addbutton");
    //             $(addbutton).toggleClass("addactive");
    //
    //             $(addbutton).off().click((e) => {
    //                 $(".lang").append(manipulateAdd());
    //             });
    //         }
    //     });
    // });


    // confirmbuttons.forEach((confirmbutton) => {
    //     $(confirmbutton).unbind().click((e) => {
    //         var parentDivision = confirmbutton.parentElement;
    //         var parentDivisionClass = parentDivision.className.split(" ");
    //         var allButtons = parentDivision.querySelectorAll("button");
    //         allButtons.forEach((button) => {
    //             $(button).toggleClass("activebutton");
    //         });
    //
    //         if(parentDivisionClass[1] === "basicinfo") {
    //
    //             var basicinfoform = $("#basicinfoform");
    //             // console.log($(basicinfoform).serialize());
    //             $.ajax({
    //                 type: basicinfoform.attr("method"),
    //                 url: basicinfoform.attr("action"),
    //                 data: basicinfoform.serialize()
    //             });
    //
    //             basicinfoform.reset();
    //
    //             var spans = document.getElementById("basic").querySelectorAll(".switch");
    //             spans.forEach((span) => {
    //                 $(span).toggleClass("active");
    //             });
    //         } else if(parentDivisionClass[1] === "serviceinfo") {
    //             var serviceform = $("#serviceform");
    //             console.log(serviceform.serialize());
    //         }
    //         var spans = document.querySelectorAll(".switch");
    //         spans.forEach((span) => {
    //             $(span).toggleClass("active");
    //         });
    //     });
    // });

    $("#privateinfoform").unbind().submit((e) => {
        var privateinfoform = $("#privateinfoform");
        // e.preventDefault();
        $.ajax({
            type: privateinfoform.attr("method"),
            url: privateinfoform.attr("action"),
            data: privateinfoform.serialize()
        });

        privateinfoform.reset();

        var spans = document.getElementById("security").querySelectorAll(".switch");
        spans.forEach((span) => {
            $(span).toggleClass("active");
        });
    });

    cancelbuttons.forEach((cancelbutton) => {
        $(cancelbutton).click((e) => {
            // e.preventDefault();
            var parentDivision = cancelbutton.parentElement;
            var parentDivisionClass = parentDivision.className.split(" ");
            var allButtons = parentDivision.querySelectorAll("button");
            allButtons.forEach((button) => {
                $(button).toggleClass("activebutton");
            });

            if(parentDivisionClass[1] === "basicinfo") {
                var spans = document.getElementById("basic").querySelectorAll(".switch");
                spans.forEach((span) => {
                    $(span).toggleClass("active");
                });

            } else if(parentDivisionClass[1] === "languageinfo") {
                var addbutton = $(".lang").find(".addbutton");
                $(addbutton).toggleClass("addactive");

                $(".language").toggleClass("disable");
                $(".languageinput").remove();
            } else if(parentDivisionClass[1] === "photoinfo") {
                var spans = document.getElementById("photo").querySelectorAll(".switch");
                spans.forEach((span) => {
                    $(span).toggleClass("active");
                });

            } else if(parentDivisionClass[1] === "coverphotoinfo") {
                var spans = document.getElementById("coverphoto").querySelectorAll(".switch");
                spans.forEach((span) => {
                    $(span).toggleClass("active");
                });

            } else if(parentDivisionClass[1] === "privateinfo") {
                var spans = document.getElementById("security").querySelectorAll(".switch");
                spans.forEach((span) => {
                    $(span).toggleClass("active");
                });

            } else if(parentDivisionClass[1] === "deleteinfo") {
                var spans = document.getElementById("deleteAccount").querySelectorAll(".switch");
                spans.forEach((span) => {
                    $(span).toggleClass("active");
                });

            }
        });
    })
});




$(document).ready(() => {
    $(".exit").click((e) => {
        e.target.parentElement.parentElement.remove();
    });
});
