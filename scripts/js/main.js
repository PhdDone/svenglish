(function() {
  $(document).ready(function() {
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();
    $('a[href*=#]:not([href=#])').click(function() {
      var target;
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        target = $(this.hash);
        target = target.length ? target : $('[name=\' + this.hash.slice(1) + \']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 60
          }, 500);
          return false;
        }
      }
    });
    $('.choice-description.semap').addClass('active');
    $('.choice-title.semap').addClass('active');
    $('.image-container.semap').addClass('active');
    $('.choice').click(function() {
      $('.choice-description').toggleClass('active');
      $('.choice-title').toggleClass('active');
      return $('.image-container').toggleClass('active');
    });
    return $(window).scroll(function() {});
  });

}).call(this);