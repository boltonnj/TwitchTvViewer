$(document).ready(function() {
  $.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?callback=?', function(data) {
    //console.log(data);
    // alert(data.stream.channel.logo);
    if (data.stream === null) {
      $('#fcc').append('<div><h3><i class="fa fa-exclamation-triangle" aria-hidden="true"></i><span class="title">FreeCodeCamp</span> is currently not streaming</h3><div>')
    } else{
    $('#fcc').append('<div><h3><i class="fa fa-thumbs-up" aria-hidden="true"></i>' + data.stream.channel.display_name + '</h3></div><div><a target="_blank" href=' + data.stream.channel.url + '><img src=' + data.stream.channel.logo + '></a>')
    
    $('#fccStatus').append(function(data) {
      status(data);
    });
    } });
});
var search = "";
$("#search").submit(function(event) {

  event.preventDefault();
  search = $('#search :input').val();
  //alert(search);
  searchTwitch(search);
});

//search twitch for input user
function searchTwitch(x) {
  
$.getJSON('https://api.twitch.tv/kraken/search/streams?limit=25&offset=0&q='+encodeURIComponent(x),function(data){
  console.log(data);
  $('#results').empty();
  if(data._total===0){
    
    $('#results').append('<div><h3>' + x + ' is not available.</h3></div>')
  } else
  $.each(data.streams, function(i, item) {
    $('#results').append('<div  class="row entry animated fadeIn"><div class="col-md-4 title"><h3><a target="_blank" href=' + item.channel.url + '>' + '<img src='+item.channel.logo +'> ' + item.channel.display_name + '</a></h3></div><div class="description col-md-8"><p>' + item.channel.status + '</p></div>')
});
});
}

//construct status
function status(x) {
  if (x.stream === null) {
    $(this).append('<div><h4>Status: Offline</h4></div>')
  } else
    $(this).append('<div><h4>Status: ' + x.stream.channel.status + '</h4><br>')
}

//show featured twitch users
$('#featured').on('click', function() {
 $('#results').empty();
  $.getJSON("https://api.twitch.tv/kraken/streams/featured?limit=25&offset=0", function(data){
    console.log(data);
    $.each(data.featured, function(i, item) {
    $('#results').append('<div class="row entry animated fadeIn"><div class="col-md-4 title"><h3><a target="_blank" href=' + item.stream.channel.url + '>' + '<img src='+item.stream.channel.logo +'> ' + item.stream.channel.display_name + '</a></h3></div><div class="description col-md-8"><p>' + item.stream.channel.status + '</p></div>')
    
  });
  });                
});