// göra en lyssnare för best in space + value med return text 

//hämta elementet med id=best-in-space
const bestInSpace = document.getElementById('best-in-space');
//lägga på en lyssnare
bestInSpace.addEventListener('submit', function(event) {
    //Stoppa formuläret från att ladda om sidan
    event.preventDefault();

    //hämta värdena från formuläret

    const topic1 = document.getElementById('topic1').value;
    const topic2 = document.getElementById('topic2').value;
    const topic3 = document.getElementById('topic3').value;


    //svarsmeddelande till användaren
    const returnMessage = '<h2>Tack för dina frågor! 🚀</h2>' +
                         '<p>Våra rymdexperter har tagit emot dina funderingar om:</p>' +
                         '<ul>' +
                             '<li><strong>' + q1 + '</strong></li>' +
                             '<li><strong>' + q2 + '</strong></li>' +
                             '<li><strong>' + q3 + '</strong></li>' +
                         '</ul>' +
                         '<p>Vi återkommer till dig med spännande svar</p>';

                         //ersätta texten med det nya svaret
                         bestInSpace.innerHTML = returnMessage;

});





// JavaScript code to display the NASA APOD
// ska hämta APOD-data från api.nasa.gov

document.addEventListener('DOMContentLoaded', () => {
    // Starta båda hämtningarna direkt när sidan öppnas
    fetchApod();
    fetchAsteroids();
});

// 1. DYNAMISK HÄMTNING AV RYMDBILDEN (APOD)
async function fetchApod() {
    const apodSection = document.getElementById('apod-section');
    const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=f9oF5rlwHBDdOOb82h9XmCiiPNNKqFfYuxXpJUqC';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Fel vid APOD-fetch');
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

// 2. DYNAMISK HÄMTNING AV ALLA ASTEROIDER (NeoWs)
async function fetchAsteroids() {
    const asteroidSection = document.getElementById('asteroid-section');
    // Din nya exakta API-länk som hämtar ett tidsintervall
    const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2026-10-17&end_date=2026-10-20&api_key=f9oF5rlwHBDdOOb82h9XmCiiPNNKqFfYuxXpJUqC';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Fel vid asteroid-fetch');
        const data = await response.json();

        asteroidSection.innerHTML = '';

        // Skapa en huvudrubrik för asteroidavdelningen
        const titleElement = document.createElement('h2');
        titleElement.textContent = "Aktuella asteroider nära jorden";
        asteroidSection.appendChild(titleElement);

        // Skapa en punktlista (ul) där vi samlar alla asteroider från alla dagar
        const ulElement = document.createElement('ul');
        
        let totalAsteroids = 0;
        let totalHazardous = 0;

        // Loopa igenom varje enskilt datum som finns i "near_earth_objects"
        for (const dateKey in data.near_earth_objects) {
            const dayList = data.near_earth_objects[dateKey];
            
            dayList.forEach(asteroid => {
                totalAsteroids++; // Öka det totala antalet räknade objekt

                const liElement = document.createElement('li');
                
                // Hämta storleken i meter och runda av talet snyggt
                const diameter = Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max);
                
                let dangerText = " (Säker)";
                if (asteroid.is_potentially_hazardous_asteroid === true) {
                    totalHazardous++;
                    dangerText = " (⚠️ POTENTIELLT FARLIG!)";
                }

                // Bygg textraden för listan (T.ex: 2026-10-19 | (2009 UY17) - ca 389 meter (⚠️ FARLIG!))
                liElement.textContent = dateKey + " | " + asteroid.name + " - ca " + diameter + " meter bred" + dangerText;
                ulElement.appendChild(liElement);
            });
        }

        // Skapa en textrad överst som sammanfattar all data
        const summaryText = document.createElement('p');
        summaryText.innerHTML = "Under perioden passerar totalt <strong>" + totalAsteroids + "</strong> kända asteroider i närheten av jorden. Av dessa är <strong>" + totalHazardous + "</strong> markerade som potentiellt farliga av NASA.";
        
        // Lägg in sammanfattningen och listan i din HTML-sektion
        asteroidSection.appendChild(summaryText);
        asteroidSection.appendChild(ulElement);

    } catch (error) {
        console.error(error);
        asteroidSection.innerHTML = "<h2>Kunde inte ladda asteroiddata just nu.</h2>";
    }
}




    

        //

            // Skapar en objekt som innehåller alla APOD-data