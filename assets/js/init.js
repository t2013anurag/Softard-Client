$(document).ready(function(){
  $("ul li").click(function() {
      $(this).toggleClass("active");
      $(this).siblings().removeClass("active");
  });
});
