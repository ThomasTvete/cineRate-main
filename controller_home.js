function generateTopMovies() {
  sortArrayByInput('avgRating');
  for (let i = 0; i < model.input.movieAmount; i++) {
      const movie = sortedArray[i];
      movieListHTML += /*HTML*/`
      <div class="grid-box">
          <img src="${movie.poster}" width="300" height="445" onclick="viewFilmDetail(${movie.id-1})">
          <div class="grid-title">${movie.title}</div>
          <div class="grid-movie-info">
              <div class="grid-movie-info a">Utgitt: ${movie.releaseYear}</div>
              <div class="grid-movie-info b">Lengde: ${runtimeInHours(movie.runtimeInMinutes)}</div>
              <div class="grid-movie-info c">Sjanger: </div>
              <div class="grid-movie-info d"> ${getGenres(movie)}</div>
              <div class="grid-movie-info e">Cine-Rating: <span class="ratingNr"> ${movie.avgRating || 0}</span></div>
          </div>
      </div>
      `;
  }
  console.log("Old sorting:");
  console.log(model.data.movies);
  console.log("New sorting:");
  console.log(sortedArray);
}

function chooseMovieAmount(input) {
  document.getElementById("dropDownAmount").classList.toggle("show");
  if (input == 10) {chosenAmount = "Top 10"}
  if (input == 25) {chosenAmount = "Top 25"}
  if (input == 50) {chosenAmount = "Top 50"}
  if (input == 100) {chosenAmount = "Top 100"}
  if (input == 250) {chosenAmount = "Alle filmer"}
  updateDropDownAmount();
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtnHome')) {
    let dropdowns = document.getElementsByClassName("dropdown-content-home");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function changeMovieAmount(ele) {
  model.input.movieAmount = ele;
  updateViewHome();
}