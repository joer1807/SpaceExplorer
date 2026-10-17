// JavaScript code to display the NASA APOD
// ska hämta APOD-data från api.nasa.gov


// Skapar en funktion som tar in ett datum som parameter

// JavaScript code to display the NASA APOD
// ska hämta APOD-data från api.nasa.gov

document.addEventListener('DOMContentLoaded', fetchAsteroids);

async function fetchAsteroids() {
    const apodSection = document.getElementById('apod-section');
    
    // API-länk till Asteroids NeoWs med DEMO_KEY
    const apiUrl = 'GET https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Kunde inte hämta asteroiddata från NASA');
        }

        const data = await response.json();

        // Dynamiskt hämta dagens datum i formatet YYYY-MM-DD
        const today = new Date().toISOString().split('T')[0];
        
        // Hämta listan över asteroider för just i dag
        const asteroidsToday = data.near_earth_objects[today];

        // Töm sektionen i din HTML
        apodSection.innerHTML = '';

        // 1. Skapa en ny spännande rubrik
        const titleElement = document.createElement('h2');
        titleElement.textContent = "Live i rymden: Dagens asteroider (" + today + ")";
        apodSection.appendChild(titleElement);

        // 2. Kontrollera om det finns några asteroider registrerade för idag
        if (asteroidsToday && asteroidsToday.length > 0) {
            
            // Räkna hur många som är farliga
            let hazardousCount = 0;
            asteroidsToday.forEach(function(asteroid) {
                if (asteroid.is_potentially_hazardous_asteroid === true) {
                    hazardousCount++;
                }
            });

            // Skapa en text som sammanfattar läget
            const summaryText = document.createElement('p');
            summaryText.innerHTML = "I dag passerar <strong>" + asteroidsToday.length + "</strong> kända asteroider i närheten av jorden. Av dessa är <strong>" + hazardousCount + "</strong> markerade som potentiellt farliga av NASA.";
            apodSection.appendChild(summaryText);

            // Skapa en lista över de tre närmaste eller största asteroiderna
            const listTitle = document.createElement('h3');
            listTitle.textContent = "Några av dagens rymdobjekt:";
            apodSection.appendChild(listTitle);

            const ulElement = document.createElement('ul');
            
            // Visa max 3 asteroider så att listan inte blir för lång
            const maxToShow = Math.min(asteroidsToday.length, 3);
            for (let i = 0; i < maxToShow; i++) {
                const asteroid = asteroidsToday[i];
                const liElement = document.createElement('li');
                
                // Hämta max-diametern i meter och runda av den
                const diameter = Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max);
                
                let dangerText = " (Säker)";
                if (asteroid.is_potentially_hazardous_asteroid === true) {
                    dangerText = " (⚠️ POTENTIELLT FARLIG!)";
                }

                liElement.textContent = "Asteroid: " + asteroid.name + " | Storlek: ca " + diameter + " meter bred" + dangerText;
                ulElement.appendChild(liElement);
            }
            apodSection.appendChild(ulElement);

        } else {
            const safeText = document.createElement('p');
            safeText.textContent = "Det verkar helt tomt och lugnt runt jordens omloppsbana i dag!";
            apodSection.appendChild(safeText);
        }

    } catch (error) {
        console.error("Ett fel uppstod:", error);
        apodSection.innerHTML = "<h2>Kunde inte hämta asteroiddata just nu.</h2><p>NASA:s server kan vara överbelastad. Försök igen om en stund.</p>";
    }
}
    




    

        //

            // Skapar en objekt som innehåller alla APOD-data