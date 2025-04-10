var allthekitties = [];
var currentkitty = 0;
var kittyposition = {x: 100, y: 100, w:100, h:100};

function preload(){
    // let url = 'https://api.thecatapi.com/v1/images/search?limit=10';
    let url = 'https://api.thecatapi.com/v1/images/search?limit=15&category_ids=5';
    loadJSON(url, successCallback);
}

function successCallback(data){
    console.log(data);
    for(kitty of data){
        var kitty = createImg(kitty.url);
        kitty.hide();
        allthekitties.push(kitty);
    }
}

function setup(){
    createCanvas(600, 350);

    // kittyimg = createImg('https://cdn2.thecatapi.com/images/4g3.gif');
    // kittyimg2 = createImg('https://cdn2.thecatapi.com/images/JVITS8pXF.jpg');
    // kittyimg.hide();
    // kittyimg2.hide();
    // var kitties = document.getElementsByTagName('img');
    // console.log(kitties);

}

function draw(){
    background('pink');
    // image(kittyimg, 0,0, 100, 100);
    // image(kittyimg2, 100,100, 100, 100);
    text(allthekitties.length, 10,10);
    // for(kitty of allthekitties){
    //     image(kitty, random(width), random(height));
    // }

    image( allthekitties[currentkitty], kittyposition.x, kittyposition.y, kittyposition.w, kittyposition.h);
}

function mousePressed(){
    // if we click the kitty, increment currentKitty and change position
    if( mouseX > kittyposition.x && mouseX < kittyposition.x+kittyposition.h
        && mouseY > kittyposition.y && mouseY < kittyposition.y+kittyposition.h){
        currentkitty++;
        currentkitty = currentkitty % allthekitties.length;
        kittyposition.x = random(width-kittyposition.w);
        kittyposition.y = random(height-kittyposition.h);
    }
}