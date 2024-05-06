function generateLogin() {
  return /*HTML*/ `
      <div id="login" class="overlay hidden">
      <div class="categories">
      <h3 class="category-heading">Logg inn:</h3>
      <div class="align-input">
      <!-- <label for="userNameLogin">Brukernavn</label> -->
      <h5 class="error4 hidden">Fyll ut alle feltene</h5>
      <h5 class="error1 hidden">Feil brukernavn eller passord</h5>
      <input class="input-box" id="userNameLogin" type="text" placeholder="Brukernavn"/>    
     
      
       <!--<label for="userPasswordLogin">Passord</label> -->
      <input class="input-box" id="userPasswordLogin" type="password" placeholder="Passord"/>    
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
  let categoriesHtml = "";
  for (let genre of model.data.genres) {
    categoriesHtml += /*HTML*/ `<label class="label-category" ><input type="checkbox" id="signup${genre.id}" name="${genre.name}" value="${genre.name}" class="check-box" 
      
      > &nbsp;${genre.name}</label><br>`;
  }
  return /*HTML*/`
      <div id="signup" class="overlay hidden">
      <div class="categories">
      <h3 class="category-heading">Lag bruker:</h3>
      <div class="align-input">
      <!--<label for="userNameSignup">Brukernavn</label>-->
      <h5 class="error3 hidden">Fyll ut alle feltene</h5>
      <h5 class="error hidden">Brukernavnet er allerede i bruk</h5>
     
      <input class="input-box" id="userNameSignup" type="text" placeholder="Brukernavn"/>    
      <!--<label for="userPasswordSignup">Passord</label>-->
      <input class="input-box" id="userPasswordSignup" type="password" placeholder="Passord"/> 
      <h5 class="error2 hidden">Begge passordene stemmer ikke</h5>   
      <input class="input-box" id="rePasswordSignup" type="password" placeholder="Gjenta Passord"/>    
      </div>
  
      <h3 class="category-heading">Velg sjangerinteresser:</h3>
    <div class="category-checkbox">
    ${categoriesHtml}
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
  document.querySelector('.error1').classList.add('hidden');
  document.querySelector('.error4').classList.add('hidden');

  overlay.classList.toggle("hidden");
}
function showAndHideSignup() {
  const overlay = document.querySelector("#signup");
  document.querySelector('.error').classList.add('hidden');
  document.querySelector('.error2').classList.add('hidden');
  document.querySelector('.error3').classList.add('hidden');

  overlay.classList.toggle("hidden");
}
function toggleLoginSignup() {
  showAndHideLogin();
  showAndHideSignup();
}

function createUser() {
  let name = document.getElementById("userNameSignup").value;
  let password = document.getElementById("userPasswordSignup").value;
  let rePassword = document.getElementById("rePasswordSignup").value;
  let image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7VHlvKbesl5zekANDUcJOvfWW-eiCV_kuf1JPwFqja7R4k7rBQ08FbjKlQQ&s";
  let chosenGenres = [];

  document.querySelector('.error').classList.add('hidden');
  document.querySelector('.error2').classList.add('hidden');
  document.querySelector('.error3').classList.add('hidden');

  if (name === "" || password === "" || rePassword === "") {
    console.log("enter details");
    document.querySelector('.error3').classList.remove('hidden');

    return;
  }
  if (isUsernameAlreadyTaken(name)) return;
  if (!isReenteredPasswordCorrect(password, rePassword)) return;



  for (let genre of model.data.genres) {
    if (document.getElementById(`signup${genre.id}`).checked)
      chosenGenres.push(genre.id);
  }

  const user = {
    id: model.data.users.length + 1,
    name: `${name}`,
    password: `${password}`,
    since: new Date(),
    interests: [...chosenGenres],
    imageURL: `${image}`,
  };
  model.data.users.push(user);
  saveLocalUsers();
  model.app.user = user;
  showAndHideSignup();
  navLoggedIn();
}

function isUsernameAlreadyTaken(input) {
  for (let user of model.data.users) {
    if (user.name === input) {
      console.log(user.name, input);
      document.querySelector('.error').classList.remove('hidden');
      return true;
    }
  }
  return false;
}

function isReenteredPasswordCorrect(pass1, pass2) {
  if (pass1 === pass2) {
    return true;
  } else {
    document.querySelector('.error2').classList.remove('hidden');
    return false;
  }
}

function checkLogin() {
  let userName = document.getElementById("userNameLogin").value;
  let password = document.getElementById("userPasswordLogin").value;
  document.querySelector('.error4').classList.add('hidden');
  document.querySelector('.error1').classList.add('hidden');
  if (userName === "" || password === "") {
    document.querySelector('.error4').classList.remove('hidden');
    return;
  }

  for (let user of model.data.users) {
    console.log(user);
    if (user.name === userName && user.password === password) {
      model.app.user = user;
      navLoggedIn();
    } else {
      document.querySelector('.error1').classList.remove('hidden');
    }
  }
}
