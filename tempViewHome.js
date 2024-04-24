let movieListHTML = '';
function updateViewHome() {
    movieListHTML = '';
    const app = document.getElementById('app');
    generateTopMovies();
    
    app.innerHTML = /*HTML*/`
    <h1 class="h1Home">Top rangerte filmer</h1>
    <div class="grid-container">
    ${movieListHTML}
    </div>
    `;
}