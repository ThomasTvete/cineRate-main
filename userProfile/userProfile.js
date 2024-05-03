let userArray = null;
console.log(getUser());
let interestsArrObj = null;
let interestsArrStr = null;
let newCategoryArr = null;
let editReviewData = null;
let editReviewIndex = null;
let userImage = null;
let newImage = null;
// userProfile();

// function userProfile() {
//   if (model.app.user === null) {
//     console.log("Login to continue");
//   } else {
//     userInfo();
//   }
// }

function getUser() {
  return model.data.users.filter(
    (user) => user.name === model.input.userPage.name
  );
}

function getUserInterestsCategoryNum() {
  return model.data.genres.filter((genre) =>
    userArray[0].interests.includes(genre.id)
  );
}

function mappingNumCategoriesWithString() {
  return interestsArrObj.map((x) => x.name);
}

function copyStringCategory() {
  return JSON.parse(JSON.stringify(interestsArrStr));
}

function updateProfileView() {
  console.log(model.input.userPage);
  userArray = getUser();
  console.log(userArray);
  interestsArrObj = getUserInterestsCategoryNum();
  interestsArrStr = mappingNumCategoriesWithString();
  newCategoryArr = copyStringCategory();
  const root = document.querySelector("#app");
  const userObj = userArray[0];
  console.log(userObj);
  const userName = userObj.name;
  const id = userObj.id;
  const imageUrl = userObj.imageURL;
  const interestsIds = userObj.interests;
  userImage = imageUrl;
  console.log("imageURL : ", userImage);
  console.log("id : ", id);
  console.log("name : ", userName);
  console.log("interests : ", interestsIds);
  const interestsArr = getInterests(interestsIds);
  console.log("Interests : ", interestsArr.join(", "));
  sortReviews();

  const userReviews = model.input.sortReview.tempArray.filter(
    (review) => review.user.id === id
  );
  console.log(userReviews);

  const userProfileInfo = generateUserInfo(userName, interestsArr, imageUrl);
  root.innerHTML = /*HTML*/ `<div class="profile">${userProfileInfo}</div>
  <h1 class="reviews-heading" >Anmeldelser: <div class="dropdown">
            <button class="dropButton">Sorter etter 🔽</button>
            <div class="dropContent">
            <div onclick='reviewSort("createdAt")'>Tid</div>
            <div onclick='reviewSort("rating")'>Rating</div>
        </div></h1>
  <div class="movies_container">${getReviewsData(userReviews)}</div>
  <div class="overlay-review hidden">
  ${generateEditReview()}
  </div>
  `;
}

//////////////////////////
function getInterests(arr) {
  let interests = [];
  for (let ele of arr) {
    for (let obj of model.data.genres) {
      if (obj.id === ele) {
        interests.push(obj.name);
      }
    }
  }
  return interests;
}

function getReviewsData(userReviews) {
  let reviewsData = "";

  for (let review of userReviews) {
    let movieId = review.filmId;
    let userReview = review.comment;
    let rating = review.rating;
    let createdAt = review.createdAt;
    let reviewID = review.id;
    let userID = review.user.id;
    console.log("userID : ", userID);
    let userURL = model.data.users.filter((u) => {
      if (u.id === userID) return u.imageURL;
    });
    console.log("image url : ", userURL[0].imageURL);

    const moviesDetails = model.data.movies.filter(
      (movie) => movie.id === movieId
    );
    //console.log(moviesDetails);

    reviewsData += /*HTML*/ `
    <div class="movie">
    <div class="poster_div"><img class="poster"  src="${
      moviesDetails[0].poster
    }" alt="film poster" onclick="viewFilmDetail(${movieId - 1})"></div>
    <div class="review">
            <h3 class="heading">${moviesDetails[0].title}</h3>
            <div class="rating_date">
                <div class="rating">${rating}</div>
                <div class="date">${createdAt.toLocaleDateString()}</div>
            </div>
      <p class="film_review">${userReview}</p>

      ${
        model.app.user.id === model.input.userPage.id
          ? ` <div>
      <button class="edit-delete-btn-review" onclick="edit_Review(${reviewID})">edit</button>
      <button class="edit-delete-btn-review" onclick="deleteReview(${reviewID})">delete</button>
      </div>`
          : ""
      }

    </div>
  </div>
    `;
  }
  return reviewsData;
}

function generateUserInfo(name, interests, imgUrl) {
  return /*HTML*/ `
  <div class="profile-container">
    <img class="profile-image" src="${imgUrl}" alt="user image">
    <div class="info">
      <h2 class="user-name">${name}</h2>
      <p class="category"><span class="info-category">Likte sjangere: </span>${
        interests.sort().join(", ") || "ingen"
      }</p>
      ${
        model.app.user.id === model.input.userPage.id
          ? `<button onclick="updateCategories()" class="edit">Redigere sjangere ✍🏻</button>&nbsp; <button onclick="updateImage()" class="edit">Endre bildet 🌠</button>`
          : ""
      }
      
    </div>
  </div>
  <div id="genreChoices" class="overlay hidden">
  <div class="categories">
  <h3 class="category-heading">Velg Sjanger:</h3>
  <div class="category-checkbox">
  ${generateCategories()}
  </div>
  
  <div class="btn-container">
      <button onclick="unselectNewCategories()" class="btn">Avbryt</button>
      <button onclick="updateCategoryArr()" class="btn">Godkjent</button>
  </div>
  </div>
  </div>



  <div id="imageChoices" class="overlay hidden scroll">
  <div class="categories">
  <h3 class="category-heading">Velg Bildet:</h3>
 
  <div >
      <div class="category-checkbox">
      ${generateImages()}
      </div>
  </div>
  
  <div class="btn-container">
      <button onclick="unselectNewImage()" class="btn">Avbryt</button>
      <button onclick="updateUserImage()" class="btn">Godkjent</button>
  </div>

  </div>
  </div>

  `;
}

/* function getUserInfo() {
  const user = model.app.user;
  for (let obj of model.data.users) {
    if (obj.userName === user) {
      console.log("userName : ", user);
      return obj;
    }
  }
} */

function generateCategories() {
  let categoriesHtml = "";
  for (let genre of model.data.genres) {
    categoriesHtml += /*HTML*/ `<label class="label-category" ><input onchange="getValue(this)" type="checkbox" id="${
      genre.id
    }" name="${genre.name}" value="${genre.name}" class="check-box" 
    ${newCategoryArr.includes(genre.name) ? "checked" : ""} 
    
    > &nbsp;${genre.name}</label><br>`;
  }
  return categoriesHtml;
}
function generateImages() {
  let categoriesHtml = "";
  for (let image of model.data.images) {
    categoriesHtml += /*HTML*/ `<div class="user-image"><input id="${image}" onchange="getValue(this)" type="radio"  name="imageSource" value="${image}" class="check-box" 
    ${image === userImage ? "checked" : ""}>
     &nbsp;<label for="${image}"  class="label-category" ><img src="${image}" class="user-img"></label></div>`;
  }
  console.log("newImage : ", newImage);
  return categoriesHtml;
}

function getValue(ele) {
  console.log(ele.value);
  const category = ele.value;
  if (newCategoryArr.includes(category)) {
    newCategoryArr.splice(newCategoryArr.indexOf(category), 1);
    console.log(newCategoryArr.sort());
  } else {
    newCategoryArr.push(category);
    console.log(newCategoryArr.sort());
  }
}

function updateCategoryArr() {
  const objArray = model.data.genres.filter((genre) =>
    newCategoryArr.includes(genre.name)
  );

  const numArray = objArray.map((x) => x.id);
  userArray[0].interests = JSON.parse(JSON.stringify(numArray));

  interestsArrObj = getUserInterestsCategoryNum();
  interestsArrStr = mappingNumCategoriesWithString();

  newCategoryArr = copyStringCategory();
  //newCategoryArr = JSON.parse(JSON.stringify([]));
  showAndHideOverlay();
  updateProfileView();
}

function updateUserImage() {
  var ele = document.getElementsByName("imageSource");

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) newImage = ele[i].value;
  }
  console.log("newImage : ", newImage);
  userImage = newImage;
  ////////

  console.log("userdata : ", userArray);
  userArray[0].imageURL = newImage;
  saveLocalUsers();
  ////////
  showAndHideOverlay();
  updateProfileView();
}

function updateCategories() {
  showAndHideOverlay();
}

function updateImage() {
  const overlayImage = document.querySelector("#imageChoices");
  overlayImage.classList.toggle("hidden");
}

function showAndHideOverlay() {
  const overlay = document.querySelector("#genreChoices");
  overlay.classList.toggle("hidden");
}

function unselectNewCategories() {
  console.log("avbryt");
  interestsArrObj = getUserInterestsCategoryNum();
  interestsArrStr = mappingNumCategoriesWithString();

  newCategoryArr = copyStringCategory();
  console.log("newCategoryArr: ", newCategoryArr);
  showAndHideOverlay();
  updateProfileView();
}

function unselectNewImage() {
  console.log("avbryt");

  showAndHideOverlay();
  updateProfileView();
}

function edit_Review(reviewID) {
  toggleEditContainer();
  // updateView();
  console.log("review :", reviewID);

  let reviewToDelete = model.data.reviews.filter(
    (review) => review.id === reviewID
  );
  console.log("delete: ", reviewToDelete);
  const index = model.data.reviews.indexOf(reviewToDelete[0]);
  editReviewIndex = index;
  console.log("editReviewIndex : ", editReviewIndex);
  editReviewData = copyReviewData(index);
  console.log("editReviewData : ", editReviewData);

  updateView();
  toggleEditContainer();
}

function rateMovie() {
  toggleEditContainer();
  updateView();
  toggleEditContainer();
}

function toggleEditContainer() {
  const overlayReview = document.querySelector(".overlay-review");
  overlayReview.classList.toggle("hidden");
}
function copyReviewData(index) {
  let reviewDataToEdit = model.data.reviews[index];
  console.log(reviewDataToEdit);
  return JSON.parse(JSON.stringify(reviewDataToEdit));
}

function deleteReview(reviewID) {
  console.log("review :", reviewID);
  let reviewToDelete = model.data.reviews.filter(
    (review) => review.id === reviewID
  );
  console.log("delete: ", reviewToDelete);
  const index = model.data.reviews.indexOf(reviewToDelete[0]);
  model.data.reviews.splice(index, 1);
  saveLocalReviews();
  updateRating();
  updateView();
}

function checkUserRev() {
  let index = model.input.filmDetail.movieIndex;
  let movie = model.data.movies[index];
  let userID = model.app.user.id;

  for (let review of model.data.reviews) {
    if (review.filmId === movie.id && review.user.id === userID) return review;
  }
  return false;
}

function generateEditReview() {
  console.log("data in generateEditReview : ", editReviewData);
  let rating = editReviewData?.rating;
  let comment = editReviewData?.comment;
  console.log(rating, " - > ", comment);
  let hasRated = checkUserRev();
  console.log(hasRated);
  let buttonHTML =
    hasRated === false
      ? `<button onclick="publishReview()" class="btn">Godkjent</button>`
      : '<button onclick="updateReview()" class="btn">Godkjent</button>';

  return /*HTML*/ `
  <div class="edit-review-container">
  <div class="edit-container">
  <label>Rating:</label><input id="userScore" oninput="checkValue(this); editReviewData.rating=Number(this.value)"  class="input-rating" type="number" placeholder="mellom 0-1000" value="${
    rating || 0
  }"/>

  <label >Comment:</label><textarea id="userComment" oninput="editReviewData.comment = this.value" class="input-rating input-comment" rows="10" cols="50">${
    comment || ""
  }</textarea>

 <div> 
      <button onclick="cancelUpdateReview()" class="btn">Avbryt</button>
      ${buttonHTML}
 </div>
</div>
</div>
  `;
}

function cancelUpdateReview() {
  toggleEditContainer();
}

function updateReview() {
  let dateTime = new Date();
  // let day = `${dateTime.getDate() + 1}`.padStart(2, 0);
  // let month = `${dateTime.getMonth() + 1}`.padStart(2, 0);
  // let year = dateTime.getFullYear();
  // let createdAt = `${day}/${month}/${year}`;

  editReviewData = { ...editReviewData, createdAt: dateTime };
  model.data.reviews[editReviewIndex] = editReviewData;

  toggleEditContainer();
  saveLocalReviews();
  updateRating();
  updateView();
}
