function movieListItem(movie){
    let movieItem = /*HTML*/`
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
    return movieItem;
  }