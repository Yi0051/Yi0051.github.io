/// confetti
// colours random
// shapes random
// speeds
//positionns
// stretch goal
// rotations random
// button to turn off and on

var position = 0;
var colours = [];
var shapes = [];
var positions = [];
var rotations = [];
var speeds = [];

var numberofConfetto = 400;
var partyon = false;

function setup(){
    createCanvas(windowWidth, windowHeight);
    noStroke();
    var button = createButton('Submit');
    button.position(0,0);
    button.mousePressed(function(){
        partyon = !partyon;
    });

    for(var i = 0; i < numberofConfetto; i++){
        colours[i] = color( random(255), random(255), random(255) );
        positions[i] = random(height);
        shapes[i] = shapeDecider();
        speeds[i] = random(6) + 1;
        rotations[i] = random(TWO_PI);
    }
}

function draw(){
   background(255);
if(partyon){
    party();
}
}

function party(){
    for(var i = 0; i < colours.length; i++){
        fill( colours[i]);
        push();
        translate((i*10)%width, positions[i]);
        rotate(rotations[i]);
        if(shapes[i] === 'confetto'){
        rect(0, 0, 15, 5);
        }
        if(shapes[i] === 'circle'){
            ellipse(0, 0, 10, 10);
        }
        if(shapes[i] === 'face'){
            text('✨️', 0, 0);
        }
        pop();
        positions[i] += speeds[i];
        positions[i] = positions[i] % height;
       }
}

/// starting point
function text(){
    fill('cornflowerBlue');
    rect(20,position++,15,5);
    rect(150,position,15,5);
    rect(50,position,15,5);
    rect(200,position,15,5);
    ellipse(250,position,15,15);
    text('✨️', 300, position);
position = position % windowHeight;
}


function shapeDecider(){
    var shape = 'confetto';
    if(random() > 0.6 ){
        shape = 'circle';
    }
    if(random() > 0.9){
        shape = 'face';
    }
    return shape;
}