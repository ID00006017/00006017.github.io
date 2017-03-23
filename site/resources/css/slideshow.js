// Slide show initializer
function createSlideShow(canvasId) {
    var slideControl = {
        nextSlide:function nextSlide() {
            slides[activeSlide].clear();
            activeSlide = (activeSlide + 1) % slides.length;
            canvas.clear(1);
        },

        prevSlide:function prevSlide() {
            slides[activeSlide].clear();
            activeSlide = (activeSlide - 1) % slides.length;
            canvas.clear(1);
        },
        pausePlay: function pausePlay() {
            this.play = !this.play;
            this.playStopCallback(this.play);
        },
        play: true,
        playStopCallback: function(play){},
        speed: 3333
    }

    var mouse = {
        x: 0,
        y: 0
    };
    var particleStructured = false;

    var canvas = new Canvas();
    canvas.initCanvas(canvasId);
    canvas.canvas.addEventListener("mousemove", function (event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });
    canvas.canvas.addEventListener("click", function(event){
        window.location.href = slides[activeSlide].linkUrl;
    })
    var particleSystems = []
    for (var i = 0; i < 1; i++) {
        var particleSystem = new ParticleSystem(canvas.canvas, canvas.ctx);
        particleSystems.push(particleSystem);
        particleSystem.randomTarget(canvas.width, canvas.height);
        particleSystem.speedLimit = Math.random() * 0.1;
    }
    particleSystems.forEach(function (particleSystem) {
        var particleCount = 45;
        for (var i = 0; i < particleCount; i++) {
            var particle = particleSystem.createParticle(new Vector2(Math.random() * canvas.width, Math.random() * canvas.height));
            particle.fillColor = Randomizer.randomColor();
            particle.strokeColor = Randomizer.randomColor();
            particle.speed = Math.random() * 0.04 + 0.1;
            particle.randomPosition(canvas.width, canvas.height);
        }
    })
    var menuSystem;

    function initMenuSystem() {
        menuSystem = new ParticleSystem(canvas.canvas, canvas.ctx);
        menuSystem.speedLimit = Math.random() * 0.1;
        var ratio = (Math.PI * 2) / 3;
        var particle = menuSystem.createParticle(Vector2.fromAngle(ratio, new Vector2(canvas.width / 2, canvas.height / 2), 111));
        particle.r = 55;
        particle.drawMethod = function (ctx, particle) {
            ctx.fillStyle = particle.fillColor;
            var ratio = (Math.PI * 2) / 3;
            var vector = Vector2.fromAngle(ratio, particle.position, particle.r);
            ctx.moveTo(vector.x, vector.y);
            vector = Vector2.fromAngle(ratio * 2, particle.position, particle.r);
            ctx.lineTo(vector.x, vector.y);
            vector = Vector2.fromAngle(ratio * 3, particle.position, particle.r);
            ctx.lineTo(vector.x, vector.y);
            ctx.fill();
        };
        particle = menuSystem.createParticle(Vector2.fromAngle(ratio, new Vector2(canvas.width / 2, canvas.height / 2), 111));
        particle.r = 55;
        particle.drawMethod = function (ctx, particle) {
            ctx.fillStyle = particle.fillColor;
            var ratio = (Math.PI * 2) / 3;
            var vector = Vector2.fromAngle(ratio, particle.position, particle.r);
            ctx.moveTo(vector.x, vector.y);
            vector = Vector2.fromAngle(ratio * 2, particle.position, particle.r);
            ctx.lineTo(vector.x, vector.y);
            vector = Vector2.fromAngle(ratio * 3, particle.position, particle.r);
            ctx.lineTo(vector.x, vector.y);
            ctx.fill();
        };
        particle = menuSystem.createParticle(Vector2.fromAngle(ratio, new Vector2(canvas.width / 2, canvas.height / 2), 111));
        particle.r = 55;
        particle.drawMethod = function (ctx, particle) {
            ctx.fillStyle = particle.fillColor;
            var ratio = (Math.PI * 2) / 3;
            var vector = Vector2.fromAngle(ratio, particle.position, particle.r);
            ctx.moveTo(vector.x, vector.y);
            vector = Vector2.fromAngle(ratio * 2, particle.position, particle.r);
            ctx.lineTo(vector.x, vector.y);
            vector = Vector2.fromAngle(ratio * 3, particle.position, particle.r);
            ctx.lineTo(vector.x, vector.y);
            ctx.fill();
        };
    }
    initMenuSystem();

    function animationLoop() {
        //            canvas.clear();
        //menuSystem.drawParticles();
        slides[activeSlide].draw(true);
        var linkBox = slides[activeSlide].linkBox;
        if (mouse.x < linkBox[0] + linkBox[2] && mouse.x > linkBox[0] && mouse.y > linkBox[1] && mouse.y < linkBox[3] + linkBox[1]) {
            canvas.canvas.style.cursor = "pointer";
        }
        particleSystems.forEach(function (particleSystem) {
            particleSystem.particles.forEach(function (particle) {
                particle.moveTo(new Vector2(mouse.x, mouse.y));
            })
            particleSystem.drawParticles();
        });
        requestAnimationFrame(animationLoop);
    }
    var slides = [new Slide(canvas.canvas, canvas.ctx, "resources/imgs/slide1.jpg", "Lorem Ipsum", "This is simple content", "/project.html?id=1"), new Slide(canvas.canvas, canvas.ctx, "resources/imgs/slide0.jpg", "Lorem Ipsum", "This is simple content", "/project.html?id=3"), new Slide(canvas.canvas, canvas.ctx, "resources/imgs/slide2.jpg", "Lorem Ipsum", "This is simple content", "/project.html?id=2")];
    var activeSlide = 0;
    setInterval(function () {
        if (slides[activeSlide].drawed) {
            if (slideControl.play) {
                slideControl.nextSlide();
            }
        }
    }, slideControl.speed);
    animationLoop();
    return slideControl;
}