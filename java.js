// JavaScript code to display the NASA APOD
// ska hämta APOD-data från api.nasa.gov


// Skapar en funktion som tar in ett datum som parameter
async function fetchApod() {
    const apodSection = document.getElementById('apod-section');
    const apiUrl = 'https://nasa.gov';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Kunde inte hämta data från NASA API');
        }

        const data = await response.json();

        
        const titleElement = apodSection.querySelector('h2');
        titleElement.textContent = "Live in Space: " + data.title;

        const imgElement = document.createElement('img');
        imgElement.src = data.url;          
        imgElement.alt = data.title;        
        imgElement.style.maxWidth = '100%'; 
        
        //Lägg in bilden i sektion
        apodSection.appendChild(imgElement);

        //Skapa text-elementet (p) för förklaringen
        const textElement = document.createElement('p');
        textElement.textContent = data.explanation; 
        
        //Lägg in texten i din sektion
        apodSection.appendChild(textElement);

    } catch (error) {
        console.error("Ett fel uppstod:", error);
        apodSection.innerHTML = "<h2>Kunde inte ladda rymdbilden just nu.</h2>";
    }
}
    




    

        //

            // Skapar en objekt som innehåller alla APOD-data