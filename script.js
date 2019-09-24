let hit = 0;
let miss = 0;
let timer = null;
const MAX = 7;
const MIN = 1;
let randNum = null;

function init()
{
    document.getElementById("hole1").innerHTML = '<img src="Images/hole.png" height="250px" width="250px" onClick="missMole">';
    document.getElementById("hole2").innerHTML = '<img src="Images/hole.png" height="250px" width="250px" onClick="missMole">';
    document.getElementById("hole3").innerHTML = '<img src="Images/hole.png" height="250px" width="250px" onClick="missMole">';
    document.getElementById("hole4").innerHTML = '<img src="Images/hole.png" height="250px" width="250px" onClick="missMole">';
    document.getElementById("hole5").innerHTML = '<img src="Images/hole.png" height="250px" width="250px" onClick="missMole">';
    document.getElementById("hole6").innerHTML = '<img src="Images/hole.png" height="250px" width="250px" onClick="missMole">';
}

function start()
{
    init();

    timer = 60;
    countdown = setInterval(ctr, 1000);
    document.getElementById("clickToStart").disabled = true;

    random();
}

function random() 
{
    randNum = Math.floor(Math.random() * (MAX - MIN) + MIN);

    document.getElementById(`hole${randNum}`).innerHTML = '<img src="Images/mole.png" height="250px" width="250px" onClick="hitMole">';
}

function hitMole() 
{
    random();
}

function missMole() 
{
    console.log("Miss");
}

function ctr() 
{
    document.getElementById("clock").innerHTML = timer;
    timer--;

    if (timer === -1)
    {
        document.getElementById("clock").innerHTML = 0;
        clearInterval(countdown);
        document.getElementById("clickToStart").disabled = false;
        init();
    }
}