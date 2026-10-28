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
                showError(topic3Field, "Sista chansen till nyfikenhet!.");
                isFormValid = false;
            } else {
                clearError(topic3Field);
            }

            if (!isFormValid) {
                return;
            }

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
        menuToggle.addEventListener('click', function() {
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
    const apodSection = document.getElementById('apod-section');
    const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=f9oF5rlwHBDdOOb82h9XmCiiPNNKqFfYuxXpJUqC';

    if (!apodSection) {
        return;
    }
               //om inte fungerar return från nasa svarstext 
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('serverfel hos NASA: "' + response.statusText + '"');
        }   //skickar tillbaka en json fil 
        const data = await response.json();
              //ändrar html o visar upp ny text 
        apodSection.innerHTML = '';

        const titleElement = document.createElement('h2');
        titleElement.textContent = "Live in Space: " + data.title;
        apodSection.appendChild(titleElement);

                //nasa anv ibland youtubeformat, om skickas ett anpassas: 

        if (data.media_type === "video") {
            const videoElement = document.createElement('iframe');
            videoElement.src = data.url;
            videoElement.width = "100%";
            videoElement.height = "450px";
            videoElement.style.border = "none";
            videoElement.style.borderRadius = "8px";
            apodSection.appendChild(videoElement);

        } else {     //ellerbild dagens bild skickas: 
            const imgElement = document.createElement('img');
            imgElement.src = data.url || data.hdurl;                      //denna kod är för att hämta bilden från data.url eller data.hdurl om data.url saknas
            imgElement.alt = data.title;
            imgElement.style.maxWidth = '100%';
            imgElement.style.borderRadius = "8px";
            apodSection.appendChild(imgElement);
        }

        const textElement = document.createElement('p');
        textElement.textContent = data.explanation;
        apodSection.appendChild(textElement);
  //felmeddelande om bilden inte hämtas

    } catch (error) {
        console.error(error);
        apodSection.innerHTML = "<h2>Kunde inte ladda rymdbilden just nu.</h2>";
    }
}

// HÄMTA ASTEROIDER FRÅN NASA (NeoWs)

async function fetchAsteroids() {    //asynkron
    const asteroidList = document.getElementById('asteroid-list');  //hittar platsen i HTMLKODEN

//apinyckeln här med datum

    const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2026-10-24&end_date=2026-10-25&api_key=f9oF5rlwHBDdOOb82h9XmCiiPNNKqFfYuxXpJUqC';

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

    } catch (error) {
        console.error("Fel vid hämtning av asteroider:", error);
        asteroidList.innerHTML = "<p>Kunde inte ladda asteroiddata just nu.</p>";
    }
}