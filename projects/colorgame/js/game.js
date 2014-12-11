/*
    Simple breake-your-eyes game.
 */

var lvl;
var lvMap = [2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9];
var box;
var k=9; // Coefficient of change
var interval;
var score = 0;
var seconds=30;
var pictures = ['pics/be_better.gif',
    'pics/win.gif'];

switchTo5x=true;

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
    box.addClass("lvl lv"+lvl);
}

function choose_pic(score){
    if (score < 15)
        return pictures[0];
    else
        return pictures[1];
}

function end_game(){
    box.empty(); // remove all tiles
    box.removeClass();
    result = $('<div/>', {id:"result"});
    $('<img>', {src:choose_pic(score), align: "center"}).appendTo(result);
    $('<h1/>', {text:"Your Score: " + score, align:"center"}).appendTo(result);
    $('#share').show();
    result.appendTo(box);
    box.append('<a class="btn btn-restart" id="start-button"> restart </button>');
    // reIndent
    k = 9;
    score = 0;
    lvMap = [2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9];
    seconds = 30;
    //$('#timer').text("00:30").hide();
}

function minibox(){
    var minibox = $("#minibox");
    var colors = getRandomColorPair();
    var tile = $('<span/>').css('background-color', colors[0]);
    var true_tile = $('<span/>', {id:'start-button'}).css('background-color', colors[1]);
    var true_pos = getRandomInt(0, 3);
    for(var i=0; i<4; i++){
        if (i == true_pos){
            minibox.append(true_tile);
        } else {
            minibox.append(tile.clone());
        }
    }
}

$(document).ready(function(){
    // prepare color screen
    minibox();

    $("#box").on('click', "#start-button", function(){
        $(this).hide();
        var timer = $('#timer');
        timer.text("00:"+seconds);

        interval = setInterval(function() {
            seconds -= 1;
            if (seconds < 10 && length.time != 2) seconds = '0' + seconds;
            timer.html("00" + ':' + seconds);

            if (seconds == 0){
                end_game();
                clearInterval(interval);
            }
        }, 1000);

        box = $("#box");
        box.addClass("game_start");
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
