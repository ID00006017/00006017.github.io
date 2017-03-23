function Slide(canvas, ctx, src, headerText, contentText, link){
    this.src = src;
    this.headerText = headerText;
    this.contentText = contentText;
    this.linkUrl = link;
    this.header;
    this.content;
    this.link;
    this.image;
    this.timeToDraw;
    this.drawed = false;
    this.imageLoaded = false;
    this.canvas = canvas;
    this.ctx = ctx;
    this.maxHeight;
    this.maxWidth;
    this.drawBorder = true;
}
Slide.prototype.clear = function(){
    this.drawed = false;
    if(this.header){
    this.header.clear();
    }
    if(this.content){
    this.content.clear();
    }
    if(this.link){
    this.link.clear();
    }
}
Slide.prototype.draw = function(drawBackground){
    drawBackground = typeof drawBackground == "undefined" ? false : drawBackground;
    var slide = this;
    if(!this.image){
        this.image = new Image();
        this.image.onload = function(){
            slide.imageLoaded = true;
        }
        this.image.src =this.src;
    }
    if(drawBackground && this.imageLoaded){
        this.ctx.globalAlpha = 0.1;
        this.ctx.drawImage(this.image, 0,0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        if(this.drawBorder){
            if(!this.maxWidth || !this.maxHeight){
                this.measureAllText();
            }
            this.ctx.fillRect(this.header.position.x - this.maxWidth/2, this.header.position.y-this.header.measure.height, this.maxWidth, this.maxHeight);
        }
        this.ctx.globalAlpha = 1.0;
//        canvas.canvas.style.background = this.src;
    }
    this.header = this.header || new Texter(this.canvas, this.ctx, this.headerText, new Vector2(this.canvas.width/2, this.canvas.height/2));
    this.header.style= "50px Arial bold";
    this.header.fadeIn();
    if(this.header.faded){
        this.content = this.content || new Texter(this.canvas, this.ctx, this.contentText, new Vector2(this.canvas.width/2, this.canvas.height/2 + this.header.measure.height));
        this.content.style ="30px Arial";
        this.content.fadeIn();
    }
    if(this.content && this.content.faded){
        this.link = this.link || new Texter(this.canvas, this.ctx, "", new Vector2(this.canvas.width/2, this.content.position.y + this.content.measure.height));
        this.link.style ="30px Arial underlined";
        this.link.red = 255;
        this.link.green = 255;
        this.link.blue = 255;
        this.link.fadeIn();
    }
    if(this.link && this.link.faded){
        this.drawed = true;
    }
}
Slide.prototype.measureAllText = function(){
    this.content = new Texter(this.canvas, this.ctx, this.contentText, new Vector2(this.canvas.width/2, this.canvas.height/2 + this.header.measure.height));
    this.content.style ="30px Arial";
    this.content.measureNow();
    this.link = new Texter(this.canvas, this.ctx, "", new Vector2(this.canvas.width/2, this.content.position.y + this.content.measure.height));
    this.link.measureNow();
    var headerMeasure = this.header.measure;
    var contentMeasure = this.content.measure;
    var linkMeasure = this.link.measure;
    this.maxWidth = Math.max(headerMeasure.width, Math.max(contentMeasure.width, linkMeasure.width));
    this.maxHeight = headerMeasure.height*2 + contentMeasure.height + linkMeasure.height;
}
Slide.prototype.linkBox = function(){
    return [this.link.position.x-this.link.measure.width/2, this.link.position.y, this.link.measure.width, this.link.measure.height];
}