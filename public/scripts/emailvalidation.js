var viewproficiency = () => {
    document.querySelector(".validatepopup").addEventListener("click", (e) => {
        e.preventDefault();
        var email = $(".form-control.validate").val();
        $.ajax({
            type: "post",
            url: "/validate",
            data: {
                email: email
            }
        });
        $(".pum").animate({
            opacity: 1,
            top: "0"
        }, 0, () => {
            $(".pum").toggleClass("pumactive");
            $("html").toggleClass("disabled");
        });

    });
}
viewproficiency();

// var clicksubmit = () => {
//     $("button.validationform").submit((e) => {
//         e.preventDefault();
//         var code = $("input.validationform").val();
//         $.ajax({
//             type: "post",
//             url: "/validate/code",
//             data: {
//                 code: code
//             }
//         });
//         // if($("input.validationform").val() === "1234") {
//             $(".pum").animate({
//                 opacity: 0.1,
//                 top: "-20px"
//             }, 400, () => {
//                 $(".pum").toggleClass("pumactive");
//                 $("html").toggleClass("disabled");
//                 $(".btn-primary.disabled").toggleClass("disabled")
//             });
//         // }
//     });
// }
// clicksubmit();
