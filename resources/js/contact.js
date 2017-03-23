/*Rain canvas draw*/
function createRain(canvasId, mouseMoveTarget) {
    var canvas = new Canvas();
    var particleCount = 555;
    var backgroundReady = false;
    var mouse = {
        x: 0,
        y: 0
    };
    canvas.initCanvas(canvasId);
    var mouseTarget = mouseMoveTarget || canvas.canvas;
    var background = new Image();
    background.onload = function () {
        backgroundReady = true;
    }
//    background.src = "resources/imgs/contactback.jpg";
    mouseMoveTarget.addEventListener("mousemove", function (event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });
    
    var particles = []
    var lines = [];
    for(var i = 0 ; i < particleCount ; i++){
        particles.push({x:Randomizer.random(canvas.width), y : Randomizer.random(canvas.height), r: Math.random() * 2, xDir:Math.random() < 0.5, yDir:Math.random()<.5, color:Randomizer.randomColor()});
    }
    for(var i = 0 ; i < 15; i++){
        var dots = [];
        for(var k = 0 ; k < 7; k++){
            dots.push(particles[Randomizer.randomInt(particles.length)]);
        }
        lines.push({dots:dots, color:"red"});
    }


    function animationLoop() {
        //            canvas.clear();
        //menuSystem.drawParticles();
        canvas.clear();
        canvas.ctx.globalAlpha = 0.1;
        canvas.ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        canvas.ctx.globalAlpha = 1;
        var newParticles = [];
        particles.forEach(moveCircle);
        particles.forEach(drawCircle);
//        lines.forEach(drawLines);
        
        
        requestAnimationFrame(animationLoop);
    }
    function moveCircle(dot){
        dot.x += dot.xDir ? 1 : -1;
        dot.y += dot.yDir ? 1 : -1;
        if(dot.x > canvas.width || dot.x < 0){
            dot.xDir = !dot.xDir;
        }
        if(dot.y > canvas.height || dot.y < 0){
            dot.yDir = !dot.yDir;
        }
    }
    function drawCircle(dot){
        canvas.ctx.fillStyle = dot.color;
        canvas.ctx.beginPath();
        canvas.ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        canvas.ctx.fill();
    }
    function drawLines(line){
        canvas.ctx.strokeStyle = line.color;
        canvas.ctx.beginPath();
        canvas.ctx.lineWidth = 0.5;
        canvas.ctx.moveTo(line.dots[0].x, line.dots[0].y);
        for(var i = 1; i < line.dots.length ; i++){
            canvas.ctx.lineTo(line.dots[i].x, line.dots[i].y);
        }
        canvas.ctx.stroke();
    }


    animationLoop();
}