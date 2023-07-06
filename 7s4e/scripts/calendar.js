/* Script for 7s4e.org/calendar, last updated 5 July 2023.

    Table of Contents                                                    Line #
    ---------------------------------------------------------------------------
    Object declaration ..................................................    0
*/

/* (Array of) Objects */
const itineraries = [
    {
        departure: {when: new Date(2023, 5, 24, 5, 45), where: "MNL"},
        arrival: {when: new Date(2023, 5, 24, 8, 5), where: "TPE"},
        flight: "BR 262 ",
        passengers: ["Vanessa", "Aaron", "Timothy"]
    },
    {
        departure: {when: new Date(2023, 5, 24, 9, 50), where: "TPE"},
        arrival: {when: new Date(2023, 5, 24, 6, 45), where: "SFO"},
        flight: "UA 872 ",
        passengers: ["Vanessa", "Aaron", "Timothy"]
    },
    {
        departure: {when: new Date(2023, 5, 24, 19, 56), where: "SFO"},
        arrival: {when: new Date(2023, 5, 24, 21, 59), where: "PHX"},
        flight: "UA 683 ",
        passengers: ["Vanessa", "Aaron", "Timothy"]
    },
    {
        departure: {when: new Date(2023, 6, 1, 22, 25), where: "MNL"},
        arrival: {when: new Date(2023, 6, 2, 4, 25), where: "GUM"},
        flight: "UA 184 ",
        passengers: ["Hannah"]
    },
    {
        departure: {when: new Date(2023, 6, 2, 6, 55), where: "GUM"},
        arrival: {when: new Date(2023, 6, 1, 18, 15), where: "HNL"},
        flight: "UA 200 ",
        passengers: ["Hannah"]
    },
    {
        departure: {when: new Date(2023, 6, 1, 11, 0), where: "HNL"},
        arrival: {when: new Date(2023, 6, 2, 7, 22), where: "LAX"},
        flight: "UA 1251",
        passengers: ["Hannah"]
    },
    {
        departure: {when: new Date(2023, 6, 2, 8, 15), where: "LAX"},
        arrival: {when: new Date(2023, 6, 2, 9, 53), where: "PHX"},
        flight: "UA 1234",
        passengers: ["Hannah"]
    },
    {
        departure: {when: new Date(2023, 6, 6, 23, 56), where: "PHX"},
        arrival: {when: new Date(2023, 6, 7, 7, 22), where: "IAD"},
        flight: "UA 2487",
        passengers: ["Vanessa", "Hannah", "Aaron", "Timothy"]
    },
    {
        departure: {when: new Date(2023, 6, 7, 8, 15), where: "IAD"},
        arrival: {when: new Date(2023, 6, 7, 9, 41), where: "ROC"},
        flight: "UA 4877",
        passengers: ["Vanessa", "Hannah", "Aaron", "Timothy"]
    },
    {
        departure: {when: new Date(2023, 6, 12, 9, 10), where: "MNL"},
        arrival: {when: new Date(2023, 6, 12, 14, 50), where: "NRT"},
        flight: "NH 820 ",
        passengers: ["Bryant"]
    },
    {
        departure: {when: new Date(2023, 6, 12, 17, 0), where: "NRT"},
        arrival: {when: new Date(2023, 6, 12, 16, 40), where: "EWR"},
        flight: "UA 78  ",
        passengers: ["Bryant"]
    },
    {
        departure: {when: new Date(2023, 6, 12, 14, 24), where: "PHX"},
        arrival: {when: new Date(2023, 6, 12, 19, 59), where: "ORD"},
        flight: "UA 1253",
        passengers: ["Celeste"]
    },
    {
        departure: {when: new Date(2023, 6, 12, 21, 57), where: "EWR"},
        arrival: {when: new Date(2023, 6, 12, 23, 17), where: "ROC"},
        flight: "UA 1331",
        passengers: ["Bryant"]
    },
    {
        departure: {when: new Date(2023, 6, 12, 21, 32), where: "ORD"},
        arrival: {when: new Date(2023, 6, 13, 0, 16), where: "ROC"},
        flight: "UA 2011",
        passengers: ["Celeste"]
    },
    {
        departure: {when: new Date(2023, 6, 14, 10, 27), where: "ROC"},
        arrival: {when: new Date(2023, 6, 14, 11, 45), where: "IAD"},
        flight: "UA 4882",
        passengers: [
            "Bryant", "Vanessa", "Celeste", "Hannah", "Aaron", "Timothy"
        ]
    },
    {
        departure: {when: new Date(2023, 6, 17, 17, 28), where: "IAD"},
        arrival: {when: new Date(2023, 6, 17, 19, 16), where: "PHX"},
        flight: "UA 1938",
        passengers: ["Bryant", "Vanessa", "Celeste", "Aaron", "Timothy"]
    },
    {
        departure: {when: new Date(2023, 6, 20, 23, 59), where: "PHX"},
        arrival: {when: new Date(2023, 6, 21, 5, 34), where: "ORD"},
        flight: "UA 2484",
        passengers: ["Bryant", "Vanessa"]
    },
    {
        departure: {when: new Date(2023, 6, 21, 7, 10), where: "ORD"},
        arrival: {when: new Date(2023, 6, 21, 9, 48), where: "TYS"},
        flight: "UA 5666",
        passengers: ["Bryant", "Vanessa"]
    },
    {
        departure: {when: new Date(2023, 6, 24, 10, 23), where: "TYS"},
        arrival: {when: new Date(2023, 6, 24, 11, 17), where: "ORD"},
        flight: "UA 5300",
        passengers: ["Bryant", "Vanessa"]
    },
    {
        departure: {when: new Date(2023, 6, 24, 13, 23), where: "ORD"},
        arrival: {when: new Date(2023, 6, 24, 15, 14), where: "PHX"},
        flight: "UA 1944",
        passengers: ["Bryant", "Vanessa"]
    },
    {
        departure: {when: new Date(2023, 6, 26, 17, 28), where: "IAD"},
        arrival: {when: new Date(2023, 6, 26, 19, 16), where: "PHX"},
        flight: "UA 1938",
        passengers: ["Hannah"]
    },
    {
        departure: {when: new Date(2023, 7, 1, 7, 3), where: "PHX"},
        arrival: {when: new Date(2023, 7, 1, 9, 5), where: "SFO"},
        flight: "UA 2166",
        passengers: ["Bryant", "Vanessa", "Aaron", "Timothy"]
    },
    {
        departure: {when: new Date(2023, 7, 1, 12, 0), where: "SFO"},
        arrival: {when: new Date(2023, 7, 2, 14, 45), where: "NRT"},
        flight: "UA 837 ",
        passengers: ["Bryant", "Vanessa", "Aaron", "Timothy"]
    },
    {
        departure: {when: new Date(2023, 7, 2, 17, 15), where: "NRT"},
        arrival: {when: new Date(2023, 7, 2, 20, 55), where: "MNL"},
        flight: "NH 819 ",
        passengers: ["Bryant", "Vanessa", "Aaron", "Timothy"]
    },
];

const utcOffsets = {
    GUM: 10,
    NRT: 9,
    TPE: 8, MNL: 8,
    EWR: -4, IAD: -4, ROC: -4, TYS: -4,
    ORD: -5,
    PHX: -7, LAX: -7, SFO: -7,
    HNL: -10
}

const filterCriteria = {
    destinations: ["PHX", "ROC", "TYS"],
    travelers: ["Bryant", "Vanessa", "Celeste", "Hannah", "Aaron", "Timothy"]
}

const utcTime = new Date().getTime();

/* HTML Elements */
// const placesFieldset = document.getElementById("destinations");
const allPlacesBox = document.getElementById("all-places");
const phxBox = document.getElementById("phx");
const rocBox = document.getElementById("roc");
const tysBox = document.getElementById("tys");
// const peopleFieldset = document.getElementById("travelers");
const allPeopleBox = document.getElementById("all-people");
const bryantBox = document.getElementById("bryant");
const vanessaBox = document.getElementById("vanessa");
const celesteBox = document.getElementById("celeste");
const hannahBox = document.getElementById("hannah");
const aaronBox = document.getElementById("aaron");
const timothyBox = document.getElementById("timothy");
const table = document.getElementById("table");




function checkPlaces() {
    filterCriteria.destinations = [];
    if (phxBox.checked) {filterCriteria.destinations.push("PHX");}
    if (rocBox.checked) {filterCriteria.destinations.push("ROC");}
    if (tysBox.checked) {filterCriteria.destinations.push("TYS");}
    displayTable();
}

function checkPeople() {
    filterCriteria.travelers = [];
    if (bryantBox.checked) {filterCriteria.travelers.push("Bryant");}
    if (vanessaBox.checked) {filterCriteria.travelers.push("Vanessa");}
    if (celesteBox.checked) {filterCriteria.travelers.push("Celeste");}
    if (hannahBox.checked) {filterCriteria.travelers.push("Hannah");}
    if (aaronBox.checked) {filterCriteria.travelers.push("Aaron");}
    if (timothyBox.checked) {filterCriteria.travelers.push("Timothy");}
    displayTable();
}


function displayTable() {
    console.log(filterCriteria)
    let tableRows = `<tr><th><pre>DEPART</pre></th><th><pre>ARRIVE</pre></th>
        <th><pre>VIA</pre></th></tr>`;
    for (itinerary in itineraries) {
        if (((
            allPlacesBox.checked
        ) || (
            filterCriteria.destinations.includes(
                itineraries[itinerary].departure.where
        )
        ) || (
            filterCriteria.destinations.includes(
                itineraries[itinerary].arrival.where
            )
        )) && (
            filterCriteria.travelers.some(
                (traveler) => itineraries[itinerary].passengers.includes(
                    traveler
                )
            )
        )) {
            let takeoff = itineraries[itinerary].departure.when
            let day = takeoff.toLocaleDateString('en-US', {weekday: "short"});
            let date = String(takeoff.getDate()).padStart(2, "0");
            let month = takeoff.toLocaleDateString('en-US', {month: "short"});
            let hour = String(takeoff.getHours()).padStart(2, "0");
            let minutes = String(takeoff.getMinutes()).padStart(2, "0");
            takeoff = `${day} ${date} ${month} ${hour}${minutes}`
            let from = itineraries[itinerary].departure.where
            let touchdown = itineraries[itinerary].arrival.when
            day = touchdown.toLocaleDateString('en-US', {weekday: "short"});
            date = String(touchdown.getDate()).padStart(2, "0");
            month = touchdown.toLocaleDateString('en-US', {month: "short"});
            hour = String(touchdown.getHours()).padStart(2, "0");
            minutes = String(touchdown.getMinutes()).padStart(2, "0");
            touchdown = `${day} ${date} ${month} ${hour}${minutes}`
            let at = itineraries[itinerary].arrival.where
            let departure = `<td><pre>${takeoff} ${from}</pre></td>`;
            let arrival = `<td><pre>${touchdown} ${at}</pre></td>`
            let via = `<td><pre>${itineraries[itinerary].flight}</pre></td>`
            let row = `<tr>${departure}${arrival}${via}</tr>`
            tableRows += `<tr>${departure}${arrival}${via}</tr>`
            console.log(row)
        }
    }
    table.innerHTML = tableRows;
}

displayTable()

// console.log(filterCriteria);
// console.log(utcTime > itineraries[20].departure.when);


allPlacesBox.addEventListener("change", (event) => {
    if (allPlacesBox.checked) {
        phxBox.checked = rocBox.checked = tysBox.checked = true;
    }
    else {phxBox.checked = rocBox.checked = tysBox.checked = false;}
    checkPlaces();
})
phxBox.addEventListener("change", (event) => {
    if (phxBox.checked && rocBox.checked && tysBox.checked) {
        allPlacesBox.checked = true;
    } else {allPlacesBox.checked = false;}
    checkPlaces();
})
rocBox.addEventListener("change", (event) => {
    if (phxBox.checked && rocBox.checked && tysBox.checked) {
        allPlacesBox.checked = true;
    } else {allPlacesBox.checked = false;}
    checkPlaces();
})
tysBox.addEventListener("change", (event) => {
    if (phxBox.checked && rocBox.checked && tysBox.checked) {
        allPlacesBox.checked = true;
    } else {allPlacesBox.checked = false;}
    checkPlaces();
})

allPeopleBox.addEventListener("change", (event) => {
    if (allPeopleBox.checked) {
        bryantBox.checked = vanessaBox.checked = celesteBox.checked = true;
        hannahBox.checked = aaronBox.checked = timothyBox.checked = true;
    }
    else {
        bryantBox.checked = vanessaBox.checked = celesteBox.checked = false;
        hannahBox.checked = aaronBox.checked = timothyBox.checked = false;
    }
    checkPeople();
})
bryantBox.addEventListener("change", (event) => {
    if (
        bryantBox.checked && vanessaBox.checked && celesteBox.checked && hannahBox.checked && aaronBox.checked && timothyBox.checked
    ) {allPeopleBox.checked = true;}
    else {allPeopleBox.checked = false;}
    checkPeople();
})
vanessaBox.addEventListener("change", (event) => {
    if (
        bryantBox.checked && vanessaBox.checked && celesteBox.checked && hannahBox.checked && aaronBox.checked && timothyBox.checked
    ) {allPeopleBox.checked = true;}
    else {allPeopleBox.checked = false;}
    checkPeople();
})
celesteBox.addEventListener("change", (event) => {
    if (
        bryantBox.checked && vanessaBox.checked && celesteBox.checked && hannahBox.checked && aaronBox.checked && timothyBox.checked
    ) {allPeopleBox.checked = true;}
    else {allPeopleBox.checked = false;}
    checkPeople();
})
hannahBox.addEventListener("change", (event) => {
    if (
        bryantBox.checked && vanessaBox.checked && celesteBox.checked && hannahBox.checked && aaronBox.checked && timothyBox.checked
    ) {allPeopleBox.checked = true;}
    else {allPeopleBox.checked = false;}
    checkPeople();
})
aaronBox.addEventListener("change", (event) => {
    if (
        bryantBox.checked && vanessaBox.checked && celesteBox.checked && hannahBox.checked && aaronBox.checked && timothyBox.checked
    ) {allPeopleBox.checked = true;}
    else {allPeopleBox.checked = false;}
    checkPeople();
})
timothyBox.addEventListener("change", (event) => {
    if (
        bryantBox.checked && vanessaBox.checked && celesteBox.checked && hannahBox.checked && aaronBox.checked && timothyBox.checked
    ) {allPeopleBox.checked = true;}
    else {allPeopleBox.checked = false;}
    checkPeople();
})
