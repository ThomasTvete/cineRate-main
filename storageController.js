function saveLocalUsers(){
    localStorage.setItem("users", JSON.stringify(model.data.users))
}

function saveLocalReviews(){
    localStorage.setItem("reviews", JSON.stringify(model.data.reviews));
    localStorage.setItem("reviewHistory", JSON.stringify(model.data.reviewHistory));
}

function loadLocalStorage(){
    let localReviews = JSON.parse(localStorage.getItem("reviews"));
    let localReviewHistory = JSON.parse(localStorage.getItem("reviewHistory"));
    console.log(localReviews);
    let localUsers = JSON.parse(localStorage.getItem("users"));
    if(localReviews !== null) {
        for(let review of localReviews) {
            review.createdAt = new Date(review.createdAt);
            // '2024-04-26T11:31:37.646Z'
        }
        model.data.reviews = localReviews;
    }
    if(localUsers !== null) model.data.users = localUsers;
    if(localReviewHistory !== null) model.data.reviewHistory = localReviewHistory;
}