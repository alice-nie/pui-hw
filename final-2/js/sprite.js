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
let speed = 5;

// to ensure text in questbox doesn't repeat, create boolean
let questCreated = false;

// sprite moves on click (laptop) or tap (mobile)
window.addEventListener("click", moveSprite);

// Calling all the functions to make the sprite
PIXI.Assets.load([
    "./img/spritewalk.png", 
]).then(() =>
    {
        createPlayerSheet();
        createPlayer();
        app.ticker.add(gameLoop);
    }
);

// Splicing up the sprite sheet for character frames
function createPlayerSheet() {
    let sheet = PIXI.BaseTexture.from("./img/spritewalk.png");
    let w = 1999/9;
    let h = 1334/4;

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

    // Walking frames
    let numFrames = 9;
    playerSheet["walkLeft"] = []
    playerSheet["walkRight"] = []
    for (let i = 0; i < numFrames; i++) {
        playerSheet["walkLeft"].push(new PIXI.Texture(sheet, new PIXI.Rectangle((numFrames - (i+1))*w, 1*h, w, h)));
        playerSheet["walkRight"].push(new PIXI.Texture(sheet, new PIXI.Rectangle(i*w, 0, w, h)));
    }
}

// Learned how to use media queries in JS
// https://www.w3schools.com/howto/howto_js_media_queries.asp
// Places the sprite
function createPlayer() {
    let winWidth = window.matchMedia("(max-width: 1250px)")

    player = new PIXI.AnimatedSprite(playerSheet.faceFront);
    player.anchor.set(0.5);
    player.animationSpeed = .15;
    player.loop = false;
    player.x = app.view.width / 2;
    if (winWidth.matches) {
        player.y = app.view.height / 2;
    } else{
        player.y = app.view.height / 1.75;
    }
    app.stage.addChild(player);
    player.play();
}

// Event handler
function moveSprite(e) {
    mouseX = e.clientX;
}

// Always running in background to update sprite movement
function gameLoop() {
    playerX = player.x
    
    // Resizing sprite to be smaller
    // https://github.com/kittykatattack/learningPixi#size-and-scale
    player.scale.x = 0.75;
    player.scale.y = 0.75;

    // If the sprite ends up in the range near mouse (considering speed)
    let stop = (playerX <= mouseX+speed) && (playerX >= mouseX-speed);

    // If on portal, create quest
    if (stop && !questCreated) {
        player.textures = playerSheet.faceFront;
        if (playerX >= (app.view.width*0.75) && playerX <= (app.view.width*0.83)) { // need to make this responsive
            createQuest();
            questCreated = true;
        }
    }

    // Creating walk animations based on where you click
    if (mouseX != undefined && !stop && mouseX < playerX) {
        if (!player.playing) {
            player.textures = playerSheet.walkLeft;
            player.play();
        }
        player.x -= speed;
    };

    if (mouseX != undefined && !stop && mouseX > playerX) {
        if (!player.playing) {
            player.textures = playerSheet.walkRight;
            player.play();
        }
        player.x += speed;
    };

    // Populating the quest box
    function createQuest() {        
        // Making box visible
        let container = document.getElementById("questBox");
        container.style.backgroundColor = "white";
        container.style.border = "2px solid black";

        // Populating header
        let header = document.createElement("h2");
        header.textContent = "New Quest!"
        container.appendChild(header);

        // Populating text
        let text = document.createElement("p");
        text.textContent = 
            `Hey there! Seems you've stumbled upon a 
            mystical portal that will take you to Alice's projects.
            Do you wish to proceed?`

        container.appendChild(text);

        // Creating buttons
        let btnContainer = document.createElement("div");
        btnContainer.setAttribute("id","btnContainer");
        container.appendChild(btnContainer)

        let noBtn = document.createElement("button");
        noBtn.innerHTML = "NOT NOW";
        noBtn.setAttribute("id", "noBtn");
        noBtn.onclick = function () {
            container.remove();
            questCreated = false; 
        }
        btnContainer.appendChild(noBtn);

        let yesBtn = document.createElement("button");
        yesBtn.setAttribute("id", "yesBtn");
        yesBtn.innerHTML = "ACCEPT";
        yesBtn.onclick = function () {
            location.href = "./work.html"
            questCreated = false;
        }
        btnContainer.appendChild(yesBtn);

    }
}