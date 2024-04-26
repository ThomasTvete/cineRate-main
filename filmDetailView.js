// updateFilmDetailView();

function updateFilmDetailView() {
    let index = model.input.filmDetail.movieIndex;
    let movie = model.data.movies[index];
    
    
    document.getElementById('app').innerHTML = /*HTML*/ `
    <h1 class="headerCard">${movie.title}</h1>
    <div class="movieDetails">
        <div class="filmDetailPoster">
            <img src=${movie.poster}/>
        </div>
        <div class="movieInfo">
            <div class="rating">
                Cine-Rating: ${movie.avgRating}/1000
                <button id="reviewButton" onclick="openRevForm()">Legg til din rating</button>
            </div>
            <p>Utgivelsesår: ${movie.releaseYear}</p>
            <p>Lengde: ${runtimeInHours(movie.runtimeInMinutes)}</p>
            <div class="filmDetailGenres">
                ${getGenres(movie)}
            </div>
            <div class="movieDescription">
                ${movie.plotNor}
            </div>
            <div class ="director">
                <h3>Regissør</h3>
                ${movie.director}
            </div>
            <div class="screenwriters">
                <h3>Manusforfattere</h3>
                ${movie.writers.join('</br>')}
            </div>
            <div class="actors">
                <h3>Skuespillere</h3>
                ${movie.actors.join('</br>')}
            </div>
        </div>
    </div>
    <div id="reviewPopUp"></div>
    <div class="reviews">
        <h1 class="headerCard">Anmeldelser</h1>
        <div class="movies_container">${createReviewHTML(movie)}</div>
    </div>

    ${createReviewPop()}

    `;
}

function checkValue(ele){
    let value = Number(ele.value);
    if(value>1000){
        ele.value = 0;
    }else{
        ele.value = value;
    }
}





function createReviewHTML(movie){
    let reviewHTML = '';
    for(let review of model.data.reviews){
        if(movie.id === review.filmId){
        reviewHTML += /*HTML*/ `
        <div class="movie">
    <div class="review">
        <h3 class="heading"onclick="viewProfile(${review.user.id}, '${review.user.name}')"> ${review.user.name}</h3>
      <div class="rating_date">
          <div class="rating">${review.rating}</div>
          <div class="date">${review.createdAt}</div>
      </div>
      <p class="film_review">${review.comment}</p>

      ${model.app.user.id === review.user.id ? ` <div>
      <button class="edit-delete-btn-review" onclick="editReview()">edit</button>
      <button class="edit-delete-btn-review" onclick="deleteReview()">delete</button>
      </div>`:''}

    </div>
  </div>
    `;
        }
    }
    return reviewHTML;
}

function createReviewPop(review){
    let rating = review === undefined ? '' : review.rating;
    let comment = review === undefined ? '' : review.comment;
    let id = review === undefined ? '': review.id;
    let reviewPopUp = /*HTML*/ `
    <div id="reviewForm${id}" class="reviewPop">
        <div class="reviewHeader">
            <h3>Din Cine-Rating</h3>
            <button id="cancelRateBtn" onclick="cancelRating()">X</button>
        </div>
        <div class="reviewRating">
            <label for="userScore">Score:</label>
            <input oninput="checkValue(this)" id="userScore" type="number" min="0" max="1000" value="${rating || ''}"/> 
            <span>/1000</span>
        </div>
        <div class="reviewComment">
            <label for ="userComment">Kommentar:</label>
            <input id="userComment" type="text" value="${comment || ''}"/>
        </div>
        <button onclick="publishReview()">Publiser</button>
    </div>
    `;
    return reviewPopUp;
}
