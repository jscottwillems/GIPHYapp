$(document).ready(function(){

  var topics = ['test', 'test2', 'test3', 'test4'];

  
  renderButtons();
  
  function renderButtons() {
    
    $('#buttons').empty();
    
    for (var i = 0; i < topics.length; i++) {
      
      var a = $('<button type ="button" class ="btn btn-sm">');
      a.addClass('newButton');
      a.attr('data-name', topics[i]);
      a.text(topics[i]);
      
      $('#buttons').append(a);
    };
  };
  
  
  $('.newButton').on('click', function() {
    
    $('#gifHolder').empty();
    var input = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=GAtXftqpLMuAtERXbrb9eso4eu7TzhBI&limit=10"
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      
      console.log(response)
      
      var results = response.data;
      
      for (var i = 0; i < results.length; i++) {
        
        var gifDiv = $('<div>');

        var p = $('<p>');
        
        var rating = results[i].rating.toUpperCase();
        
        if (rating == ''){
          p.text("Not rated");
        }
        else {
          p.text("Rated " + rating);
        }
        
        var gifImg = $('<img>');
        gifImg.addClass('gifImg')
        gifImg.attr('src', results[i].images.fixed_height_small_still.url);
        gifImg.attr('data-still', results[i].images.fixed_height_small_still.url);
        gifImg.attr('data-active', results[i].images.fixed_height_small.url);
        
        gifDiv.append(p);
        gifDiv.append(gifImg);
        
        $('#gifHolder').prepend(gifDiv);
        
      }
      
      $('img').on('click', function(e) {
        
        console.log(e);
        
        var current = e.currentTarget.dataset.still;
        var active = e.currentTarget.dataset.active;
        var still = e.currentTarget.dataset.still;
        
        if (current == still) {
          $(this).attr('src', active);
          current = active;
        } else {
          $(this).attr('src', still);
          current = still;
        }
      });
      
    })
  });
  
      $('#submitBtn').on('click', function(event) {
        event.preventDefault();
    
        var topic = $('#search').val().trim();
    
        topics.push(topic);
    
        renderButtons();
    
        $('form')[0].reset();
      
  })
})