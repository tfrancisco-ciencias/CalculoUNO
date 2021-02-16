$(document).ready(function() {
  $("button.respButton").click(function() {
       $(this).next("div.resp").toggle();
  });
  $("button.respButton").click(function() {
       $(this).next("div.resp-box").toggle();
  });
});
