var taskpagination = () => {
    var numoftasks = $(".appointmentlist2 .appointmentcard").length;
    var limitperpage = 4;
    $(".appointmentlist2 .appointmentcard:gt(" + (limitperpage - 1) + ")").hide();
    var totalPages = Math.ceil(numoftasks / limitperpage);
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
