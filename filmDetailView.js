// updateFilmDetailView();

function updateFilmDetailView() {
    let index = model.input.filmDetail.movieIndex;
    let movie = model.data.movies[index];
    let userReview = checkUserRev();
    console.log("yooo", userReview);
  
    document.getElementById("app").innerHTML = /*HTML*/ `
      <h1 class="headerCard">${movie.title}</h1>
      <div class="movieDetails">
          <div class="filmDetailPoster">
              <img src=${movie.poster}/>
          </div>
          <div class="movieInfo">
              <div class="rating">
                  Cine-Rating: ${movie.avgRating}/1000
  
  
                  ${
                    userReview === false
                      ? model.app.user.id === null
                        ? '<button onclick="showAndHideLogin()">Logg inn for å gi rating</button>'
                        : '<button id="reviewButton" onclick="rateMovie()">Legg til din rating</button>'
                      : `<div>Din rating: ${userReview.rating}</div>`
                  }
                  
              </div>
              <p>Utgivelsesår: ${movie.releaseYear}</p>
              <p>Lengde: ${runtimeInHours(movie.runtimeInMinutes)}</p>
              <div class="filmDetailGenres">
                  ${getGenres(movie)}
              </div>
              <div class="movieDescription">
                  ${movie.plotNor}
              </div>
              ${createCastCrewHTML(movie)}
          </div>
      </div>
      <div id="reviewPopUp"></div>
      <div class="reviews">
          <span  class="headerCard">
          <h1>Anmeldelser</h1>
          <div class="dropdown">
              <button class="dropButton">Sorter etter 🔽</button>
              <div class="dropContent">
              <div onclick='reviewSort("createdAt")'>Tid</div>
              <div onclick='reviewSort("rating")'>Rating</div>
          </div>
        </div>
        </span>
          <div class="movies_container">${createReviewHTML(movie)}</div>
      </div>
  
      <div class="overlay-review hidden">
    ${generateEditReview()}
    </div>
  
      `;
  }
  
  function checkValue(ele) {
    let value = Number(ele.value);
    if (value > 1000) {
      ele.value = 0;
    } else {
      ele.value = value;
    }
  }
  
  function createCastCrewHTML(movie) {
    let directorHTML = /*HTML*/ `
      <div onclick="linkSearch('${movie.director}')">${movie.director}</div>
      `;
    let writersHTML = "";
    for (let writer of movie.writers)
      writersHTML += /*HTML*/ `
      <div onclick="linkSearch('${writer}')">${writer}</div>
      `;
    let actorsHTML = "";
    for (let actor of movie.actors)
      actorsHTML += /*HTML*/ `
      <div onclick="linkSearch('${actor}')">${actor}</div>
      `;
    return /*HTML*/ `
              <div class ="director">
                  <h3>Regissør</h3>
                  ${directorHTML}
              </div>
              <div class="screenwriters">
                  <h3>Manusforfattere</h3>
                  ${writersHTML}
              </div>
              <div class="actors">
                  <h3>Skuespillere</h3>
                  ${actorsHTML}
              </div>
      `;
  }
  
  function createReviewHTML(movie) {
    sortReviews();
    let reviewHTML = "";
    for (let review of model.input.sortReview.tempArray) {
      let profilePic = model.data.users[review.user.id - 1].imageURL;
  
      let date = review.createdAt;
      if (movie.id === review.filmId) {
        reviewHTML += /*HTML*/ `
          <div class="movie">
                  <div>
                  <img style="border-radius:50%; width:80px" src="${profilePic}" >
                  </div>
        
  
                  <div class="review">
                  
                      <h3 class="heading"onclick="viewProfile(${
                        review.user.id
                      }, '${review.user.name}')"> ${review.user.name}</h3>
                  <div class="rating_date">
                      <div class="rating">${review.rating}</div>
                      <div class="date">${review.createdAt.toLocaleDateString()}</div>
                  </div>
                  <p class="film_review">${review.comment}</p>
  
                  ${
                    model.app.user.id === review.user.id
                      ? ` <div>
                  <button class="edit-delete-btn-review" onclick="edit_Review(${review.id})">edit</button>
                  <button class="edit-delete-btn-review" onclick="deleteReview(${review.id})">delete</button>
                  </div>`
                      : ""
                  }
                  
                  </div>
           </div>
          `;
      }
    }
    return reviewHTML;
  }
  
  // function getDate(time){
  //     return time.toLocaleDateString();
  // }
  
  // function createReviewPop(review){
  //     let rating = review === undefined ? '' : review.rating;
  //     let comment = review === undefined ? '' : review.comment;
  //     let id = review === undefined ? '': review.id;
  //     let reviewPopUp = /*HTML*/ `
  //     <div id="reviewForm${id}" class="reviewPop">
  //         <div class="reviewHeader">
  //             <h3>Din Cine-Rating</h3>
  //             <button id="cancelRateBtn" onclick="cancelRating()">X</button>
  //         </div>
  //         <div class="reviewRating">
  //             <label for="userScore">Score:</label>
  //             <input oninput="checkValue(this)" id="userScore" type="number" min="0" max="1000" value="${rating || ''}"/>
  //             <span>/1000</span>
  //         </div>
  //         <div class="reviewComment">
  //             <label for ="userComment">Kommentar:</label>
  //             <input id="userComment" type="text" value="${comment || ''}"/>
  //         </div>
  //         <button onclick="publishReview()">Publiser</button>
  //     </div>
  //     `;
  //     return reviewPopUp;
  // }
  