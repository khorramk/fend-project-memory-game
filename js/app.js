/*
 * Create a list that holds all of your cards
 */
//selecting cards
const list = document.querySelectorAll('.card');
let cardsarray = [];
let openCards = [];
const move = document.querySelector('.moves');
const modal = document.getElementById('myModal');
const clock = document.querySelector(".clock");
let time, firstCard = [], timeStart;

let star = document.querySelectorAll(".fa-star").length;
//storing cards in array
const storeCards = function () {
    for (let i = 0; i < list.length; i++) {
        cardsarray.push(list[i]);
        removeClass(list[i]);
    }

    move.innerHTML = 0;
    clock.innerHTML = 0;
    clearCard();
    console.log("true");
};
const removeClass = function (openCard) {
    openCard.classList.remove("show");
    openCard.classList.remove("open");
    openCard.classList.remove("match");
}
//removing cards from html
const clearCard = function () {
    const myNode = document.querySelector(".deck");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    start();

    console.log(true);
};

//get array
//
const start = function () {
    const s = shufleArray();
    let cards = null;
    //looping through the array and adding html
    for (let i = 0; i < s.length; i++) {
        const deck = document.querySelector(".deck");
        //const card =  document.createElement(s[i]);
        deck.appendChild(s[i]);
    }

    touchCard();

    console.log("worked");
};

const timer = function () {



    let seconds = 0;
    clock.innerHTML = seconds;

    timeStart = setInterval(function () {
        seconds++
        clock.innerHTML = seconds;
        console.log(true);
    }, 1000);


    finished(timeStart);


};

const finished = function (time) {
    const cards = document.querySelectorAll(".open");
    const repeat = document.querySelector(".fa-repeat");
    const clock = document.querySelector(".clock");
    if (cards.length === 16) {
        return true;


    } else {
        return time;
    }

};
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//start shuffling
const shufleArray = function () {
    const x = shuffle(cardsarray);
    return x;

};

const touchCard = function () {
    const tDeck = document.querySelectorAll('.card');
    for (let i = 0; i < tDeck.length; i++) {
        eventTouch(tDeck[i]);
    }

};

const eventTouch = function (card) {
    card.addEventListener('click', clickFunc, false);
};

const clickFunc = function () {

    if (this.classList.contains("match") || (this.classList.contains("open") && this.classList.contains("show"))) {
        deleteListner(this);
    }
    else {
        this.classList.add('open');
        this.classList.add('show');
        startTime(this);
        listOpen(this);

        countMove(this);
        return false;
    }

};
const startTime = function (card) {
    firstCard.push(card);
    if (firstCard.length > 1) {

        return true;
    } else {
        timer();
        return false;
    }

}

const listOpen = function (Ocard) {
    openCards.push(Ocard);

    checkValue();
};

const checkValue = function () {
    if (openCards === null || openCards.length === 1) {
        console.log(true);

        return true;
    } // NOTE: Returning true for null is debatable, but I leave that to you.

    const compare = openCards[0]; // NOTE: Compare to the first element of the input array.

    // NOTE: Check from the second element through the end of the input array.
    for (let i = 1; i < openCards.length; i++) {
        if (openCards[i] != compare) {
            console.log(false);
            pairMatch();
            return false;
        }
    }


    return true;

};

const pairMatch = function () {

    for (let s = 0; s < openCards.length - 1; s++) {
        let pairValue = openCards[s].firstElementChild;

        for (let c = s + 1; c < openCards.length; c++) {
            const pairValue2 = openCards[c].firstElementChild;
            matchPair(pairValue2, pairValue);
        }
    }
};

const matchPair = function (item2, item1) {
    //checking wheather items has the current deck
    if (item1.classList.contains("fa-bolt") && item2.classList.contains("fa-bolt")) {
        removeTouch(item1, item2);
        return true;
    } else if (item1.classList.contains("fa-bicycle") && item2.classList.contains("fa-bicycle")) {
        removeTouch(item1, item2);
        return true;
    } else if (item1.classList.contains("fa-bomb") && item2.classList.contains("fa-bomb")) {
        removeTouch(item1, item2);
        return true;
    } else if (item1.classList.contains("fa-anchor") && item2.classList.contains("fa-anchor")) {
        removeTouch(item1, item2);
        return true;
    } else if (item1.classList.contains("fa-cube") && item2.classList.contains("fa-cube")) {
        removeTouch(item1, item2);
        return true;
    } else if (item1.classList.contains("fa-paper-plane") && item2.classList.contains("fa-paper-plane")) {

        removeTouch(item1, item2);
        return true;

    } else if (item1.classList.contains("fa-leaf") && item2.classList.contains("fa-leaf")) {
        removeTouch(item1, item2);
        return true;
    } else if (item1.classList.contains("fa-diamond") && item2.classList.contains("fa-diamond")) {
        removeTouch(item1, item2);
        return true;
    } else {
        clearShow(item1, item2);

        console.log('false');
        return false;
    }


};

const clearShow = function (cards, cards2) {
    const index1 = openCards.indexOf(cards);
    const index2 = openCards.indexOf(cards2);
    console.log(index1);
    if ((index1 >= -1)) {
        openCards.splice(index1, 1);
        openCards.splice(index2, 1);
        timingFunc(cards, cards2);
        console.log(true);
        return true;
        //hideCard(cards, cards2);

    } else {
        console.log(false);
        return false;
    }

    console.log('true');
};

const deleteListner = function (obj) {
    obj.removeEventListener('click', clickFunc, false);
    console.log(true);
};

const removeTouch = function (item, item2) {
    const pitem = item.parentNode;
    const pitem2 = item2.parentNode;
    const second = 0;
    pitem.classList.add('match');
    pitem2.classList.add('match');
    if (pitem.classList.contains("match") && pitem2.classList.contains("match")) {
        deleteListner(pitem);
        deleteListner(pitem2);
    }
    finalScore();
    console.log('true');
};


const countMove = function (card) {
    ///

    if (card.classList.contains("open") && card.classList.contains("show")) {
        card.removeEventListener('click', clickFunc, false);
        move.innerHTML++;
        getStars();
    }
};

function timingFunc(item1, item2) {
    const mainCard = item1.parentNode;
    const mainCard2 = item2.parentNode;
    setTimeout(function () {
        mainCard.classList.remove('show', 'open');
        mainCard2.classList.remove('show', 'open');
        touchCard();
        console.log("timing");
    }, 2000, item1, item2);
};

const restart = function () {
    const repeat = document.querySelector('.fa-repeat');
    const timeClock = document.querySelector(".clock");
    repeat.addEventListener('click', function () {
        window.location.reload(true);


    });
};

const finalScore = function () {
    const matchedCards = document.querySelectorAll('.match');
    clearInterval(timeStart);
    containsClass(matchedCards);
    console.log(true);
};

const containsClass = function (array) {
    // for(let i=16; i >= array.length; --i){
    if (array.length === 16) {
        display();

        console.log(true);

        return true;
    } else {
        touchCard()
    }


};

const display = function () {
    const btn = document.getElementById("myBtn");
    btn.addEventListener('click', function () {


        modal.style.display = "none";
        window.location.reload(true);
    });

    modal.style.display = "block";
    showRate(star);
    preventClick();
    return true;
};

const getStars = function () {
    const stars = document.querySelector(".fa-star");

    //const matchingCards = document.querySelectorAll(".match");
    for (let i = moves.innerHTML; i > 32; --star) {
        stars.remove();
        console.log("removed");


    }


};

const showRate = function (item) {
    const numOfMove = document.getElementById("moves");
    numOfMove.textContent = ` number of moves made ${move.innerHTML}`;
    const rate = document.getElementById("stars");
    const timeSecond = document.getElementById("seconds");
    timeSecond.innerHTML = `time completed by ${clock.innerHTML}`;
    rate.textContent = ` performance is ${item} stars`;
};

const preventClick = function () {
    for (let i = 0; i > list.length; i++) {
        deleteListner(list[i]);
        return true;
    }
};


window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


restart();
storeCards();