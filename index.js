

const world= {
    BRICK: 0,
    COIN : 1,
    EMPTY_SQUARE : 2,
    GHOST : 3,
    PACMAN : 4,
}
const direction={
    SPACE:32,
    LEFT:37,
    UP: 38,
    RIGHT:39,
    DOWN:40,
}
var pacman ={
    row:15,
    col:12,
}
var score = 0;
var keyCode;

var mapWorld = [
    //0 1 2 3 4 5 6 7 8 9 10 .............................26
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0],
    [0,1,0,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [2,2,2,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,2,2,2],
    [2,2,2,0,1,0,1,0,0,2,2,2,2,2,2,2,2,2,0,0,1,0,1,0,2,2,2],
    [0,0,0,0,1,0,1,0,0,2,0,0,0,2,0,0,0,2,0,0,1,0,1,0,0,0,0],

    [0,2,2,2,1,1,1,0,0,2,0,0,3,3,3,0,0,2,0,0,1,1,1,2,2,2,0],
    [0,0,0,0,1,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,1,0,1,0,0,0,0],
    [0,1,1,1,1,1,0,0,0,2,2,2,2,2,2,2,2,2,0,0,1,0,1,1,1,1,0],
    [0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0],
    [0,1,1,1,0,1,1,1,1,1,1,2,4,2,1,1,1,1,1,1,1,0,1,0,1,1,0],
    [0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
    [0,1,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];


    function createInfoGamePlay(){
        document.getElementById('pacman-world').innerHTML += "<h1 id='score'> Your Score: " + score + "</h1><br>";

        document.getElementById('pacman-world').innerHTML += "<h1> Your life: </h1>";
        for(var i = 0; i < 3; i = i + 1){
            document.getElementById('pacman-world').innerHTML += "<div class='pacman'></div>";
        }
        document.getElementById('pacman-world').innerHTML += "<br>";
    }

function createWorld(mapWorld){
    document.getElementById('pacman-world').innerHTML = "";

    for (var i = 0; i < mapWorld.length; i = i + 1){
        for(var j = 0; j < mapWorld[i].length; j = j + 1){
            switch(mapWorld[i][j]){
                case world.BRICK:
                    document.getElementById('pacman-world').innerHTML += "<div class='wall target'></div>";
                break;
                case world.COIN:
                    document.getElementById('pacman-world').innerHTML += "<div class='square target'><div class='coin'</div></div>";
                break;
                case world.EMPTY_SQUARE:
                    document.getElementById('pacman-world').innerHTML += "<div class='square target'></div>";
                break;
                case world.GHOST:
                    document.getElementById('pacman-world').innerHTML +="<div class='ghost target'></div>";
                break;
                case world.PACMAN:
                    document.getElementById('pacman-world').innerHTML += "<div class='pacman target'></div>";
                break;
            }
            if((j+1)%mapWorld[i].length == 0){
                    document.getElementById('pacman-world').innerHTML += "<br>";
            }
        }
    }
    createInfoGamePlay();
}

function updateScore(){
    score = score + 10;
    document.getElementById('score').innerHTML = "Your Score: " + score ;
}

function addClass(className){
    document.getElementById("pacman-world").getElementsByClassName('target')[pacman.row*27+pacman.col].classList.add(className);
}

function removeClass(className){
    document.getElementById("pacman-world").getElementsByClassName('target')[pacman.row*27+pacman.col].classList.remove(className);
}

function changeCoinVisisbility(){
    document.getElementById("pacman-world").getElementsByClassName('target')[pacman.row*27+pacman.col].getElementsByClassName('coin')[0].style.visibility = "hidden";
}


function pacmanMove(keyCode){
    var target_col = 0;
    var target_row = 0;
    var validMove = true;

    if(keyCode == direction.RIGHT && mapWorld[pacman.row][pacman.col + 1] != world.BRICK){
        target_col = pacman.col + 1;
        target_row = pacman.row;

    }else if(keyCode == direction.LEFT && mapWorld[pacman.row][pacman.col - 1] != world.BRICK){
        target_col = pacman.col - 1;
        target_row = pacman.row;

    }else if(keyCode == direction.UP && mapWorld[pacman.row - 1][pacman.col] != world.BRICK){
        target_row = pacman.row - 1;
        target_col = pacman.col;

    }else if(keyCode == direction.DOWN && mapWorld[pacman.row + 1][pacman.col] != world.BRICK){
        target_row = pacman.row + 1;
        target_col = pacman.col;

    }else
        validMove = false;

    if(validMove){
        if(mapWorld[target_row][target_col] == world.EMPTY_SQUARE){
            mapWorld[pacman.row][pacman.col] = world.EMPTY_SQUARE;
            removeClass('pacman');
            addClass('square');
            pacman.col = target_col;
            pacman.row = target_row;
            addClass('pacman');

        }else{ // it's a coin
            mapWorld[pacman.row][pacman.col] = world.EMPTY_SQUARE;
            removeClass('pacman');
            pacman.col = target_col;
            pacman.row = target_row;
            changeCoinVisisbility();
            addClass('pacman');
            updateScore();
        }
        mapWorld[pacman.row][pacman.col] = world.PACMAN;
    }
}

window.addEventListener("keydown", function(e)  {
    if([direction.UP, direction.DOWN, direction.LEFT, direction.RIGHT].indexOf(e.keyCode) > -1)
        keyCode = e.keyCode;
});

function gameLoop(){
    pacmanMove(keyCode);
    setTimeout(gameLoop,400);
}
window.addEventListener("keydown", function(e) {
    if([direction.SPACE, direction.UP, direction.DOWN, direction.LEFT, direction.RIGHT].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


createWorld(mapWorld);

gameLoop();
