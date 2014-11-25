//$("#start-button").onclick(start_game())
//
//function start_game(){
//    $("#HAY").innerHTML = "Hello, world!";
//    alert("Hello, world!");
//}

// .css('background-color', 'rgb(255,220,200)')


var lvl;
var lvMap = [2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9];
var box;
var k=9; // Coefficient of change
var interval;
var score = 0;

/* A function to return random number from min to max */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Changed color, 10 - correction coef.
 * @param master list of 3 colors { [23, 122, 267] }
 * @returns {*} changed list
 */
function changeColor(master){
    var max_ind = master.indexOf(Math.max.apply(Math, master));
    var c = master[max_ind];
    c += k*5 + 10;
    if (c > 255){
        master[max_ind] -= (k*5 + 10);
    } else {
        master[max_ind] = c;
    }
    return master;
}

function getRandomColorPair() {
    var resulted_colors = new Array(2);
    //generate random red, green and blue intensity
    var rgb = new Array(3);
    rgb[0] = getRandomInt(0, 255);
    rgb[1] = getRandomInt(0, 255);
    rgb[2] = getRandomInt(0, 255);
    resulted_colors[0] = "rgb(" + rgb.join(",") + ")";
    resulted_colors[1] = "rgb(" + changeColor(rgb).join(",") + ")";

    return resulted_colors;
}

function board(){
    var color, true_color;
    box.empty(); // Remove all old child nodes
    var num_of_tile = lvl * lvl;
    box.removeClass();
    var colors = getRandomColorPair();
    var tile = $('<span/>').css('background-color', colors[0]);
    var true_tile = $('<span/>', {id:'true-tile'}).css('background-color', colors[1]);
    var true_pos = getRandomInt(0, num_of_tile-1);
    for(var i=0; i<num_of_tile; i++){
        if (i == true_pos){
            box.append(true_tile);
        } else {
            box.append(tile.clone());
        }
    }
    box.addClass("lv"+lvl);
}

function end_game(){
    box.empty(); // remove all tiles
    result = $('<div/>', {id:"result"});
    $('<img>', {src:'http://cs622816.vk.me/v622816884/bc74/ygTo2NR1cDQ.jpg', align: "center"}).appendTo(result);
    $('<h1/>', {text:"Your Score: " + score, align:"center"}).appendTo(result);
    result.appendTo(box);
    box.append('<button id="start-button"> RESTART GAME </button>');
    // reIndent
    k = 9;
    score = 0;
    lvMap = [2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9];
    $('#timer').text("00:30").hide();
}

$(document).ready(function(){
    $("#box").on('click', "#start-button", function(){
        $(this).hide();
        var timer = $('#timer');
        timer.show();

        interval = setInterval(function() {
            timer_val = timer.html().split(':');
            var minutes = parseInt(timer_val[0], 10);
            var seconds = parseInt(timer_val[1], 10);
            seconds -= 1;
            if (minutes < 0) return clearInterval(interval);
            if (minutes < 10 && minutes.length != 2) minutes = '0' + minutes;
            if (seconds < 0 && minutes != 0) {
                minutes -= 1;
                seconds = 59;
            }
            else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;
            timer.html(minutes + ':' + seconds);

            if (minutes == 0 && seconds == 0){
                end_game();
                clearInterval(interval);
            }
        }, 1000);

        box = $("#box");
        box.show();
        lvl = lvMap.shift();
        board();
    });

    $("body").on('click', '#true-tile', function(){
        score+=1;
        lvl = lvMap.shift();
        if (!lvl) { lvl = 9; }
        k = 10-lvl;
        board();
    });
});
