$(document).ready(function () {
  doThings.sliders.start();
  doThings.tools.start();
  doThings.header.start();

  // $('.js-where-metro-marker img').on('click', function(){
  //   $(this).closest('.js-where-metro-marker').addClass('show');
  // });
  // $('.js-where-metro-tooltip-close').unbind("click");
  // $('.js-where-metro-tooltip-close').on('hover', function(event){
  //   // $(this).unbind("click");
  //   $(this).closest('.js-where-metro-marker').removeClass('show');
  //   console.log('12412');
  // });
});

var doThings = {};

// //scroll-to-tab===============================================================
function scrollto(selector, margin) {
  var target = $(selector);
  var lineHeight = 100;
  var margin = margin;
  if (window.matchMedia("(max-width: 1023px)").matches) {
    lineHeight = 0;
    margin = 10;
  }
  if (!arguments[1]) {
    var margin = 20;
  }
  // console.log(arguments);
  $("html, body").animate(
    { scrollTop: target.offset().top - lineHeight - margin },
    500
  );
}

doThings.header = {
  start: function () {
    this.menu.start();
    this.swimHeader.start();
    this.dropBox.start();
    this.mobileCities.start();
  },
  //
  menu: {
    start: function () {
      $(".js-burger, .js-menu-close, .js-menu-overlay").click(function (e) {
        var target = $(e.currentTarget);
        var targetContainer = target
          .closest(".section-header")
          .find(".js-drop-menu");
        if (
          target.hasClass("js-burger") &&
          !targetContainer.hasClass("opened")
        ) {
          doThings.header.clickOnCloses(e);
        }
        $(".js-drop-menu, .js-burger").toggleClass("opened");
        $("body").toggleClass("no-scroll");
      });

      $('.mobile-menu [data-itemtoggle]').click( function () {
        $(this).closest('.menu-item').toggleClass('opened')
      })
    },
  },
  // Выпадающий блок из шапки
  dropBox: {
    start: function () {
      $(".js-drop-box, .js-dropbox-close, .js-dropbox-overlay").click(function (
        e
      ) {
        var target = $(e.currentTarget);
        var targetContainer = target.closest(".js-dropbox-container");
        if (
          target.hasClass("js-drop-box") &&
          !targetContainer.hasClass("opened")
        ) {
          doThings.header.clickOnCloses(e);
        }
        var container = $(this).closest(".js-dropbox-container");
        container.toggleClass("opened");
        container.find("input:first").focus();
        $("body").toggleClass("no-scroll");
      });
    },
  },
  // закрыть меню и всплывающие блоки
  clickOnCloses: function (obj) {
    $(".js-drop-menu, .js-burger").removeClass("opened");
    $(".js-dropbox-container").removeClass("opened");
    $("body").removeClass("no-scroll");
  },
  // Плавающее swim menu
  swimHeader: {
    status: false,
    start: function () {
      var swimLine = $(".js-swim-line");
      if (swimLine.length) {
        var swimLinePosition = swimLine.offset().top + swimLine.height();
      }

      function swim() {
        if (
          swimLinePosition - ($("body").scrollTop() || $("html").scrollTop()) <=
          0
        ) {
          swimLine.addClass("swim");
          doThings.header.swimHeader.status = true;
        } else {
          swimLine.removeClass("swim");
          doThings.header.swimHeader.status = false;
        }
      }
      swim();

      $(window).on("scroll", function () {
        swim();
      });
    },
  },
  mobileCities: {
    start: function () {
      $(".js-mobile-location-button").click(function () {
        $(this).closest(".js-mobile-location").toggleClass("opened");
      });
    },
  },
};

doThings.tools = {
  start: function () {
    this.particles.start();
    this.tabs.start();
    this.toggleSomething.start();
    this.mobileToggleBlock.start();
    this.expandBlock.start();
    this.maskedInput.start();
    this.showMetroMap.start();
    // this.clickOnCloses();
    // this.calcDetailTotalPrice();
    this.magnific.start();
    this.mobilePresentation();
    this.cookiesNotice();
    this.regularPopup.start();
    this.regularWow.start();
    // this.animateConceptBlock.start();
    this.datePicker.start();
    this.uploadFiles.start();
    this.uploadFiles.addFileinput();
  },
  // Такая штука крутится
  particles: {
    params: {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#D4DBE7",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#D4DBE7",
          },
          polygon: {
            nb_sides: 8,
          },
          image: {
            src: "",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 4.9,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#D4DBE7",
          opacity: 0.6493818846505367,
          width: 1.4430708547789706,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: false,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    },
    start: function () {
      if ($(".schmurch").length && typeof particlesJS === "function") {
        particlesJS("schmurch-left", this.params);
        particlesJS("schmurch-right", this.params);
        particlesJS("schmurch-single", this.params);
      }
    },
  },
  tabs: {
    start: function () {
      $(".js-tabs-buttons").on("click", ".tab:not(.active)", function () {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active")
          .closest(".js-tabs")
          .find("div.js-tabs-content")
          .removeClass("active")
          .eq($(this).index())
          .addClass("active");
      });
    },
  },
  toggleSomething: {
    start: function () {
      $("[data-toggle]").click(function () {
        toggleTarget = $(this).attr("data-toggle");
        $(this).toggleClass("active");
        $(toggleTarget).toggleClass("active");
      });
    },
  },
  mobileToggleBlock: {
    start: function () {
      $(".js-mobile-toggle").click(function () {
        $(this).toggleClass("opened");
      });
    },
  },
  expandBlock: {
    start: function () {
      $(".js-expand-button").click(function () {
        $(this).closest(".js-expand-wrapper").toggleClass("opened");
      });
    },
  },

  XFormatPrice: function (_number) {
    var decimal = 0;
    var separator = " ";
    var r = parseFloat(_number);
    var exp10 = Math.pow(10, decimal); // приводим к правильному множителю
    r = Math.round(r * exp10) / exp10; // округляем до необходимого числа знаков после запятой
    var rr = Number(r).toFixed(decimal).toString().split(".");
    var b = rr[0].replace(
      /(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,
      "$1" + separator
    );
    return b;
  },
  maskedInput: {
    start: function () {
      $(".masked-phone").mask("+7 (999) 999-99-99");
      // $('.input-time-masked').mask("99:99");
    },
  },
  showMetroMap: {
    initMetroMap: function () {
      setTimeout(function () {
        $("#image_metro").imgNotes({
          onReady: function () {
            this.import(default_notes);
          },
        });
      }, 300);
    },
    start: function () {
      var initMetroMap = this.initMetroMap;
      $(".js-where-head .tab:not(.js-metro-tab)").on("click", function () {
        if ($(".viewport").length) {
          $("#image_metro").imgNotes("destroy");
        }
      });
      $(".js-metro-tab").on("click", function () {
        if (!$(".viewport").length) {
          initMetroMap();
        }
      });
      $(".js-where-filter-button").on("click", function () {
        if ($(".viewport").length) {
          $("#image_metro").imgNotes("destroy");
        } else {
          initMetroMap();
        }
      });
    },
  },
  magnific: {
    params: {
      delegate: "a", // the selector for gallery item
      type: "image",
      closeMarkup:
        '<button title="%title%" type="button" class="mfp-close close-button icon-close close-icon">&#215;</button>',
      gallery: {
        enabled: true,
        tCounter: "%curr% из %total%",
      },
    },
    start: function () {
      var params = this.params;
      $(".js-item-open-gallery").each(function () {
        $(this).magnificPopup(params);
      });
      $('.js-magnific-inline').magnificPopup({type: "inline"})

      // youtube popup
      $(".popup-youtube").magnificPopup({
        // disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false,
      });
    },
  },
  mobilePresentation: function () {
    if ($(".mobile-presentation").length) {
      setTimeout(function () {
        $(".mobile-presentation").fadeOut();
      }, 7000);
    }
  },
  cookiesNotice: function () {
    if (!localStorage.getItem("cookiesNoticeDnkom")) {
      $(".js-cookies-notice").addClass("opened");
    }
    $(".js-cookies-notice button").click(function () {
      $(this).closest(".js-cookies-notice").toggleClass("opened");
      localStorage.setItem("cookiesNoticeDnkom", "true");
    });
  },
  regularPopup: {
    open: function () {
      $("[data-popup-id]").click(function () {
        var popupId = $(this).attr("data-popup-id");
        $(popupId).toggleClass("active");
        console.log(popupId);
      });
    },
    start: function () {
      this.open();
      $("[data-popup]").click(function () {
        $(this).closest(".regular-popup").toggleClass("active");
      });
    },
  },
  regularWow: {
    params: {
      // boxClass: "wow", // default class
      animateClass: "animate__animated", // animation css class (default is animated)
      offset: 100,
      mobile: true,
      live: true, // act on asynchronously loaded content (default is true)
      // callback: function (box) {

      // },
      scrollContainer: null, // optional scroll container selector, otherwise use window,
      resetAnimation: false, // reset animation on end (default is true)
    },
    start: function () {
      var params = this.params;
      if (window.matchMedia("(min-width: 1351px)").matches) {
        var wow = new WOW(params);
        wow.init();
      } else {
        $(".wow").removeClass("wow");
      }

    },
  },
  animateConceptBlock: {
    selector: '.franchise-section.franchise-concept', 
    start: function () {
      // для франшизы блок концепция
      var selector = this.selector
      var boxEl = $(selector)
      var boxPosition = boxEl.offset().top
      var boxHeight = boxEl.outerHeight()
      var boxBotoomPosition = boxPosition + boxHeight


      function calculateStatus() {
        var windowScrollTop = window.scrollY
        var windowScrollBottom = windowScrollTop + window.innerHeight
        return (boxPosition < windowScrollTop) && (boxBotoomPosition > windowScrollBottom)
      }
      function calculatePositionTop() {
        var windowScrollTop = window.scrollY
        var windowScrollBottom = windowScrollTop + window.innerHeight
        return (boxPosition > windowScrollTop && boxPosition < windowScrollBottom)
      }

      // sliding boxes
      var slides = $(selector).find('.slider-item')
      var slidesStep = boxHeight / slides.length
      function slidingElements (offset) {
        
        var windowScrollBottom = window.scrollY + window.innerHeight
        
        var stepPosition = (windowScrollBottom - boxPosition) + offset

        currentStep = parseInt(stepPosition / slidesStep) - 1 
        
        console.log(currentStep);

        slides.siblings().removeClass('active')
        slides.eq(currentStep).addClass('active')

      }

      function activateBox () {
        var boxActivated = calculateStatus()
        var topStatus = calculatePositionTop()

        if (boxActivated) {
          boxEl.addClass('active')
          var offsetSteps = boxHeight / 8
          slidingElements(offsetSteps)
        } else {
          boxEl.removeClass('active')
        }
        if (topStatus) {
          boxEl.addClass('top')
        } else {
          boxEl.removeClass('top')
        }
      }
      
      if (window.matchMedia("(min-width: 1351px)").matches) {
        document.body.addEventListener('wheel', activateBox);
      }


        // function scrollDown(event) {
        //   if (event.wheelDelta) {
        //     return event.wheelDelta < 0;
        //   }
        //   return event.deltaY > 0;
        // }
    }
  },
  datePicker: {
    params: {
      // range: true,
      // clearButton: true,
      inline: false,
      // onSelect: function(formattedDate, date, inst) {
      // },
    },
    start: function () {
      var datePicker = ".js-datepicker";
      var datePickerBirthdate = ".js-birthdate";
      $(datePicker).datepicker(this.params);
      $(datePickerBirthdate).datepicker({
        view: "years",
        startDate: new Date(
          new Date().setFullYear(new Date().getFullYear() - 30)
        ),
        maxDate: new Date(
          new Date().setFullYear(new Date().getFullYear() - 18)
        ),
      });

      $(datePicker + "," + datePickerBirthdate).each(function () {
        $(this)
          .siblings("button")
          .click(function () {
            $(this).siblings("input").focus();
          });
      });
    },
  },
  uploadFiles: {
    uploadlinesSelector: ".upload-lines",
    lineSelector: ".upload-lines .upload-line",
    addGroupButton: ".upload-lines [data-addgroup]",
    removeGroupButton: ".upload-lines [data-removegroup]",
    clonedGroupStatus: false,

    clonedUploadElementStatus: function (counter) {
      if (counter <= 1) {
        counter += 1
      }
      return counter;
    },
    //
    addFileinput: function () {
      var context = this;



      // add fileinput
      var clonedUploadElement = $(".upload-lines .upload-element")
        .first()
        .clone();
      $(".upload-lines .add-fileinput").click(function () {
        var uploadelements = $(this).siblings('.upload-element').length
        var uploadelementsLength = context.clonedUploadElementStatus(uploadelements)
        // console.log(uploadelementsLength);
        $(this).prev('.upload-element').find('input').click()

        if (uploadelementsLength > 1) {
          var element = clonedUploadElement.clone();
          var additionName = Math.random() + ""
          var fuckingInt = additionName.split('.')[1]
          var labelName = element.find('label').attr('for') + fuckingInt
          var inpitID = element.find('input').attr('id') + fuckingInt
          element.find('label').attr('for', labelName)
          element.find('input').attr('id', inpitID)
          $(this).before(element);
        }

        // removeUploadElement
        $('.upload-element .delete-button').click(function () {
          $(this).closest('.upload-element').remove()
        })

        context.fileinputPreview.start()

      });

    },
    //
    fileinputPreview: {
      imageValid: true,
      minFileSize: 10000,
      maxFileSize: 20000000,
      imageInvalid: function (obj) {
        obj.find('img').remove()
        obj.addClass('svg-icon')

      },
      start: function () {
        var data = this;
        $('.upload-element input').on('change', function (e) {
          $(this).closest('.upload-element').addClass('active')
          data.imageValid = true
          var fileType = e.target.files[0].type.split('/')[0];
          var photoBox = $(this).closest('.element-box')

          if (fileType !== "image") {
            data.imageInvalid(photoBox);
            data.imageValid = false
            anotherFileType = e.target.files[0].type


          }
          var fileSize = e.target.files[0].size;
          if ((fileSize < data.minFileSize) || (fileSize > data.maxFileSize)) {
            data.imageInvalid(photoBox);
            data.imageValid = false
          }

          if (data.imageValid) {
            var image = "<img src=" + URL.createObjectURL(e.target.files[0]) + ">";
            photoBox.removeClass('svg-icon').append(image);
          }
        });
      },
    },
    //
    start: function () {
      var context = this;
      var lineSelector = this.lineSelector;

      // add group
      var clonedGroupStatus = this.clonedGroupStatus;
      if (!clonedGroupStatus) {
        clonedGroup = $(this.lineSelector).first().clone();
        this.clonedGroupStatus = true;
      }
      var addButton = this.addGroupButton;
      $(addButton).click(function () {
        var cloned = clonedGroup.clone();
        $(lineSelector).last().after(cloned);
        context.start();
        context.addFileinput();
      });
      // remove group
      var removeButton = this.removeGroupButton;
      $(removeButton).click(function () {
        $(this).closest(lineSelector).remove();
      });
    },
  },
};

doThings.cart = {
  start: function () { },
  params: {
    cartCounterID: "#cartCount",
    cartIcons: function () {
      return (cartIcons = $(".js-icon-cart"));
    },
  },
  addToCartAnimation: function () {
    cartIcons = this.params.cartIcons();
    cartIcons.addClass("item-added");
    setTimeout(function () {
      cartIcons.removeClass("item-added");
    }, 500);
  },
  getCounter: function () {
    currentCountre = parseInt($(this.params.cartCounterID).text());
    // cartIcon.find('i').text(parseInt(currentCountre) + 1)
    return currentCountre;
  },
  setCounter: function (counter) {
    this.params.cartIcons().find("i").html(parseInt(counter));
    this.addToCartAnimation();
    this.changeState();
  },
  changeState: function () {
    var icon = $(".js-icon-cart");
    if (this.getCounter() <= 0) {
      icon.addClass("empty");
    } else {
      icon.removeClass("empty");
    }
  },
};

// Sliders Слайдеры ==========================================================
doThings.sliders = {
  start: function () {
    this.indexPageSlider.start();
    this.recommendSlider.start();
    this.speciaOffersSlider.start();
    this.whereMapSlider.start();
    this.equimentMobileSlider.start();
    // this.franchiseFeedbackSlider.start();
    this.franchiseSlider.start();
    this.feedbackSlider.start();
    this.franchiseMapSlider.start();
    this.regularSlider.start();
  },
  // Слайдер на главной
  indexPageSlider: {
    params: {
      arrows: true,
      slidesToShow: 1,
      dots: true,
      appendDots: "nav.dots",
    },
    start: function () {
      $(".main-slider").slick(this.params);
    },
  },
  recommendSlider: {
    params: {
      arrows: true,
      slidesToShow: 3,
      infinite: true,
      responsive: [
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    },
    start: function () {
      $(".js-recommend-slider").slick(this.params);
    },
  },
  speciaOffersSlider: {
    params: {
      arrows: true,
      slidesToShow: 3,
      infinite: true,
      autoplay: true, 
      autoplaySpeed: 5000, 
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    },
    start: function () {
      $(".js-offers-slider").slick(this.params);
    },
  },
  whereMapSlider: {
    params: {
      slidesToShow: 3,
      arrows: true,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 620,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    },

    start: function () {
      params = this.params;
      var counter = 0;
      $(".js-where-slider").slick(params);
      $(".js-on-map-tab").click(function () {
        // console.log(counter);
        if (counter <= 0) {
          $(".js-where-slider").slick("unslick");
          setTimeout(reinitSlick, 100);
          function reinitSlick() {
            $(".js-where-slider").slick(params);
            counter = counter + 1;
          }
        }
      });
    },
  },
  equimentMobileSlider: {
    params: {
      slidesToShow: 1,
      arrows: true,
    },
    start: function () {
      $(".js-equipment-slider").slick(this.params);
    },
  },
  franchiseFeedbackSlider: {
    params: {
      slidesToShow: 1,
      arrows: true,
      dots: true,
      infinite: false,
      responsive: [
        {
          breakpoint: 700,
          settings: {
            adaptiveHeight: true,
            slidesToShow: 1,
          },
        },
      ],
    },
    start: function () {
      $(".js-franchise-feedback-slider").slick(this.params);
      $(".js-expand-button").click(function () {
        var slider = $(this).closest(".js-franchise-feedback-slider");
        var currentSlide = slider.slick("slickCurrentSlide");
        // console.log(slider);
        setTimeout(function () {
          slider.slick("slickGoTo", currentSlide, false);
        }, 50);
      });
    },
  },
  franchiseSlider: {
    selector: '.js-franchise-slider',
    params: {
      slidesToShow: 1,
      arrows: true,
      dots: true,
      slide: '.slider-item',
      infinite: false,
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 700,
          settings: {
            adaptiveHeight: true,
            slidesToShow: 1,
          },
        },
      ],
    },
    start: function () {
      var selector = this.selector
      $(selector).on('init', function (event, slick) {
        $(selector).find('.slides-counter .total').text(Math.ceil(slick.slideCount / slick.options.slidesToScroll))
        // console.log(Math.ceil(slick.slideCount / slick.options.slidesToScroll));
      })

      $(selector).slick(this.params);

      $(selector).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $(selector).find('.slides-counter .current').text((nextSlide / slick.options.slidesToScroll) + 1)
        $(selector).find('.slides-counter .total').text(Math.ceil(slick.slideCount / slick.options.slidesToScroll))
        // console.log(slick.slideCount / slick.options.slidesToScroll)
      })
    },
  },
  franchiseMapSlider: {
    params: {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      // dots: true,
      infinite: false,

      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            adaptiveHeight: true,
          },
        },
      ],
    },
    start: function () {
      $(".js-franchise-map-slider").slick(this.params);
    },
  },
  feedbackSlider: {
    params: {
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: true,
      // dots: true,
      infinite: false,

      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true,
          },
        },
      ],
    },
    start: function () {
      $(".js-feedback-slider").slick(this.params);
    },
  },
  regularSlider: {
    params: {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
    },
    start: function () {
      var slider = ".js-regular-slider";
      var params = this.params;
      $(slider).slick(params);
      $(".js-reinit-regular-slider").click(function () {
        $(slider).slick("unslick");
        $(slider).slick(params);
      });
    },
  },
};
