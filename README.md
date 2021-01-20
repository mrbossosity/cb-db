# acf-db
Consider this a "DLC" of sorts to Raynor Kuang's [QuizDB](https://www.quizdb.org/). With Regionals 2021 approaching, I figured this could be of some use.

I retrieved every available ACF Falls and ACF Regionals tossup in two massive JSON exports through the QuizDB admin interface. Removing unnecessary properties (such as "created_at" and "errors") from each question object greatly reduced the size of the arrays. Rather than querying an API (which I don't know how to do) and generally working in the back-end, I chose to fetch all 8000+ questions with the jQuery `$.getJSON` method on page load and store them in a global array variable. The two JSONs total to 7.3 MB and load remarkably quickly.

### "Advantages" over QuizDB
- ACF-DB eliminates the hassle of editing the search parameters on QuizDB. Never again will you need to filter "Easy" and "Regular College" and hand-pick every ACF Fall and Regionals tournament before hitting Enter. 
- Given that everything is performed on the client-side with basic Javascript, searching for matches in the global `tossupArr` and printing to the HTML is nearly instantaneous. 
- To prevent server overload, QuizDB caps requests at 150 questions and only shows the first 15 results when the page loads. It might take a couple seconds, but ACF-DB will spit out every single match, even if you search for the word "this".

### Smart Searching
Up your search game! Of course, you can investigate the frequency of stock clues (e.g. "copy principle"), but it might be more interesting to search for prompts ("these animals" or "from this country") or to search for answerlines and find clues in common.
