document.body.style.backgroundImage = "url('chill.jpg')"


//buttons set up

const buttons = document.querySelector('#buttons');

let buttonClear = document.createElement('button');
buttonClear.innerText = "CLEAR";
buttonClear.style.height = "50px";
buttonClear.addEventListener('click', clearBox);
buttons.appendChild(buttonClear);

let buttonRandomColor = document.createElement('button');
buttonRandomColor.innerText = "RANDOM COLOR";
buttonRandomColor.style.height = "50px";
buttonRandomColor.style.marginLeft = "5px";
buttonRandomColor.addEventListener('click', randomColorListener);
buttons.appendChild(buttonRandomColor);

let buttonShade = document.createElement('button');
buttonShade.innerText= "10% BLACK";
buttonShade.style.height = "50px";
buttonShade.style.marginLeft = "5px";
buttonShade.addEventListener('click', tenPercentBlackListener);
buttons.appendChild (buttonShade);

let buttonCustom = document.createElement('button');
buttonCustom.innerText = "CUSTOM BOXES";
buttonCustom.style.height = "50px";
buttonCustom.style.marginLeft = "5px";
buttonCustom.addEventListener('click', customBoxListener);
buttons.appendChild(buttonCustom);

let buttonDefault = document.createElement('button');
buttonDefault.innerText = "DEFAULT BLACK";
buttonDefault.style.height = "50px";
buttonDefault.style.marginLeft = "5px";
buttonDefault.addEventListener('click', defaultListener);
buttons.appendChild(buttonDefault);


const sketchBox = document.querySelector('#sketchBox');


//loop that creates all the boxess
for(let x = 0; x < 256; x++){
let box = document.createElement('div');
box.style.width = '60px';
box.style.height = '37.5px';
box.style.border = '0.5px solid grey'
box.style.backgroundColor = 'rgba(0,0,0,0)';
box.className = 'squares';
sketchBox.appendChild(box);
}

const divs = document.getElementsByClassName('squares');


for(let i = 0; i < divs.length; i++){
    divs[i].addEventListener('mouseover', defaultDraw);
}


function clearButtonPressOutlines(){
    buttonRandomColor.style.outline = "";
    buttonDefault.style.outline = "";
    buttonShade.style.outline = "";
}



function randomColorListener(){

    cleanListeners(); 

    clearButtonPressOutlines();
    //highlight current Button in use
    buttonRandomColor.style.outline = "3px solid rgb(241, 165, 183)";

    for(let i = 0; i < divs.length; i++){
        divs[i].addEventListener('mouseover', randomColor);
    }
}


function randomColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let bgColor = "rgb(" + x + "," + y + "," + z + ")";
    this.style.backgroundColor = bgColor;
}


function defaultListener(){

    cleanListeners();

    clearButtonPressOutlines();
    //highlight current Button in use
    buttonDefault.style.outline = "3px solid rgb(241, 165, 183)";

    for(let i = 0; i < divs.length; i++){
        divs[i].addEventListener('mouseover', defaultDraw);
        }
}



function defaultDraw(){
    this.style.backgroundColor = "rgba(0,0,0,1)";
}


function tenPercentBlack(){
    

    let opacityString = this.style.backgroundColor;
    let regexExp = /\d\.\d/g; //regex expression to get float at end of rgba
    let result = opacityString.match(regexExp);
  
    // if rgba last alpha is a 0 or 1 the result will be null so throw it to opacitychecker
    // to see which case it is, if it is 0 we start the shading by setting alpha to 0.1
    // if it is 1 opacitychecker will throw false flag and we know we are done and the
    // box is completely black.
    if(result === null){
        if (opacityChecker(this.style.backgroundColor)){
            let opacityAdder = 0.1;
            this.style.backgroundColor = "rgba(0, 0, 0," + opacityAdder + ")";
        }
        else{
            return false;
        }
    }
    // when the result isnt null we get the float number convert it to a float and add 0.1 to it
    else {
        let opacityAdder = parseFloat(result[0]);
        opacityAdder += 0.1;
        this.style.backgroundColor = "rgba(0, 0, 0," + opacityAdder + ")"; 
    }

   

    
}


function tenPercentBlackListener(){

    cleanListeners();

    clearButtonPressOutlines();
    //highlight current Button in use
    buttonShade.style.outline = "3px solid rgb(241, 165, 183)";

    for(let i = 0; i < divs.length; i++){
        divs[i].addEventListener('mouseover', tenPercentBlack);
        }

}

function opacityChecker(rgbaColor){

 //function checks for the a in rgba(w,x,y,z), if box is fully black will not have rgba,
 //instead it will be rgb (x,y,z)
    
    let checkForRgba = /[a]/g;
    let resultCheckerRgba = rgbaColor.match(checkForRgba);
    if(resultCheckerRgba === null){
        return false;
    }

    else {

        return true;
    }

}




function clearBox(){

    cleanListeners();

    clearButtonPressOutlines();

    for(let i = 0; i < divs.length; i++){
        divs[i].style.backgroundColor = 'rgba(0,0,0,0)';
    }

}


function customBoxListener(){

    cleanListeners();

    clearButtonPressOutlines();
    
    let choiceInput = parseInt(prompt("please input a number between 1 - 64, this number will be used to create a new grid."));

    if(isNaN(choiceInput)){
        alert("inputted value is not a valid number");
    }
    else{
        checkValue(choiceInput);
    }
}

function checkValue(choiceInput){

    if(choiceInput < 1 || choiceInput > 64){
        alert("number either too high or too low.")
    }

    else{
        createNewGrid(choiceInput);
    }
}

function createNewGrid(choiceInput){

    eraseGrid();

    let gridWidth = sketchBox.offsetWidth / choiceInput - 1;
    let gridHeight = sketchBox.offsetHeight / choiceInput - 1;
    let counterLength = choiceInput * choiceInput;

    sketchBox.style.gridTemplateColumns = "repeat(" + choiceInput + ", 1fr)";
    sketchBox.style.gridTemplateRows = "repeat(" + choiceInput + ", 1fr)";

    
    
    for(let x = 0; x < counterLength; x++){
        let box = document.createElement('div');
        box.style.width =  gridWidth + "px";
        box.style.height = gridHeight + "px";
        box.style.border = '0.5px solid grey'
        box.style.backgroundColor = 'rgba(0,0,0,0)';
        box.className = 'squares';
        sketchBox.appendChild(box);
        }

}

function eraseGrid(){

    let child = sketchBox.lastElementChild;
    while(child){
        sketchBox.removeChild(child);
        child = sketchBox.lastElementChild;
    }
}

function cleanListeners(){

    for(let i = 0; i < divs.length; i++){
        divs[i].removeEventListener('mouseover', tenPercentBlack);
        divs[i].removeEventListener('mouseover', defaultDraw);
        divs[i].removeEventListener('mouseover', randomColor);
        }

}
