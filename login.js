function generateLogin(){
    return /*HTML*/ `
    <div class="login hidden">
    <div class="categories">
    <h3 class="category-heading">Lag bruker:</h3>
    <div>
    <label for="userName">Brukernavn</label>
    <input id="userName" type="text"/>    
    </div>
    <div>
    <label for="userPassword">Passord</label>
    <input id="userName" type="text"/>    
    </div>

    <div class="btn-container">
        <button onclick="showAndHideLogin()" class="btn">Avbryt</button>
        <button onclick="updateCategoryArr()" class="btn">Godkjent</button>
    </div>

    </div>
    </div>
    `;
}

function showAndHideLogin() {
    const overlay = document.querySelector(".login");
    overlay.classList.toggle("hidden");
  }
function showAndHideSignin() {
    const overlay = document.querySelector(".signin");
    overlay.classList.toggle("hidden");
  }

function checkLogin(){
    let userName = document.getElementById('userName').value;
    let password = document.getElementById('userPassword').value;

    for(let user of model.data.users){
        console.log(user);
        if(user.name === userName && user.password === password){
            model.app.user = user;
            navLoggedIn();
        }

    }
}