# acf-db
Consider this a "DLC" of sorts to Raynor Kuang's [QuizDB](https://www.quizdb.org/)! With Regionals 2021 approaching, I figured this could be of some use.

Rather than querying an API (which I don't know how to do) and generally working in the back-end, I chose to fetch all the questions from custom JSONs stored in a separate repo with the jQuery `$.getJSON` method. On page load, all 10,000+ questions are retrieved and stored in a global array.

### "Advantages" over QuizDB
- CB-DB eliminates the hassle of editing the search parameters on QuizDB. Never again will you need to filter "Easy" and "Regular College" and hand-pick every tournament you want to query before hitting Enter. 
- Given that everything is performed on the client-side with basic Javascript, searching for matches in the global `tossupArr` and printing to the HTML is nearly instantaneous. 
- To prevent server overload, QuizDB caps requests at 150 questions and only shows the first 15 results when the page loads. It might take a couple seconds, but CB-DB will spit out every single match, even if you search for the word "this".

### Smart Searching
Up your search game! Of course, you can investigate the frequency of stock clues (e.g. "copy principle"), but it might be more interesting to search for prompts ("these animals" or "from this country") or to search for answerlines and find clues in common.
