# Inlämning: Skapa en inloggningssida, 10 Yhp

## Kodens funktioner

- Att användaren ska ange sitt namn och lösenord. Är det båda korrekt, så skickas hen vidare till en välkomst sida.
- Om användaren anger fel namn eller lösenord så skickas hen till en sida där det står att det var fel namn eller lösenord angett.
- Om användaren loggat in så är han på Välkommen sida, Nu kan hen stänga webbläsaren och för alltid vara inloggad, till hen trycker på Logga ut knappen.

## Rätt inloggning

Det första som händer när DOM klar så kommer funktionen **checkUserLoggedIn** att köras för att se om hen är inloggad sedan tidigare. Är hen det, så kommer **loggedIn** funktionen köras.
Nu skickade jag med användarens namn som i det här fallet är "test" till **loggedIn** funktionen. Det som händer i den här funktionen är att all HTML skrivs ut genom [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), jag tycker det är mycket enklare att använda det, än **CreateElement** metoden. Det är framförallt mer överskådligt för en annan utvecklare att se vilka element som ska renderas ut. Här ser ni att jag skapat en variabel som håller namnet på den inloggade användaren. Ska användaren logga ut så har det skapats en **EventListener** på knappen, och när hen klickar på den så
kommer funktionen **backToLoginPage** att köras. Klickas det på knappen så kommer användaren tömma sitt **localStorage** och sidan laddas om, och med det så kommer funktionen **checkUserLoggedIn** köras igen.

## Fel inloggning

Anger användaren fel lösenord, namn eller inget alls och klickar på *Enter* knappen eller trycker på *Logga in* knappen så kommer **validateNamePassword** funktionen köras.
I den funktionen så kommer det användaren angett jämnföras med de hårdkodade variablerna **namn** och **lösenord**. Stämmer det inte, så kommer **wrongSignIn** funktionen köras.
Nu kommer den funktionen att radera alla childNodes i loginForm noden. För att göra plats för den nya HTML som kommer att skrivas ut med hjälp av [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) också här. Klickar användaren nu på prova igen så kommer **backToLoginPage** att köras, som "skickar tillbaka" dig till startsidan.

## Metoder

Jag har kört på lite nya funktioner så som *Template Strings* för att det är som sagt lättare att få en överblick av vad som ska "skrivas" ut. Då är förutsättningen att
jag inte ska stödja IE 11 och nedåt samt Opera Mini. Alla andra webbläsare stödjer det.
