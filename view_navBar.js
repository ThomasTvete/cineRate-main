// Not finished and not fully functional.
let isLoggedIn = false;
let navBar = document.getElementById("navigationBar");
let navBarCenter = "Cine-rate"; // Replace with image later
let navBarRight = null;

function navLoggedIn() {
    navBarRight = /*HTML*/`
    <button id="navButton" onclick="viewProfile(${model.app.user.id}, '${model.app.user.name}')">My Profile</button>
    <button id="navButton" onclick="navLoggedOut()">Log Out</button>
    `;
    isLoggedIn = true;
    updateNavBar();
}

function navLoggedOut() {
    navBarRight = /*HTML*/`<button id="navButton" onclick="navLoggedIn()">Log In</button>`;
    isLoggedIn = false;
    updateNavBar();
}

navCheckLogInState();
function navCheckLogInState() {
    if (isLoggedIn == true) {
        navLoggedIn();
    } else if (isLoggedIn == false) {
        navLoggedOut();
    }
}

function updateNavBar() {
    navBar.innerHTML = /*HTML*/`
    <div id="navBar">
        <div id="navBarLeft">
            <button id="navButton" onclick="goHome()">Home</button>
        </div>

        <div id="navBarCenter">
            ${navBarCenter}
        </div>

        <div id="navBarRight">
            ${navBarRight}
        </div>
    </div>
    
    <div id="navSearchBar">
       <div class="searchDiv">
            <span class="searchIcon"><img src="images/searchIcon.png"/></span>
            <input type='text' placeholder='Search..' id='searchInput' onkeypress="search(this)"/>
       </div>
    </div>
    `
}

function search(ele) {
    if(event.keyCode === 13) {
        updateViewSearchResult(ele)
        document.getElementById("searchInput").value = "";
    }
}

function goHome() {
    model.app.page = "home";
    updateView();
}