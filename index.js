

const direction = {
    SPACE:  32,
    LEFT:   37,
    UP:     38,
    RIGHT:  39,
    DOWN:   40,
}

var pacman = {
    row:15,
    col:12,
}

var score = 0;
var keyCode;
var audio;
var numGhosts = 4;

const world = {
    BRICK:  0,
    COIN :  1,
    EMPTY : 2,
    GHOST : 3,
    PACMAN :4,
}

var mapWorld = [
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
    [0,2,2,2,1,1,1,0,0,2,0,3,3,3,3,0,0,2,0,0,1,1,1,2,2,2,0],
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
        document.getElementById('pacman-world').innerHTML += "<h1 id='score'> Your Score: " + score + "</h1><br><br>";

        document.getElementById('pacman-world').innerHTML += "<h1>Your life:</h1>";
        for(var i = 0; i < 3; i = i + 1){
            document.getElementById('pacman-world').innerHTML += "<div class='pacman-life'></div>";
        }
        document.getElementById('pacman-world').innerHTML += "<br>";
    }

    function createWorld(mapWorld){

        for (var i = 0; i < mapWorld.length; i = i + 1){
            for(var j = 0; j < mapWorld[i].length; j = j + 1){
                switch(mapWorld[i][j]){
                    case world.BRICK:
                    document.getElementById('pacman-world').innerHTML += "<div class='wall square'></div>";
                    break;
                    case world.COIN:
                    document.getElementById('pacman-world').innerHTML += "<div class='square'><div class='coin'</div></div>";
                    break;
                    case world.EMPTY:
                    document.getElementById('pacman-world').innerHTML += "<div class='square'></div>";
                    break;
                    case world.GHOST:
                    document.getElementById('pacman-world').innerHTML +="<div class='square'><div class='ghost'><div class='eyes'></div></div></div>";
                    break;
                    case world.PACMAN:
                    document.getElementById('pacman-world').innerHTML += "<div class='square'><div class='pacman-right'></div></div>";
                    break;
                }
                if((j+1)%mapWorld[i].length == 0){
                    document.getElementById('pacman-world').innerHTML += "<br>";
                }
            }
        }
        audio = Audio = new Audio("audio/chomp.wav");
        createGhostsIdentity();
        createInfoGamePlay();
    }


    function createGhostsIdentity(){
        var colorGhosts = ["#FF0000","#FFB8FF","#00FFFF","#FFB852"];
        for(var i = 0; i < numGhosts; i = i + 1){
            document.querySelectorAll(".ghost")[i].style.backgroundColor = colorGhosts[i];
        }
    }
    function updateScore(){
        score = score + 10;
        document.getElementById('score').innerHTML = "Your Score: " + score ;
    }

    function changePacmanDirection(direction){
        document.getElementById("pacman-world").getElementsByClassName('square')[pacman.row*27+pacman.col].innerHTML = "<div class='pacman-"+ direction +"'></div>";
    }

    function removePacmanCurrentLoc(){
        document.getElementById("pacman-world").getElementsByClassName('square')[pacman.row*27+pacman.col].innerHTML = "";
    }

    function changeCoinVisisbility(){
        document.getElementById("pacman-world").getElementsByClassName('square')[pacman.row*27+pacman.col].getElementsByClassName('coin')[0].style.visibility = "hidden";
    }


    function pacmanMove(keyCode){
        var target_col = 0;
        var target_row = 0;
        var validMove = true;
        var pacmanDirection;

        if(keyCode == direction.RIGHT && mapWorld[pacman.row][pacman.col + 1] != world.BRICK){
            target_col = pacman.col + 1;
            target_row = pacman.row;
            pacmanDirection = "right";

        }else if(keyCode == direction.LEFT && mapWorld[pacman.row][pacman.col - 1] != world.BRICK){
            target_col = pacman.col - 1;
            target_row = pacman.row;
            pacmanDirection = "left";

        }else if(keyCode == direction.UP && mapWorld[pacman.row - 1][pacman.col] != world.BRICK){
            target_row = pacman.row - 1;
            target_col = pacman.col;
            pacmanDirection = "up";

        }else if(keyCode == direction.DOWN && mapWorld[pacman.row + 1][pacman.col] != world.BRICK){
            target_row = pacman.row + 1;
            target_col = pacman.col;
            pacmanDirection = "down";

        }else
        validMove = false;

        if(validMove){
            if(mapWorld[target_row][target_col] == world.EMPTY){
                mapWorld[pacman.row][pacman.col] = world.EMPTY;
                removePacmanCurrentLoc();
                pacman.col = target_col;
                pacman.row = target_row;
                changePacmanDirection(pacmanDirection);
            }else{ // it's a coin
                mapWorld[pacman.row][pacman.col] = world.EMPTY;
                removePacmanCurrentLoc();
                pacman.col = target_col;
                pacman.row = target_row;
                changeCoinVisisbility();
                changePacmanDirection(pacmanDirection);
                updateScore();
                audio.play();
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
        setTimeout(gameLoop,300);
    }
    window.addEventListener("keydown", function(e) {
        if([direction.SPACE, direction.UP, direction.DOWN, direction.LEFT, direction.RIGHT].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    createWorld(mapWorld);
    gameLoop();
