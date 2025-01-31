/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

addGamesToPage(GAMES_JSON);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {   
    
    // loop over each item in the data
    for(let i=0; i < games.length; i++) {
        // create a new div element, which will become the game card
        let game = document.createElement('div');
        // add the class game-card to the list
        game.classList.add("game-card");
        // set the inner HTML using a template literal to display some info 
        // about each game
        game.innerHTML = `
        <img style="width:300px; height:300px; border-radius: 10%;" src=${games[i].img}> <br><br>
        <b>${games[i].name}</b> <br><br>
        ${games[i].description} <br><br>
        Backers: ${games[i].backers} <br><br>   
        `;
        // append the game to the games-container
        let container = document.querySelector("#games-container");
        container.appendChild(game);
    }
    console.log(games.length);
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let ic = document.querySelector("#num-contributions");
let tr = document.querySelector("#total-raised");
let ng = document.querySelector("#num-games");
const contributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
}, 0);
console.log(contributions);

const pledged = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);
console.log(pledged);  

// set the inner HTML using a template literal and toLocaleString to get a number with commas
ic.innerHTML = `${contributions.toLocaleString(`en-US`)}`;
tr.innerHTML = `$${pledged.toLocaleString(`en-US`)}`;
ng.innerHTML = `${GAMES_JSON.length}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let gamesPendingGoals = GAMES_JSON.filter( (games) => {
        return games.pledged < games.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(gamesPendingGoals);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let gamesAchievedGoals = GAMES_JSON.filter( (games) => {
        return games.pledged > games.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(gamesAchievedGoals);
}

function popSelect()
{
    for(let i=0; i<GAMES_JSON.length;i++)
    {
        let option = document.createElement("option");
        option.value = GAMES_JSON[i].name;
        option.innerHTML = GAMES_JSON[i].name;
        document.querySelector("#select-game").appendChild(option);
    }
}
popSelect();

function specificGame() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let search = GAMES_JSON.filter( (games) => {
        return games.name == document.querySelector("#select-game").value;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(search);
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
document.querySelector("#unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.querySelector("#funded-btn").addEventListener("click", filterFundedOnly);
document.querySelector("#all-btn").addEventListener("click", showAllGames);
document.querySelector("#select-btn").addEventListener("click", specificGame);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const totalPledged = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);
let gamesPendingGoals = GAMES_JSON.filter( (games) => {
    return games.pledged < games.goal;
});
let totalUnderFunded = gamesPendingGoals.length;
let totalGames = GAMES_JSON.length;

// create a string that explains the number of unfunded games using the ternary operator
let descString = `
    A total of $${totalPledged.toLocaleString(`en-US`)} has been raised for 
    ${totalGames}. Currently, ${totalUnderFunded} ${totalGames > 1 ? "games" : "game"}
    remain unfunded. We need your help to fund these amazing games!
    `;

// create a new DOM element containing the template string and append it to the description container
let desc = document.createElement('p');
desc.innerHTML = descString;
let container = document.querySelector("#description-container");
container.appendChild(desc);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let games = GAMES_JSON;

let [first, second, ...others] = games;
let { name:nameF, description:descriptionF, pledge:pledgeF, goal:goalF, backers:backersF, img:imgF } = first;
let { name:nameS, description:descriptionS, pledge:pledgeS, goal:goalS, backers:backersS, img:imgS } = second;
console.log(first);
console.log(second);
// create a new element to hold the name of the top pledge game, then append it to the correct element
let topPledge = document.createElement("p");
topPledge.innerHTML = nameF;
document.querySelector("#first-game").appendChild(topPledge);

// do the same for the runner up item
let secondTopPledge = document.createElement("p");
secondTopPledge.innerHTML = nameS;

document.querySelector("#second-game").appendChild(secondTopPledge);
