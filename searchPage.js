
let movies = model.data.movies;

function updateViewSearchResult() { //func to push suggested movies into an array

    model.app.page = 'search'
    let searchInput = document.getElementById('searchInput').value.toLowerCase();

    let filteredMovies = []; //array for corresponding movies
    let filteredUsers = [];
    let filteredGenres = [];
    let filteredCastCrew = [];

    for (let i = 0; i < movies.length; i++) {//loops through "movies" to find corresponding letters/titles
        if (movies[i].title.toLowerCase().includes(searchInput)) {
            filteredMovies.push(movies[i]);
        }
    }

    for (let user of model.data.users) {
        if (user.name.toLowerCase().includes(searchInput)) {
            filteredUsers.push(user);
        }
    }

    for (let genre of model.data.genres) {
        if (genre.name.toLowerCase().includes(searchInput)
            || genre.engName.toLowerCase().includes(searchInput)) {
            filteredGenres.push(genre);
        }
    };

    for (let movie of model.data.movies) {
        if (movie.director.toLowerCase().includes(searchInput)
            || movie.writers.toString().toLowerCase().includes(searchInput)
            || movie.actors.toString().toLowerCase().includes(searchInput)) {
            filteredCastCrew.push(movie);
        }
    }
    displaySuggestions(filteredMovies, filteredUsers, filteredGenres, filteredCastCrew);//end of func starts display func (for suggested movies)
};

function displaySuggestions(filteredMovies, filteredUsers, filteredGenres, filteredCastCrew) { //filteredmovies as arg
    let suggestions = document.getElementById('app');
    console.log(filteredUsers);

    suggestions.innerHTML = '';
    let movieHitsHtml = '';
    for (let movie of filteredMovies) {
        movieHitsHtml += movieListItem(movie);
    }
    suggestions.innerHTML += /*HTML*/`
    <h1 class="headerCard">Treff i filmnavn</h1>
    <div id="userGenreHit" class="grid-container">${movieHitsHtml}</div>
    `;

    let userHitsHtml = '';
    for (let user of filteredUsers) {
        console.log(user.name);
        userHitsHtml += /*HTML*/`
        <li onclick="viewProfile(${user.id}, '${user.name}')">${user.name}</li>
        `;
    }
    console.log(userHitsHtml);
    suggestions.innerHTML += /*HTML*/`
    <h1 class="headerCard">Treff i brukernavn</h1>
    <div id="userSearchHit">${userHitsHtml}</div>
    `;

    let genreHitsHtml = '';
    for (let genre of filteredGenres) {
        for (let movie of model.data.movies) {
            if (movie.genreIds.includes(genre.id)) {
                genreHitsHtml += movieListItem(movie);
            }
        }
    }
    suggestions.innerHTML += /*HTML*/`
    <h1 class="headerCard">Treff i filmens sjanger</h1>
    <div id="userGenreHit" class="grid-container">${genreHitsHtml}</div>
    `;

    let castCrewHitsHtml = '';
    for (let movie of filteredCastCrew) {
        castCrewHitsHtml += movieListItem(movie);
    }
    suggestions.innerHTML += /*HTML*/`
    <h1 class="headerCard">Treff i cast og crew</h1>
    <div id="userGenreHit" class="grid-container">${castCrewHitsHtml}</div>
    `;

    //page === 'filmDetails') updateFilmDetailView()
}