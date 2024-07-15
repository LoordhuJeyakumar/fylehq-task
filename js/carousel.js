$(document).ready(function () {
  let carouselWidth, cardWidth, scrollPosition;
  const multipleCardCarousel = document.querySelector("#carousel-img");

  function updateCarouselSettings() {
    carouselWidth = $(".carousel-inner")[0].scrollWidth;
    cardWidth = $(".carousel-item").width();
    scrollPosition = 0;

    // Remove previous event handlers
    $("#carousel-img .carousel-control-next").off("click");
    $("#carousel-img .carousel-control-prev").off("click");

    // Reapply event handlers based on the new screen size
    if (window.matchMedia("(min-width: 768px)").matches) {
      // Remove default slide class for custom scroll behavior
      $(multipleCardCarousel).removeClass("slide");

      $("#carousel-img .carousel-control-next").on("click", function () {
        if (scrollPosition < carouselWidth - cardWidth * 4) {
          scrollPosition += cardWidth;
          $("#carousel-img .carousel-inner").animate(
            { scrollLeft: scrollPosition },
            600,
            function () {
              updateButtonStates(Math.floor(scrollPosition / cardWidth));
              updateControls();
            }
          );
        }
      });

      $("#carousel-img .carousel-control-prev").on("click", function () {
        if (scrollPosition > 0) {
          scrollPosition -= cardWidth;
          $("#carousel-img .carousel-inner").animate(
            { scrollLeft: scrollPosition },
            600,
            function () {
              updateButtonStates(Math.floor(scrollPosition / cardWidth));
              updateControls();
            }
          );
        }
      });

      // Initial update of controls and button states
      updateControls();
      updateButtonStates(Math.floor(scrollPosition / cardWidth));
    } else {
      // Add default slide class for small devices
      $(multipleCardCarousel).addClass("slide");

      // Reset scroll position and control states
      scrollPosition = 0;
      $("#carousel-img .carousel-inner").scrollLeft(scrollPosition);
      $(
        "#carousel-img .carousel-control-prev, #carousel-img .carousel-control-next"
      ).removeClass("disabled");

      // Reset button states
      $(".custom-buttons .btn").removeClass("active");
      $(".custom-buttons .btn img").attr("src", "../assets/icons/2.svg");
      $("#first-slide img").attr("src", "../assets/icons/1.svg");

      // Disable controls for first and last slide on small devices
      disableControlsOnSmallDevices();
    }
  }

  function updateControls() {
    if (window.matchMedia("(min-width: 768px)").matches) {
      if (scrollPosition <= 0) {
        $("#carousel-img .carousel-control-prev").addClass("disabled");
      } else {
        $("#carousel-img .carousel-control-prev").removeClass("disabled");
      }

      if (scrollPosition >= carouselWidth - cardWidth * 4) {
        $("#carousel-img .carousel-control-next").addClass("disabled");
      } else {
        $("#carousel-img .carousel-control-next").removeClass("disabled");
      }
    }
  }

  function updateButtonStates(activeIndex) {
    $(".custom-buttons .btn").removeClass("active");
    $(".custom-buttons .btn img").attr("src", "../assets/icons/2.svg"); // Inactive state

    if (activeIndex === 0) {
      $("#first-slide").addClass("active");
      $("#first-slide img").attr("src", "../assets/icons/1.svg");
    } else if (activeIndex === 1) {
      $("#middle-slide").addClass("active");
      $("#middle-slide img").attr("src", "../assets/icons/1.svg");
    } else if (activeIndex === 2) {
      $("#last-slide").addClass("active");
      $("#last-slide img").attr("src", "../assets/icons/1.svg");
    }
  }

  function initCustomButtons() {
    $("#first-slide").on("click", function () {
      scrollPosition = 0;
      $("#carousel-img .carousel-inner").animate(
        { scrollLeft: scrollPosition },
        600,
        function () {
          updateButtonStates(0);
        }
      );
      updateControls();
    });

    $("#middle-slide").on("click", function () {
      scrollPosition = Math.floor((carouselWidth - cardWidth * 4) / 2);
      $("#carousel-img .carousel-inner").animate(
        { scrollLeft: scrollPosition },
        600,
        function () {
          updateButtonStates(1);
        }
      );
      updateControls();
    });

    $("#last-slide").on("click", function () {
      scrollPosition = carouselWidth - cardWidth * 4;
      $("#carousel-img .carousel-inner").animate(
        { scrollLeft: scrollPosition },
        600,
        function () {
          updateButtonStates(2);
        }
      );
      updateControls();
    });
  }

  function initCardAnimations() {
    $("#carousel-img .carousel-inner .card").hover(
      function () {
        $(this).find(".card-body").stop().animate({ opacity: 1 }, 300);
      },
      function () {
        $(this).find(".card-body").stop().animate({ opacity: 0 }, 300);
      }
    );
  }

  function disableControlsOnSmallDevices() {
    $("#carousel-img").on("slide.bs.carousel", function (e) {
      const totalItems = $(".carousel-item").length;
      const currentIndex = $("div.active").index() + 1;

      if (currentIndex === 1) {
        $("#carousel-img .carousel-control-prev").addClass("disabled");
      } else {
        $("#carousel-img .carousel-control-prev").removeClass("disabled");
      }

      if (currentIndex === totalItems) {
        $("#carousel-img .carousel-control-next").addClass("disabled");
      } else {
        $("#carousel-img .carousel-control-next").removeClass("disabled");
      }
    });
  }

  // Initialize carousel settings
  updateCarouselSettings();

  // Initialize custom buttons and card animations
  initCustomButtons();
  initCardAnimations();

  // Update carousel settings on window resize
  $(window).resize(function () {
    updateCarouselSettings();
  });

  // Ensure the custom buttons change state when using the carousel's built-in controls
  $("#carousel-img").on("slide.bs.carousel", function () {
    updateControls();
    updateButtonStates(Math.floor(scrollPosition / cardWidth));
  });

  // Initial control state update for small devices
  disableControlsOnSmallDevices();
});
