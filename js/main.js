/**
 * Created by jiangliu on 2016/9/1.
 */
var game = new Phaser.Game(400, 600, '', Phaser.AUTO, {preload: preload, create: create, update: update});

var pipes;
var ga;
var bird;
var timer;
var score = 0;
var scoreText;
var pipe;
function preload() {
    game.load.image('pipe', 'assets/pipe.png');
    game.load.image('b', 'assets/background.jpg');
    game.load.spritesheet('bird', 'assets/bird.png', 34, 24);
}
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    ga = game.add.tileSprite(0, 0, 400, 600, 'b');
    pipes = game.add.group();
    pipes.enableBody = true;
    pipes.physicsBodyType = Phaser.Physics.ARCADE;
    addBird();
    timer = game.time.events.loop(Phaser.Timer.SECOND * 2, addPipe, this);
    scoreText = game.add.text(150, 250, 'aa', {fontSize: '25px', fill: '#fff'});
    scoreText.visible = false;
}
function update() {

    game.input.onTap.addOnce(jump);
    if (game.physics.arcade.overlap(bird, pipes)) {
        lose();

    }
    if (bird.alive) {
        ga.tilePosition.x -= 2;
    }

    if (bird.angle < 20) {
        bird.angle += 1;
    }


}
function addPipe() {
    var gap = [1, 2];
    var d = Math.floor(Math.random() * gap.length + 1) - 1;
    var dis = gap[d];
    var top = [1, 2, 3];
    var n = Math.floor(Math.random() * top.length + 1) - 1;
    var topX = top[n];
    for (var i = 0; i < topX; i++) {
        pipe = pipes.create(500, i * 100, 'pipe');
        pipe.body.velocity.x = -120;
        pipe.outOfBoundsKill = true;
    }
    var j = dis + topX;
    for (j; j < 6; j++) {
        var pipe2 = pipes.create(500, j * 100, 'pipe');
        pipe2.body.velocity.x = -120;
        pipe2.outOfBoundsKill = true;

    }
    //if (pipe.body.x < bird.body.x) {
    score++;
    //}
    console.log('距离' + dis);
    console.log('上面' + topX);
}
function addBird() {
    bird = game.add.sprite(175, 300, 'bird', 1);
    game.physics.arcade.enable(bird);
    bird.checkWorldBounds = true;
    bird.body.collideWorldBounds = true;
    bird.body.gravity.y = 600;
}
function jump() {
    bird.body.velocity.y = -200;
    game.add.tween(bird).to({angle: -20}, 100).start();
}
function lose() {
    bird.kill();
    game.time.events.remove(timer);
    pipes.removeAll();
    scoreText.visible = true;
    score--;
    scoreText.setText('你的得分:' + score);
}

