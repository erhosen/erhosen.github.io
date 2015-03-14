function changeMusicState(){
    var player = $("#music-control");
    var audio = $("#music")[0];
    if (player.hasClass("music-on")){
        $.cookie("sound", "off");
        audio.pause();
    } else {
        $.cookie("sound", "on");
        audio.load();
        audio.play();
    }
    player.toggleClass('music-on');
}

function initMusic() {
    var audio = document.getElementById("music");
    audio.volume = 0.3;
    var soundCookie = $.cookie("sound");
    if (soundCookie == undefined || soundCookie == "on"){
        $("#music-control").toggleClass('music-on');
        audio.play();
    }
}

// http://ruszen.me/higloss.mp3

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

$(document).ready(function(){
    initMusic();

    var body_element = $(document.body);
    var hours_element = $("#hours");
    var minutes_element = $("#minutes");
    var seconds_element = $("#seconds");
    var color = $("#color");
    interval = setInterval(function () {
        var now = new Date(Date.now());

        var hours = format(now.getHours());
        var minutes = format(now.getMinutes());
        var seconds = format(now.getSeconds());
        var formatted = "#" + hours + minutes + seconds;

        hours_element.html(hours);
        minutes_element.html(minutes);
        seconds_element.html(seconds);
        color.html(formatted);

        body_element.attr("bgcolor", formatted);
        body_element.attr("text", invertColor(formatted));
    }, 1000);
});
