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

$( "#user-settings" ).on( 'click', "#send-complain" ,function() {
    var name = $('#user-name').val();
    var email = $('#user-email').val();
    var mobile = $('#user-mobile').val();
    var website = $('#user-website').val();
    var profession = $('#user-profession').val();
    var about = $('#user-about').val();
    about = about.replace(/ /g,'-');
    profession = profession.replace(/ /g,'-');
    name = name.replace(/ /g,'-');
    if(!name) name = null;
    if(!email) email = null;
    if(!mobile) mobile = null;
    if(!website) website = null;
    if(!profession) profession = null;
    if(!about) about = null;
    $.ajax({
      type: 'POST',
      url: '/user/update?',
      data: { 'name' : name, 'email' : email, 'about' : about, 'website' : website, 'profession' : profession, 'mobile' : mobile },
      dataType: 'json',
      success: function(data) {
        if(data.status === 100) {
          var value = data.status;
          var user = data.user;
          var about1 = user.about;
          $('#error-msg').hide();
          $('#success-msg').show();
        } else {
          $('#error-msg').show();
          $('#success-msg').hide();// to hide any previous success messages
        }
      },
      error: function(data) {
        $('#success-msg').hide();
        $('#error-msg').show();
      }
  });
});



$("#profile-settings").click(function(){
    $.get('/profile-settings', function (template) {
             $('#user-settings').html(template);
      });
})



  }); // end of document ready
})(jQuery); // end of jQuery name space
