
let vects = [];
const DEG2RAD = 0.017453292
const VECT_COUNT = 7;
const MAX_ALPHA = 360*2;
const CUBE_SIZE = 5;

function setup() {
    createCanvas( MAX_ALPHA+500, 707);

    for(var i = 0; i < VECT_COUNT; i++) { 
        vects.push(createVector(random(10, 490), random(10, 490)));
    }
    smooth();
    angleMode(RADIANS);
    noLoop()
}

function draw() {
    
    vects = [];
    for(var i = 0; i < VECT_COUNT; i++) { 
        vects.push(createVector(random(10, 490), random(10, 490)));
    }

    background(240);
    stroke(color(0, 0, 0));
    line(500,10, 500, 490);
    /*paint down*/ 
    for(var i = 0; i < vects.length; i++) { 
        let vect = vects[i];
        fill(0);
        rect(vect.x, vect.y, CUBE_SIZE, CUBE_SIZE);

        for(var ci = 0; ci < vects.length; ci++){ 
            let secVect = vects[ci];
            if(ci !== i) { 
                line(vect.x + (CUBE_SIZE/2), vect.y + (CUBE_SIZE/2), secVect.x + (CUBE_SIZE/2), secVect.y + (CUBE_SIZE/2));
            }
        }
    }

  

    let hough_h = sqrt((500 * 500) + (500 * 500)) / 2.0; 
    let accu_h = hough_h * 2.0;
    let accu_w = MAX_ALPHA;  

    let houghRaum = []; //new Array(accu_w).fill(new Array(accu_h | 0).fill(0));
   
    for(let i = 0; i < accu_w; i++){ 
        houghRaum.push(new Array((accu_h | 0)).fill(0));
    }

    let center_x = 500 / 2;  
    let center_y = 500 / 2;  

    let val_max = 0;

    for(let iVect = 0; iVect < vects.length; iVect++) { 
        let vect = vects[iVect];

        for(let alpha = 0; alpha < MAX_ALPHA; alpha++){
            let r = ((vect.x - center_x) * cos(alpha * PI / MAX_ALPHA)) + ((vect.y - center_y) * sin(alpha * PI / MAX_ALPHA));  
            let val = (houghRaum[alpha][(r + hough_h)| 0]++);
            val_max = max(val_max,  val);
        }
    }  
    
    for (let aplha = 0; aplha < MAX_ALPHA; aplha++) {
        for (let iAccu = 0; iAccu < accu_h; iAccu++) {
            let x = aplha + 500;
            let y = iAccu;


            let value = houghRaum[aplha][iAccu] / val_max * 255;

            if(value === 0) { 
                stroke('black');
            } else { 
                stroke(color(value, 0, 50));
            }

            point(x, y);
        }
    }
}

function mousePressed() {
    redraw();
    alert("Please wait");
}