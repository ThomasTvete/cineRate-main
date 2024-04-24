let movieListHTML = '';
let chosenAmount = "10";
let amountDropDownButton = "";
function updateViewHome() {
    movieListHTML = '';
    const app = document.getElementById('app');
    generateTopMovies();
    updateDropDownAmount();
    
    app.innerHTML = /*HTML*/`
        <div>
            <span class="h1Home"><h1>Top rangerte filmer</h1><div class="dropDownHTML">${amountDropDownButton}</div></span>
            
            <div class="grid-container">
            ${movieListHTML}
            </div>
        </div>
    `;
}

function updateDropDownAmount() {
    amountDropDownButton = /*HTML*/`
        <div id="dropDownHome">
            <button onclick='chooseMovieAmount(this)' class="dropbtnHome">Vis: ${chosenAmount}</button>
            <div id="dropDownAmount" class="dropdown-content-home">
                <button onclick='changeMovieAmount(10)'>10</button>
                <button onclick='changeMovieAmount(25)'>25</button>
                <button onclick='changeMovieAmount(50)'>50</button>
                <button onclick='changeMovieAmount(100)'>100</button>
                <button onclick='changeMovieAmount(250)'>Alle</button>
            </div>            
        </div>
    `
}