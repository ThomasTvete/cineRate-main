function generateLogin() {
    return /*HTML*/ `
    <div id="login" class="overlay hidden">
    <div class="categories">
    <h3 class="category-heading">Logg inn:</h3>
    <div>
    <label for="userNameLogin">Brukernavn</label>
    <input id="userNameLogin" type="text"/>    
    </div>
    <div>
    <label for="userPasswordLogin">Passord</label>
    <input id="userPasswordLogin" type="text"/>    
    </div>

    <div class="btn-container">
        <button onclick="showAndHideLogin()" class="btn">Avbryt</button>
        <button onclick="checkLogin()" class="btn">Logg inn</button>
    </div>
    <div class="btn-container">
        <button onclick="toggleLoginSignup()" class="btn">Lag ny bruker</button>
    </div>

    </div>
    </div>
    `;
}
function generateSignup() {
    let categoriesHtml = '';
    for (let genre of model.data.genres) {
        categoriesHtml += /*HTML*/ `<label class="label-category" ><input type="checkbox" id="signup${genre.id
            }" name="${genre.name}" value="${genre.name}" class="check-box" 
    
    > &nbsp;${genre.name}</label><br>`;
    }
    return /*HTML*/ `
    <div id="signup" class="overlay hidden">
    <div class="categories">
    <h3 class="category-heading">Lag bruker:</h3>
    <div>
    <label for="userNameSignup">Brukernavn</label>
    <input id="userNameSignup" type="text"/>    
    </div>
    <div>
    <label for="userPasswordSignup">Passord</label>
    <input id="userPasswordSignup" type="text"/>    
    </div>

    <h3 class="category-heading">Velg sjangerinteresser:</h3>
  <div class="category-checkbox">
  ${categoriesHtml}
  </div>

  <h3 class="category-heading">Link til profilbilde:</h3>
  <div>
  <input id="userImageLink" type="text"/>    
  </div>

    <div class="btn-container">
        <button onclick="showAndHideSignup()" class="btn">Avbryt</button>
        <button onclick="createUser()" class="btn">Registrer bruker</button>
    </div>
    <div class="btn-container">
        <button onclick="toggleLoginSignup()" class="btn">Tilbake til Logg inn</button>
    </div>

    </div>
    </div>
    `;
}

function showAndHideLogin() {
    const overlay = document.querySelector("#login");
    overlay.classList.toggle("hidden");
}
function showAndHideSignup() {
    const overlay = document.querySelector("#signup");
    overlay.classList.toggle("hidden");
}
function toggleLoginSignup() {
    showAndHideLogin();
    showAndHideSignup();
}


function createUser() {
    let name = document.getElementById('userNameSignup').value;
    let password = document.getElementById('userPasswordSignup').value;
    let image = document.getElementById('userImageLink').value;
    let chosenGenres = [];

    for (let genre of model.data.genres){
        if(document.getElementById(`signup${genre.id}`).checked) chosenGenres.push(genre.id)
    }

    const user = {
        id: model.data.users.length + 1,
        name: `${name}`,
        password: `${password}`,
        userSince: `${todaysDate()}`,
        interests: [...chosenGenres],
        imageURL: `${image}`,

    }
    model.data.users.push(user);
    saveLocalUsers();
    model.app.user = user;
    showAndHideSignup();
    navLoggedIn();
}


function checkLogin() {
    let userName = document.getElementById('userNameLogin').value;
    let password = document.getElementById('userPasswordLogin').value;

    for (let user of model.data.users) {
        console.log(user);
        if (user.name === userName && user.password === password) {
            model.app.user = user;
            navLoggedIn();
        }

    }
}