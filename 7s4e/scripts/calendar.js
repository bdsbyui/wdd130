/* Script for 7s4e.org/calendar, last updated 8 July 2023.

    Table of Contents                                                    Line #
    ---------------------------------------------------------------------------
    Objects .............................................................   23
        Flights .........................................................   24
        DOM objects .....................................................  171
        Time objects ....................................................  188
    
    HTML elements .......................................................  200

    Functions ...........................................................  218
        updateCheckboxes() ..............................................  219
        readCheckboxes() ................................................  252
        putTable() ......................................................  267
            createTableEntry() ..........................................  278
            appendTableRow() ............................................  299
            evaluateTime() ..............................................  312
    
    Event listeners .....................................................  374
*/

/* (Array of) Objects */
const flights = [
    {
        dep: {when: new Date(2023, 5, 24, 5, 45), where: "MNL"},
        arr: {when: new Date(2023, 5, 24, 8, 5), where: "TPE"},
        flt: "BR 262 ",
        pax: ["Vanessa", "Aaron", "Timothy"]
    },
    {
        dep: {when: new Date(2023, 5, 24, 9, 50), where: "TPE"},
        arr: {when: new Date(2023, 5, 24, 6, 45), where: "SFO"},
        flt: "UA 872 ",
        pax: ["Vanessa", "Aaron", "Timothy"]
    },
    {
        dep: {when: new Date(2023, 5, 24, 19, 56), where: "SFO"},
        arr: {when: new Date(2023, 5, 24, 21, 59), where: "PHX"},
        flt: "UA 683 ",
        pax: ["Vanessa", "Aaron", "Timothy"]
    },
    {
        dep: {when: new Date(2023, 6, 1, 22, 25), where: "MNL"},
        arr: {when: new Date(2023, 6, 2, 4, 25), where: "GUM"},
        flt: "UA 184 ",
        pax: ["Hannah"]
    },
    {
        dep: {when: new Date(2023, 6, 2, 6, 55), where: "GUM"},
        arr: {when: new Date(2023, 6, 1, 18, 15), where: "HNL"},
        flt: "UA 200 ",
        pax: ["Hannah"]
    },
    {
        dep: {when: new Date(2023, 6, 1, 11, 0), where: "HNL"},
        arr: {when: new Date(2023, 6, 2, 7, 22), where: "LAX"},
        flt: "UA 1251",
        pax: ["Hannah"]
    },
    {
        dep: {when: new Date(2023, 6, 2, 8, 15), where: "LAX"},
        arr: {when: new Date(2023, 6, 2, 9, 53), where: "PHX"},
        flt: "UA 1234",
        pax: ["Hannah"]
    },
    {
        dep: {when: new Date(2023, 6, 6, 23, 56), where: "PHX"},
        arr: {when: new Date(2023, 6, 7, 7, 22), where: "IAD"},
        flt: "UA 2487",
        pax: ["Vanessa", "Hannah", "Aaron", "Timothy"]
    },
    {
        dep: {when: new Date(2023, 6, 7, 8, 15), where: "IAD"},
        arr: {when: new Date(2023, 6, 7, 9, 41), where: "ROC"},
        flt: "UA 4877",
        pax: ["Vanessa", "Hannah", "Aaron", "Timothy"]
    },
    {
        dep: {when: new Date(2023, 6, 12, 9, 10), where: "MNL"},
        arr: {when: new Date(2023, 6, 12, 14, 50), where: "NRT"},
        flt: "NH 820 ",
        pax: ["Bryant"]
    },
    {
        dep: {when: new Date(2023, 6, 12, 17, 0), where: "NRT"},
        arr: {when: new Date(2023, 6, 12, 16, 40), where: "EWR"},
        flt: "UA 78  ",
        pax: ["Bryant"]
    },
    {
        dep: {when: new Date(2023, 6, 12, 14, 24), where: "PHX"},
        arr: {when: new Date(2023, 6, 12, 19, 59), where: "ORD"},
        flt: "UA 1253",
        pax: ["Celeste"]
    },
    {
        dep: {when: new Date(2023, 6, 12, 21, 57), where: "EWR"},
        arr: {when: new Date(2023, 6, 12, 23, 17), where: "ROC"},
        flt: "UA 1331",
        pax: ["Bryant"]
    },
    {
        dep: {when: new Date(2023, 6, 12, 21, 32), where: "ORD"},
        arr: {when: new Date(2023, 6, 13, 0, 16), where: "ROC"},
        flt: "UA 2011",
        pax: ["Celeste"]
    },
    {
        dep: {when: new Date(2023, 6, 14, 10, 27), where: "ROC"},
        arr: {when: new Date(2023, 6, 14, 11, 45), where: "IAD"},
        flt: "UA 4882",
        pax: ["Bryant", "Vanessa", "Celeste", "Hannah", "Aaron", "Timothy"]
    },
    {
        dep: {when: new Date(2023, 6, 17, 17, 28), where: "IAD"},
        arr: {when: new Date(2023, 6, 17, 19, 16), where: "PHX"},
        flt: "UA 1938",
        pax: ["Bryant", "Vanessa", "Celeste", "Aaron", "Timothy"]
    },
    {
        dep: {when: new Date(2023, 6, 20, 23, 59), where: "PHX"},
        arr: {when: new Date(2023, 6, 21, 5, 34), where: "ORD"},
        flt: "UA 2484",
        pax: ["Bryant", "Vanessa"]
    },
    {
        dep: {when: new Date(2023, 6, 21, 7, 10), where: "ORD"},
        arr: {when: new Date(2023, 6, 21, 9, 48), where: "TYS"},
        flt: "UA 5666",
        pax: ["Bryant", "Vanessa"]
    },
    {
        dep: {when: new Date(2023, 6, 24, 10, 23), where: "TYS"},
        arr: {when: new Date(2023, 6, 24, 11, 17), where: "ORD"},
        flt: "UA 5300",
        pax: ["Bryant", "Vanessa"]
    },
    {
        dep: {when: new Date(2023, 6, 24, 13, 23), where: "ORD"},
        arr: {when: new Date(2023, 6, 24, 15, 14), where: "PHX"},
        flt: "UA 1944",
        pax: ["Bryant", "Vanessa"]
    },
    {
        dep: {when: new Date(2023, 6, 26, 17, 28), where: "IAD"},
        arr: {when: new Date(2023, 6, 26, 19, 16), where: "PHX"},
        flt: "UA 1938",
        pax: ["Hannah"]
    },
    {
        dep: {when: new Date(2023, 7, 1, 7, 3), where: "PHX"},
        arr: {when: new Date(2023, 7, 1, 9, 5), where: "SFO"},
        flt: "UA 2166",
        pax: ["Bryant", "Vanessa", "Aaron", "Timothy"]
    },
    {
        dep: {when: new Date(2023, 7, 1, 12, 0), where: "SFO"},
        arr: {when: new Date(2023, 7, 2, 14, 45), where: "NRT"},
        flt: "UA 837 ",
        pax: ["Bryant", "Vanessa", "Aaron", "Timothy"]
    },
    {
        dep: {when: new Date(2023, 7, 2, 17, 15), where: "NRT"},
        arr: {when: new Date(2023, 7, 2, 20, 55), where: "MNL"},
        flt: "NH 819 ",
        pax: ["Bryant", "Vanessa", "Aaron", "Timothy"]
    },
];

/* DOM Objects */
const inputs = {
    places: ["PHX", "ROC", "TYS"],
    people: ["Bryant", "Vanessa", "Celeste", "Hannah", "Aaron", "Timothy"]
}
const domVars = {
    boxes: {},
    filters: {
        places: inputs.places,
        people: inputs.people
    },
    allBool: {
        places: [],
        people: []
    }
}

/* Time Objects */
const utcTimeNow = new Date().getTime();
const utcOffsets = {
    GUM: 10,
    NRT: 9,
    TPE: 8, MNL: 8,
    EWR: -4, IAD: -4, ROC: -4, TYS: -4,
    ORD: -5,
    PHX: -7, LAX: -7, SFO: -7,
    HNL: -10
}

/* HTML Elements */
const table = document.getElementById("table");

for (const [input, criteria] of Object.entries(inputs)) {
    /* Creates checkbox elements for each key and value in the inputs object, 
     *   and writes them in the domVars.boxes object.
     */
    domVars.boxes[input] = {};
    let key = "all-".concat(input.toString());
    let checkboxElement = document.getElementById(key);
    domVars.boxes[input][key] = checkboxElement;
    for (const criterion in criteria) {
        key = criteria[criterion].toString();
        checkboxElement = document.getElementById(key);
        domVars.boxes[input][key] = checkboxElement;
    }
}

/* Functions */
function updateCheckboxes(clicked, input) {
    /* Before reaching the checkboxes, this function updates dependent 
     *   checkboxes to implement Select All logic:
     *     - if Select All is checked, all individual boxes are checked,
     *     - if Select All is unchecked, all indivdual boxes are unchecked,
     *     - if all individual boxes are checked, Select All is checked,
     *     - if any individual box is unchecked, Select All is unchecked.
     * Parameters: clicked, the key for the selected checkbox
     * Return: none
     */

    if (clicked.toString().startsWith("all")) {
        for (const [key, checkbox] of Object.entries(
            domVars.boxes[input]
        )) {
            if (key != clicked) {
                checkbox.checked = domVars.boxes[input][clicked].checked;
            }
        }
    } else {
        domVars.allBool[input] = [];
        for (const [key, checkbox] of Object.entries(domVars.boxes[input])) {
            if (!(key.toString().startsWith("all"))) {
                domVars.allBool[input].push(checkbox.checked);
            }
        }

Object.values(domVars.boxes[input])[0].checked = domVars.allBool[input].every(Boolean);

    }
    readCheckboxes(input);
}

function readCheckboxes(input) {
    /* Reads the checkboxes in either the destinations or travelers fieldset, 
     *   pushes the value to an array in the appropriate 
     *   domVars.filters object, and calls function to redraw the 
     *   table according to the checked filters.
     * Parameters: a key in the inputs object, either places or people
     * Return: none
     */
    domVars.filters[input] = [];
    for (const [label, element] of Object.entries(domVars.boxes[input])) {
        if (element.checked) {domVars.filters[input].push(label);}
    }
    putTable();
}

function putTable() {
    /* Displays table of flights by row, first with the header row and then 
     *   with the data rows for each itinerary leg with the following boolean 
     *   expression evaluated as true.
     *     All destinations selected
     *       OR selected destination(s) match the departure OR arrival airports
     *     AND any selected traveler(s) match passengers for that leg
     * Parameters: none
     * Return: none
     */
    
    function createTableEntry(string, past=false, data=true) {
        /* Creates HTML table cell, either as a table header or table data 
         *   element with an internal preformatted element, and adds "past" to 
         *   class list of the preformatted element as appropriate.
         * Parameters:
         *   string, the inner text of the preformatted element
         *   past, adds "past" to preformatted class list if true
         *   data, inserts preformatted element into a table data element if 
         *     true, or into a table header element if false
         * Return: tableEntry, the table cell HTML
        */
        let cellType = "";
        if (data) {cellType = "td";} else {cellType = "th";}
        let tableEntry = document.createElement(cellType);
        let preformattedText = document.createElement("pre");
        if (past) {preformattedText.classList.add("past");}
        preformattedText.innerText = string;
        tableEntry.appendChild(preformattedText);
        return tableEntry;
    }

    function appendTableRow(depEntry, arrEntry, viaEntry) {
        /* Creates a table row HTML element containing table data elements for  
         *   the departure, arrival, and via columns, and appends the row to 
         *   the table.
         * Parameters: depEntry, arrEntry, and viaEntry, HTML for 
         *   table cells created by the createTableEntry() function
         * Return: none
        */
        let tableRow = document.createElement("tr");
        for (const argument of arguments) {tableRow.appendChild(argument);}
        table.appendChild(tableRow);
    }
    
    function evaluateTime(timeObject, location) {
        /* Creates and event object to pass a string for an itinerary leg 
         *   element and a flag for whether the leg element is past the current 
         *   time.
         * Parameters:
         *   timeObject, value of the when key of a leg's departure or arrival
         *   location, value of the where key of a leg's departure or arrival
         * Return: eventObject, including eventObject.string and 
         *   eventObject.past
        */
        let eventObject = {
            string: ``,
            past: false
        }
        let day = timeObject.toLocaleDateString('en-US', {weekday: "short"});
        let date = String(timeObject.getDate()).padStart(2, "0");
        let month = timeObject.toLocaleDateString('en-US', {month: "short"});
        let hour = String(timeObject.getHours()).padStart(2, "0");
        let minutes = String(timeObject.getMinutes()).padStart(2, "0");
        let utcTimeThen = timeObject.setHours(
            timeObject.getHours() - utcOffsets[location]
        );
        eventObject.string = `${day} ${date} ${month} ${hour}${minutes}`;
        eventObject.past = utcTimeThen - utcTimeNow < 0;
        return eventObject
    }
    
    table.innerHTML = "";
    let depColumn = createTableEntry("DEPART", past=false, data=false);
    let arrColumn = createTableEntry("ARRIVE", past=false, data=false);
    let viaColumn = createTableEntry("VIA", past=false, data=false);
    appendTableRow(depColumn, arrColumn, viaColumn);
    for (const leg in flights) {
        if (((domVars.boxes.places["all-places"].checked) || (
            domVars.filters.places.includes(flights[leg].dep.where)
        ) || (
            domVars.filters.places.includes(flights[leg].arr.where)
        )) && (
            domVars.filters.people.some(
                (person) => flights[leg].pax.includes(person)
            )
        )) {
            let from = flights[leg].dep.where;
            let takeoff = evaluateTime(flights[leg].dep.when, from);
            let at = flights[leg].arr.where;
            let touchdown = evaluateTime(flights[leg].arr.when, at);
            let depEntry = createTableEntry(
                `${takeoff.string} ${from}`,
                past = takeoff.past
            );
            let arrEntry = createTableEntry(
                `${touchdown.string} ${at}`,
                past = touchdown.past
            );
            let viaEntry = createTableEntry(
                `${flights[leg].flt}`,
                past = touchdown.past);
            appendTableRow(depEntry, arrEntry, viaEntry);
        }
    }
}

/* Event Listeners */
for (const input of Object.keys(inputs)) {
    for (const [key, checkbox] of Object.entries(domVars.boxes[input])) {
        checkbox.addEventListener("change", (event) => {
            updateCheckboxes(key, input);
        })
    }
}

putTable()
