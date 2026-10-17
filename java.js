// JavaScript code to display the NASA APOD
// ska hämta APOD-data från api.nasa.gov


// Skapar en funktion som tar in ett datum som parameter

// JavaScript code to display the NASA APOD
// ska hämta APOD-data från api.nasa.gov

document.addEventListener('DOMContentLoaded', fetchApod);

async function fetchApod() {
    const apodSection = document.getElementById('apod-section');
    const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

    try { 
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Kunde inte hämta data från NASA API');
        }

        const data = await response.json();

        const titleElement = apodSection.querySelector('h2');
        titleElement.textContent = "Live in Space: " + data.title;

        // Kontrollera om det är en video eller en bild
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

        // Skapa text-elementet (p) för förklaringen
        const textElement = document.createElement('p');
        textElement.textContent = data.explanation; 
        apodSection.appendChild(textElement);

    } catch (error) {
        console.error("Ett fel uppstod:", error);
        apodSection.innerHTML = "<h2>Kunde inte ladda rymdbilden just nu.</h2>";
    }
}
    




    

        //

            // Skapar en objekt som innehåller alla APOD-data