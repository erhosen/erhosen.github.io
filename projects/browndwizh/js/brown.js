function Dot (lineWidth, color) {
    if (lineWidth === undefined) { lineWidth = 1; }
    if (color === undefined) { color = "black"; }
    this.x = 0;
    this.y = 0;
    this.lineWidth = lineWidth;
    this.color = color;
}

Dot.prototype.draw = function (context, prevDot) {
    context.beginPath();
    if (prevDot !== undefined){
        context.moveTo(prevDot.x, prevDot.y); // draw a line
        context.lineTo(this.x, this.y);
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.color;
        context.stroke();
    } else {
        console.log(prevDot);
        context.arc(0, 0, this.lineWidth, 0, (Math.PI * 2), true); // draw a circle
        context.fillStyle = this.color;
        context.fill();
    }
};

var firstTime = true;

document.getElementById("button").onclick = function() {
    var canvas = document.getElementById('myCanvas'),
        context = canvas.getContext('2d'),
        dots = [],
        color = document.getElementById("color").value,
        lineWidth = +document.getElementById("fatness").value,
        numDots = +document.getElementById("final_t").value;

    context.clearRect (0, 0, canvas.width, canvas.height); // Clear Canvas

    if (firstTime) {
        context.scale(5, 5);
        firstTime = false;
    }

    for (var dot, i = 0; i < numDots; i++) {
        dot = new Dot(lineWidth, color);
        dot.x = 0;
        dot.y = 0;
        dots.push(dot);
    }

    function drawFrame() {
        for (var t = 0; t < numDots; t++) {
            if (t == 0) {
                dots[t].draw(context);
            }
            else {
                dots[t].x = dots[t - 1].x + Math.random();
                dots[t].y = dots[t - 1].y + Math.random();
                dots[t].draw(context, dots[t-1]);
            }
            console.log("X:", dots[t].x, "Y:", dots[t].y);
        }
        return 0;
    }

    drawFrame();
};