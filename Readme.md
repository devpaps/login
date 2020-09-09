
# Inlämning: Skapa en inloggningssida, 10 Yhp

## Kodens funktioner

- Att användaren ska ange sitt namn och lösenord. Är det båda korrekt, så skickas hen vidare till en välkomstsida och hen namn blir lagrat i localstorage.

- Om användaren anger fel namn eller lösenord så skickas hen till en sida där det står att det var fel namn eller lösenord angett.

- Om användaren loggat in sedan tidigare så är han på Välkommensidan, Nu kan hen stänga webbläsaren och för alltid vara inloggad, till hen trycker på Logga ut knappen.

## Rätt inloggning

Det första som händer när DOM klar så kommer funktionen **checkUserLoggedIn()** att köras för att se om hen är inloggad sedan tidigare. Är hen det, så kommer **loggedIn()** funktionen köras.

Nu skickade jag med användarens namn som i det här fallet är "test" till **loggedIn()** funktionen. Det som händer i den här funktionen är att all HTML skrivs ut genom [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), jag tycker det är mycket enklare att använda det, än **CreateElement** metoden. Det är framförallt mer överskådligt för en annan utvecklare att se vilka element som ska renderas ut. Här ser ni att jag skapat en variabel som håller namnet på den inloggade användaren. Ska användaren logga ut så har det skapats en **EventListener** på knappen, och när hen klickar på den så

kommer funktionen **backToLoginPage()** att köras. Klickas det på knappen så kommer användaren tömma sitt **localStorage** och sidan laddas om, och med det så kommer funktionen **checkUserLoggedIn()** köras igen.

## Fel inloggning

Anger användaren fel lösenord, namn eller inget alls och klickar på *Enter* knappen eller trycker på *Logga in* knappen så kommer **validateNamePassword()** funktionen köras.

I den funktionen så kommer det användaren angett jämnföras med de hårdkodade variablerna **namn** och **lösenord**. Stämmer det inte, så kommer **wrongSignIn()** funktionen köras.

Nu kommer den funktionen att radera alla childNodes i loginForm noden. För att göra plats för den nya HTML som kommer att skrivas ut med hjälp av [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) också här. Klickar användaren nu på prova igen så kommer **backToLoginPage()** att köras, som "skickar tillbaka" dig till startsidan.

## Metoder

Jag har kört på lite nya funktioner så som *Template Strings* för att det är som sagt lättare att få en överblick av vad som ska "skrivas" ut. Då är förutsättningen att

jag inte ska stödja IE 11 och nedåt samt Opera Mini. Alla andra webbläsare stödjer det.

### Sammanfattning

När jag började med uppgiften så började jag att rita upp ett enkelt flödesschema för ut koden skulle fungera. Därefter så funderade jag lite kort på om det är några speciella metoder

jag måste använda mig av när jag gör uppgiften. Sen listade jag upp på papper på ett ungefär vad jag skulle göra, exempelvis:

1. Skapa ett repo.

2. Skapa alla filer.

3. Ladda upp det till Github för att se att allt stämmer.

4. Skapa en ny branch som jag sedan ska jobba i.

___  

Under tiden som jag kodade så skrev jag upp det som skulle tas tag i, så jag inte glömde bort det medans jag höll på koda något annat. Ett problem jag dök på var när jag skulle lägga in en Eventlistener på min **loggedIn()** funktion så fick ett error, `Uncaught TypeError: Cannot read property 'addEventListener' of null
`.  Jag använde mig av *template literals*, men det går inte att ha en *onclick* funktion i *template strings*, för att det är ren text. Läste på [stackoverflow]([https://stackoverflow.com/questions/45129421/passing-onclick-event-in-template-literal](https://stackoverflow.com/questions/45129421/passing-onclick-event-in-template-literal)) om att man inte skulle blanda text och inline event handlers som jag hade. Scrollade ner och hittade en lösning på mitt problem. Men där förstod jag inte lösning, han hade heller inte angett varför det funkade. Han använde sig av `window`.

Jag körde på den lättare vägen genom att lägga in ett `id` på min länk. Sedan skapa en `EventListener` för att ta tillbaka användaren till startsidan.

Nedan följer koderna.

Min ursprungliga lösning i `wrongSignIn()` funktionen:
`<h2>Vänligen <a href="#" onclick="${backToLoginPage()}">prova igen</a>.</h2>`, rad 94.

Stackoverflows lösning:
`window.myFunction = () => {
    console.log('Button clicked');
};
` Som min funktion, på rad 106.
Men då skulle jag ha kvar min urprungliga kod med lite modifieringar, såhär: `onclick="backToLoginPage()"`.

Min slutgiltliga lösning:
`<h2>Vänligen <a href="#" id="tryAgain">prova igen</a>.</h2>`
plus detta `document.getElementById("tryAgain").addEventListener("click", backToLoginPage);`
för att kunna lyssna på klicket. Tyckte det var enkelt och snabbt. Visst hade jag kunnat satt mig in i det och läst på om varför jag ska köra på `window` som det var någon på stackoverflow som antydde.

#### Fördelar
Den här sidan blir snabb och snärtig tack vare **InsertAdjacentHTML** samt **Template Literals**.
**InsertAdjacentHTML** innebär att den behöver inte serialisera datan och sedan parsa den för att skriva ut elementen som **innerHTML** måste göra. Nu är det här ett extremt litet projekt som inte behöver bifoga tusentals tweets på sidan exempelvis. Då hade man sett skillnad på de olika metoderna. Men jag tycker det är bäst att gå efter dem bästa sätten direkt, även om det är ett litet projekt. Då har man för vana att skriva bra och uppdaterad kod.

**Template Literals** är inte snabbare rent kodmässigt, eller ja det går ju fortare att köra koden då den blir mindre. Sedan skriver man koden snabbare om man jämnför med **CreateElement**. Jag tycker det är ganska mödosamt att köra på det sättet.

#### Nackdelar
Här har vi några gamla webbläsare som kan ta stryk för att jag använder mig av ovanstående metoder. **Template Literals** funkar på alla webbläsare förutom *Internet Explorer 11* och nedåt samt Opera Mini. Så skulle jag behöva stödja dem, så är jag tvungen att använda mig av **CreateElement** metoden för att skriva ut elementen på webbsidan. 