function saveLocalUsers(){
    localStorage.setItem("users", JSON.stringify(model.data.users))
}

function saveLocalReviews(){
    localStorage.setItem("reviews", JSON.stringify(model.data.reviews))
}

function loadLocalStorage(){
    let localReviews = JSON.parse(localStorage.getItem("reviews"));
    let localUsers = JSON.parse(localStorage.getItem("users"));
    if(localReviews !== null) model.data.reviews = localReviews;
    if(localUsers !== null) model.data.users = localUsers;
}