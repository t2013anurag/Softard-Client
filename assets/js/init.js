$(document).ready(function(){
  $("ul li").click(function() {
      $(this).toggleClass("active");
      $(this).siblings().removeClass("active");
  });
});

/* Creating dynamic post content*/
$(document).ready(function(){
	var i = $('input').size() + 1;
	$('#add').click(function() {
	//	$('<div><input type="text" class="field" name="dynamic[]" placeholder="hello " /></div>').fadeIn('slow').appendTo('.inputs');
    	$('<div><textarea  class="field" name="dynamic[]" placeholder="hello " ></textarea></div>').fadeIn('slow').appendTo('.inputs');
		i++;
	});
	$('#remove').click(function() {
	if(i > 1) {
		$('.field:last').remove();
		i--;
	}
	});
  $('#reset').click(function() {
	while(i > 2) {
		$('.field:last').remove();
		i--;
	}
	});
// here's our click function for when the forms submitted
	$('.submit').click(function(){
	var allsteps = [];
    $.each($('.field'), function() {
        var thisval = $(this).val();
        thisval = thisval.replace(/ /g,'-');
        allsteps.push(thisval);
    });
    if(allsteps.length == 0) {
        allsteps = "none";
    }
	//alert(allsteps);
  var title = $("#post-title").val();
  var shortdesc = $("#post-short").val();
  var tags = $("#post-tags").val();
  tags = tags.replace(/ /g, '');
  var platform = $('#sel1').val();
  shortdesc = shortdesc.replace(/ /g,'-');
  title = title.replace(/ /g,'-');
  var tagsarr = [];
  tagsarr = tags.split(",");
  $.ajax({
    type: 'POST',
    url: '/post/create?',
    data: { 'title' : title, 'shortdesc' : shortdesc, 'tags' : tagsarr, 'platform' : platform, 'allsteps' : allsteps },
    dataType: 'json',
    success: function(data) {
      if(data.status === 800) {
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
  })

	return false;
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
});




  }); // end of document ready
})(jQuery); // end of jQuery name space
