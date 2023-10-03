const penButton = document.getElementById("pen-button");
const eraserButton = document.getElementById("eraser-button");
const colorPicker = document.getElementById("color-picker");
const rangedPicker = document.getElementById("ranged-slider");
const grid = document.getElementById("grid");
const gridSizeDisplay = document.getElementById("grid-size-display");

let activeTool = penButton;
let originalButtonColor = penButton.style.backgroundColor;

let gridElements;
let basicGridElement;
let array;

let mouseDown = 0;

document.body.onmousedown = (e) => {
    mouseDown = 1;
    // e.preventDefault();
};
document.body.onmouseup = () => {mouseDown = 0;}

penButton.addEventListener("click", () => {setTool(penButton)} );
eraserButton.addEventListener("click", () => {setTool(eraserButton)});
rangedPicker.addEventListener("change", () => {updateGrid(rangedPicker.value)});

function setTool(tool){
    activeTool.style.borderColor = "transparent";
    activeTool.style.backgroundColor = originalButtonColor;
    activeTool = tool;
    activeTool.style.borderColor = "black";
    activeTool.style.backgroundColor = "#ed8c8c";
}

function applyTool(element){

    if(mouseDown){
        if(activeTool==penButton)
        {
            element.style.backgroundColor = colorPicker.value;
        }
        else if(activeTool==eraserButton)
        {
            element.style.backgroundColor = "transparent";
        }
    }
}

//updates the array that contains the grid elements
function updateGridElements(){

    //get all the gridElements
    gridElements = document.getElementsByClassName("grid-element");

    //make an array from all the gridElements and add event listener to each one
    array = Array.from(gridElements)
    array.forEach(element => {
        element.addEventListener("mousedown", (e) => 
        {mouseDown="true";
        applyTool(element);
        e.preventDefault();});
        element.addEventListener("mouseover", () => {applyTool(element)});
    });
}

function updateGrid(value){

    updateGridSizeDisplay(value);
    grid.innerHTML = "";


    let elementCopy = basicGridElement.cloneNode(true);

    for(let i = 0; i < value; i++)
    {
        let div = document.createElement("div");
        div.style.display = "flex";
        div.style.flex = "1";
        div.draggable = "false";
      
        for(let j = 0; j < value; j++)
        {
            div.appendChild(elementCopy);
            elementCopy = basicGridElement.cloneNode(true);
        }

        grid.appendChild(div);
    
    }
    updateGridElements();
}

function setInitialGridElement(){
    basicGridElement = array[0].cloneNode(true);
}

function updateGridSizeDisplay(value){
    gridSizeDisplay.innerText = "Grid Size: " + value + "x" + value;
}
window.onload = () => {
    setTool(penButton);
    updateGridElements();
    setInitialGridElement();
    updateGrid(rangedPicker.value);
   
    
}