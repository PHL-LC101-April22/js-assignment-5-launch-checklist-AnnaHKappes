// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let div = document.getElementById("missionTarget");
   div.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src=${imageUrl}>
                `;   
}

function validateInput(testInput) {
    let numberInput = Number(testInput);
    if (testInput === "")
    {
        return "Empty";
    }
    else if (isNaN(numberInput))
    {
        return "Not a Number";
    } 
    else if (isNaN(numberInput) === false)
    {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) 
{
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
          
        if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty")
        {
            alert("All fields are required!");
            list.style.visibility = "hidden";
        }
        else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number")
        {
            alert("Make sure to enter valid information for each field!");
            list.style.visibility = "hidden";
        }
        else if (validateInput(pilot) === "Not a Number" && validateInput(copilot) === "Not a Number" && validateInput(fuelLevel) === "Is a Number" && validateInput(cargoLevel) === "Is a Number")
        {
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
            list.style.visibility = "visible";
            if (Number(fuelLevel) < 10000 && Number(cargoLevel) <= 10000)
            {
                fuelStatus.innerHTML = `Fuel level too low for launch`;
                cargoStatus.innerHTML = `Cargo mass low enough for launch`;
                launchStatus.style.color = "red";
                launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            }
            else if (Number(fuelLevel) >= 10000 && Number(cargoLevel) > 10000)
            {
                fuelStatus.innerHTML = `Fuel level high enough for launch`;
                cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
                launchStatus.style.color = "red";
                launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            }
            else if (Number(fuelLevel) < 10000 && Number(cargoMass.value) > 10000)
            {
                fuelStatus.innerHTML = "Fuel level too low for launch";
                cargoStatus.innerHTML = "Cargo mass too heavy for launch";
                launchStatus.style.color = "red";
                launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            }   
            else {
                fuelStatus.innerHTML = "Fuel level high enough for launch";
                cargoStatus.innerHTML = "Cargo mass low enough for launch";
                launchStatus.style.color = "green";
                launchStatus.innerHTML = `Shuttle is Ready for Launch`;
            }             
        }
}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let random = Math.floor(Math.random() * planets.length); 
    return planets[Number(random)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
