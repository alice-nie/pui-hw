// Create a PixiJS application
const app = new PIXI.Application({ background: '#fffff0', resizeTo: window });

// add the view that Pixi created for you to the DOM
document.body.appendChild(app.view);

// sprite animation with keyboard
let keys = {};
let playerSheet = {};
let speed = 5;

window.addEventListener("keydown", keysDown)
window.addEventListener("keyup", keysUp)

PIXI.Assets.load([
    "./img/spritewalk.png", 
    "./img/spritejump.png"
]).then(() =>
    {
        createPlayerSheet();
        createPlayer();
        app.ticker.add(gameLoop);
    }
)

function createPlayerSheet() {
    let sheet = PIXI.BaseTexture.from("./img/spritewalk.png");
    let w = 1999/9;
    let h = 1334/4;

    // standing still
    playerSheet["faceFront"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0, 2*h, w, h))
    ];
    playerSheet["faceLeft"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(8*w, 1*h, w, h))
    ];
    playerSheet["faceRight"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0, 0, w, h))
    ];
    playerSheet["faceBack"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0, 3*h, w, h))
    ];

    // walking
    let numFrames = 9;
    playerSheet["walkLeft"] = []
    playerSheet["walkRight"] = []
    for (let i = 0; i < numFrames; i++) {
        playerSheet["walkLeft"].push(new PIXI.Texture(sheet, new PIXI.Rectangle((numFrames - (i+1))*w, 1*h, w, h)));
        playerSheet["walkRight"].push(new PIXI.Texture(sheet, new PIXI.Rectangle(i*w, 0, w, h)));
    }
    playerSheet["walkLeft"].push(new PIXI.Texture(sheet, new PIXI.Rectangle(8*w, 1*h, w, h)));
    playerSheet["walkRight"].push(new PIXI.Texture(sheet, new PIXI.Rectangle(0, 0, w, h)));


    let jSheet = PIXI.BaseTexture.from("./img/spritejump.png");
    let jw = 1993/7.15;
    let jh = 428;


    // jumping
    let numJFrames = 7; // double this to reverse jump (land)
    playerSheet["jump"] = []
    for (let i = 0; i < numJFrames; i++) {
        playerSheet["jump"].push(new PIXI.Texture(jSheet, new PIXI.Rectangle(i*jw, 0, jw, jh)));
    }
    for (let i = 0; i < numJFrames; i++) {
        playerSheet["jump"].push(new PIXI.Texture(jSheet, new PIXI.Rectangle((numJFrames - (i+1))*jw, 0, jw, jh)));
    }
    playerSheet["jump"].push(new PIXI.Texture(sheet, new PIXI.Rectangle(0, 2*h, w, h))); //face front again at end

}

function createPlayer() {
    player = new PIXI.AnimatedSprite(playerSheet.faceFront);
    player.anchor.set(0.5);
    player.animationSpeed = .15;
    player.loop = false;
    player.x = app.view.width / 2;
    player.y = app.view.height / 2;
    app.stage.addChild(player);
    player.play();
}

function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}

function gameLoop() {

    // W
    if (keys["87"]) {
        player.textures = playerSheet.faceBack
    }
    // A
    if (keys["65"]) {
        if (!player.playing) {
            player.textures = playerSheet.walkLeft;
            player.play();
        }
        player.x -= speed;
    }
    // S
    if (keys["83"]) {
        player.textures = playerSheet.faceFront
    }
    // D
    if (keys["68"]) {
        if (!player.playing) {
            player.textures = playerSheet.walkRight;
            player.play();
        }
        player.x += 5;
    }
    // Space
    if (keys["32"]) {
        player.textures = playerSheet.jump;
        player.play();
    }
}