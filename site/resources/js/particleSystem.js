function ParticleSystem(canvas, ctx, target) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.emmiters;
    this.particles = [];
    this.speedLimit = 0.1;
}
ParticleSystem.prototype.createParticle = function (position, velocity, r, fillColor, strokeColor) {
    var particle = new Particle(position, velocity);
    particle.r = r || 1;
    particle.fillColor = fillColor || "white";
    particle.strokeColor = strokeColor || "red";
    this.particles.push(particle);
    particle.particleSystem = this;
    particle.speed = Math.random() * this.speedLimit;
    return particle;
}
ParticleSystem.prototype.randomTarget = function(boundX, boundY){
    var target = new Vector2(Math.random() * boundX, Math.random() * boundY);
    this.particles.forEach(function(particle){
        particle.target = target;
    })
}
ParticleSystem.prototype.drawParticles = function () {
    for (var i = 0; i < this.particles.length; i++) {
        var particle = this.particles[i];
        particle.draw(this.ctx);
    }
}

function Particle(position, velocity) {
    this.position = position || new Vector2();
    this.oldPosition = this.position;
    this.velocity = velocity || new Vector2();
    this.fillColor = "white";
    this.strokeColor = "red";
    this.r;
    this.offset = new Vector2(0, 0);
    this.shift = new Vector2(0, 0);
    this.speed = 0.01 + Math.random() * 0.04;
    this.targetSize = 1;
    this.orbit = 35 + (70 * .5 * Math.random());
    this.particleSystem;
    this.target = new Vector2(0,0);
    this.drawMethod = function(ctx, particle){
        ctx.beginPath();
        ctx.lineWidth = this.r;
        ctx.strokeStyle = this.strokeColor;
        ctx.moveTo(this.oldPosition.x, this.oldPosition.y);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.stroke();
        ctx.fillStyle = this.fillColor;
        ctx.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
}
Particle.prototype.draw = function (ctx) {
    this.drawMethod(ctx, this);
}
Particle.prototype.moveTo = function (target) {
    var vector2 = target || this.target;
    this.offset.x += this.speed;
    this.offset.y += this.speed
    this.shift.x += (vector2.x - this.shift.x) * this.speed;
    this.shift.y += (vector2.y - this.shift.y) * this.speed;
    this.oldPosition = new Vector2(this.position.x, this.position.y);
    this.position.x = this.shift.x + Math.cos(this.offset.x) * (this.orbit);
    this.position.y = this.shift.y + Math.sin(this.offset.y) * (this.orbit);
    this.r += (this.targetSize - this.r) * 0.05;
    if (Math.round(this.size) == Math.round(this.targetSize)) {
        this.targetSize = this.targetSize + Math.random() * 7;
    }
}
Particle.prototype.moveToSimple = function(target){
    var vector2 = target || this.target;
    this.offset.x += this.speed;
    this.offset.y += this.speed
    this.shift.x += (vector2.x - this.shift.x);
    this.shift.y += (vector2.y - this.shift.y) * this.speed;
    this.oldPosition = new Vector2(this.position.x, this.position.y);
    this.position.x = this.shift.x;
    this.position.y = this.shift.y;
    this.r += (this.targetSize - this.r) * 0.05;
    if (Math.round(this.size) == Math.round(this.targetSize)) {
        this.targetSize = this.targetSize + Math.random() * 7;
    }
}
Particle.prototype.randomPosition = function(boundX, boundY){
    this.oldPosition = Vector2.randomVector(boundX, boundY);
    this.shift = Vector2.randomVector(boundX, boundY);
}
Particle.prototype.randomTarget = function(boundX, boundY){
    this.target = Vector2.randomVector(boundX, boundY);
}

function Vector2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}
Vector2.prototype.add = function (vector2) {
    this.x = vector2.x;
    this.y = vector2.y;
}
Vector2.prototype.calculDistance = function (vector2) {
    var distance = Math.sqrt(Math.pow(vector2.x - this.x, 2) + (vector2.y - this.y, 2));
    return distance;
}
Vector2.randomVector = function(boundX, boundY){
    return new Vector2(Randomizer.random(boundX), Randomizer.random(boundY))
}
Vector2.fromAngle = function(angle, center, r){
    var resultVector = new Vector2();
    resultVector.x = center.x + Math.cos(angle)*r;
    resultVector.y = center.y + Math.sin(angle)*r;
    return resultVector;
}
function Randomizer(){
    
}
Randomizer.random = function(max){
    return Math.random() * max;
}
Randomizer.randomInt = function(max){
    var limit = max || 255;
    return Math.floor(Randomizer.random(limit));
}
Randomizer.randomColor = function(){
    return "rgb("+Randomizer.randomInt()+","+Randomizer.randomInt()+","+Randomizer.randomInt()+")";
}