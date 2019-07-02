

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


var taskpagination = () => {
    var numoftasks = $(".appointmentlist2 .appointmentcard").length;
    var limitperpage = 3;
    $(".appointmentlist2 .appointmentcard:gt(" + (limitperpage - 1) + ")").hide();
    var totalPages = Math.round(numoftasks / limitperpage);
    $(".pagination").append('<li class="page-item active"><a class="page-link" href="javascript:void(0)">' + 1 + '</a></li>');

    for(var i = 2; i <= totalPages; i++) {
        $(".pagination").append('<li class="page-item"><a class="page-link" href="javascript:void(0)">' + i + '</a></li>');
    }

    $(".pagination").append('<li class="nextshow"><a class="page-link" href="javascript:void(0)">Next</a></li>');


    $(".pagination li.page-item").on("click", function() {
        if($(this).hasClass("active")) {
            return false;
        } else {
            var currentPage = $(this).index();
            $(".pagination li").removeClass("active");
            $(this).addClass("active");

            $(".appointmentlist2 .appointmentcard").hide();
            var pivot = limitperpage * (currentPage - 1);
            for(var i = pivot; i < pivot + limitperpage; i++) {
                $(".appointmentlist2 .appointmentcard:eq(" + (i) +")").show();
            }
        }
    });

    $(".pagination li.nextshow").on("click", function() {
        var currentPage = $(".pagination li.active").index();
        if(currentPage === totalPages) {
            return false;
        } else {
            currentPage++;
            $(".pagination li").removeClass("active");
            $(".appointmentlist2 .appointmentcard").hide();

            var pivot = limitperpage * (currentPage - 1);

            for(var i = pivot; i < pivot + limitperpage; i++) {
                $(".appointmentlist2 .appointmentcard:eq(" + (i) +")").show();
            }
            $(".pagination li.page-item:eq(" + (currentPage - 1) + ")").addClass("active");
        }
    });

    $(".pagination li.prevshow").on("click", function() {
        var currentPage = $(".pagination li.active").index();
        if(currentPage === 1) {
            return false;
        } else {
            currentPage--;
            $(".pagination li").removeClass("active");
            $(".appointmentlist2 .appointmentcard").hide();

            var pivot = limitperpage * (currentPage - 1);

            for(var i = pivot; i < pivot + limitperpage; i++) {
                $(".appointmentlist2 .appointmentcard:eq(" + (i) +")").show();
            }
            $(".pagination li.page-item:eq(" + (currentPage - 1) + ")").addClass("active");
        }
    });
}
taskpagination();

var ratingpage = () => {
    $(".subcontainer a").on("click", function(e) {
        $(".pum").fadeIn(400, () => {
            $(".pum").toggleClass("pumactive");
            $("html").toggleClass("disabled");
        });
        var partnername = $(this).parent().children(".taskcontent").text();
        $(".nameofpartner").html(partnername);
    });
}
ratingpage();

var clickoutside = () => {
    document.querySelector(".pum").addEventListener("click", (e) => {
        if(e.target.className === "pum pumactive") {
            $(".pum").fadeOut(400, () => {
                $(".pum").toggleClass("pumactive");
                $("html").toggleClass("disabled");
                $("#ratingform").trigger("reset");
            });
        }
    });
}
clickoutside();

var clickex = () => {
    $(".exittable").click((e) => {
        $(".pum").fadeOut(400, () => {
            $(".pum").toggleClass("pumactive");
            $("html").toggleClass("disabled");
            $("#ratingform").trigger("reset");
        });
    });
}
clickex();

var formsubmit = () => {
    $("#ratingform").submit(function(e) {
        e.preventDefault();
        console.log($(this).serialize());
    });
}
formsubmit();
