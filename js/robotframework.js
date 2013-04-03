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

function repeat_str( str, count ) {
  /*
    - Make new array with `count` length
    - Join it with `str` + `separator`
    - Remove trailing `separator`
    - Split by separator
  */
  var separator = "##SEPARATOR##"
  return (new Array(count+1)).join(str + separator).slice(0, -separator.length).split(separator);
}

function wrap_elements( xml_elements ) {
  var result = [],
      placeholder = "||REPLACE||",
      containers = repeat_str('<div class="column one-thirds">' + placeholder + '</div>', 3);

  if ( $(document).width() >= 1000) { // if user is on small screen, use 2-by-2 layout, otherwise use 3-by-3

    while ( xml_elements.length > 2 ) {

      if ( result.length < 1 ) {
        result = result.concat(containers.map(function( item ){
          return item.replace(placeholder, xml_elements.splice(0, 1) + placeholder);
        }));
      } else {
        for (var i=0; i < 3; i++) {
          result[i] = result[i].replace(placeholder, xml_elements.splice(0, 1) + placeholder)
        }
      }
    }

    result = result.map(function( item ){
      return item.replace(placeholder, "");
    });
  }

  while ( xml_elements.length > 1 ) {
    containers = repeat_str('<div class="column half">' + placeholder + '</div>', 2);
    result = result.concat(containers.map(function( item ){
      return item.replace(placeholder, xml_elements.splice(0, 1));
    }));
  }

  if ( xml_elements.length == 1 ){
    result = result.concat('<div class="column full">' + xml_elements[0] + "</div>");
  }

  return result;
}

function htmlize( xml_elements ) {
  if ( xml_elements.length < 1 ) {
    throw "No XML elements!";
  }

  // xml_elements is a jQuery object ie. array-like;
  //  therefore `map()` is the jQuery version instead of regular Javascript version
  return xml_elements.map(function(){
    var $entry = $( this ),
        title = $entry.find("title:first").text(),
        // http://www.youtube.com/watch?v=<id>&feature=youtube_gdata => http://www.youtube.com/embedded/<id>
        url = $entry.find("link:first").attr("href").replace("watch?v=", "embed/").replace(/&feature.*/, "");
    return '<div class="link"><iframe width="300" height="170" frameborder="0" allowfullscreen="allowfullscreen" src="' + url + '" /><br />' + title + '</div>';
  });
}

function init_videos() {
  var result_html;
  console.log(jQuery.browser.version);
  if ( !jQuery.support.leadingWhitespace || (jQuery.browser.msie && jQuery.browser.version.split("")[0] == "9") ){ // if IE 7, 8 or 9
    result_html = '<h2 style="text-align: center;">Please visit our <a href="http://www.youtube.com/watch?v=zpenQJcrBNg&list=PL86v15KhLn_HZb_-qmiDM4V8C3x_EgzWk" target="_blank">Youtube playlist</a></h2>'
  } else {
    jQuery.get("https://gdata.youtube.com/feeds/api/playlists/PL86v15KhLn_HZb_-qmiDM4V8C3x_EgzWk?v=2", function( data ){
      result_html = htmlize($(data).find("entry"));
      result_html = wrap_elements(result_html);
    });
  }
  $("#docs-videos").append(result_html);
}

$(document).ready(function() {

    init_carousel();
    init_markers();
    init_affix();
    init_videos();
    init_tweets(); // should be last thing to be loaded
});
