function initializeSite() {
  'use strict';
  (function() {
    function centerInit() {
      var heroContent = $('.hero'),
        heroHeight = heroContent.height(),
        parentHeight = $(window).height(),
        heroTopMargin = (parentHeight - heroHeight) / 2;
      heroContent.css({'margin-top': heroTopMargin + 'px'});
    }
    $(document).ready(centerInit);
    $(window).resize(centerInit);
  })();
  $('#scene').parallax();
}
$(window).load(function() {
  initializeSite();
  (function() {
    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 0);
  })();
});
