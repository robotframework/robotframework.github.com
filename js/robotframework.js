function init_tweets() {
    $("#tweets").tweet({
        username: "robotframework",
        template: "{text}",
        count: 10,
        loading_text: "Trying to load tweets..."
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
        balls_width += 23;  // from css (width + border + margin)
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

function get_center_of_element( el ){
  var $el = $( el );
  return $el.width()/2 + $el.position().left;
}

function init_markers() {
  $(".links > a").click(function( e ){
    e.preventDefault();
    var $this = $( this ), // `this` is a link
        id = $this.attr("href"),
        $parent = $this.parent().parent();


    $(".links > a", $parent).removeClass("active");
    $this.addClass("active")

    $(".links .marker", $parent).animate({
        "left": get_center_of_element($this)
    }, 1500);
    
    $(".external-links.active", $parent).fadeOut(function(){
      $(this).removeClass("active"); // `this` is a link navigation elements
      $(id).fadeIn().addClass("active");
    });
    
  });
  
  // calculate marker positions at the start
  $first_link = $(".links > a:first-child");
  $(".links .marker").each(function(){
    var $this = $(this);
    $this.css("left", get_center_of_element($this.parent().find("a:first-child")));
  });
  
}

function init_affix(){
  $("#menu").affix({
    "offset" : $("#menu").offset().top
  });  
}

$(document).ready(function() {

    init_carousel();
    init_markers();
    init_affix();
    init_tweets(); // should be last thing to be loaded
});
