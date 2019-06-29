$(document).ready(() => {
    $(".loginaspartner").click((e) => {
        var loginasclient = $(".loginasclient");
        var loginaspartner = $(".loginaspartner");

        if(!loginaspartner.hasClass("active")) {
            console.log(loginasclient.attr("class"))
            loginaspartner.toggleClass("active");
            loginasclient.toggleClass("active");

            $(".partnerform").toggleClass("active");
            $(".clientform").toggleClass("active");
        }
    });

    $(".loginasclient").click((e) => {
        var loginasclient = $(".loginasclient");
        var loginaspartner = $(".loginaspartner");


        if(!loginasclient.hasClass("active")) {
            loginasclient.toggleClass("active");
            loginaspartner.toggleClass("active");

            $(".clientform").toggleClass("active");
            $(".partnerform").toggleClass("active");
        }
    });
});
