function init_tweets() {
  $("#tweets").tweet({
      "username": "robotframework"
    , "count": 10
    , "template": "{text} {time}"
  });  

}

function init_carousel() {
  $( "#example-carousel" ).carousel({
    "interval": 8000
  });
  
}

$( document ).ready(function() {
  init_tweets();
  init_carousel();
});