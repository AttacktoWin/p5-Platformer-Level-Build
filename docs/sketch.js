"use strict";

let socket = io();

let game, player;
let debug = false;

let GREY = 80;
let RED = "#bb2a27";
let GREEN = "#8cc542";
let BLUE = "#28a9e0";
let ORANGE = "#faaf3b";
let BROWN = "#aa6c39";

function setup() {
    createCanvas(1920, 1080);

    init();

    // socket.on('sendLevels', function(levelsArray) {
    //     game.userLevels = levelsArray;
    // });

    $("body").append("<div id='instructions'></div>");
}

function draw() {
    background(GREEN);
    if (game.state == "build") {
        game.show();  
        $("#instructions").html("<b>CONTROLS:</b><br><br><br>WASD or ARROWS to change the size<br><br>SHIFT + WASD to change movement speed<br><br>SHIFT + ARROWS to change destination<br><br>Click then drag objects to move them");      
        $("#instructions").show();
    } else if (game.state == "playing") {
        player.move();
        game.logic();
        game.display();
        $("#instructions").hide();
    } else if (game.state == "title") {
        game.title();
    } else if (game.state == "displayLevels") {
        game.displayLevels();
    }
    if (debug) {
        console.log(mouseX + "," + mouseY);
    }
}

function mousePressed() {
    if (game.state == "build" && game.menu) {
        if (mouseX > 100 && mouseX < 400) {
            if (mouseY > 50 && mouseY < 100) {
                game.level.platforms.push(new Platform(100, 50, 300, 50, 0, 0, 0, 0));
                game.level.select();
            }
        }
        if (mouseX > 600 && mouseX < 720) {
            if (mouseY > 50 && mouseY < 90) {
                game.level.spikes.push(new Spike(600, 50, 3, 1, 0, 0, 0, 0));
                game.level.select();
            }
        }
    }
    
    if(game.state == "build") {
        game.level.select();
    }
}

function mouseClicked() {
    game.changeMode();
}

function mouseDragged() {
    if (game.state == "build") {
        game.level.move();
    }
}

function mouseReleased() {
    game.level.initX = 0;
    game.level.initY = 0;
}