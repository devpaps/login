async function checkJson() {
  // Kollar om användaren finns i localstorage redan.
  const isUserLoggedIn = localStorage.getItem("user");

   await fetch('/assets/js/users.json')
  .then( res => res.json())
  .then(data => {
    if (isUserLoggedIn) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const te = item.userLogin.includes(isUserLoggedIn);
        const namn = item.userName;
        checkUserLoggedIn(te, namn);
        break;
      }
    } else {
      checkUserLoggedIn(false);
    }
  })
}

function checkUserLoggedIn(check, namn) {

  if (check) {
    // Är användaren redan inloggad, skicka hen till välkomstsidan.
    loggedIn(namn);
  } else {
    const displaySite = `
      <div id="login-form">
				<header>
					<h1 class="title">Welcome, Employee of the Month</h1>
				</header>
				<p><strong class="heads-up-text">Please sign in to receive your bonus</strong></p>
				<div class="main-form ">
				<form class="form-input">
				<div class="usernameField">
					<label for="usernameInput">Namn</label>
					<input type="text" id="usernameInput" autofocus>
				</div>
				<div class="passwordField">
					<label for="passwordInput">Lösenord</label>
					<input type="password" id="passwordInput">
				</div>
				<button type="submit" id="loginButton" class="button-login">Logga in</button>
				</form>
				<div>
					<img src="../../assets/images/nintendo.jpg" class="logo"/>
				</div>
				</div>
      </div>
    `;

    document.getElementById("app");
    app.insertAdjacentHTML("afterbegin", displaySite);

    document
      .getElementById("loginButton")
      .addEventListener("click", validateNamePassword);
  }
}

// Validerar namn och lösenord
async function validateNamePassword(event) {
  // Hindrar att sidan laddas om när man klickat på logga in knappen
  event.preventDefault();

  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");

  await fetch('/assets/js/users.json')
  .then(res => res.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      const person = data[i];
            // Kollar med om det användaren skriver in stämmer med de globala variablerna.
            if (usernameInput.value === person.userLogin && passwordInput.value === person.userPassword) {
              // Om sant, lagrar det i localstorage.
              localStorage.setItem("user", person.userLogin);
          
              const user = person.userName;
          
              // Skicka till välkomstsidan
              const loginForm = document.getElementById("login-form");
          
              // Tar bort alla element förutom #app
              loginForm.parentNode.removeChild(loginForm);
          
              // Skickar med namnet på användaren som argument till loggedIn funktionen.
              loggedIn(user);
              break;
            } else {
              //Fel lösenord eller namn skicka till "Felsidan".
              wrongSignIn();
              break;
            }
    }

  })

}

function loggedIn(namn) {
  // Template strings ES6 används här. Lättare och överskådligare än att köra med createElement¨och appendChild
  const displayWelcomePage = `
    <div class="welcome-page">
		<div>
			<img src="../../assets/images/mario.png" class="mario" />
		</div>
			<div class="welcome-message">
				<header>
					<h1 class="title">You're awesome, ${namn}!</h1>
				</header>
				<div class="dialog">
					<p>Here you go, a magic growing mushroom! <span><img src ="../../assets/images/mushroom.png" class="mushroom"/></span></p>
				</div>
				<button id="logOut" class="button-logout">Logga ut</button>
			</div>
    </div>
    `;
  // Lägger in det i #app elementet
  const app = document.getElementById("app");
  app.insertAdjacentHTML("afterbegin", displayWelcomePage);

  const logOut = document.getElementById("logOut");
  logOut.addEventListener("click", backToLoginPage);
}

function wrongSignIn() {
  // Tar bort alla element förutom #app
  const loginForm = document.getElementById("login-form");
  loginForm.parentNode.removeChild(loginForm);

  const displayWrongInputs = `
			<div class="error">
				<div>
					<img src="../../assets/images/mario-died.png" class="mario-died"/>
				</div>
				<h1>Oj! Har du glömt ditt lösenord?</h1>
				<h2>Vänligen <a href="#" id="tryAgain">prova igen</a>.</h2>
			</div>
			`;

  const app = document.getElementById("app");
  app.insertAdjacentHTML("afterbegin", displayWrongInputs);
  // Lägger in en EventListener på länken där det står "prova igen"
  document
    .getElementById("tryAgain")
    .addEventListener("click", backToLoginPage);
}

function backToLoginPage() {
  const checkUser = localStorage.getItem("user");
  // Kollar om just användaren finns med i localstorage.
  if (checkUser) {
    localStorage.removeItem("user");
  }
  // Skicka tillbaka till startsidan
  location.reload();
}

// Initialization, startar här varje gång sidan laddas om.
window.onload = checkJson;
