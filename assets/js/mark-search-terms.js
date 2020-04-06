// set up for mark.js to do its thing
var markInstance = new Mark(document.querySelector("#wrapper"));

var options = {
    "element": "mark",
    "className": "",
    "exclude": [],
    "separateWordSearch": false, // mark phrases, not individual words
    "accuracy": "partially",
    "diacritics": true,
    "synonyms": {},
    "iframes": false,
    "iframesTimeout": 5000,
    "acrossElements": false,
    "caseSensitive": false,
    "ignoreJoiners": false,
    "ignorePunctuation": [],
    "wildcards": "disabled",
    "each": function(node){
        // node is the marked DOM element
    },
    "filter": function(textNode, foundTerm, totalCounter, counter){
        // textNode is the text node which contains the found term
        // foundTerm is the found search term
        // totalCounter is a counter indicating the total number of all marks
        //              at the time of the function call
        // counter is a counter indicating the number of marks for the found term
        return true; // must return either true or false
    },
    "noMatch": function(term){
        // term is the not found term
    },
    "done": function(counter){
        // counter is a counter indicating the total number of all marks
    },
    "debug": false,
    "log": window.console
};

if (searchTerm && document.body.getAttribute('class').indexOf('search-page') === -1) {
    markInstance.unmark().mark(searchTerm, options);

    var accordionSection = document.getElementById('content');

    // check for any markjs marks
    var searchTermsInSection = accordionSection.querySelectorAll('[data-markjs]');
    var numberOfSearchTermsInSection = searchTermsInSection.length;

    // add a summary before the first section
    var searchTerms = accordionSection.querySelectorAll('[data-markjs]');
    var numberOfSearchTerms = searchTerms.length;
    if (numberOfSearchTerms > 0) {
        // make the summary paragraph
        var searchResultsSummary = document.createElement('p');
        searchResultsSummary.classList.add('search-results-summary')
        if (numberOfSearchTerms == 1) {
            searchResultsSummary.innerHTML = numberOfSearchTerms + ' ' + 'result found for' + ' "<mark>' + searchTerm + '</mark>".';
        } else {
            searchResultsSummary.innerHTML = numberOfSearchTerms + ' ' + 'results found for' + ' "<mark>' + searchTerm + '</mark>".';
        }

        // add it after the main heading
        var mainHeading = document.querySelector('h1');
        var contentDiv =  document.querySelector('#content');

        contentDiv.insertBefore(searchResultsSummary, mainHeading.nextSibling);

        // add a link to the first result
        searchTerms[0].id = 'first-search-result';
        searchResultsSummary.innerHTML += ' <a href="#first-search-result">Jump to first</a>.';
    }
}
