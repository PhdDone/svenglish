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
    return $(window).scroll(function() {
      return $('.steps').each(function() {
        var stepsPos, topOfWindow;
        stepsPos = $(this).offset().top;
        topOfWindow = $(window).scrollTop();
        if (stepsPos < topOfWindow + 600) {
          console.log("steps is < topofwindow");
          return setTimeout((function() {
            $('.step1 ').addClass('scaleIn');
            return setTimeout((function() {
              $('.step2').addClass('scaleIn');
              return setTimeout((function() {
                $('.step3').addClass('scaleIn');
                return setTimeout((function() {
                  $('.circlenum.one').addClass('active');
                  $('.step1 .step').addClass('active');
                  return setTimeout((function() {
                    $('.circlenum.two').addClass('active');
                    return setTimeout((function() {
                      $('.circlenum.three').addClass('active');
                      return setTimeout((function() {
                        return $('.row.currently').addClass('scaleIn');
                      }), 500);
                    }), 450);
                  }), 400);
                }), 350);
              }), 250);
            }), 150);
          }), 50);
        }
      });
    });
  });

}).call(this);