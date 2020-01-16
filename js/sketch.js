

let vects = [];
let sin_cache = [];
let cos_cache = [];

let concatDraw = false;
const DEG2RAD = 0.017453292
const VECT_COUNT = 20;
const MAX_ALPHA = 360*2;
const CUBE_SIZE = 5;
let cube_size_h = 5;

let hough_h;
let accu_h;
let accu_w;

let center_x;  
let center_y;  


let enableConcatBt;

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
    
    center_x = 500 / 2;  
    center_y = 500 / 2;  

    //noLoop()
    smooth();
    angleMode(RADIANS);
    frameRate(1);
}

function draw() {
    
    vects = [];
    for(var i = 0; i < VECT_COUNT; i++) { 
        vects.push(createVector(random(10, 490), random(10, 490)));
    }

    background(240);
    stroke(color(0, 0, 0));

    /*paint down*/ 
    for(var i = 0; i < vects.length; i++) { 
        let vect = vects[i];
        fill(0);
        rect(vect.x, vect.y, CUBE_SIZE, CUBE_SIZE);

        if(/*concatDraw*/ true) { //TODO Toggle
            for(var ci = 0; ci < vects.length; ci++){ 
                let secVect = vects[ci];
                if(ci !== i) { 
                    line(vect.x + cube_size_h, vect.y + cube_size_h, secVect.x + cube_size_h, secVect.y + cube_size_h);
                }
            }
        }
    }

    let houghRaum = []; //new Array(accu_w).fill(new Array(accu_h | 0).fill(0));
   
    for(let i = 0; i < accu_w; i++){ 
        houghRaum.push(new Array((accu_h | 0)).fill(0));
    }

    let val_max = 0;

    for(let iVect = 0; iVect < vects.length; iVect++) { 
        let vect = vects[iVect];

        for(let alpha = 0; alpha < MAX_ALPHA; alpha++){
            let r = ((vect.x - center_x) * cos_cache[alpha]) + ((vect.y - center_y) * sin_cache[alpha]);  
            let val = (houghRaum[alpha][(r + hough_h)| 0]++);
            val_max = max(val_max,  val);
        }
    }  
    
    for (let iAlpha = 0; iAlpha < MAX_ALPHA; iAlpha++) {
        for (let iAccu = 0; iAccu < accu_h; iAccu++) {
            let x = iAlpha + 500;
            let y = iAccu;

            let h_value = houghRaum[iAlpha][iAccu];
            let value = h_value / val_max * 255;


            if(value === 0) { 
                stroke('black');
            } else { 
                stroke(color(value, 0, 50));
            }


            if(h_value === val_max) { 
                //d = -x(alpha) + y
                //d - y = -x(alpha)
                //y = -x(alpha) + d
                for(var ix = 0; ix < 500; ix++) { 
                    var iy = -ix * iAlpha - iAccu;
                    point(ix, -iy);
                }
            }
            point(x, y);
        }
    }
}
