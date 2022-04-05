const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


//Show me Quote
function newQuote() {
    loading();

    //Pick a random quote from apiQuotes array..
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Check if author field is blank and replace it with 'Unknown' ..
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    //Check Quote length to determine styling
    if (quote.text.length > 60) {
        quoteText.classList.add('long-quote');  //classList is used to style css classes of an element..
    } else {
        quoteText.classList.remove('long-quote');
    }

    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

//Get quotes from API..
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);  //If we do not assign async,await, fetch then the response will be set to value and it will provide error.
        apiQuotes = await response.json();
        console.log(apiQuotes);
        newQuote();
    } catch (error) {
        // Catch Error here
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    //${quoteText.textContent} - ${authorText.textContent}`,, We are going to use template string which allows us to pass in a variable and it will be converted into string and it will be pasted to twitter.com
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();

