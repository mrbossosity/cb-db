let init = setTimeout(function() {
  $(".supreme-container").css("opacity", "1");
  $(".loader").css("opacity", "0");
  let clear = setTimeout(function() {
    $(".loader-container").hide()
  }, 2000)
}, 2000)