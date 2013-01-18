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

function init_scrolling(){
  $( "#menu a" ).click(function( ev ) {
    var menu_height = 38,
        element_position = $( this.href.substring(this.href.indexOf("#")) ).offset().top;

    ev.preventDefault();
    $("body").scrollTop( element_position - menu_height );

  });
}

$(document).ready(function() {
    init_tweets();
    init_carousel();
    init_tooltips();
    init_scrolling();
});
