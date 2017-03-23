function Texter(canvas, ctx, text, position) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.text = text;
    this.position = position;
    this.fadePoint = 0;
    this.fadeSpeed = 3;
    this.style = "30px Arial";
    this.measure;
    this.textAlign = "center";
    this.faded = false;
    this.red = 255;
    this.green = 255;
    this.blue = 255;
}
Texter.prototype.writeText = function (text, x, y) {
    var position = new Vector2();
    position.x = x || canvas.width / 2;
    position.y = y || canvas.height / 2;
}
Texter.prototype.fadeIn = function () {
    this.measure = this.measure || this.measureNow();
    this.ctx.font = this.style;
    if (this.fadePoint < this.measure.width + 50) {
        this.fadePoint += this.fadeSpeed;
    } else {
        this.faded = true;
    }
    var fillStyle;
    fillStyle = this.ctx.createLinearGradient(this.position.x - this.measure.width / 2, this.position.y, this.position.x - this.measure.width / 2 + this.fadePoint, this.position.y);
    fillStyle.addColorStop(0, "rgba("+this.red+", "+this.green+", "+this.blue+", 1)");
    fillStyle.addColorStop(1, "rgba("+this.red+", "+this.green+", "+this.blue+", "+(this.faded ? 1.0 : 0.0)+")");
    this.ctx.textAlign = this.textAlign;
    this.ctx.fillStyle = fillStyle;
    this.ctx.fillText(this.text, this.position.x, this.position.y);
}
Texter.measureText = function(ctx, text, font){
    font = font.replace("px", "pt");
    ctx.font = font;
    var measure = ctx.measureText(text);
    measure.height = parseInt(ctx.font);
    return measure;
}
Texter.prototype.measureNow = function(){
    this.measure = this.measure || Texter.measureText(this.ctx, this.text, this.style);
    return this.measure;
}
Texter.prototype.clear = function(){
    this.fadePoint = 0;
    this.faded = false;
}