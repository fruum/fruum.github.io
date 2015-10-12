$(document).ready(function() {
  var container = $('.explanation-window:first'),
      marker = $('.explanation-marker:first'),
      fruum = $('.explanation-fruum:first'),
      fruum_actions = $('.explanation-fruumactions:first'),
      fruum_items = $('.explanation-fruumitem'),
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

  //cursor moves to question mark
  function step1() {
    loggedin.css('opacity', 0);
    login.show();
    marker.removeClass('explanation-marker-clicked');
    fruum.removeClass('explanation-fruumopen');
    fruum_actions.hide();
    fruum_items.eq(1).hide();
    fruum_items.eq(2).hide();

    var question_pos = position(question);
    marker.animate({
      top: question_pos.top + question.height()/2 + 'px',
      left: question_pos.left + question.width()/2 + 'px'
    }, 2000, step2);
  }

  //fruum panel opens and user reads the content
  function step2() {
    click();
    fruum.addClass('explanation-fruumopen');

    //move marker inside fruum window
    var fruum_position = position(fruum),
        close_position = position(close);
    marker.animate({
      left: fruum_position.left + fruum.width() / 2 + 'px',
      top: fruum_position.top + 20 + 'px'
    }, 1500, function() {
      //scroll down marker
      marker.animate({
        top: fruum_position.top + fruum.height() * 0.75 + 'px'
      }, 2000, function() {
        //Go to X and close window
        marker.delay(800).animate({
          top: close_position.top + close.height() / 2 + 'px',
          left: close_position.left + close.width() / 2 + 'px'
        }, 1500, function() {
          click();
          fruum.removeClass('explanation-fruumopen');
          step3();
        });
      });
    });
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
      fruum_actions.show();
      fruum.addClass('explanation-fruumopen');
      step5();
    });
  }

  //add thread
  function step5() {
    click();
    var add_pos = position(add),
        fruum_pos = position(fruum);
    marker.animate({
      top: add_pos.top + add.height()/2 + 'px',
      left: add_pos.left + add.width()/2 + 'px'
    }, 2000, function() {
      click();
      //show first message
      fruum_items.eq(1).delay(200).show();
      marker.animate({
        top: fruum_pos.top + fruum.height()/2 + 'px',
        left: fruum_pos.left + fruum.width()/2 + 'px'
      }, 2000, function() {
        fruum_items.eq(2).delay(500).fadeIn(100);
        //start over
        setTimeout(step1, 2700);
      });
    });
  }

  setTimeout(step1, 2700);

});
