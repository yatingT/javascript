/**
 * Starter file for 02-08-01.js - the only exercise of page 8 of Workbook 2
 */

// @ts-check

// Find the canvas and start!

export {};

let dots = [];
let boxfdots=[];

let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box2canvas"));
let context = canvas.getContext('2d');

canvas.onclick = function(event) {
    const x = event.clientX;
    const y = event.clientY;
    let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
    let mx = x-box.left;
    let my = y-box.top;

    let cx= Math.floor(Math.random()*500);
    let cy = 600;

    let ratex=(cx-mx)/100;
    let ratey=(cy-my)/100;
    
    dots.push({"mx":mx,"my":my,"cx":cx,"cy":cy,"ratex":ratex,"ratey":ratey,"light":0});


};


function random( min, max ) {
	return Math.random() * ( max - min ) + min;
}
function animation(){
    dots.forEach(function(dot){
        let r=Math.floor(Math.random() * 255);
        let g=Math.floor(Math.random() * 255);
        let b=Math.floor(Math.random() * 255);
        let color =`rgb(${r},${g},${b})`;
        if(dot.cy>dot.my){
            dot.cx-=dot.ratex;
            dot.cy-=dot.ratey;
            context.beginPath();
            context.fillStyle = color;
            context.arc(dot.cx,dot.cy, 5, 0, Math.PI*2 , false);
            context.fill();
            context.closePath();
        }else{
            if(dot.light==0){
                for(let i=0;i<130;i++){
                    let vx = (Math.random()-0.5)*5;
                    let vy = (Math.random()-0.5)*5;
                    let angle = Math.random()* Math.PI * 2 
                    let speed=Math.random()*10;
                    boxfdots.push({"x":dot.mx,"y":dot.my,
                    "vx":vx, "vy":vy,
                    "angle":angle, "speed":speed,
                    "r":r+i,"g":g+i,"b":b+i,
                    "offset":0,"fade":1});  
                }
                dot.light++;
            }
            
        }
    });
}

let loop=0;
function canvasAnimate() {
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillStyle = "black";

    context.fillRect(0,0,canvas.width,canvas.height);

    if (loop % 40==0){
        let mx = Math.floor(Math.random() * canvas.width);
        let my = Math.floor(Math.random() * canvas.height);
        let cx= Math.floor(Math.random()*canvas.width);
        let cy = 600;
        let ratex=(cx-mx)/50;
        let ratey=(cy-my)/50;
        dots.push({"mx":mx,"my":my,"cx":cx,"cy":cy,"ratex":ratex,"ratey":ratey,"light":0});

    }

    animation();

    boxfdots.forEach(function(dot){
            dot.speed*=0.97;
            dot.x += Math.sin(dot.angle)*dot.speed;
            dot.y += Math.cos(dot.angle)*dot.speed+2;
    });

    boxfdots = boxfdots.filter(
        dot => ((dot.y>0)&&(dot.x>0)&&(dot.x<canvas.width)&&(dot.y<canvas.height))
    );

    boxfdots.forEach(function(dot){
        let cnf =`rgba(${dot.r},${dot.g},${dot.b},${dot.fade})`
        context.fillStyle = cnf;
        context.fillRect(dot.x,dot.y,4+dot.fade*2,4+dot.fade*2);
        
        if (dot.offset>20 && dot.fade>=0 ){
            dot.fade-=0.015;
        }else{
            dot.offset+=0.5;
        }
    });

    loop++;

    window.requestAnimationFrame(canvasAnimate);
}
canvasAnimate();