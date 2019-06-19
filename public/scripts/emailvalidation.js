var viewproficiency = () => {
    document.querySelector(".validatepopup").addEventListener("click", (e) => {
        e.preventDefault();
        var email = $(".form-control.validate").val();
        $.ajax({
            type: "post",
            url: "/auth/register/partner/emailVerify",
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

var clicksubmit = () => {
    $("button.validationform").click((e) => {
        var email = $(".form-control.validate").val();
        document.querySelector(".hiddeninput").value = email;

        $("#formvalidation").submit();
        // if($("input.validationform").val() === "1234") {
            $(".pum").animate({
                opacity: 0.1,
                top: "-20px"
            }, 400, () => {
                $(".pum").toggleClass("pumactive");
                $("html").toggleClass("disabled");
                $(".btn-primary.disabled").toggleClass("disabled")
            });
        // }
    });
}
clicksubmit();

var clickex = () => {
    $(".exittable").click((e) => {
        $(".pum").animate({
            opacity: 0.1,
            top: "-50px"
        }, 500, () => {
            $(".pum").toggleClass("pumactive");
            $("html").toggleClass("disabled");
        });
    });
}
clickex();
