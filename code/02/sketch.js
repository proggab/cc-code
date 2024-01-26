let btn
let numCircle=0
function setup() {
createCanvas (50, 50)
btn = createButton("soda");
btn.addClass('my-button');
btn.mousePressed(btnPressed);
}

function btnPressed () {
numCircle++
}

function draw() {
    background(210);
    for (let i=0; i< numCircle; i++){
        circle(random(width),
        random(height), random(5,15))
    }
   

}
