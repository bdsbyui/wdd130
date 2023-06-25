var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    FONT_HEIGHT = 15,
    MARGIN = 35,
    HAND_TRUNCATION = canvas.height/25,
    HOUR_HAND_TRUNCATION = canvas.height/10,
    NUMERAL_SPACING = 20,
    RADIUS = canvas.height/2 - MARGIN,
    HAND_RADIUS = RADIUS + NUMERAL_SPACING;
///////////////////////////////////////
context.font = '38pt Arial';
context.fillStyle = 'yellowgreen';
context.strokeStyle = 'yellowgreen';
context.fillText('Hello Family!', canvas.width/2 - 150, canvas.height/2 + 15);
///////////////////////////////////////
function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: (x - bbox.left) * (canvas.width / bbox.width),
        y: (y - bbox.top) * (canvas.height / bbox.height)
    };
};
canvas.onmousemove = function (e) {
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
    console.log(loc.x, loc.y);
};
///////////////////////////////////////
function drawCircle() {
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, RADIUS, 0, Math.PI*2, true);
    context.stroke();
};
function drawNumerals() {
    var numerals = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
        angle = 0,
        numeralWidth = 0;
    
    numerals.forEach(function(numeral) {
        angle = Math.PI/6 * (numeral-3);
        numeralWidth = context.measureText(numeral).width;
        context.fillText(
            numeral,
            canvas.width/2 + Math.cos(angle)*(HAND_RADIUS) - numeralWidth/2,
            canvas.height/2 + Math.sin(angle)*(HAND_RADIUS) + FONT_HEIGHT/3);
        });
};
function drawCenter() {
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, 5, 0, Math.PI*2, true);
    context.fill();
}
function drawHand(loc, isHour) {
    var angle = (Math.PI*2) * (loc/60) - Math.PI/2,
        handRadius = isHour ? 
            RADIUS - HAND_TRUNCATION-HOUR_HAND_TRUNCATION : 
                RADIUS - HAND_TRUNCATION;
    context.moveTo(canvas.width/2, canvas.height/2);
    context.lineTo(
        canvas.width/2 + Math.cos(angle)*handRadius,
        canvas.height/2 + Math.sin(angle)*handRadius
    );
    context.stroke();
}
function drawHands() {
    var date = new Date,
        hour = date.getHours();
    hour = hour > 12 ? hour - 12 : hour;
    drawHand(hour*5 + (date.getMinutes()/60)*5, true);
    drawHand(date.getMinutes(), false);
    drawHand(date.getSeconds(), false);
}
function drawClock() {
    context.clearRect(0,0,canvas.width,canvas.height);
    drawCircle();
    drawCenter();
    drawHands();
    drawNumerals();
}
context.font = FONT_HEIGHT + 'px Arial';
loop = setInterval(drawClock, 1000);
/*
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
 */
// // Family History data structures
// const branches = {}
// const trunk = {}
// const roots = {
//     april: {
//         country: "United States",
//         child: "bryant",
//         generation: 1,
//         name: "April Eyring",
//         parent: "mother",
//         year: 1956
//     },
//     bryant: {
//         country: "United States",
//         child: "",
//         generation: 0,
//         name: "Bryant Smith",
//         parent: "father",
//         year: 1975
//     } ,
//     daniel: {
//         country: "United States",
//         child: "bryant",
//         generation: 1,
//         name: "Daniel Smith",
//         parent: "father",
//         year: 1955
//     },
//     ernesto: {
//         country: "Colombia",
//         child: "vanessa",
//         generation: 1,
//         name: "Ernesto Bruno",
//         parent: "father",
//         year: 1946
//     },
//     lucia: {
//         country: "Colombia",
//         child: "vanessa",
//         generation: 1,
//         name: "Lucia Mulett",
//         parent: "mother",
//         year: 1949
//     },
//     vanessa: {
//         country: "Colombia",
//         child: "",
//         generation: 0,
//         name: "Vanessa Bruno",
//         parent: "mother",
//         year: 1974
//     }
// }