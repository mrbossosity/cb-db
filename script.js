var tossupArr = [];
$.getJSON("https://mrbossosity.github.io/college-bowl-collections/clean-acf-regionals-2006-2019.json", function(data) {
  tossupArr = [...data, ...tossupArr];
});

$.getJSON("https://mrbossosity.github.io/college-bowl-collections/clean-acf-fall-2008-2019.json", function(data) {
  tossupArr = [...tossupArr, ...data]
});

$.getJSON("https://mrbossosity.github.io/college-bowl-collections/clean-eft-2016-2019-and-terrapin-2011-2020.json", function(data) {
  tossupArr = [...tossupArr, ...data]
});

$.getJSON("https://mrbossosity.github.io/college-bowl-collections/clean-penn-bowl-2010-2018.json", function(data) {
  tossupArr = [...tossupArr, ...data]
});

function searchTossups(regex) {
  var qResults = [];
  var aResults = [];

  for (tossup of tossupArr) {
    let question = tossup.formatted_text;
    let answer = tossup.formatted_answer;
    
    if (regex.test(question)) {
      qResults.push(tossup)
    } 
    if (regex.test(answer)) {
      aResults.push(tossup)
    }
  }

  sortTournamentABC(qResults);
  sortTournamentABC(aResults);

  return [qResults, aResults]
}

function sortTournamentABC(arr) {
  arr.sort(function(a, b){
    var x = a.tournament;
    var y = b.tournament;
    if (x < y) {return 1;}
    if (x > y) {return -1;}
    return 0;
  });
}

function resultElement(result, regex) {
  let tournament = result.tournament,
      round = result.round,
      question, 
      answer; 

  try {
    question = decodeURIComponent(escape(result.formatted_text));
  } catch {
    question = result.formatted_text;
  }

  try {
    answer = decodeURIComponent(escape(result.formatted_answer));
  } catch {
    answer = result.formatted_answer;
  }

  highlightedQuestion = highlightMatches(question, regex);
  highlightedAnswer = highlightMatches(answer, regex);

  let element = `<div class="search-result"><div class="search-result-tournament"><strong>${tournament}</strong>&nbsp;&nbsp;||&nbsp;&nbsp;${round}</div><div class="search-result-question">${highlightedQuestion}</div><div class="search-result-answer">ANSWER: ${highlightedAnswer}</div></div>`;
  return element
}

function highlightMatches(str, regex) {
  return str.replace(regex, (match) => {
    return `<span class="highlighted">${match}</span>`
  })
}

function resetResults() {
  $("#question-results, #answer-results").html("");
  if ($(".results-container").is(":hidden")) {
    $(".results-container").show()
  };
  $("#search").blur();
  window.location.hash = ""
}

function run() {
  let search = $("#search").val();
  if (search.length < 3) {
    alert("You probably don't want to query that...\nLike, do you expect me to display every question in the DB?");
    return
  } 

  resetResults();

  let regex = new RegExp(`${search}`, 'ig');
  let results = searchTossups(regex), 
      qResults = results[0], 
      aResults = results[1];

  $("#question-results-length").text(`${qResults.length} tossups found`);
  $("#answer-results-length").text(`${aResults.length} tossups found`)

  qResults.forEach(result => {
    let element = resultElement(result, regex);
    $("#question-results").append(element)
  });
  aResults.forEach(result => {
    let element = resultElement(result, regex);
    $("#answer-results").append(element)
  })
}

$("#query").on("submit", () => {
  run()
})