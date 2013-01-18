function init_tweets() {
    $("#tweets").tweet({
        username: "robotframework",
        template: "{text} {time}",
        count: 10
    });
}

function init_carousel() {
    var ball_html = "",
        index;

    $( ".carousel-inner .item" ).each(function( index ){
      if ( index < 1){
        ball_html += '<div class="carousel-ball active"></div>';
      } else {
        ball_html += '<div class="carousel-ball"></div>';
      }
    });

    $("#carousel-balls").html( ball_html );

    $("#example-carousel").carousel({
        interval: 8000
    }).on( "slide", function( ev ){
      index = $(ev.relatedTarget).index() + 1; // index is 0-based, nth-child -selector is 1-based
      $( ".carousel-ball.active" ).removeClass( "active" );
      $( ".carousel-ball:nth-child(" + index + ")" ).addClass( "active" );
    });

    $( ".carousel-ball" ).popover({
      "html": true,
      "trigger": "hover",
      "content": function(){
        var index = $( this ).index() + 1;
        return $( ".carousel-inner .item:nth-child(" + index +")" ).html();
      }
    }).click(function(){
      $( "#example-carousel" ).carousel( $(this).index() );
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
