var onexpand = (toPut, toHide) => {
    document.getElementById("expand").addEventListener("click", (e) => {
        e.preventDefault();
        $(".readmore").toggleClass("readactive");
        $(".readless").toggleClass("readactive");
        toPut[49] = toPut[49].replace("...", "");
        document.getElementById("basicContent").textContent = toPut.join(" ") + " " + toHide.join(" ");
    });
}

var oncollapse = (toPut) => {
    document.getElementById("collapse").addEventListener("click", (e) => {
        e.preventDefault();
        $(".readmore").toggleClass("readactive");
        $(".readless").toggleClass("readactive");
        toPut[49] += "...";
        document.getElementById("basicContent").textContent = toPut.join(" ");
    });
}

$(document).ready(() => {
    var words = document.getElementById("basicContent").textContent.split(" ");
    if(words.length > 50) {
        words[49] += "...";
        var toPut = words.slice(0, 50);
        var toHide = words.slice(50);

        document.getElementById("basicContent").textContent = toPut.join(" ");
        $(".readmore").toggleClass("readactive");
    }

    onexpand(toPut, toHide);
    oncollapse(toPut);
});
