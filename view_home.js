let movieListHTML = '';
let chosenAmount = "Top 10";
let amountDropDownButton = "";
let sortDropDownButton = "";
let chosenSorting = "Sjanger";
function updateViewHome() {
    movieListHTML = '';
    const app = document.getElementById('app');
    generateTopMovies();
    updateDropDownAmount();
    
    app.innerHTML = /*HTML*/`
        <div>
            <span class="h1Home"><h1>Topprangerte filmer</h1>
                <div class="dropDownHTML">${amountDropDownButton}</div>
            </span>
            
            <div class="grid-container">${movieListHTML}</div>
        </div>
    `;
}

function updateDropDownAmount() {
    amountDropDownButton = /*HTML*/`
        <div id="dropDownHome">
            <button onclick='chooseMovieAmount(this)' class="dropbtnHome">${chosenAmount} ⇵</button>
            <div id="dropDownAmount" class="dropdown-content-home">
                <button onclick='chooseMovieAmount(10); goHome();'>10</button>
                <button onclick='chooseMovieAmount(25); goHome();'>25</button>
                <button onclick='chooseMovieAmount(50); goHome();'>50</button>
                <button onclick='chooseMovieAmount(100); goHome();'>100</button>
                <button onclick='chooseMovieAmount(model.data.movies.length); goHome();'>Alle</button>
            </div>            
        </div>
    `
}