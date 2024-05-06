function loadPage(){
    loadLocalStorage();
    updateRating();
    updateView();
}

function updateView() {
    let page = model.app.page;
    
    if (page === 'home') updateViewHome('avgRating');
    else if (page === 'search') updateViewSearchResult();
    else if (page === 'userProfile') updateProfileView();
    else if (page === 'filmDetails') updateFilmDetailView();
}

// function getGenres(movie){
//     const genres = [];
//     for (let movieGenre of movie.genreIds){
//         for(let genre of model.data.genres){
//             if(movieGenre === genre.id) genres.push(genre.name)
//         }
//     }
//     return genres.join(', ');
// }

function getGenres(movie){
    let genresHTML = '';
    for (let movieGenre of movie.genreIds){
        for(let genre of model.data.genres){
            if(movieGenre === genre.id) {
                genresHTML += /*HTML*/ `
                <span class="pointer" onclick="linkSearch('${genre.name}')">${genre.name} &nbsp</span>
                `;
            }
        }
    }
    return genresHTML;
}

function runtimeInHours(runtime){
    let time = parseInt(runtime);
    if(time < 60) return time;
    else {
        let hours = Math.floor(time/60);
        let minutes = time % 60;
        let hoursAndMinutes = `${hours}t ${minutes}m`;
        return hoursAndMinutes;
    };
}

function todaysDate(){
    let date = new Date();
    let today = (date.getDate() < 10 ? '0' : '') + date.getDate() + '/' + ((date.getMonth() +1) < 10 ? '0' : '') + (date.getMonth() +1) + '/' + date.getFullYear();
    return today;
}


function updateRating(){
    for(movie of model.data.movies){
        let movieScores =[];
        let sum =0;
        let avg =0;
        for(review of model.data.reviews){
            if(movie.id === review.filmId) movieScores.push(review.rating);
        }
        // console.log(movieScores);
        for (score of movieScores) sum += score;
        // console.log(sum);
        avg = Math.floor(sum/movieScores.length);
        // console.log(avg);
        movie.avgRating = avg || 0;
    }
}

function linkSearch(word){
            model.input.searchBar = word.toLowerCase();
            model.app.page = 'search';
            updateView();
        }

function reviewSort(input){
  model.input.sortReview.by = input;
  updateView();
}

function sortReviews() {
    let sortOrder = model.input.sortReview.by;
    console.log("input:",sortOrder);
    model.input.sortReview.tempArray = model.data.reviews.slice().sort(
        (a, b) => (a[sortOrder] < b[sortOrder]) ? 1 : (a[sortOrder] > b[sortOrder]) ? -1 : 0
    );
}