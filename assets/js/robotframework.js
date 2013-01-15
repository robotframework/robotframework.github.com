function init_tweets() {
  $( ".news.container > p" ).first().after( '<div id="tweets"></div>' );
  $("#tweets").tweet({
    "username": "robotframework"
  });  

}

function init_carousel() {
  var $examples = $( ".examples.container" ),
      $heading = $( "#examples > h2" ), 
      $carousel_html = $('<div class="carousel-inner"></div>');
      $carousel_template = [$('<div id="example-carousel" class="carousel slide"></div>')
        , [
              $('<a class="carousel-control left" href="#example-carousel" data-slide="prev">&lsaquo;</a>')
            , $('<a class="carousel-control right" href="#example-carousel" data-slide="next">&rsaquo;</a>')
          ]
      ];

  // create carousel items from examples on the page
  $examples.each(function( index ){
    if ( index == 0 ){
      $carousel_html.append( $('<div class="item active">' + this.innerHTML + '</div>') );
    } else {
      $carousel_html.append( $('<div class="item">' + this.innerHTML + '</div>') );      
    }
  });

  // create final DOM for carousel by adding carousel items and navigation to container element
  $carousel_html = $carousel_template[ 0 ].append( $carousel_html ).append( $carousel_template[1] );  

  $( "#examples" ).html( [$heading, $carousel_html] );
  $( "#example-carousel" ).carousel();
  
}

$( document ).ready(function() {
  init_tweets();
  init_carousel();
  
  $( "#menu" ).scrollspy().find("a").click(function(){
    console.log('click');
    $(this).scrollspy( "refresh" );
  });
  
});