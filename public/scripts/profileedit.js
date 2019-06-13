

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


    confirmbuttons.forEach((confirmbutton) => {
        $(confirmbutton).unbind().click((e) => {
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

                var spans = document.querySelectorAll(".switch");
                spans.forEach((span) => {
                    $(span).toggleClass("active");
                });
            } else if(parentDivisionClass[1] === "serviceinfo") {
                var serviceform = $("#serviceform");
                console.log(serviceform.serialize());
            }
            var spans = document.querySelectorAll(".switch");
            spans.forEach((span) => {
                $(span).toggleClass("active");
            });
        });
    });

    $("#languageform").unbind().submit((e) => {
        var languageform = $("#languageform");
        // console.log(languageform.serialize());
        $.ajax({
            type: languageform.attr("method"),
            url: languageform.attr("action"),
            data: languageform.serialize()
        });

        languageform.reset();

        var addbutton = $(".lang").find(".addbutton");
        $(addbutton).toggleClass("addactive");

        $(".languageinput").remove();

        var spans = document.querySelectorAll(".switch");
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

            } else if(parentDivisionClass[1] === "privateinfo") {
                var spans = document.getElementById("security").querySelectorAll(".switch");
                spans.forEach((span) => {
                    $(span).toggleClass("active");
                });

            }
        });
    })
});

var manipulateAdd = () => {
    return '<div class="row language languageinput">' +
             '<span class="langexit">x</span>' +
             '<input form="languageform" name="langchoice" id="inputState" class="form-control langselect">' +
             '<input form="languageform" name="langproficiency" id="inputState" class="form-control proficiency">' +
        '</div>' +
        '<script>' +
            '$(document).ready(() => {' +
                '$(".langexit").click((e) => {' +
                    'e.target.parentElement.remove();' +
                '});' +
            '});' +
        '</script>';
};

$(document).ready(() => {
    $(".exit").click((e) => {
        e.target.parentElement.parentElement.remove();
    });
});
