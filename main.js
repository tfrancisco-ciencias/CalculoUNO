$(document).ready(function() {
  $("button.respButton").click(function() {
       $(this).next("div.resp").toggle();
  });
  $("button.respButton").click(function() {
       $(this).next("div.resp-box").toggle();
  });

});

  function myFunction() {
  var element = document.querySelectorAll("div.info-box");
  document.body.classList.toggle("fondo-body-dark");
  var i;
  for (i=0; i < element.length; i++ ){
  element[i].classList.toggle("info-box-dark");
    };
  };
