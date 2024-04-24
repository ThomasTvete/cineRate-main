function viewFilmDetail(index){
    model.app.page = 'filmDetails';
    model.input.filmDetail.movieIndex = index;
    updateView();
}

function publishReview(){
    let index = model.input.filmDetail.movieIndex;
    let movie = model.data.movies[index];
    let comment =document.getElementById('userComment').value;
    let score = Number(document.getElementById('userScore').value);

    const review = {
        id: model.data.reviews.length + 1,
        rating: score,
        comment: `${comment}`,
        createdAt: `${todaysDate()}`,
        user: {id: model.app.user.id, name: model.app.user.name},
        filmId: movie.id,

    }
    model.data.reviews.push(review);
    saveLocalReviews();
    updateRating();
    viewFilmDetail(index);
}


function openRevForm(review){
    let reviewForm = review === undefined ? 
    document.getElementById("reviewForm") :
    document.getElementById(`reviewForm${review.id}`)

    let reviewFormID = review === undefined ? 'reviewForm' : `reviewForm${review.id}`;
    // console.log(reviewFormName);
    let reviewFormDiv = document.getElementById(`${reviewFormID}`);
    console.log(reviewFormDiv);

    console.log(reviewForm);

    let reviewButton = review === undefined ?
    document.getElementById("reviewButton") :
    document.getElementById(`editRevButton${review.id}`);

    reviewFormDiv.style.display = "block";
    reviewFormDiv.style.left = reviewButton.offsetLeft + "px";
    reviewFormDiv.style.top = (reviewButton.offsetTop + reviewButton.offsetHeight) + "px";
}

function cancelRating(){
    let reviewForm = document.getElementById("reviewForm");

    reviewForm.style.display = "none";
}

