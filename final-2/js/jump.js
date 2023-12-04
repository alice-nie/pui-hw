
PIXI.Assets.load("./img/spritejump.png").then(() =>
    {
        createPlayerAnimSheet();
        createJumpAnim();
        app.ticker.add(gameLoop);
    }
)

function createPlayerAnimSheet() {
    let jumpSheet = PIXI.BaseTexture.from("./img/spriteJump.png");
    let w = 1993/7;
    let h = 428;

    // jumping frames
    let numFrames = 7; // double this to reverse jump (land)
    playerSheet["jump"] = []
    for (let i = 0; i < numFrames; i++) {
        playerSheet["jump"].push(new PIXI.Texture(jumpSheet, new PIXI.Rectangle(i*w, 0, w, h)));
    }
    for (let i = 0; i < numFrames; i++) {
        playerSheet["jump"].push(new PIXI.Texture(jumpSheet, new PIXI.Rectangle((numFrames - (i+1))*w, 0, w, h)));
    }
    // playerSheet["jump"].push(new PIXI.Texture(sheet, new PIXI.Rectangle(0, 2*h, w, h))); //face front again at end

}

function createJumpAnim() {
    player = new PIXI.AnimatedSprite(playerSheet.jump);
    player.anchor.set(0.5);
    player.animationSpeed = .5;
    player.loop = false;
    player.x = app.view.width / 2;
    player.y = app.view.height / 2;
    app.stage.addChild(player);
    player.play();
}

function gameLoop() {

    // space bar
    if (keys["32"]) {
        player.textures = playerSheet.jump
    }
}

