var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=GAtXftqpLMuAtERXbrb9eso4eu7TzhBI";

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });