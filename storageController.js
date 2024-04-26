function saveLocalUsers(){
    localStorage.setItem("users", JSON.stringify(model.data.users))
}

function saveLocalReviews(){
    localStorage.setItem("reviews", JSON.stringify(model.data.reviews))
}

function loadLocalStorage(){
    let localReviews = JSON.parse(localStorage.getItem("reviews"));
    console.log(localReviews);
    if(localReviews !== null) for(let review of localReviews) review.createdAt = new Date(review.createdAt);
    // '2024-04-26T11:31:37.646Z'
    let localUsers = JSON.parse(localStorage.getItem("users"));
    if(localReviews !== null) model.data.reviews = localReviews;
    if(localUsers !== null) model.data.users = localUsers;
}