function init_tweets() {
  var height = Math.max(400, $(".introduction-text").height());
  $(".twitter-timeline").attr("height", height);
}

function init_carousel() {
    var ball_html = "",
        balls_width = 0,
        interval = $(window).width() > 1000 ? 8000 : false; // disable automatic scrolling in carousel on small screens.

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
        interval: interval
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
            return $(".carousel-inner .item:nth-child(" + index +") p:first-child").text().replace(/\s*/, "");
        }
    }).click(function(){
        $("#example-carousel").carousel($(this).index());
    });
}

function get_center_of_element( el ){
  var $el = $( el );
  return $el.width()/2 + $el.position().left;
}

function calculate_position_of_marker(){
  $(".links .marker").each(function(){
    var $this = $(this);
    $this.css("left", get_center_of_element($this.parent().find("a.active")));
  });
}

function init_markers() {
  $(".links > a").click(function(e){
      e.preventDefault();
      var $this = $( this ), // `this` is a link
          id = $this.attr("href"),
          $parent = $this.parent().parent();

      $(".links > a", $parent).removeClass("active");
      $this.addClass("active")

      $(".links .marker", $parent).animate({
          "left": get_center_of_element($this)
      }, 500);

      $(".external-links.active", $parent).fadeOut(function(){
        $(this).removeClass("active"); // `this` is a link navigation elements
        $(id).fadeIn().addClass("active");
      });
  });

  $(window).resize(calculate_position_of_marker);
  calculate_position_of_marker();
}

function init_affix(){
  $("#menu").affix({
    "offset" : $("#menu").offset().top
  });
}

function handle_hash(){
  var separator = "-",
      hash = document.location.hash,
      has_specific_target = new RegExp("^#([-A-Za-z0-9]+)" + separator + "([-A-Za-z0-9]+)"),
      target_link;

  if ( !has_specific_target.test(hash) ){
    return false;
  }

  hash = hash.split( separator );

  if ( hash[1] === '' ){
    return false;
  }

  target_link = $(".links > a[href*='" + hash[1] + "']").first();

  target_link.click();

  $(target_link).promise().done(function(){
    $(document).promise().done(function(){
      $("html, body").animate({
        scrollTop: $(hash[0]).offset().top
      });
    });
  });
}

function init_scrolling() {
  window.onhashchange = handle_hash;
  handle_hash();
}

function init_feature_toggle(){
  var url_params = new URLSearchParams(window.location.search.slice(1));
  if ( url_params.get('show-users') ){
    $("#users").show(0);
  }
}

$(document).ready(function( e ) {
    init_carousel();
    init_markers();
    init_affix();
    init_scrolling();
    init_feature_toggle();
    init_tweets(); // should be last thing to be loaded
});
