$(document).ready(function() {
  var container = $('.explanation-window:first'),
      marker = $('.explanation-marker:first'),
      fruum = $('.explanation-fruum:first'),
      fruum_actions = $('.explanation-fruumactions:first'),
      fruum_comments = $('.js-comment'),
      question = $('.explanation-fruumdot:first'),
      login = $('.explanation-login:first'),
      add = $('.explanation-add:first'),
      close = $('.explanation-fruumclose'),
      loggedin = $('.explanation-loggedin:first');

  function position(el) {
    var el_offset = el.offset(),
        container_offset = container.offset();
    return {
      left: el_offset.left - container_offset.left,
      top: el_offset.top - container_offset.top
    }
  }

  function click() {
    marker.addClass('explanation-marker-clicked').delay(800);
    setTimeout(function() {
      marker.removeClass('explanation-marker-clicked');
    }, 800);
  }

  function open_panel(done) {
    var width = $(window).width()<1024?'99%':'30%';
    fruum.animate({
      width: width
    }, 1000, done);
  }

  function close_panel(done) {
    fruum.animate({
      width: '0%'
    }, 1000, done);
  }

  //cursor moves to question mark
  function step1() {
    loggedin.css('opacity', 0);
    login.show();
    marker.removeClass('explanation-marker-clicked');
    fruum.stop(true,true).css('width', '0%');
    fruum_actions.hide();
    fruum_comments.hide()

    var question_pos = position(question);
    marker.animate({
      top: question_pos.top + question.height()/2 + 'px',
      left: question_pos.left + question.width()/2 + 'px'
    }, 2000, step2);
  }

  //fruum panel opens and user reads the content
  function step2() {
    click();
    open_panel(function() {
      //move marker inside fruum window
      var fruum_position = position(fruum);
      marker.animate({
        left: fruum_position.left + fruum.width() / 2 + 'px',
        top: fruum_position.top + 20 + 'px'
      }, 1500, function() {
        //scroll down marker
        marker.animate({
          top: fruum_position.top + fruum.height() / 2 + 'px'
        }, 2000, function() {
          var close_position = position(close);
          //Go to X and close window
          marker.delay(800).animate({
            top: close_position.top + close.height() / 2 + 'px',
            left: close_position.left + close.width() / 2 + 'px'
          }, 1500, function() {
            click();
            close_panel(step3);
          });
        });
      });
    })
  }

  //login
  function step3() {
    var login_position = position(login);
    //goto login
    marker.animate({
      top: login_position.top + login.height() /2 + 'px',
      left: login_position.left + login.width() /2 + 'px',
    }, 1500, function() {
      loggedin.css('opacity', 1);
      login.hide();
      step4();
    });
  }

  //enter forum
  function step4() {
    click();
    //go to question mark
    var question_pos = position(question);
    marker.animate({
      top: question_pos.top + question.height()/2 + 'px',
      left: question_pos.left + question.width()/2 + 'px'
    }, 2000, function() {
      click();
      open_panel(step5);
    });
  }

  //add thread
  function step5() {
    fruum_actions.fadeIn(100, function() {
      var add_pos = position(add);
      marker.animate({
        top: add_pos.top + add.height()/2 + 'px',
        left: add_pos.left + add.width()/2 + 'px'
      }, 2000, function() {
        click();
        var fruum_pos = position(fruum);
        //show first message
        fruum_comments.eq(0).delay(200).show();
        marker.animate({
          top: fruum_pos.top + fruum.height()/2 + 'px',
          left: fruum_pos.left + fruum.width()/2 + 'px'
        }, 2000, function() {
          fruum_comments.eq(1).delay(500).fadeIn(100);
          //start over
          setTimeout(function() {
            close_panel(function() {
              setTimeout(step1, 2000);
            });
          }, 3000);
        });
      });
    });
  }

  setTimeout(step1, 2700);

});
