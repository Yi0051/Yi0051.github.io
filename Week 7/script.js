var colour = 'red';
var colour2 = 'blue';
var colour3 = 'rose';
var colour4 = 'aquamarine';
var colour5 = 'green';
var colour6 = 'cornflowerBlue';

var colours = []; // empty array
colours = ['red', 'blue', 'cornflowerBlue', 'aquamarine', 'green'];

console.log( typeof colours );
console.log( colours.length );
console.log( colours[0]);
console.log( colours[1.51355]); // if address does not exist return undefined

colours[7] = 4;  // address 5 annd 6 are empty
/// associative array any data at any address
console.log( colours);

for(var i = 0; i < 8; i++){
    console.log( colours[i]);
    colours[i] = i;
}
colours.push('red', undefined, true, null,{});
console.log( colours );

var thing = colours.pop();
console.log( thing );
console.log(colours);

//////////////////////

var ptags = document.getElementsByTagName('p');
console.log(ptags);

for(var i = 0; i < ptags.length; i++){
    ptags[i].innerHTML = 'hello';
    ptags[i].style.backgroundColor = colours[i % colours.length];
}

/////////////////
for(item of ptags){
    console.log(item);
    item.innerHTML = 'generic';
}