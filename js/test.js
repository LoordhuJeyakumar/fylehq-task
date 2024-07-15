$(document).ready(function () {
  let multipleCardCarousel = document.querySelector("#carousel-img");

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

  if (window.matchMedia("(min-width: 768px)").matches) {
    let carouselWidth = $(".carousel-inner")[0].scrollWidth;
    let cardWidth = $(".carousel-item").width();
    let scrollPosition = 0;

    // Function to update the state of the controls
    function updateControls() {
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

    // Initial update of controls and button states
    updateControls();
    updateButtonStates(0);

    $("#carousel-img .carousel-control-next").on("click", function () {
      if (scrollPosition < carouselWidth - cardWidth * 4) {
        scrollPosition += cardWidth;
        $("#carousel-img .carousel-inner").animate(
          { scrollLeft: scrollPosition },
          600,
          function () {
            let activeIndex = Math.floor(scrollPosition / cardWidth);
            updateButtonStates(activeIndex);
          }
        );
        updateControls();
      }
    });

    $("#carousel-img .carousel-control-prev").on("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $("#carousel-img .carousel-inner").animate(
          { scrollLeft: scrollPosition },
          600,
          function () {
            let activeIndex = Math.floor(scrollPosition / cardWidth);
            updateButtonStates(activeIndex);
          }
        );
        updateControls();
      }
    });

    // Custom buttons click event
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
  } else {
    $(multipleCardCarousel).addClass("slide");
  }
});
