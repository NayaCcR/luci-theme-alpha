(function () {
  "use strict";

  function init() {
    var toggler = document.querySelector(".toggler");
    var navbar = document.querySelector(".navbar");

    if (!toggler || !navbar)
      return;

    toggler.addEventListener("click", function () {
      navbar.classList.toggle("active");
    });

    var lastScrollY = window.pageYOffset || 0;
    window.addEventListener("scroll", function () {
      var currentScrollY = window.pageYOffset || 0;
      navbar.classList.toggle("navbar--hidden", lastScrollY < currentScrollY);
      lastScrollY = currentScrollY;
    });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else
    init();
})();
