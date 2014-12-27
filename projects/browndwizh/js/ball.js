function Ball (radius, color) {
    if (radius === undefined) { radius = 1; }
    if (color === undefined) { color = "black"; }
    this.x = 0;
    this.y = 0;
    this.radius = radius;
    this.color = color;
}

Ball.prototype.draw = function (context) {
    context.save();
    context.translate(this.x, this.y);

    context.fillStyle = this.color;
    context.beginPath();
    //x, y, radius, start_angle, end_angle, anti-clockwise
    context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
    context.closePath();
    context.fill();
    context.restore();
};