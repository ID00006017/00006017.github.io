/* Main canvas initializer function */
function Canvas() {
        this.canvas;
        this.ctx;
        this.width;
        this.height;
    }
    Canvas.prototype.initCanvas = function (canvasId, full) {
        full = typeof full == 'undefined' ? true : false;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        if(full){
            this.canvas.width = this.width = window.innerWidth;
            this.canvas.height = this.height = window.innerHeight;
        }
    }
    Canvas.prototype.setSize = function(size){
        this.width = size.x;
        this.height = size.y;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    Canvas.prototype.clear = function (opacity) {
        opacity = opacity || 0.1;
        //            this.ctx.clearRect(0,0, this.width, this.height);
        if(opacity == 1){
            this.ctx.clearRect(0,0,this.width, this.height);
        }else{
        this.ctx.fillStyle = 'rgba(0,0,0,' + opacity + ')';
        this.ctx.fillRect(0, 0, this.width, this.height);
        }
    }