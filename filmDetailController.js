function viewFilmDetail(index){
    model.app.page = 'filmDetails';
    model.input.filmDetail.movieIndex = index;
    updateView();
}

function publishReview(){
    let index = model.input.filmDetail.movieIndex;
    let movie = model.data.movies[index];
    let comment = document.getElementById('userComment').value;
    let score = Number(document.getElementById('userScore').value);

    const review = {
        id: model.data.reviewHistory.length + 1,
        rating: score,
        comment: `${comment}`,
        createdAt: new Date(),
        user: {id: model.app.user.id, name: model.app.user.name},
        filmId: movie.id,

    }
    model.data.reviews.push(review);
    model.data.reviewHistory.push(review);
    saveLocalReviews();
    updateRating();
    viewFilmDetail(index);
}


// function openRevForm(review){
   
//     if(model.app.user.id===null){
//         console.log("loginnn");
//         document.getElementById("reviewButton").innerHTML = "Login first to continue";
//         document.getElementById("reviewButton").style.width="150px";
//         showAndHideLogin();
//         return;
//     }
//     let reviewForm = review === undefined ? 
//     document.getElementById("reviewForm") :
//     document.getElementById(`reviewForm${review.id}`)

//     let reviewFormID = review === undefined ? 'reviewForm' : `reviewForm${review.id}`;
//     // console.log(reviewFormName);
//     let reviewFormDiv = document.getElementById(`${reviewFormID}`);
//     console.log(reviewFormDiv);

//     console.log(reviewForm);

//     let reviewButton = review === undefined ?
//     document.getElementById("reviewButton") :
//     document.getElementById(`editRevButton${review.id}`);

//     reviewFormDiv.style.display = "block";
//     reviewFormDiv.style.left = reviewButton.offsetLeft + "px";
//     reviewFormDiv.style.top = (reviewButton.offsetTop + reviewButton.offsetHeight) + "px";
// }

// function cancelRating(){
//     let reviewForm = document.getElementById("reviewForm");

//     reviewForm.style.display = "none";
// }

