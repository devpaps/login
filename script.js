
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
				<h1>Välkommen till Din startsida</h1>
				<p><strong>Vänligen logga in</strong></p>
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

			const user = usernameInput.value;

			// Skicka till välkomstsidan
			const loginForm = document.getElementById("loginForm");

			// Tar bort alla element förutom #app
			loginForm.parentNode.removeChild(loginForm);

			// Skickar med namnet på användaren som argument till loggedIn funktionen.
			loggedIn(user);
		} else {
			//Fel lösenord eller namn skicka till "Felsidan".
			wrongSignIn();
		}
	}

	function loggedIn(user) {
		// Template strings ES6 används här. Lättare och överskådligare än att köra med createElement¨och appendChild
		const displayWelcomePage = `
    <div class="welcomePage">
    <h1>Hej och välkommen, ${user}!</h1>
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
		// Tar bort alla element förutom #app
		const loginForm = document.getElementById("loginForm");
		loginForm.parentNode.removeChild(loginForm);

		const displayWrongInputs = `
			<div class="error">
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
		if (localStorage.length <= 1) {
			localStorage.removeItem("user");
		}
		// Skicka tillbaka till startsidan
		location.reload();
	};

	// Initialization
	checkUserLoggedIn();
