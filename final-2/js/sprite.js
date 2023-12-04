// PixiJS setup code followed from documentation https://pixijs.com/guides/basics/getting-started

const app = new PIXI.Application({backgroundAlpha: 0, resizeTo: window });
document.body.appendChild(app.view);

// following code adapted from https://www.youtube.com/watch?v=cP-_beFbz_Q&list=PLGsA9l-S7trVmUJ7HJsNSKIj0qoAO_qO8&index=3
// altered to follow mouse clicks rather than keyboard
// animated movement from https://www.youtube.com/watch?v=GKre-3pBQac&list=PLGsA9l-S7trVmUJ7HJsNSKIj0qoAO_qO8&index=8
// sprite animation with keyboard

let mouseX;
let playerX;
let playerSheet = {};
let speed = 3;

// to ensure text doesn't repeat
let questCreated = false;


window.addEventListener("click", moveSprite);


PIXI.Assets.load([
    "./img/spritewalk.png", 
    "./img/spritejump.png"
]).then(() =>
    {
        createPlayerSheet();
        createPlayer();
        app.ticker.add(gameLoop);
    }
);

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
}

function createPlayer() {
    player = new PIXI.AnimatedSprite(playerSheet.faceFront);
    player.anchor.set(0.5);
    player.animationSpeed = .15;
    player.loop = false;
    player.x = app.view.width / 2;
    player.y = app.view.height - 175;
    app.stage.addChild(player);
    player.play();
}


function moveSprite(e) {
    mouseX = e.clientX;
}

function gameLoop() {
    playerX = player.x
    
    // resizing to be smaller
    // https://github.com/kittykatattack/learningPixi#size-and-scale
    player.scale.x = 0.75;
    player.scale.y = 0.75;

    // if the sprite ends up in the range near mouse (considering speed)
    let stop = (playerX <= mouseX+speed) && (playerX >= mouseX-speed);

    // if (stop) {
    //     document.getElementById("debugging3").innerHTML = "stop";
    //     ticker.stop();
    // }
    if (stop && !questCreated) {
        player.textures = playerSheet.faceFront;
        if (playerX >= 1135 && playerX <= 1260) { // need to make this responsive
            createQuest();
            questCreated = true;
        }
    }

    if (mouseX != undefined && !stop && mouseX < playerX) {
        // if statement so the walk is animated
        if (!player.playing) {
            player.textures = playerSheet.walkLeft;
            player.play();
        }
        player.x -= speed;
        // if (stop) {
        //     document.getElementById("debugging3").innerHTML = "stop";
        //     player.textures = playerSheet.faceFront;
        // }
    };

    if (mouseX != undefined && !stop && mouseX > playerX) {
        if (!player.playing) {
            player.textures = playerSheet.walkRight;
            player.play();
        }
        player.x += speed;
        // if (stop) {
        //     document.getElementById("debugging3").innerHTML = "stop";
        //     player.textures = playerSheet.faceFront;
        // }
    };

    function createQuest() {        
        // first create the box
        let container = document.getElementById("questBox");
        container.style.backgroundColor = "white";
        container.style.border = "2px solid black";

        // now the header
        let header = document.createElement("h2");
        header.textContent = "New Quest!"
        container.appendChild(header);

        // and the text
        let text = document.createElement("p");
        text.textContent = 
            `Hey there! Seems you've stumbled upon a 
            mystical portal that will take you to Alice's projects.
            Do you wish to proceed?`

        container.appendChild(text);

        let yesBtn = document.createElement("button");
        yesBtn.innerHTML = "Accept!";
        yesBtn.onclick = function () {
            location.href = "./projects.html"
        }
        container.appendChild(yesBtn);

        let noBtn = document.createElement("button");
        noBtn.innerHTML = "Not now";
        noBtn.onclick = function () {
            container.remove();
            questCreated = false; // DEBUG
        }
        
        container.appendChild(noBtn);

    }
}