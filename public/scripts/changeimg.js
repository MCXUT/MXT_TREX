var picHover = () => {
    $(".mainimg").hover(
        function(e) {
            $(this).removeClass("down").addClass("up");
        },
        function(e) {
            $(this).removeClass("up").addClass("down");
        }
    );
}
picHover();

var backgroundHover = () => {
    $(".backgroundimg").hover(
        function(e) {
            $(this).removeClass("out").addClass("in");
        },
        function(e) {
            $(this).removeClass("in").addClass("out");
        }
    )
}
backgroundHover();

var picClick = () => {
    $(".mainimg").on("click", function(e) {
        $(".pumimg").fadeIn(400, () => {
            $(".pumimg").toggleClass("pumactive");
        });
    });
}
picClick();

var bckClick = () => {
    $(".backgroundimg").on("click", function(e) {
        $(".pumbck").fadeIn(400, () => {
            $(".pumbck").toggleClass("pumactive");
        });
    });
}
bckClick();

var clickoutside = () => {
    document.querySelector(".pumimg").addEventListener("click", (e) => {
        if(e.target.className === "pumimg pumactive") {
            $(".pumimg").fadeOut(400, () => {
                $(".pumimg").toggleClass("pumactive");
            });
        }
    });
}
clickoutside();

var clickoutside2 = () => {
    document.querySelector(".pumbck").addEventListener("click", (e) => {
        if(e.target.className === "pumbck pumactive") {
            $(".pumbck").fadeOut(400, () => {
                $(".pumbck").toggleClass("pumactive");
            });
        }
    });
}
clickoutside2();

var clickex = () => {
    $(".exittable").click((e) => {
        if($(".pumimg").hasClass("pumactive")) {
            $(".pumimg").fadeOut(400, () => {
                $(".pumimg").toggleClass("pumactive");
            });
        } else if($(".pumbck").hasClass("pumactive")) {
            $(".pumbck").fadeOut(400, () => {
                $(".pumbck").toggleClass("pumactive");
            });
        }
    });
}
clickex();
