var servicepage = () => {
    $(".editservice").on("click", function(e) {
        console.log(e);
        $(".pum-service").fadeIn(400, () => {
            $(".pum-service").toggleClass("pumactive");
            $("html").toggleClass("disabled");
        });
    });
}
servicepage();

var clickoutsideservice = () => {
    $(".pum-service").on("click", (e) => {
        if(e.target.className === "pum-service pumactive") {
            $(".pum-service").fadeOut(400, () => {
                $(".pum-service").toggleClass("pumactive");
                $("html").toggleClass("disabled");
            });
        }
    });
}
clickoutsideservice();

var clickexservice = () => {
    $(".maincontent-service .exittable").click((e) => {
        $(".pum-service").fadeOut(400, () => {
            $(".pum-service").toggleClass("pumactive");
            $("html").toggleClass("disabled");
        });
    });
}
clickexservice();
