"use strict";

// Globala variabler
const namn = "test";
const lösenord = "1234";

const checkUserLoggedIn = () => {
	// Kollar om användaren finns i localstorage redan.
	const isUserLoggedIn = localStorage.getItem("user");

	if (isUserLoggedIn === "test") {
		// Är användaren redan inloggad, skicka hen till välkomstsidan.
		loggedIn(isUserLoggedIn);
	} else {
		const displaySite = `
      <div id="loginForm">
        <h1>Logga in</h1>
          <form>
            <div class="usernameField">
              <label for="usernameInput">Namn</label>
              <input type="text" id="usernameInput" autofocus>
            </div>
            <div class="passwordField">
              <label for="passwordInput">Lösenord</label>
              <input type="password" id="passwordInput">
            </div>
            <button type="submit" id="loginButton">Logga in</button>
          </form>
      </div>
    `;

		document.getElementById("app");
		app.insertAdjacentHTML("afterbegin", displaySite);

		document
			.getElementById("loginButton")
			.addEventListener("click", validateNamePassword);
	}
};

// Validerar namn och lösenord
function validateNamePassword() {
	// Hindrar att sidan laddas om när man klickat på logga in knappen
	event.preventDefault();
	const usernameInput = document.getElementById("usernameInput");
	const passwordInput = document.getElementById("passwordInput");

	// Kollar med om det användaren skriver in stämmer med de globala variablerna.
	if (usernameInput.value === namn && passwordInput.value === lösenord) {
		// Om sant, lagrar det i localstorage.
		localStorage.setItem("user", namn);

		// Hämtar namnet på användaren för att visa på Välkomstsidan.
		const user = localStorage.getItem("user");

		// Skicka till välkomstsidan
		const loginForm = document.getElementById("loginForm");

		// Tar bort alla element förutom #app
		loginForm.parentNode.removeChild(loginForm);

		// Skickar med namnet på användaren som argument till loggedIn funktionen.
		loggedIn(user);
	} else {
    //Fel lösenord eller namn
    wrongSignIn();
	}
}

function loggedIn(user) {
	// Template strings ES6 används här. Lättare och överskådligare än att köra med
	// createElement¨och appendChild
	const displayWelcomePage = `
    <div class="welcomePage">
    <h1>Hej ${user}</h1>
    <button id="logOut">Logga ut</button>
    </div>
    `;
	// Lägger in det i #app
	const app = document.getElementById("app");
	app.insertAdjacentHTML("afterbegin", displayWelcomePage);
	const logOut = document.getElementById("logOut");
	logOut.addEventListener("click", backToLoginPage);
}

function wrongSignIn() {
  // Skicka till välkomstsidan
  const loginForm = document.getElementById("loginForm");

  // Tar bort alla element förutom #app
  loginForm.parentNode.removeChild(loginForm);
  const displayWrongInputs = `
  <div class="error">
  <h1>Du har angivit fel namn eller lösenord.</h1>
  <h2>Vänligen <a href="#" onClick="backToLoginPage()">prova igen</a>.</h2>
  </div>
  `;
  const app = document.getElementById("app");
	app.insertAdjacentHTML("afterbegin", displayWrongInputs);
}

function backToLoginPage() {
	localStorage.removeItem("user");
	// Skicka tillbaka till startsidan
	location.reload();
}

// Initialization
window.onload = checkUserLoggedIn();
