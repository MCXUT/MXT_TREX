

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


var manipulateAdd = () => {
    return '<div class="subservicecontents">' +
        '<p class="subdivision">서비스</p>' +
        '<select class="selectpickerr" id="choice1" placeholder="서비스를 선택해주세요">' +
            '<% for (var i = 0; i < services.length; i++) { %>' +
                '<option class="serv" value=<%= services[i].serviceCategory %><%= services[i].serviceCategory %></option>' +
            '<% } %>' +
        '</select>' +
        '<select class="selectpickerr" id="choice2">' +
            '<% for (var i = 0; i < services.length; i++) { %>' +
                '<% for (var j = 0; j < services[i].serviceName.length; j++) { %>' +
                    '<option data-option=<%= services[i].serviceCategory %><%= services[i].serviceName[j] %></option>' +
                '<% } %>' +
            '<% } %>' +
        '</select>' +
        '<p class="subdivision">예상 금액</p>' +
        '<input type="text" class="form-control" name="">$' +
        ' ~ ' +
        '<input type="text" class="form-control" name="">$' +
        '<p class="subdivision">커멘트</p>' +
        '<textarea class="form-control" name="name" rows="3"></textarea>' +
        '<button class="btn btn-info deletesection" type="button" name="button">지우기</button>' +
    '</div>';
};

$(document).ready(() => {
    $(".exit").click((e) => {
        e.target.parentElement.parentElement.remove();
    });
});
