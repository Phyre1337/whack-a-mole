// Whack-a-mole Project
// Christian Torres
// Date: 9/24/19
// Due: 10/1/19

const MAX = 7; // Defining minimum and maximum values for random number generator.
const MIN = 1;

let hit = 0; // Defining values for hits, misses, and total score to be displayed at the end.
let miss = 0;
let total = 0;

let timer = null; // Defining a timer value to use for clock.
let randNum = null; // Defining a random number and last number for random number generator.
let lastNum = null;
let molePick = null; // Defining a value for what mole you picked.

function init() // Defining a function to reset all values.
{
    hit = 0; // Resets all variables to what they were above.
    miss = 0;
    total = 0;
    timer = null;
    randNum = null;
    lastNum = null;
    molePick = null;

    // Sets all the holes to now be click-able to start tracking clicks.
    document.getElementById("hole1").innerHTML = `<img src="Images/hole.png" height="250px" width="250px" onClick="clickMole('miss')" draggable="false">`;
    document.getElementById("hole2").innerHTML = `<img src="Images/hole.png" height="250px" width="250px" onClick="clickMole('miss')" draggable="false">`;
    document.getElementById("hole3").innerHTML = `<img src="Images/hole.png" height="250px" width="250px" onClick="clickMole('miss')" draggable="false">`;
    document.getElementById("hole4").innerHTML = `<img src="Images/hole.png" height="250px" width="250px" onClick="clickMole('miss')" draggable="false">`;
    document.getElementById("hole5").innerHTML = `<img src="Images/hole.png" height="250px" width="250px" onClick="clickMole('miss')" draggable="false">`;
    document.getElementById("hole6").innerHTML = `<img src="Images/hole.png" height="250px" width="250px" onClick="clickMole('miss')" draggable="false">`;
}

function start() // Defining start function.
{

    document.getElementById("clock").innerHTML = ""; // Making sure the score and clock are cleared out from previous plays of the game.
    document.getElementById("score").innerHTML = "";

    init(); // Making sure all values are set to default.

    timer = 30; // Setting the timer value for how many seconds the game should last. 
    countdown = setInterval(ctr, 1000); // Starting timer to count-down the in=game clock.
    document.getElementById("clickToStart").disabled = true; // Disabling the start button until after you're done.

    moleGone = setInterval(moleDecay, 750); // Starts a timer for the mole dissapearing function.

    random(); // Calling the random function to choose a mole for a hole.
}

function random() // Defining the function to pick a random mole.
{
    if (molePick == null) // If statement to clear out the last hole with a mole in it.
    {
        console.log("First mole being selected.") // First mole hasn't been selected yet.
    }
    else
    {   // If there was a mole in a hole previously, clear it out.
        molePick.innerHTML = `<img src="Images/hole.png" height="250px" width="250px" onClick="clickMole('miss')" draggable="false">`; 
    }

    randNum = Math.floor(Math.random() * (MAX - MIN) + MIN); // Generating a random number to pick a mole for which hole.

    if (randNum === lastNum) // If the number it just chose was the same as the last, re-pick a number.
    {
        random(); // Starts random function over again.
    }
    else
    {   // Define the variable of which hole you picked.
        molePick = document.getElementById(`hole${randNum}`);
        // Putting a mole in that hole.
        molePick.innerHTML = `<img src="Images/mole.png" height="250px" width="250px" onClick="clickMole('hit')" draggable="false">`;
    }

    lastNum = randNum; // Setting the number selected to a variable to compare it with the next run of this function.
}

function clickMole(userInput) // Function to see whether the player hit or missed the mole.
{
    if (userInput === "hit") // If the player hit a mole...
    {
        clearInterval(moleGone); // Clears the mole dissapearing interval to reset the timer.
        moleGone = setInterval(moleDecay, 750); // Resets the timer back to .75 seconds.

        random(); // Call the random function to pick another mole.
        hit++; // Up the hit score by one.
    } 
    else if (userInput === "miss") // If the player misses the mole...
    {
        miss++; // Up the miss score by one.
    }
}

function moleDecay() // Makes a function to run every .75 seconds to make the mole move to a different hole if the player doesn't click.
{
    random(); // Runs random function again to choose another mole.
}

function ctr() // Defining a function for the in-game timer.
{
    document.getElementById("clock").innerHTML = timer; // Setting the clock display to be the timer.
    timer--; // COunt down by one second.

    if (timer === -1) // Once the timer reaches zero, do these things...
    {
        document.getElementById("clock").innerHTML = 0; // Set it to be zero.

        clearInterval(countdown); // Clear the timer interval.
        clearInterval(moleGone); // Clear the mole dissapearing interval.

        document.getElementById("clickToStart").disabled = false; // Make the start button click-able again.

        total = hit + miss; // Add the number of hits and misses together to get the total score.

        // Display score and ending message.
        document.getElementById("score").innerHTML = `Your final score was ${hit}/${total} moles hit. Click Start to play again.`

        init(); // Calls init function to reset everything.
    }
}
