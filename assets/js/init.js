$(document).ready(function(){
  $("ul li").click(function() {
      $(this).toggleClass("active");
      $(this).siblings().removeClass("active");
  });
});

(function($){
  $(function(){

  $( "#send-complain" ).click(function() {
      var name = $("#user-name").val();
      var email = $('#user-email').val();
      var query = $('#query').val();
      $.ajax({
        type: 'POST',
        url: '/user/complain?',
        data: { 'name' : name, 'email' : email, 'query' : query },
        dataType: 'json',
        success: function(data) {
          if(data.status === 100) {
            var value = data.status;
            $('#error-msg').hide();
            $('#success-msg').show();
            $('#user-name').val(""); //setting values to null
            $('#user-email').val("");
            $('#query').val("");
          } else {
            var value = data.status;
            $('#error-msg').show();
            $('#success-msg').hide();// to hide any previous success messages
          }
        },
        error: function(data) {
          var value = data.status;
          $('#success-msg').hide();
          $('#error-msg').show();
        }
    });
});

$("#profile-settings").click(function(){
    $.get('/profile-settings', function (template) {
             $('#results123').html(template);
      });
})



  }); // end of document ready
})(jQuery); // end of jQuery name space
