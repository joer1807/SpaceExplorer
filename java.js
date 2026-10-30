"use strict";

// Vänta tills hela HTML-sidan har laddats klart
document.addEventListener('DOMContentLoaded', function () {

    // functions 
    if (document.getElementById('apod-section')) {
        fetchApod();
        fetchAsteroids();
    };

    // RYMDFORMULÄR (#best-in-space)
    const submitBtn = document.getElementById('space-submit-btn');
    const bestInSpace = document.getElementById('best-in-space');

    // Kolla så att rymdformuläret klickas 
    if (submitBtn && bestInSpace) {
        submitBtn.addEventListener('click', function () {
            const topic1Field = document.getElementById('topic1');
            const topic2Field = document.getElementById('topic2');
            const topic3Field = document.getElementById('topic3');

            let isFormValid = true;

            // Kontrollera varje ruta med valid. 
            if (topic1Field.value.trim() === "") {
                showError(topic1Field, "Vänligen fyll i rymdfråga 1.");
                isFormValid = false;
            } else {
                clearError(topic1Field);
            }

            if (topic2Field.value.trim() === "") {
                showError(topic2Field, "Passa på att ställa en rymdfråga till!.");
                isFormValid = false;
            } else {
                clearError(topic2Field);
            }

            if (topic3Field.value.trim() === "") {
                showError(topic3Field, "Vi behöver din mejl så vi kan svara på dina funderingar");
                isFormValid = false;
            }else if (!emailPattern.test(topic3Field.value.trim())){
                showError(topic3Field, "Vänligen fyll i din mejladress");
                isFormValid = false;
            } else {
                clearError(topic3Field);
            }

            if (!isFormValid) {
                return;
            }
            //value in här om allt i fyllt då. 
            const topic1 = topic1Field.value;
            const topic2 = topic2Field.value;
            const topic3 = topic3Field.value;

            // Skapa tacktexten genom att plussa ihop svaren fr anv.
            const returnMessage = '<h2>Tack för dina frågor! 🚀</h2>' +
                '<p>Våra rymdexperter har tagit emot dina funderingar om:</p>' +
                '<ul>' +
                '<li><strong>' + topic1 + '</strong></li>' +
                '<li><strong>' + topic2 + '</strong></li>' +
                '<li><strong>' + topic3 + '</strong></li>' +
                '</ul>' +
                '<p>Vi återkommer till dig med spännande svar!</p>';

            // Ändra HTML-innehållet i boxen till tacktexten
            bestInSpace.innerHTML = returnMessage;
        });
    }

    //KONTAKTFORMULÄR (#kontaktformular)
    const kontaktForm = document.getElementById('kontaktformular');

    // Kolla så att kontaktformuläret fylls i
    if (kontaktForm) {
        kontaktForm.addEventListener('submit', function (event) {
            // Stoppa sidan från att laddas om när man trycker på skicka
            event.preventDefault();

            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');

            let isContactValid = true;

            //om inget värde i kommer meddelande till användaren o clear om finns värde

            if (nameField.value.trim() === "") {
                showError(nameField, "Vänligen fyll i ditt namn.");
                isContactValid = false;
            } else {
                clearError(nameField);
            }

            if (emailField.value.trim() === "") {
                showError(emailField, "Vänligen fyll i din e-postadress.");
                isContactValid = false;
            } else {
                clearError(emailField);
            }

            if (messageField.value.trim() === "") {
                showError(messageField, "Vänligen skriv ett meddelande.");
                isContactValid = false;
            } else {
                clearError(messageField);
            }

            if (!isContactValid) {
                return;
            }

            // Hämta texten från rutorna o lägg in anv mejl och formatera tackmeddelandet
            const tackMessage = '<h2>Tack för ditt meddelande! 🚀</h2>' +
                '<p>Vi har tagit emot ditt meddelande och återkommer till <strong>' + emailField.value + '</strong> så snart vi kan.</p>' +
                '<div style="background: rgba(23, 137, 169, 0.1); padding: 10px; border-radius: 4px; margin-top: 10px;">' +
                '<p style="margin: 0; font-style: italic;">Ditt skickade meddelande:</p>' +
                '<p style="margin: 5px 0 0 0;">' + messageField.value + '</p>' +
                '</div>';

            // Visa tackmeddelandet på skärmen
            kontaktForm.innerHTML = tackMessage;
        });
    }

    // HJÄLPFUNKTIONER FÖR JAVASCRIPT-VALIDERINGEN

    function showError(inputElement, messageText) {
        inputElement.classList.add('input-error');   //texten ska bli röd via css
        const formGroup = inputElement.closest('.form-group');
        if (formGroup) {
            const errorSpan = formGroup.querySelector('.error-text');
            if (errorSpan) {
                errorSpan.textContent = messageText;
            }
        }
    }
    //när användaren skrivit in fältet tas felmeddelandet bort. 
    function clearError(inputElement) {
        inputElement.classList.remove('input-error');  //det röda försvinner igen. 
        const formGroup = inputElement.closest('.form-group');
        if (formGroup) {
            const errorSpan = formGroup.querySelector('.error-text');
            if (errorSpan) {
                errorSpan.textContent = '';  //fältet i form tomt igen. 
            }
        }
    }

    // Toggle meny mobilkommer här för mobilen 
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function () {
            const isOpen = mainNav.classList.toggle('active');

            if (isOpen) {
                menuToggle.textContent = '✕';
            } else {
                menuToggle.textContent = '☰';
            }
        });
    }

}); // Slutar och stänger hela DOMContentLoaded-funktionen!


// HÄMTA DAGENS RYMDBILD FRÅN NASA (APOD) styrs av vad nasa lagt upp för dagen obs! kolla konsolen. 

async function fetchApod() {
    //hämtar exakta elementen från html 
    const mainTitleElement = document.getElementById('apod-main-title');
    const titleElement = document.getElementById('apod-title');
    const mediaContainer = document.getElementById('apod-content');
    const textElement = document.getElementById('apod-beskrivning');


    //kontroll av att elementen finns på sidan
    if (!titleElement || !mediaContainer || !textElement) {
        return;
    }

    // Hämtar dagens datum automatiskt och formaterar till ÅÅMMDD
    const idag = new Date();
    const aar = String(idag.getFullYear()).slice(-2);
    const maanad = String(idag.getMonth() + 1).padStart(2, '0');
    const dag = String(idag.getDate()).padStart(2, '0');
    const datumStrang = `${aar}${maanad}${dag}`;

    //Bygger API-urlen  med dagens datum
    const apiUrl = `https://science.nasa.gov/wp-json/wp/v2/apod-basic/${datumStrang}`;

    //mina tester 'https://science.nasa.gov/wp-json/wp/v2/apod-basic/261029'

    //tester 'https://science.nasa.gov/wp-json/wp/v2/apod-basic/${datumStrang}'



    // om inte fungerar return från nasa svarstext 
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('serverfel hos NASA: "' + response.statusText + '"');
        }
        //skickar tillbaka en json fil 
        const data = await response.json();

        //huvudrubrik med info 
        if (mainTitleElement) {
            mainTitleElement.textContent = `Live in Space: NASA Astronomy Picture (${data.date})`;
        }
        // Sätter titeln i <h3>
        titleElement.textContent = data.title;

        // Rensar texten "Laddar dagens bild..."
        mediaContainer.innerHTML = '';


        //nasa anv ibland youtubeformat, om skickas ett anpassas: 
        if (data.media_type === "video") {
            // Försök hämta video-källa i html-koden 
            const match = data.basic_html ? data.basic_html.match(/<source src="([^"]+)"/) : null;

            // Om matchning hittas tar vi grupp 1 ([1]), annars faller tillbaka på data.url
            const videoUrl = match ? match[1] : data.url;

            const videoElement = document.createElement('video');
            videoElement.src = videoUrl;
            videoElement.width = 800; // Sätts som numeriskt värde i JS
            videoElement.style.maxWidth = "100%"; // Gör videon följsam på mindre skärmar
            videoElement.style.border = "none";
            videoElement.style.borderRadius = "8px";

            // För att videon ska starta automatiskt och upprepa videon
            videoElement.autoplay = true;
            videoElement.muted = true;
            videoElement.loop = true;
            videoElement.controls = true;

            //lägger till videon i min div jag skapat i html
            mediaContainer.appendChild(videoElement);

        } else {     //eller om apod/bild dagens skickas: 
            const imgElement = document.createElement('img');
            imgElement.src = data.hdurl || data.url;                      //denna kod är för att hämta bilden från data.url eller data.hdurl om data.url saknas
            imgElement.alt = data.title;
            imgElement.style.maxWidth = '100%';
            imgElement.style.borderRadius = "8px";
            imgElement.style.height = "auto";

            //lägger in bilden i min div från html 
            mediaContainer.appendChild(imgElement);
        }
        //beskrvningen läggs till 
        textElement.innerHTML = data.explanation;

    } catch (error) {
        console.error(error);
        titleElement.textContent = "Kunde inte ladda rymdbilden just nu";
        textElement.textContent = "Ett fel uppstod vid hämtning av data från NASA.";
    }
}
fetchApod();

// HÄMTA ASTEROIDER FRÅN NASA (NeoWs)

async function fetchAsteroids() {    //asynkron
    const asteroidList = document.getElementById('asteroid-list');  //hittar platsen i HTMLKODEN

    //apinyckeln här med datum

    const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2026-10-26&end_date=2026-10-28&api_key=f9oF5rlwHBDdOOb82h9XmCiiPNNKqFfYuxXpJUqC';

    //kontrollerar om datan finns, if sats 

    if (!asteroidList) {
        return;
    }

    try {                  //await för väntar svar från nasa
        const response = await fetch(apiUrl);
        const data = await response.json();   //nasas fil görs om från text till js format 

        console.log(data);

        // Töm listan först på gamla asteorider
        asteroidList.innerHTML = '';

        // Loopa igenom datumen satta i apin
        for (const date in data.near_earth_objects) {
            const asteroids = data.near_earth_objects[date];

            //blir ett kort för varje asteorid här, asteoridcard.  

            asteroids.forEach(asteroid => {
                const card = document.createElement('div');  //tomt div element i datorns minne
                card.className = 'asteroid-card';

                //asteorider som har varning nasa skickar med ja/nej 
                if (asteroid.is_potentially_hazardous_asteroid) {
                    card.classList.add('asteroid-card-danger');  //så svarar css med rött om varning. 
                }

                //asteoridcards blir synliga på skärmen, fylls med informationen. 
                card.innerHTML =    //html koden stoppas in i nya div elementet som finns sparat. 
                    '<h3>' + asteroid.name + '</h3>' +    //alla + läggs till för info som ska synas. 
                    '<p><strong>Datum:</strong> ' + date + '</p>' +    //mathround avrundar talen som tas emot fr nasa. 
                    '<p><strong>Max diameter:</strong> ' + Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max) + ' meter</p>' +
                    '<p><strong>Missar jorden med:</strong> ' + Math.round(asteroid.close_approach_data[0].miss_distance.kilometers).toLocaleString('sv-SE') + ' km</p>' +
                    '<p><strong>Potentiell RISK vid kollision:</strong> ' + (asteroid.is_potentially_hazardous_asteroid ? "⚠️ Ja" : "✅ Nej") + '</p>';
                //if dangerous ternary ja/nej 

                // Lägg till direkt i asteroidList syns inte på skärmen annars utan denna. 
                asteroidList.appendChild(card);
            });
        }
        //fetch function asteorids stängs här, om catch error. ligger sista efter genongång övrigt. 
    } catch (error) {
        console.error("Fel vid hämtning av asteroider:", error);
        asteroidList.innerHTML = "<p>Kunde inte ladda asteroiddata just nu.</p>";
    }
}