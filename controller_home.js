function generateTopMovies() {
  sortArrayByInput(model.input.sortBy);
  for (let i = 0; i < model.input.movieAmount; i++) {
    const movie = sortedArray[i];
    movieListHTML += /*HTML*/`
    <div class="grid-box">
        <span class="pointer"><img src="${movie.poster}" width="300" height="445" onclick="viewFilmDetail(${movie.id - 1})"></span>
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
  model.input.movieAmount = input;
  document.getElementById("dropDownAmount").classList.toggle("show");
  if (input == 10) { chosenAmount = "Top 10" }
  if (input == 25) { chosenAmount = "Top 25" }
  if (input == 50) { chosenAmount = "Top 50" }
  if (input == 100) { chosenAmount = "Top 100" }
  if (input == model.data.movies.length) { chosenAmount = "Alle filmer" }
  updateDropDownAmount();
}

window.onclick = function (event) {
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


function sortArrayByInput(input) {
  let movieArray = model.input.userFilterMovies.length !== 0 ? model.input.userFilterMovies : model.data.movies;
  /*   let input = model.input.sortBy; */
  console.log("input:", input);
  sortedArray = model.data.movies.slice().sort(
    (a, b) => (a[input] < b[input]) ? 1 : (a[input] > b[input]) ? -1 : 0
  );
  model.input.sortBy = input;
}

function newSorting(input) {

  updateView();
}

function filterByInterest() {
  let userMovies = model.input.userFilterMovies;
  if (userMovies.length < 1) {
    for (let genreID of model.app.user.interests) {
      for (let movie of model.data.movies) {
        if (movie.genreIds.includes(genreID)
          && !userMovies.includes(movie)) {
          userMovies.push(movie);
        }
      }
    }
  }
  else userMovies = [];
}