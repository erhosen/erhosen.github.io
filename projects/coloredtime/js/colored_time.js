function invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1);           // remove #
    color = parseInt(color, 16);          // convert to integer
    color = 0xFFFFFF ^ color;             // invert three bytes
    color = color.toString(16);           // convert to hex
    color = ("000000" + color).slice(-6); // pad with leading zeros
    color = "#" + color;                  // prepend #
    return color;
}

function format(t){
    if (t < 10){
        return "0" + t;
    }
    return t;
}

function correctTime(now){
    seconds = now.getSeconds();
    minutes = now.getMinutes();
    hours = now.getHours();
    return "#" + format(hours) + format(minutes) + format(seconds);
}

function colored_time() {
    var body_element = document.body;
    var hours_element = document.getElementById("hours");
    var minutes_element = document.getElementById("minutes");
    var seconds_element = document.getElementById("seconds");
    interval = setInterval(function () {
        var now = new Date(Date.now());

        var hours = format(now.getHours());
        var minutes = format(now.getMinutes());
        var seconds = format(now.getSeconds());
        var formatted = "#" + hours + minutes + seconds;

        hours_element.innerHTML = hours;
        minutes_element.innerHTML = minutes;
        seconds_element.innerHTML = seconds;

        body_element.setAttribute("bgcolor", formatted);
        body_element.setAttribute("text", invertColor(formatted));
    }, 1000);
}

colored_time();