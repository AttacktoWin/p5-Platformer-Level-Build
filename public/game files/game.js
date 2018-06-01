function init() {
    game = {
        pause: false,
        state: "title",
        menu: false,
        level: new Level(),
        userLevels: [],
        page: 0,
        timer: 0,
        seconds: 0,
        minutes: 0,
        clearLevel: function () {
            this.level = new Level();
        },
        logic: function () {
            for (var i = 0; i < this.level.platforms.length; i++) {
                this.level.platforms[i].logic();
            }
            for (var i = 0; i < this.level.spikes.length; i++) {
                this.level.spikes[i].logic();
            }

            this.timer = parseInt(this.timer);
            this.seconds = parseInt(this.seconds);
            this.minutes = parseInt(this.minutes);
            if (this.timer >= 60) {
                this.seconds++;
                this.timer -= 60;
            }
            if (this.seconds >= 60) {
                this.minutes++;
                this.seconds -= 60;
            }
            if (this.seconds < 10) {
                this.seconds = "0" + this.seconds;
            }
            if (this.minutes < 10) {
                this.minutes = "0" + this.minutes;
            }
            this.timer++;
            if (this.timer < 10) {
                this.timer = "0" + this.timer;
            }
        },
        title: function () {
            $("#instructions").hide();
            fill(255);
            noStroke();
            textSize(62);
            textAlign(CENTER);
            text("GOOD LUCK", width / 2, height / 4);
            fill(GREY);
            rect(0, height - 50, width, 50);
            fill(ORANGE);
            rect(0, height - 54, width, 4);
            fill(BLUE);
            rect(width / 2 - 15, height - 81, 30, 30);
            fill(RED);
            rect(480, 540, 400, 150);
            fill(BLUE);
            rect(1040, 540, 400, 150);
            fill(255);
            text("PLAY", 680, 635);
            text("BUILD", 1240, 635);
        },
        displayLevels: function() {
            for (var i = 0; i < 25; i++) {
                for (var x = 250; x < width - 250; x += 285) {
                    noFill();
                    stroke(ORANGE);
                    strokeWeight(7);
                    rect(x, (round(i/5) * 212.5) + 50, 150, 150);
                    stroke(255);
                    strokeWeight(1);
                    textSize(20);
                    text("test", x + 75, (round(i/5) * 212.5) + 220);
                }
            }
        },
        show: function () {
            for (var i = 0; i < this.level.platforms.length; i++) {
                this.level.platforms[i].show();
            }
            for (var i = 0; i < this.level.spikes.length; i++) {
                this.level.spikes[i].show();
            }
            if (this.level.selected.type == "platform" || this.level.selected.type == "spikes") {
                this.level.moveables.show();
            }
            noStroke();
            fill(40, 40, 40, 150);
            if (this.menu) {
                rect(0, 0, width, 150);
            }
            rect(width - (30 * 4), 30 * 0.5, 30 * 1.5, 30 * 1.5);
            rect(width - 30 * 2, 30 * 0.5, 30 * 1.5, 30 * 1.5);
            if (!this.menu) {
                rect(30, 15, 30 * 1.5, 30 * 1.5);
            }
            noFill();
            stroke(255, 255, 255, 150);
            strokeWeight(3);
            triangle(width - (30 * 3.55), 30 * 0.75, width - (30 * 3.55), 30 * 1.75, width - (30 * 2.75), 30 * 1.25);
            strokeWeight(5);
            if (!this.menu) {
                line(width - 30 * 1.75, 30 * 0.9, width - 30 * 0.8, 30 * 0.9);
                line(width - 30 * 1.75, 30 * 1.2, width - 30 * 0.8, 30 * 1.2);
                line(width - 30 * 1.75, 30 * 1.5, width - 30 * 0.8, 30 * 1.5);
                line(40, 37.5, 65, 37.5);
                line(40, 37.5, 55, 27.5);
                line(40, 37.5, 55, 47.5)
            } else {
                line(width - 30 * 1.75, 30 * 0.9, width - 30 * 0.8, 30 * 1.5);
                line(width - 30 * 1.75, 30 * 1.5, width - 30 * 0.8, 30 * 0.9);
                fill(GREY);
                noStroke();
                rect(100, 50, 300, 50);
                fill(ORANGE);
                rect(100, 46, 300, 4);
                fill(RED);
                triangle(600, 90, 640, 90, 620, 50);
                triangle(640, 90, 680, 90, 660, 50);
                triangle(680, 90, 720, 90, 700, 50);
            }
            noStroke();
            fill(this.level.col);
            stroke(255);
            strokeWeight(this.level.playerStroke);
            rect(this.level.spawnX, this.level.spawnY, 30, 30);

            // BUILD CONTROLS
            if (!keyIsDown(16)) {
                if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
                    if (this.level.selected.type == "platform") {
                        this.level.platforms[this.level.selected.index].w++;
                    } else if (this.level.selected.type == "spikes") {
                        if (keyIsDown(RIGHT_ARROW)) {
                            this.level.spikes[this.level.selected.index].r = 2;
                        } else if (this.level.spikes[this.level.selected.index].r == 1 || this.level.spikes[this.level.selected.index].r == 3) {
                            this.level.spikes[this.level.selected.index].w++;
                        }
                    }
                }
                if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
                    if (this.level.selected.type == "platform") {
                        this.level.platforms[this.level.selected.index].w--;
                    } else if (this.level.selected.type == "spikes") {
                        if (keyIsDown(LEFT_ARROW)) {
                            this.level.spikes[this.level.selected.index].r = 4;
                        } else if (this.level.spikes[this.level.selected.index].r == 1 || this.level.spikes[this.level.selected.index].r == 3) {
                            this.level.spikes[this.level.selected.index].w--;
                        }
                    }
                }
                if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
                    if (this.level.selected.type == "platform") {
                        this.level.platforms[this.level.selected.index].h--;
                    } else if (this.level.selected.type == "spikes") {
                        if (keyIsDown(UP_ARROW)) {
                            this.level.spikes[this.level.selected.index].r = 1;
                        } else if (this.level.spikes[this.level.selected.index].r == 2 || this.level.spikes[this.level.selected.index].r == 4) {
                            this.level.spikes[this.level.selected.index].w--;
                        }
                    }
                }
                if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
                    if (this.level.selected.type == "platform") {
                        this.level.platforms[this.level.selected.index].h++;
                    } else if (this.level.selected.type == "spikes") {
                        if (keyIsDown(DOWN_ARROW)) {
                            this.level.spikes[this.level.selected.index].r = 3;
                        } else if (this.level.spikes[this.level.selected.index].r == 2 || this.level.spikes[this.level.selected.index].r == 4) {
                            this.level.spikes[this.level.selected.index].w++;
                        }
                    }
                }
            } else {
                if (keyIsDown(68)) {
                    if (this.level.selected.type == "platform") {
                        this.level.platforms[this.level.selected.index].dx++;
                    } else if (this.level.selected.type == "spikes") {
                        this.level.spikes[this.level.selected.index].dx++;
                    }
                }
                if (keyIsDown(65)) {
                    if (this.level.selected.type == "platform") {
                        this.level.platforms[this.level.selected.index].dx--;
                    } else if (this.level.selected.type == "spikes") {
                        this.level.spikes[this.level.selected.index].dx--;
                    }
                }
                if (keyIsDown(87)) {
                    if (this.level.selected.type == "platform") {
                        this.level.platforms[this.level.selected.index].dy--;
                    } else if (this.level.selected.type == "spikes") {
                        this.level.spikes[this.level.selected.index].dy--;
                    }
                }
                if (keyIsDown(83)) {
                    if (this.level.selected.type == "platform") {
                        this.level.platforms[this.level.selected.index].dy++;
                    } else if (this.level.selected.type == "spikes") {
                        this.level.spikes[this.level.selected.index].dy++;
                    }
                }

                if (keyIsDown(RIGHT_ARROW)) {
                    if (this.level.selected.type == "platform") {
                        this.level.platforms[this.level.selected.index].xSpeed++;
                        this.level.moveables = new Arrow(this.level.platforms[this.level.selected.index].x + (this.level.platforms[this.level.selected.index].w / 2), this.level.platforms[this.level.selected.index].y + (this.level.platforms[this.level.selected.index].h / 2), this.level.platforms[this.level.selected.index].xSpeed * 5, this.level.platforms[this.level.selected.index].ySpeed * 5);
                    } else if (this.level.selected.type == "spikes") {
                        this.level.spikes[this.level.selected.index].xSpeed++;
                        this.level.moveables = new Arrow(this.level.spikes[this.level.selected.index].x + (this.level.spikes[this.level.selected.index].w / 2), this.level.spikes[this.level.selected.index].y + (40 / 2), this.level.spikes[this.level.selected.index].xSpeed * 5, this.level.spikes[this.level.selected.index].ySpeed * 5);
                    }
                }
                if (keyIsDown(LEFT_ARROW)) {
                    if (this.level.selected.type == "platform") {
                        this.level.platforms[this.level.selected.index].xSpeed--;
                        this.level.moveables = new Arrow(this.level.platforms[this.level.selected.index].x + (this.level.platforms[this.level.selected.index].w / 2), this.level.platforms[this.level.selected.index].y + (this.level.platforms[this.level.selected.index].h / 2), this.level.platforms[this.level.selected.index].xSpeed * 5, this.level.platforms[this.level.selected.index].ySpeed * 5);
                    } else if (this.level.selected.type == "spikes") {
                        this.level.spikes[this.level.selected.index].xSpeed--;
                        this.level.moveables = new Arrow(this.level.spikes[this.level.selected.index].x + (this.level.spikes[this.level.selected.index].w / 2), this.level.spikes[this.level.selected.index].y + (40 / 2), this.level.spikes[this.level.selected.index].xSpeed * 5, this.level.spikes[this.level.selected.index].ySpeed * 5);
                    }
                }
                if (keyIsDown(DOWN_ARROW)) {
                    if (this.level.selected.type == "platform") {
                        this.level.platforms[this.level.selected.index].ySpeed++;
                        this.level.moveables = new Arrow(this.level.platforms[this.level.selected.index].x + (this.level.platforms[this.level.selected.index].w / 2), this.level.platforms[this.level.selected.index].y + (this.level.platforms[this.level.selected.index].h / 2), this.level.platforms[this.level.selected.index].xSpeed * 5, this.level.platforms[this.level.selected.index].ySpeed * 5);
                    } else if (this.level.selected.type == "spikes") {
                        this.level.spikes[this.level.selected.index].ySpeed++;
                        this.level.moveables = new Arrow(this.level.spikes[this.level.selected.index].x + (this.level.spikes[this.level.selected.index].w / 2), this.level.spikes[this.level.selected.index].y + (40 / 2), this.level.spikes[this.level.selected.index].xSpeed * 5, this.level.spikes[this.level.selected.index].ySpeed * 5);
                    }
                }
                if (keyIsDown(UP_ARROW)) {
                    if (this.level.selected.type == "platform") {
                        this.level.platforms[this.level.selected.index].ySpeed--;
                        this.level.moveables = new Arrow(this.level.platforms[this.level.selected.index].x + (this.level.platforms[this.level.selected.index].w / 2), this.level.platforms[this.level.selected.index].y + (this.level.platforms[this.level.selected.index].h / 2), this.level.platforms[this.level.selected.index].xSpeed * 5, this.level.platforms[this.level.selected.index].ySpeed * 5);
                    } else if (this.level.selected.type == "spikes") {
                        this.level.spikes[this.level.selected.index].ySpeed--;
                        this.level.moveables = new Arrow(this.level.spikes[this.level.selected.index].x + (this.level.spikes[this.level.selected.index].w / 2), this.level.spikes[this.level.selected.index].y + (40 / 2), this.level.spikes[this.level.selected.index].xSpeed * 5, this.level.spikes[this.level.selected.index].ySpeed * 5);
                    }
                }
            }
        },
        play: function () {
            player = new Player(this.level.spawnX, this.level.spawnY, this.level.col);
        },
        display: function () {
            for (var i = 0; i < this.level.platforms.length; i++) {
                this.level.platforms[i].show();
            }
            for (var i = 0; i < this.level.spikes.length; i++) {
                this.level.spikes[i].show();
            }
            fill(255);
            stroke(255);
            noStroke();
            textAlign(LEFT);
            textSize(30);
            text("Deaths: " + player.deaths, 15, 30);
            textAlign(CENTER);
            textSize(50);
            text(this.minutes + ":" + this.seconds + "." + this.timer, width / 2, 50);

            if (this.pause) {
                fill(20, 20, 20, 150);
                rect(0, 0, width, height);
                textAlign(CENTER);
                textSize(50);
                text("PAUSED", width / 2, height / 2);
            }

            noStroke();
            fill(40, 40, 40, 150);
            rect(width - (player.w * 2), player.w * 0.5, player.w * 1.5, player.w * 1.5);
            rect(width - (player.w * 4), player.w * 0.5, player.w * 1.5, player.w * 1.5);
            stroke(255, 255, 255, 150);
            strokeWeight(5);
            line(width - (player.w * 1.45), player.w * 0.75, width - (player.w * 1.45), player.w * 1.75);
            line(width - (player.w), player.w * 0.75, width - (player.w), player.w * 1.75);
            fill(255, 255, 255, 150);
            triangle(width - (30 * 3.55), 30 * 0.75, width - (30 * 3.55), 30 * 1.75, width - (30 * 2.75), 30 * 1.25);

            player.show();
        },
        changeMode() {
            if (mouseX > 480 && mouseX < 880) {
                if (mouseY > 540 && mouseY < 690) {
                    if (this.state == "title") {
                        // socket.emit('requestLevels');
                        this.state = "displayLevels";
                    }
                }
            }
            if (mouseX > 1040 && mouseX < 1440) {
                if (mouseY > 540 && mouseY < 690) {
                    if (this.state == "title") {
                        this.state = "build";
                        $("#instructions").show();
                    }
                }
            }
            if (mouseX > width - 120 && mouseX < width - 75) {
                if (mouseY > 15 && mouseY < 60) {
                    if (this.state == "build") {
                        this.play();
                        this.state = "playing";
                    } else if (this.state == "playing") {
                        player = undefined;
                        this.state = "build";
                        for (var i = 0; i < this.level.platforms.length; i++) {
                            this.level.platforms[i].x = this.level.platforms[i].homeX;
                            this.level.platforms[i].y = this.level.platforms[i].homeY;
                        }
                        for (var i = 0; i < this.level.spikes.length; i++) {
                            this.level.spikes[i].x = this.level.spikes[i].homeX;
                            this.level.spikes[i].y = this.level.spikes[i].homeY;
                        }
                    }
                }
            }
            if (mouseX > width - 60 && mouseX < width - 15) {
                if (mouseY > 15 && mouseY < 60) {
                    if (this.menu) {
                        this.menu = false;
                    } else {
                        this.menu = true;
                    }
                }
            }
            if (mouseX > 30 && mouseX < 75) {
                if (mouseY > 15 && mouseY < 60) {
                    if (this.state == "build" && !this.menu) {
                        this.state = "title";
                    }
                }
            }
        }
    }
}

class Player {
    constructor(x, y, col) {
        this.x = x;
        this.y = y;
        this.spawnX = x;
        this.spawnY = y;
        this.col = col;
        this.w = 30;
        this.h = 30;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.a = 1;
        this.jumped = false;
        this.deaths = 0;
    }

    jump() {
        if (!this.jumped) {
            this.ySpeed = -25;
            this.jumped = true;
        }
    }

    move() {
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            this.xSpeed = -10;
        } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            this.xSpeed = 10;
        }

        this.x += this.xSpeed;
        this.xSpeed = 0;

        if (keyIsDown(UP_ARROW) || keyIsDown(87) || keyIsDown(32)) {
            this.jump();
        }

        if (this.ySpeed > 40) {
            this.ySpeed = 40;
        }
        this.y += this.ySpeed;
        this.ySpeed += this.a;
        if (this.y + this.h > height) {
            this.y = height - this.h;
            this.ySpeed = 0;
        }

        // Collision Detection
        for (var i = 0; i < game.level.platforms.length; i++) {
            if (this.x + this.w > game.level.platforms[i].x && this.x < game.level.platforms[i].x + game.level.platforms[i].w) {
                if (this.y <= game.level.platforms[i].y - 1 && this.y + this.h >= game.level.platforms[i].y - 1) {
                    this.ySpeed = 0;
                    this.y = game.level.platforms[i].y - this.h - 1;
                    this.jumped = false;
                    this.xSpeed += game.level.platforms[i].xSpeed;
                    this.ySpeed += game.level.platforms[i].ySpeed;
                }
                if (this.y <= game.level.platforms[i].y + game.level.platforms[i].h && this.y + this.h >= game.level.platforms[i].y + game.level.platforms[i].h) {
                    this.y = game.level.platforms[i].y + game.level.platforms[i].h + 1
                    this.ySpeed = this.a;
                }
            }

            if (this.x + this.w > game.level.platforms[i].x && this.x <= game.level.platforms[i].x) {
                if (this.y >= game.level.platforms[i].y && this.y + this.h < game.level.platforms[i].y + game.level.platforms[i].h) {
                    this.x = game.level.platforms[i].x - this.w;
                }
            }
            if (this.x < game.level.platforms[i].x + game.level.platforms[i].w + 1 && this.x + this.w >= game.level.platforms[i].x + game.level.platforms[i].w) {
                if (this.y >= game.level.platforms[i].y && this.y + this.h < game.level.platforms[i].y + game.level.platforms[i].h) {
                    this.x = game.level.platforms[i].x + game.level.platforms[i].w;
                }
            }
        }

        for (var i = 0; i < game.level.spikes.length; i++) {
            if (game.level.spikes[i].r == 1) {
                if (this.x + this.w > game.level.spikes[i].x && this.x < game.level.spikes[i].x + game.level.spikes[i].w * 40) {
                    if (this.y + this.h > game.level.spikes[i].y && this.y < game.level.spikes[i].y + 40) {
                        this.deaths++;
                        game.seconds = parseInt(game.seconds);
                        game.seconds += 10;
                        this.respawn();
                    }
                }
            } else if (game.level.spikes[i].r == 2) {
                if (this.x + this.w > game.level.spikes[i].x && this.x < game.level.spikes[i].x + 41) {
                    if (this.y + this.h > game.level.spikes[i].y && this.y < game.level.spikes[i].y + game.level.spikes[i].w * 40) {
                        this.deaths++;
                        game.seconds = parseInt(game.seconds);
                        game.seconds += 10;
                        this.respawn();
                    }
                }
            } else if (game.level.spikes[i].r == 3) {
                if (this.x + this.w > game.level.spikes[i].x && this.x < game.level.spikes[i].x + game.level.spikes[i].w * 40) {
                    if (this.y + this.h > game.level.spikes[i].y && this.y < game.level.spikes[i].y + 41) {
                        this.deaths++;
                        game.seconds = parseInt(game.seconds);
                        game.seconds += 10;
                        this.respawn();
                    }
                }
            } else if (game.level.spikes[i].r == 4) {
                if (this.x + this.w > game.level.spikes[i].x - 41 && this.x < game.level.spikes[i].x) {
                    if (this.y + this.h > game.level.spikes[i].y && this.y < game.level.spikes[i].y + game.level.spikes[i].w * 40) {
                        this.deaths++;
                        game.seconds = parseInt(game.seconds);
                        game.seconds += 10;
                        this.respawn();
                    }
                }
            }
        }

        if (this.x > width) {
            game.changeMode();
        }
        if (this.x < 0) {
            this.x = 0;
        }
    }

    show() {
        noStroke();
        fill(this.col);
        rect(this.x, this.y, this.w, this.h);
    }

    respawn() {
        this.x = this.spawnX;
        this.y = this.spawnY;
        this.ySpeed = 0;
        this.xSpeed = 0;
    }
}

class Level {
    constructor() {
        this.platforms = [new Platform(0, height - 50, width, height, 0, 0, 0, 0)];
        this.spikes = [];
        this.spawnX = 0;
        this.spawnY = height - 80;
        this.playerStroke = 0;
        this.col = BLUE;
        this.selected = {};
        this.prevSelected = {};
        this.moveables = {};
        this.initX = 0;
        this.initY = 0;
        this.name = "";
    }

    select() {
        this.prevSelected = this.selected;
        this.moveables = {};
        for (var i = 0; i < this.platforms.length; i++) {
            if (mouseX > this.platforms[i].x && mouseX < this.platforms[i].x + this.platforms[i].w) {
                if (mouseY > this.platforms[i].y && mouseY < this.platforms[i].y + this.platforms[i].h) {
                    this.selected = {
                        type: "platform",
                        index: i
                    }
                    this.moveables = new Arrow(this.platforms[this.selected.index].x + (this.platforms[this.selected.index].w / 2), this.platforms[this.selected.index].y + (this.platforms[this.selected.index].h / 2), this.platforms[this.selected.index].xSpeed * 5, this.platforms[this.selected.index].ySpeed * 5);
                    this.platforms[i].stroke = 2;
                } else {
                    this.platforms[i].stroke = 0;
                }
            } else {
                this.platforms[i].stroke = 0;
            }
        }
        for (var i = 0; i < this.spikes.length; i++) {
            if (this.spikes[i].r == 1 || this.spikes[i].r == 3) {
                if (mouseX > this.spikes[i].x && mouseX < this.spikes[i].x + (this.spikes[i].w * 40)) {
                    if (mouseY > this.spikes[i].y && mouseY < this.spikes[i].y + 40) {
                        this.selected = {
                            type: "spikes",
                            index: i
                        }
                        this.moveables = new Arrow(this.spikes[this.selected.index].x + (this.spikes[this.selected.index].w / 2), this.spikes[this.selected.index].y + (this.spikes[this.selected.index].h / 2), this.spikes[this.selected.index].xSpeed * 5, this.spikes[this.selected.index].ySpeed * 5);
                        this.spikes[i].stroke = 2;
                    } else {
                        this.spikes[i].stroke = 0;
                    }
                } else {
                    this.spikes[i].stroke = 0;
                }
            } else {
                if (mouseX > this.spikes[i].x && mouseX < this.spikes[i].x + 40) {
                    if (mouseY > this.spikes[i].y && mouseY < this.spikes[i].y + (this.spikes[i].w * 40)) {
                        this.selected = {
                            type: "spikes",
                            index: i
                        }
                        this.moveables = new Arrow(this.spikes[this.selected.index].x + (this.spikes[this.selected.index].w / 2), this.spikes[this.selected.index].y + (this.spikes[this.selected.index].h / 2), this.spikes[this.selected.index].xSpeed * 5, this.spikes[this.selected.index].ySpeed * 5);
                        this.spikes[i].stroke = 2;
                    } else {
                        this.spikes[i].stroke = 0;
                    }
                } else {
                    this.spikes[i].stroke = 0;
                }
            }
        }

        if (mouseX > this.spawnX && mouseX < this.spawnX + 30) {
            if (mouseY > this.spawnY && mouseY < this.spawnY + 30) {
                this.selected = {
                    type: "player"
                }
                this.playerStroke = 2;
            } else {
                this.playerStroke = 0;
            }
        } else {
            this.playerStroke = 0;
        }

        if (this.selected == this.prevSelected) {
            this.selected = {};
            this.prevSelected = {};
        }
    }

    move() {
        if (this.selected.type == "platform" && this.selected.index != 0) {
            if (mouseX > this.platforms[this.selected.index].x && mouseX < this.platforms[this.selected.index].x + this.platforms[this.selected.index].w) {
                if (mouseY > this.platforms[this.selected.index].y && mouseY < this.platforms[this.selected.index].y + this.platforms[this.selected.index].h) {
                    if (this.initX == 0) {
                        this.initX = mouseX - this.platforms[this.selected.index].x;
                    }
                    if (this.initY == 0) {
                        this.initY = mouseY - this.platforms[this.selected.index].y;
                    }
                }
            }
            this.platforms[this.selected.index].x = mouseX - this.initX;
            this.platforms[this.selected.index].homeX = this.platforms[this.selected.index].x;
            this.platforms[this.selected.index].y = mouseY - this.initY;
            this.platforms[this.selected.index].homeY = this.platforms[this.selected.index].y;
            this.moveables = new Arrow(this.platforms[this.selected.index].x + (this.platforms[this.selected.index].w / 2), this.platforms[this.selected.index].y + (this.platforms[this.selected.index].h / 2), this.platforms[this.selected.index].xSpeed * 5, this.platforms[this.selected.index].ySpeed * 5);
        } else if (this.selected.type == "spikes") {
            if (this.spikes[this.selected.index].r == 1 || this.spikes[this.selected.index].r == 3) {
                if (mouseX > this.spikes[this.selected.index].x && mouseX < (this.spikes[this.selected.index].w * 40)) {
                    if (mouseY > this.spikes[this.selected.index].y && mouseY < this.spikes[this.selected.index].y + 40) {
                        if (this.initX == 0) {
                            this.initX = mouseX - this.spikes[this.selected.index].x;
                        }
                        if (this.initY == 0) {
                            this.initY = mouseY - this.spikes[this.selected.index].y;
                        }
                    }
                }
            } else {
                if (mouseX > this.spikes[this.selected.index].x && mouseX < this.spikes[this.selected.index].x + 40) {
                    if (mouseY > this.spikes[this.selected.index].y && mouseY < this.spikes[this.selected.index].y + (this.spikes[this.selected.index].w * 40)) {
                        if (this.initX == 0) {
                            this.initX = mouseX - this.spikes[this.selected.index].x;
                        }
                        if (this.initY == 0) {
                            this.initY = mouseY - this.spikes[this.selected.index].y;
                        }
                    }
                }
            }
            this.spikes[this.selected.index].x = mouseX - this.initX;
            this.spikes[this.selected.index].homeX = this.spikes[this.selected.index].x;
            this.spikes[this.selected.index].y = mouseY - this.initY;
            this.spikes[this.selected.index].homeY = this.spikes[this.selected.index].y;
        } else if (this.selected.type == "player") {
            if (mouseX > this.spawnX && mouseX < this.spawnX + 30) {
                if (mouseY > this.spawnY && mouseY < this.spawnY + 30) {
                    if (this.initX == 0) {
                        this.initX = mouseX - this.spawnX;
                    }
                    if (this.initY == 0) {
                        this.initY = mouseY - this.spawnY;
                    }
                }
            }
            this.spawnX = mouseX - this.initX;
            this.spawnY = mouseY - this.initY;
            if (this.spawnX < 0) {
                this.spawnX = 0
            }
            if (this.spawnX > width - 30) {
                this.spawnX = width - 30;
            }
            if (this.spawnY < 0) {
                this.sapwnY = 0;
            }
            if (this.spawnY > height - 30) {
                this.spawnY = height - 30;
            }
        }
    }
}