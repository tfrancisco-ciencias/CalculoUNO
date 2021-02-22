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
  document.body.classList.remove("fondo");
  document.body.classList.add("fondo-dark");
  var i;
  for (i=0; i < element.length; i++ ){
  element[i].classList.remove("info-box");
  element[i].classList.add("info-box-dark");
    };
  };


    function myFunctionL() {
    var element = document.querySelectorAll("div.info-box-dark");
    document.body.classList.remove("fondo-dark");
    document.body.classList.add("fondo");
    var i;
    for (i=0; i < element.length; i++ ){
    element[i].classList.remove("info-box-dark");
    element[i].classList.add("info-box");
      };
    };
