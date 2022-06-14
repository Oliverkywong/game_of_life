let GameObject = {
    currentColor,
    currentBoard
}

function doSomething(GameObject) {
    GameObject.currentColor
}


const unitLength  = 20;
let boxColor      = 150;
const strokeColor = 50;
let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let currentBoard;
let nextBoard;
let vpw = window.innerWidth-250
let vph = window.innerHeight-400
const patterns = {
    'glider':`OOO
	O..
	.O.`
}

//const pattern = patterns['glider']
//const lines = pattern.split("\n")
//for( let x=0; x<lines.length; x++){
//    
//}

function setup(){
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(vpw, vph);
    canvas.parent(document.querySelector('#canvas'));

    /*Calculate the number of columns and rows */
    columns = floor(vpw  / unitLength);
    rows    = floor(vph / unitLength);

    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
    }
    // Now both currentBoard and nextBoard are array of array of undefined values.
    init();  // Set the initial values of the currentBoard and nextBoard
}

function  init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = [0,0];
            nextBoard[i][j] = [0,0];
        }
    }
}

function windowResized() {
    
    resizeCanvas(windowWidth-250, windowHeight-400);
    
    columns = floor((windowWidth -250) / unitLength);
    rows    = floor((windowHeight-400) / unitLength);

    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
    }
    init();
  }

function draw() {
    background("#1886FF");
    if(stb==false){
        frameRate(sc);
        generate();
    }
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j][0] == 1){
                let h= currentBoard[i][j][1]
                if(h>360){
                    h %=361
                }
                fill(color(`hsl(${h},100%,50%)`))
            } else if(currentBoard[i][j][0]== 0) {
                fill(cor);
            } 
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
}

function generate() {
    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Count all living members in the Moore neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if( i == 0 && j == 0 ){
                        // the cell itself is not its own neighbor
                        continue;
                    }
                    // The modulo operator is crucial for wrapping on the edge
                    neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows][0];
                }
            }
            // Rules of Life
            if (currentBoard[x][y][0] == 1 && neighbors < 2) {
                // Die of Loneliness
                nextBoard[x][y][0] = 0;
                nextBoard[x][y][1] = 0;
            } else if (currentBoard[x][y][0] == 1 && neighbors > 3) {
                // Die of Overpopulation
                nextBoard[x][y][0] = 0;
                nextBoard[x][y][1] = 0;
            } else if (currentBoard[x][y][0] == 0 && neighbors == 3) {
                // New life due to Reproduction
                nextBoard[x][y][0] = 1;
                nextBoard[x][y][1] = 1;
            } else {
                // Stasis 
                nextBoard[x][y][0] = currentBoard[x][y][0];
                nextBoard[x][y][1] = currentBoard[x][y][1];
                nextBoard[x][y][1] += 1
            }
        }
    }

    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

/**
 * When mouse is dragged
 */
 function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y][0] = 1;
    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

function pat(p){
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    if(p==1){
        const x = Math.floor(mouseX / unitLength);
        const y = Math.floor(mouseY / unitLength);
        currentBoard[x][y][0] = 1;
        currentBoard[x+1][y][0] = 1;
        currentBoard[x][y+1][0] = 1;
        currentBoard[x+2][y+1][0] = 1;
        currentBoard[x+1][y+2][0] = 1;
    }else if(p==2){
        const x = Math.floor(mouseX / unitLength);
        const y = Math.floor(mouseY / unitLength);
        currentBoard[x][y][0] = 0;
        currentBoard[x+1][y][0] = 1;
        currentBoard[x+2][y][0] = 1;
        currentBoard[x][y+1][0] = 1;
        currentBoard[x+1][y+2][0] = 1;
        currentBoard[x+3][y+1][0] = 1;
        currentBoard[x+3][y+2][0] = 1;
        currentBoard[x+2][y+3][0] = 1;
    }else if(p==3){
        const x = Math.floor(mouseX / unitLength);
        const y = Math.floor(mouseY / unitLength);
        currentBoard[x][y][0] = 0;
        currentBoard[x+1][y][0] = 1;
        currentBoard[x][y+1][0] = 1;
        currentBoard[x+2][y+1][0] = 1;
        currentBoard[x+1][y+2][0] = 1;
    }else if(p==4){
        const x = Math.floor(mouseX / unitLength);
        const y = Math.floor(mouseY / unitLength);
        currentBoard[x][y][0] = 1;
        currentBoard[x+1][y+1][0] = 1;
        currentBoard[x+1][y+2][0] = 1;
        currentBoard[x+2][y+1][0] = 1;
        currentBoard[x][y+2][0] = 1;
    }else if(p==5){
        const x = Math.floor(mouseX / unitLength);
        const y = Math.floor(mouseY / unitLength);
        currentBoard[x][y][0] = 0;
        currentBoard[x+1][y][0] = 1;
        currentBoard[x+2][y][0] = 1;
        currentBoard[x][y+1][0] = 1;
        currentBoard[x+1][y+1][0] = 1;
        currentBoard[x+2][y+1][0] = 1;
        currentBoard[x+3][y+1][0] = 1;
        currentBoard[x-1][y+3][0] = 1;
        currentBoard[x][y+3][0] = 1;
        currentBoard[x+1][y+3][0] = 1;
        currentBoard[x+2][y+3][0] = 1;
        currentBoard[x+3][y+3][0] = 1;
        currentBoard[x+4][y+3][0] = 1;
        currentBoard[x][y+4][0] = 1;
        currentBoard[x+1][y+4][0] = 1;
        currentBoard[x+2][y+4][0] = 1;
        currentBoard[x+3][y+4][0] = 1;
        currentBoard[x-1][y+6][0] = 1;
        currentBoard[x][y+6][0] = 1;
        currentBoard[x+3][y+6][0] = 1;
        currentBoard[x+4][y+6][0] = 1;
        currentBoard[x-3][y+7][0] = 1;
        currentBoard[x-2][y+7][0] = 1;
        currentBoard[x][y+7][0] = 1;
        currentBoard[x+3][y+7][0] = 1;
        currentBoard[x+5][y+7][0] = 1;
        currentBoard[x+6][y+7][0] = 1;
        currentBoard[x][y+8][0] = 1;
        currentBoard[x+3][y+8][0] = 1;
        currentBoard[x+1][y+11][0] = 1;
        currentBoard[x+2][y+11][0] = 1;
        currentBoard[x+1][y+12][0] = 1;
        currentBoard[x+2][y+12][0] = 1;
    }else if(p==6){
        const x = Math.floor(mouseX / unitLength);
        const y = Math.floor(mouseY / unitLength);
        currentBoard[x][y][0] = 1;
        currentBoard[x+12][y-2][0] = 1;
        currentBoard[x+10][y-1][0] = 1;
        currentBoard[x+12][y-1][0] = 1;
        currentBoard[x+1][y][0] = 1;
        currentBoard[x+8][y][0] = 1;
        currentBoard[x+9][y][0] = 1;
        currentBoard[x+22][y][0] = 1;
        currentBoard[x+23][y][0] = 1;
        currentBoard[x-1][y+1][0] = 1;
        currentBoard[x+3][y+1][0] = 1;
        currentBoard[x+8][y+1][0] = 1;
        currentBoard[x+9][y+1][0] = 1;
        currentBoard[x+22][y+1][0] = 1;
        currentBoard[x+23][y+1][0] = 1;
        currentBoard[x-2][y+2][0] = 1;
        currentBoard[x+4][y+2][0] = 1;
        currentBoard[x+8][y+2][0] = 1;
        currentBoard[x+9][y+2][0] = 1;
        currentBoard[x-11][y+2][0] = 1;
        currentBoard[x-12][y+2][0] = 1;
        currentBoard[x-11][y+3][0] = 1;
        currentBoard[x-12][y+3][0] = 1;
        currentBoard[x-2][y+3][0] = 1;
        currentBoard[x+2][y+3][0] = 1;
        currentBoard[x+4][y+3][0] = 1;
        currentBoard[x+5][y+3][0] = 1;
        currentBoard[x+10][y+3][0] = 1;
        currentBoard[x+12][y+3][0] = 1;
        currentBoard[x-2][y+4][0] = 1;
        currentBoard[x+4][y+4][0] = 1;
        currentBoard[x+12][y+4][0] = 1;
        currentBoard[x-1][y+5][0] = 1;
        currentBoard[x+3][y+5][0] = 1;
        currentBoard[x][y+6][0] = 1;
        currentBoard[x+1][y+6][0] = 1;
    }

    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
    noLoop();
    mouseDragged();
    pat(p);
}

/**
 * When mouse is released
 */
function mouseReleased() {
    loop();
}


document.querySelector('#reset')
    .addEventListener('click', function() {
        init();
        r=3
        s=3
        boxColor=150
        sta.innerHTML="Start"
        stb = true
        output.innerHTML=50
        slider.value = 50
    });

//document.body.addEventListener('keydown', function() {
//        if(keyCode==82){
//        init();
//        r=3
//        s=3
//        boxColor=150
//        sta.innerHTML="Start"
//        stb = true
//        output.innerHTML=50
//        slider.value = 50
//    }
//    });

let slider = document.querySelector("#myRange");
let output = document.querySelector("#demo");
output.innerHTML = slider.value; // Display the default slider value
let sc;
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    sc=parseInt(this.value)
}

let sta = document.querySelector('#start')
let stb = true;
sta.addEventListener('click', function() {
    if(stb == true){
        sta.innerHTML="Pause"
        stb = false
    }else{
        sta.innerHTML="Start"
        stb = true
    }
});

//document.body.addEventListener('keydown', function() {
//    if(keyCode==83){
//    if(stb == true){
//        sta.innerHTML="Pause"
//        stb = false
//    }else{
//        sta.innerHTML="Start"
//        stb = true
//    }}
//});

document.querySelector('#random')
    .addEventListener('click', function() {
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                currentBoard[i][j][0] = Math.floor(Math.random()*2);
            }
        }
    });

//document.body.addEventListener('keydown', function() {
//    if(keyCode==65){
//        for (let i = 0; i < columns; i++) {
//            for (let j = 0; j < rows; j++) {
//                currentBoard[i][j] = Math.floor(Math.random()*2);
//            }
//        }}
//    });

let cor=255;
let cors = true;
let mo = document.querySelector('#mode')
mo.addEventListener('click', function() {
        if( cors == true){
            mo.innerHTML="Ligth mode"
            cor=000
            cors=false
        }else{
            mo.innerHTML="Dark mode"
            cor=255
            cors=true
        }
    });

//document.body.addEventListener('keydown', function() {
//    if(keyCode==68){
//        if( cors == true){
//            mo.innerHTML="Ligth mode"
//            cor=000
//            cors=false
//        }else{
//            mo.innerHTML="Dark mode"
//            cor=255
//            cors=true
//        }}
//    });

let r=3;
let s=3;
document.querySelector('.s1')
.addEventListener('click', function() {
    s=1
});
document.querySelector('.s2')
.addEventListener('click', function() {
    s=2
});
document.querySelector('.s3')
.addEventListener('click', function() {
    s=3
});
document.querySelector('.r1')
.addEventListener('click', function() {
    r=1
});
document.querySelector('.r2')
.addEventListener('click', function() {
    r=2
});
document.querySelector('.r3')
.addEventListener('click', function() {
    r=3
});

let cp=0
document.querySelector('#blue')
.addEventListener('click', function() {
   boxColor= color('#0000ff')
   cp=1
});
document.querySelector('#green')
.addEventListener('click', function() {
    boxColor= color('#00ff00')
    cp=2
});
document.querySelector('#red')
.addEventListener('click', function() {
    boxColor= color('#ff0000')
});
document.querySelector('#yellow')
.addEventListener('click', function() {
    boxColor= color('#ffff00')
});
document.querySelector('#purple')
.addEventListener('click', function() {
    boxColor=color('#ff00ff')
});
document.querySelector('#pink')
.addEventListener('click', function() {
    boxColor= color('#ffccff')
});

let p=0
document.querySelector('#p1')
.addEventListener('click', function() {
   p=1
});
document.querySelector('#p2')
.addEventListener('click', function() {
    p=2
});
document.querySelector('#p3')
.addEventListener('click', function() {
    p=3
});
document.querySelector('#p4')
.addEventListener('click', function() {
    p=4
});
document.querySelector('#p5')
.addEventListener('click', function() {
    p=5
});
document.querySelector('#p6')
.addEventListener('click', function() {
    p=6
});

function keyPressed() {
    if(key=='d'){
        if( cors == true){
            mo.innerHTML="Ligth mode"
            cor=000
            cors=false
        }else{
            mo.innerHTML="Dark mode"
            cor=255
            cors=true
        }
    }else if(key=='a'){
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                currentBoard[i][j][0] = Math.floor(Math.random()*2);
            }
        }
    }else if(key=='s'){
    if(stb == true){
        sta.innerHTML="Pause"
        stb = false
    }else{
        sta.innerHTML="Start"
        stb = true
    }
    }else if(key=='r'){
        init();
        r=3
        s=3
        boxColor=150
        sta.innerHTML="Start"
        stb = true
        output.innerHTML=50
        slider.value = 50     
    }else if(key=='c'){
        cp=cp+1
        if(cp==1){
        boxColor= color('#0000ff')
        }else if(cp==2){
        boxColor= color('#00ff00')
        }else if(cp==3){
            boxColor= color('#ff0000')
        }else if(cp==4){
            boxColor= color('#ffff00')
        }else if(cp==5){
            boxColor= color('#ff00ff')
        }else if(cp==6){
            boxColor= color('#ffccff')
            cp=0
        }
    }
}