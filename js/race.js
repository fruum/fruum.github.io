$(document).ready(function() {
  var images = $('img');
  $(window).scroll(function() {
    var top = $(window).scrollTop(),
        win_height = $(window).height(),
        bottom = win_height + top,
        win_middle = top + win_height / 2;
    images.each(function() {
      var y = $(this).offset().top, height = $(this).height(), middle = y + height / 2;
      var opacity = 0, safe_region = win_height / 5;
      if (y > bottom || y + height < top) opacity = 0;
      else if (Math.abs(middle - win_middle) < safe_region) opacity = 1;
      else if (middle < win_middle - safe_region) {
        opacity = 1 - (win_middle - safe_region - middle) / (win_height * 0.5 - safe_region);
      }
      else {
        opacity = 1 - ((middle - win_middle - safe_region) / (win_height * 0.5 - safe_region));
      }
      opacity = opacity * opacity;
      $(this).css('opacity', opacity);
    });
  });
});
