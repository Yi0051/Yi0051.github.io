var x = 0;
var y = 0;

function setup(){
    createCanvas(500,480);
}

function draw(){
    background('#7FFFD4') // automatic semicolon insertion
    rect(x,y,15,20);
    ellipse(width - x, height - y, 30, 30);

    x = x + 10;
    x = x % 500; // modulo operator
    y = y + 7;
    y = y % 400;
}