// JavaScript code to display the NASA APOD
// ska hämta APOD-data från api.nasa.gov


// Skapar en funktion som tar in ett datum som parameter
async function getApod () {
//kopplar till html
    const apodSection = document.getElementById('apod-section');

const apiKey = 'DEMO_KEY';

console.log(apiKey);

//try-catch-block för att hämta APOD-data
try {
    const response = await fetch (apiURL);
    if (!response.ok) {
        throw new Error('Kunde inte hämta APOD-data');
    }

}

    

        //

            // Skapar en objekt som innehåller alla APOD-data