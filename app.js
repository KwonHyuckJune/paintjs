const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function stratPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else{
        ctx.lineTo(x, y);
        ctx.stroke();
        //ctx.closePath();
    }
}

function onMouseDown(event){
    if(mode.text)
    stratPainting()
    // const x = event.offsetX;
    // const y = evnet.offsetY;
}

function onMouseUp(event){
    stopPainting();
}

function onMouseLeave(event){
    stopPainting();
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const brushSize = event.target.value;
    ctx.lineWidth = brushSize;
}

function handleModeClick(event){
    if(filling){
        filling = false;
        mode.innerText = "FILL";
    }
    else{
        filling = true;
        mode.innerText = "PAINT";
    }
}

function handleCanvasClick(event){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove, false);
    canvas.addEventListener("mousedown", stratPainting, false);
    canvas.addEventListener("mouseup", stopPainting, false);
    canvas.addEventListener("mouseleave", onMouseLeave, false);
    canvas.addEventListener("click", handleCanvasClick);
}

if(colors){
    Array.from(colors).forEach(color => color.addEventListener('click', changeColor));
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}