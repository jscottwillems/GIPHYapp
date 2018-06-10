$(document).ready(function(){

  var topics = ['The Office', 'Parks and Rec', 'Tim and Eric', 'Eric Andre'];

  
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

  $(document).on('click', '.newButton', showGifs)
  
  function showGifs() {
    
    //$('#gifHolder').empty();
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
        gifDiv.addClass('gifImg');

        var p = $('<p>');
        p.addClass('gifRating');
        
        var rating = results[i].rating.toUpperCase();
        
        if (rating == ''){
          p.text("Not rated");
        }
        else {
          p.text("Rated " + rating);
        }
        
        var gifImg = $('<img>');
        gifImg.attr('src', results[i].images.fixed_height_still.url);
        gifImg.attr('data-still', results[i].images.fixed_height_still.url);
        gifImg.attr('data-active', results[i].images.fixed_height.url);
        
        gifDiv.append(p);
        gifDiv.append(gifImg);
        
        $('#gifHolder').prepend(gifDiv);
        
      }
      
      $('img').on('click', function(e) {
        
        console.log(e);
        
        var current = $(this).attr('src');
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
  };
  
      $('#submitBtn').on('click', function(event) {
        event.preventDefault();
    
        var topic = $('#search').val().trim();
    
        topics.push(topic);
    
        renderButtons();
    
        $('form')[0].reset();
      
  })
      $('#backToTop').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop:0}, '300');
  });
})