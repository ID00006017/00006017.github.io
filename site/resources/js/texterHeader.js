function createTexterHeader(canvasId, text, style, red, green, blue) {
    red = typeof red == 'undefined' ? 255 : red;
    green = typeof green == 'undefined' ? 255 : green;
    blue = typeof blue == 'undefined' ? 255 : blue;
    style = style || "50px Arial bold";
    var canvas = new Canvas();
    canvas.initCanvas(canvasId, false);
    var measure = Texter.measureText(canvas.ctx, text, style);
    canvas.setSize(new Vector2(measure.width, measure.height));
    var texter = new Texter(canvas.canvas, canvas.ctx, text, new Vector2(canvas.canvas.width/2, canvas.canvas.height/2));
    texter.style= style;
    texter.red = red;
    texter.green = green;
    texter.blue = blue;
    function animationLoop() {
        canvas.clear(1);
        texter.fadeIn();
        requestAnimationFrame(animationLoop);
    }
    animationLoop();
}