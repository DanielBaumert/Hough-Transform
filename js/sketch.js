let sin_cache = [];
let cos_cache = [];

let concatDraw = false;
const DEG2RAD = 0.017453292
const VECT_COUNT = 20;
const MAX_ALPHA = 180*4;
const CUBE_SIZE = 5;
const STEPS = 32;
let cube_size_h = 5;

let hough_h;
let accu_h;
let accu_w;

let center_x;  
let center_y;  

let enableConcatBt;

let vector_i = 0;
let alpha_i = 0;
let vects = [];
let houghRaum = [];
let val_max = 0;

function setup() {
    createCanvas(MAX_ALPHA + 500, 707);
    cube_size_h = CUBE_SIZE / 2;

    for(var i = 0; i < VECT_COUNT; i++) { 
        vects.push(createVector(random(10, 490), random(10, 490)));
    }
    

    for(let alpha = 0; alpha < MAX_ALPHA; alpha++){
        cos_cache.push(cos(alpha * PI / MAX_ALPHA))
        sin_cache.push(sin(alpha * PI / MAX_ALPHA))
    }

    hough_h= sqrt((500 * 500) + (500 * 500)) / 2.0; 
    accu_h = hough_h * 2.0;
    accu_w = MAX_ALPHA; 
    
    houghRaum = [];
    for(let i = 0; i < accu_w; i++){ 
        houghRaum.push(new Array((accu_h | 0)).fill(0));
    }

    center_x = 500 / 2;  
    center_y = 500 / 2;  

    //noLoop()
    smooth();
    angleMode(RADIANS);
    frameRate(60);
}


function draw() {
    //background(240);
    noStroke();
    fill("white");
    rect(0, 0, 501, height);
    stroke(2);
    rect(0, 0, 501, 500);
    fill("black");
    stroke(color(0, 0, 0));
    if(vector_i < VECT_COUNT) { 
        for(var i = 0; i < vects.length; i++) { 
            let vect = vects[i];
            fill(0);
            rect(vect.x, vect.y, CUBE_SIZE, CUBE_SIZE);
            // if(/*concatDraw*/ true) { //TODO Toggle
            //     for(var ci = 0; ci < vects.length; ci++){ 
            //         let secVect = vects[ci];
            //         if(ci !== i) { 
            //             line(vect.x + cube_size_h, vect.y + cube_size_h, secVect.x + cube_size_h, secVect.y + cube_size_h);
            //         }
            //     }
            // }
        }
        let vect = vects[vector_i];

        if(alpha_i < MAX_ALPHA) { 
            
            let m = tan((alpha_i / 4) * PI / 180);
            let n = vect.y - (m * vect.x);

            let y_start = n + cube_size_h;
            let y_end = (m * 500) + n;

            line(0, y_start, 500, y_end);
            
            for(let iStep = 0; iStep < STEPS; iStep++) { 
                let r = ((vect.x - center_x) * cos_cache[alpha_i]) + ((vect.y - center_y) * sin_cache[alpha_i]);  

                let x = alpha_i + 500;
                let y = (r + hough_h)| 0;
            
          
                let value = r / VECT_COUNT * 255;

                if(value !== 0) {
                    stroke(color(value, 0, 50));
                    stroke("black");
                }
                
                point(x, y);
                alpha_i++;
            }
        } else {
            alpha_i = 0;
            vector_i++;
        }
        fill("white");
        noStroke();
        rect(0, 501, 501, height);
    } else { 
        background(255);
        vects = [];
        for(var i = 0; i < VECT_COUNT; i++) { 
            vects.push(createVector(random(10, 490), random(10, 490)));
        }

        houghRaum = [];
        for(let i = 0; i < accu_w; i++){ 
            houghRaum.push(new Array((accu_h | 0)).fill(0));
        }
        alpha_i = 0;
        vector_i = 0;
        val_max = 0;
    }
}