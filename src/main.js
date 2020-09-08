import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

function displayGifs(response) {
  let html = "";
  $(".show-gif").text("");
  for (let i = 0; i < response.data.length; i++) {
    html = "";
    html += `<div class="card center-card" >`;
    html += `<img src=${response.data[i].images.original.url} class="card-img-top center-img" style="width: ${response.data[i].images.original.width}px;" >`;
    html += '<div class="card-body">';
    html += `<p class="card-text">${response.data[i].title}</p>`;
    html += "</div></div>";

    $(".show-gif").append(html);
  }
}
function displayRandomGif(response) {
  let html = "";
  $(".show-gif").text("");
 
    html = "";
    html += `<div class="card center-card" >`;
    html += `<img src=${response.data.images.original.url} class="card-img-top center-img" style="width: ${response.data.images.original.width}px;" >`;
    html += '<div class="card-body">';
    html += `<p class="card-text">${response.data.title}</p>`;
    html += "</div></div>";

    $(".show-gif").append(html);
}

$(document).ready(function () {
  $("#gif-input-btn").click(function () {
    const search = $("#gif-input").val();
    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=25&offset=0&rating=g&lang=en`;
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        displayGifs(response); //function to write to ui
      }
    };
    try{
      request.open("GET", url, true);
      request.send();
    } catch(error) {
      console.error(`We have an error: ${error.message}`);
    }
  });

  $('#trending').click(function() {
    let request = new XMLHttpRequest();
    const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=25&rating=pg-13`
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        displayGifs(response); //function to write to ui
      }
    };
      request.open("GET", trendingUrl, true);
      request.send();
  })

  $('#random').click(function() {
    let request = new XMLHttpRequest();
    const randomUrl = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=pg-13`
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        displayRandomGif(response); //function to write to ui
      }
    };
      request.open("GET", randomUrl, true);
      request.send();
  })
});
