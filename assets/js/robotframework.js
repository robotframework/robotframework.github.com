function init_tweets() {
    $("#tweets").tweet({
        username: "robotframework",
        template: "{text} {time}",
        count: 10
    });
}

function init_carousel() {
    $("#example-carousel").carousel({
        interval: 8000
    });
}

function init_tooltips() {
    $(".sub-section a").tooltip({
        placement: "left"
    });
    $("img").tooltip({
        placement: "right"
    });
}

$(document).ready(function() {
    init_tweets();
    init_carousel();
    init_tooltips();
});
