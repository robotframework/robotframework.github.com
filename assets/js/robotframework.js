function init_tweets() {
    $("#tweets").tweet({
        username: "robotframework",
        template: "{text} {time}",
        count: 10
    });
}

function init_carousel() {
    var ball_html = "";
    var balls_width = 0;

    $(".carousel-inner .item").each(function(index) {
        if (index == 0) {
            ball_html += '<div class="carousel-ball active"></div>';
        } else {
            ball_html += '<div class="carousel-ball"></div>';
        }
        balls_width += 22;  // from css (width + border + margin)
    });

    $("#carousel-balls").html(ball_html).width(balls_width);

    $("#example-carousel").carousel({
        interval: 8000
    }).on("slide", function(ev) {
        // index is 0-based, nth-child -selector is 1-based
        var index = $(ev.relatedTarget).index() + 1;
        $(".carousel-ball.active").removeClass("active");
        $(".carousel-ball:nth-child(" + index + ")").addClass("active");
    });

    $(".carousel-ball").popover({
        html: true,
        trigger: "hover",
        placement: "bottom",
        content: function() {
            var index = $(this).index() + 1;
            return $(".carousel-inner .item:nth-child(" + index +")").html();
        }
    }).click(function(){
        $("#example-carousel").carousel($(this).index());
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

function init_scrolling() {
  $("#menu a").click(function(ev) {
      var menu_height = 38;
      var element_position = $(this.href.substring(this.href.indexOf("#"))).offset().top;
      ev.preventDefault();
      $("body").scrollTop(element_position - menu_height);
  });
}

$(document).ready(function() {
    init_tweets();
    init_carousel();
    init_tooltips();
    init_scrolling();
});
