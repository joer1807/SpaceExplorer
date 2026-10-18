"use strict";

// Vänta tills hela HTML-sidan har laddats klart
document.addEventListener('DOMContentLoaded', function() {
    
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
        submitBtn.addEventListener('click', function() {
            // Hämta vad användaren skrev i rutorna
            const topic1 = document.getElementById('topic1').value;
            const topic2 = document.getElementById('topic2').value;
            const topic3 = document.getElementById('topic3').value;

            let isFormValid = true;

            // Kontrollera varje ruta med valid. 
           if (topic1Field.value.trim() === "") {
                showError(topic1Field, "Vänligen fyll i rymdfråga 1.");
                isFormValid = false;
            } else {
                clearError(topic1Field);
            }
            if (topic2Field.value.trim() === "") {
                showError(topic2Field, "Vänligen fyll i rymdfråga 2.");
                isFormValid = false;
            } else {
                clearError(topic2Field);
            }
            if (topic3Field.value.trim() === "") {
                showError(topic3Field, "Vänligen fyll i rymdfråga 3.");
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

            // Skapa tacktexten genom att plussa ihop strängar
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

    // Kolla så att kontaktformuläret 
    if (kontaktForm) {
        kontaktForm.addEventListener('submit', function(event) {
            // Stoppa sidan från att laddas om när man trycker på skicka
            event.preventDefault();

            // Hämta texten från rutorna
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Kontrollera att fälten inte är tomma
            if (name === "" || email === "" || message === "") {
                alert("Vänligen fyll i alla fält innan du skickar!");
                return;
            }

            // Bygg tackmeddelandet
            const tackMessage = '<h2>Tack för ditt meddelande! 🚀</h2>' +
                               '<p>Vi har tagit emot ditt meddelande och återkommer till <strong>' + email + '</strong> så snart vi kan.</p>' +
                               '<div style="background: rgba(23, 137, 169, 0.1); padding: 10px; border-radius: 4px; margin-top: 10px;">' +
                                   '<p style="margin: 0; font-style: italic;">Ditt skickade meddelande:</p>' +
                                   '<p style="margin: 5px 0 0 0;">' + message + '</p>' +
                               '</div>';

            // Visa tackmeddelandet på skärmen
            kontaktForm.innerHTML = tackMessage;
        });
    }
});

// 3. HÄMTA DAGENS RYMDBILD FRÅN NASA (APOD)
async function fetchApod() {
    const apodSection = document.getElementById('apod-section');
    const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=f9oF5rlwHBDdOOb82h9XmCiiPNNKqFfYuxXpJUqC';

    if (!apodSection) {
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        apodSection.innerHTML = '';

        const titleElement = document.createElement('h2');
        titleElement.textContent = "Live in Space: " + data.title;
        apodSection.appendChild(titleElement);

        if (data.media_type === "video") {
            const videoElement = document.createElement('iframe');
            videoElement.src = data.url;
            videoElement.width = "100%";
            videoElement.height = "450px";
            videoElement.style.border = "none";
            videoElement.style.borderRadius = "8px";
            apodSection.appendChild(videoElement);
        } else {
            const imgElement = document.createElement('img');
            imgElement.src = data.url;          
            imgElement.alt = data.title;        
            imgElement.style.maxWidth = '100%'; 
            imgElement.style.borderRadius = "8px";
            apodSection.appendChild(imgElement);
        }

        const textElement = document.createElement('p');
        textElement.textContent = data.explanation; 
        apodSection.appendChild(textElement);

    } catch (error) {
        console.error(error);
        apodSection.innerHTML = "<h2>Kunde inte ladda rymdbilden just nu.</h2>";
    }
}

// HÄMTA ASTEROIDER FRÅN NASA (NeoWs)
async function fetchAsteroids() {
    const asteroidSection = document.getElementById('asteroid-section');
    const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2026-10-17&end_date=2026-10-20&api_key=f9oF5rlwHBDdOOb82h9XmCiiPNNKqFfYuxXpJUqC';

    if (!asteroidSection) {
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        asteroidSection.innerHTML = '';

        const titleElement = document.createElement('h2');
        titleElement.textContent = "Aktuella asteroider nära jorden";
        asteroidSection.appendChild(titleElement);

        const ulElement = document.createElement('ul');
        
        let totalAsteroids = 0;
        let totalHazardous = 0;

        for (const dateKey in data.near_earth_objects) {
            const dayList = data.near_earth_objects[dateKey];
            
            for (let i = 0; i < dayList.length; i++) {
                const asteroid = dayList[i];
                totalAsteroids = totalAsteroids + 1;

                // raden för just denna asteroid
                let liElement = document.createElement('li');
                
                const diameter = Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max);
                
                let dangerText = " (Säker)";
                if (asteroid.is_potentially_hazardous_asteroid === true) {
                    totalHazardous = totalHazardous + 1;
                    dangerText = " (⚠️ POTENTIELLT FARLIG!)";
                }

                liElement.textContent = dateKey + " | " + asteroid.name + " - ca " + diameter + " meter bred" + dangerText;
                ulElement.appendChild(liElement);
            }
        }

        const summaryText = document.createElement('p');
        summaryText.innerHTML = "Under perioden passerar totalt <strong>" + totalAsteroids + "</strong> kända asteroider i närheten av jorden. Av dessa är <strong>" + totalHazardous + "</strong> markerade som potentiellt farliga av NASA.";
        
        asteroidSection.appendChild(summaryText);
        asteroidSection.appendChild(ulElement);

    } catch (error) {
        console.error(error);
        asteroidSection.innerHTML = "<h2>Kunde inte ladda asteroiddata just nu.</h2>";
    }
}



function showError(inputElement, messageText) {
        inputElement.classList.add('input-error');
        const errorSpan = inputElement.parentElement.querySelector('.error-text');
        if (errorSpan) { errorSpan.textContent = messageText; }
    }
    function clearError(inputElement) {
        inputElement.classList.remove('input-error');
        const errorSpan = inputElement.parentElement.querySelector('.error-text');
        if (errorSpan) { errorSpan.textContent = ''; }
    }
// Toggle meny mobilkommer här 

const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
        const isOpen = mainNav.classList.toggle('is-open');
        
        if (isOpen) {
            menuToggle.textContent = '✕';
        } else {
            menuToggle.textContent = '☰';
        }
    });
}





    