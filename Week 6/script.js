var Shawn = document.getElementById("Shawn");
console.log(Shawn);

Shawn.onclick = function(){
    alert('Hello, again'); // dialog window with an ok button
    var result = confirm("Are you a friend of Shawn?"); // true or false
    if(result){
        Shawn.innerHTML = "Thanks for visiting";
    }else{
        Shawn.style.backgroundColor = 'tomato';
    }
    
    var response = prompt('What are you thinking about?');
    alert(response);
    if(response === 'pot of gold'){
        alert('me too!');
    }

};

var thecolour = 0;
var mark = document.getElementById('mark');
mark.onclick = colourChanger;

function colourChanger(){
    thecolour = (thecolour + 1) % 3;
    if(thecolour === 0){
        mark.style.backgroundColor = 'tomato';
    }
    if(thecolour === 1){
        mark.style.backgroundColor = 'aquamarine';
    }
    if(thecolour === 2){
        mark.style.backgroundColor = 'yellow';
    }
}
