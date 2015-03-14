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
    body_element = document.body;
    time_element = document.getElementById("time");
    console.log(time_element);
    interval = setInterval(function () {
        var now = new Date(Date.now());
        var formatted = correctTime(now);
        time_element.innerHTML = formatted;
        body_element.setAttribute("bgcolor", formatted);
        body_element.setAttribute("text", invertColor(formatted));
    }, 1000);
}

colored_time();