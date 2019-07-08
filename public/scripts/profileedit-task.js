var taskpagination = () => {
    var numoftasks = $(".appointmentlist2 .appointmentcard").length;
    var limitperpage = 3;
    $(".appointmentlist2 .appointmentcard:gt(" + (limitperpage - 1) + ")").hide();
    var totalPages = Math.round(numoftasks / limitperpage);
    $(".pagination2").append('<li class="page-item active"><a class="page-link" href="javascript:void(0)">' + 1 + '</a></li>');

    for(var i = 2; i <= totalPages; i++) {
        $(".pagination2").append('<li class="page-item"><a class="page-link" href="javascript:void(0)">' + i + '</a></li>');
    }

    $(".pagination2").append('<li class="nextshow"><a class="page-link" href="javascript:void(0)">Next</a></li>');


    $(".pagination2 li.page-item").on("click", function() {
        if($(this).hasClass("active")) {
            return false;
        } else {
            var currentPage = $(this).index();
            $(".pagination2 li").removeClass("active");
            $(this).addClass("active");

            $(".appointmentlist2 .appointmentcard").hide();
            var pivot = limitperpage * (currentPage - 1);
            for(var i = pivot; i < pivot + limitperpage; i++) {
                $(".appointmentlist2 .appointmentcard:eq(" + (i) +")").show();
            }
        }
    });

    $(".pagination2 li.nextshow").on("click", function() {
        var currentPage = $(".pagination2 li.active").index();
        if(currentPage === totalPages) {
            return false;
        } else {
            currentPage++;
            $(".pagination2 li").removeClass("active");
            $(".appointmentlist2 .appointmentcard").hide();

            var pivot = limitperpage * (currentPage - 1);

            for(var i = pivot; i < pivot + limitperpage; i++) {
                $(".appointmentlist2 .appointmentcard:eq(" + (i) +")").show();
            }
            $(".pagination2 li.page-item:eq(" + (currentPage - 1) + ")").addClass("active");
        }
    });

    $(".pagination2 li.prevshow").on("click", function() {
        var currentPage = $(".pagination2 li.active").index();
        if(currentPage === 1) {
            return false;
        } else {
            currentPage--;
            $(".pagination2 li").removeClass("active");
            $(".appointmentlist2 .appointmentcard").hide();

            var pivot = limitperpage * (currentPage - 1);

            for(var i = pivot; i < pivot + limitperpage; i++) {
                $(".appointmentlist2 .appointmentcard:eq(" + (i) +")").show();
            }
            $(".pagination2 li.page-item:eq(" + (currentPage - 1) + ")").addClass("active");
        }
    });
}
taskpagination();

var taskpagination4 = () => {
    var numoftasks = $(".appointmentlist4 .appointmentcard").length;
    var limitperpage = 3;
    $(".appointmentlist4 .appointmentcard:gt(" + (limitperpage - 1) + ")").hide();
    var totalPages = Math.round(numoftasks / limitperpage);
    $(".pagination4").append('<li class="page-item active"><a class="page-link" href="javascript:void(0)">' + 1 + '</a></li>');

    for(var i = 2; i <= totalPages; i++) {
        $(".pagination4").append('<li class="page-item"><a class="page-link" href="javascript:void(0)">' + i + '</a></li>');
    }

    $(".pagination4").append('<li class="nextshow"><a class="page-link" href="javascript:void(0)">Next</a></li>');


    $(".pagination4 li.page-item").on("click", function() {
        if($(this).hasClass("active")) {
            return false;
        } else {
            var currentPage = $(this).index();
            $(".pagination4 li").removeClass("active");
            $(this).addClass("active");

            $(".appointmentlist4 .appointmentcard").hide();
            var pivot = limitperpage * (currentPage - 1);
            for(var i = pivot; i < pivot + limitperpage; i++) {
                $(".appointmentlist4 .appointmentcard:eq(" + (i) +")").show();
            }
        }
    });

    $(".pagination4 li.nextshow").on("click", function() {
        var currentPage = $(".pagination4 li.active").index();
        if(currentPage === totalPages) {
            return false;
        } else {
            currentPage++;
            $(".pagination4 li").removeClass("active");
            $(".appointmentlist4 .appointmentcard").hide();

            var pivot = limitperpage * (currentPage - 1);

            for(var i = pivot; i < pivot + limitperpage; i++) {
                $(".appointmentlist4 .appointmentcard:eq(" + (i) +")").show();
            }
            $(".pagination4 li.page-item:eq(" + (currentPage - 1) + ")").addClass("active");
        }
    });

    $(".pagination4 li.prevshow").on("click", function() {
        var currentPage = $(".pagination4 li.active").index();
        if(currentPage === 1) {
            return false;
        } else {
            currentPage--;
            $(".pagination4 li").removeClass("active");
            $(".appointmentlist4 .appointmentcard").hide();

            var pivot = limitperpage * (currentPage - 1);

            for(var i = pivot; i < pivot + limitperpage; i++) {
                $(".appointmentlist4 .appointmentcard:eq(" + (i) +")").show();
            }
            $(".pagination4 li.page-item:eq(" + (currentPage - 1) + ")").addClass("active");
        }
    });
}
taskpagination4();

var ratingpage = () => {
    $(".subcontainer a").on("click", function(e) {
        $(".pumrate").fadeIn(400, () => {
            $(".pumrate").toggleClass("pumactive");
            $("html").toggleClass("disabled");
        });
        var partnername = $(this).parent().children(".taskcontent").text();
        $(".nameofpartner").html(partnername);
        $("#ratingform").attr("action", "/user_profile/tasks/rating/" + $(this).attr("id"));
    });
}
ratingpage();

var clickoutsiderate = () => {
    $(".pumrate").on("click", (e) => {
        if(e.target.className === "pumrate pumactive") {
            $(".pumrate").fadeOut(400, () => {
                $(".pumrate").toggleClass("pumactive");
                $("html").toggleClass("disabled");
                $("#ratingform").trigger("reset");
            });
        }
    });
}
clickoutsiderate();

var clickexrate = () => {
    $(".maincontent-rate .exittable").click((e) => {
        $(".pumrate").fadeOut(400, () => {
            $(".pumrate").toggleClass("pumactive");
            $("html").toggleClass("disabled");
            $("#ratingform").trigger("reset");
        });
    });
}
clickexrate();

var formsubmit = () => {
    $("#ratingform").submit(function(e) {
        // e.preventDefault();
        $(this).submit();
    });
}
formsubmit();

var sendRequestEmail = () => {
    $(".subcontainer button").on("click", function(e) {
        $("#paymentemail").attr("action", "/user_profile/tasks/payment/" + $(this).attr("id"));
        $("#paymentemail").submit();
    });
}
sendRequestEmail();
