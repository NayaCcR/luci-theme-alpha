(function () {
  "use strict";

  function onReady(callback) {
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", callback);
    else
      callback();
  }

  onReady(function () {
    var loading = document.querySelector(".main > .loading");
    var sidebar = document.querySelector(".main-left");
    var content = document.querySelector(".main-right");
    var mask = document.querySelector(".darkMask");
    var toggle = document.querySelector(".showSide");
    var mobile = window.innerWidth <= 1152;
    var sidebarOpen = !mobile;

    if (loading)
      loading.style.display = "none";

    if (!sidebar)
      return;

    function setSidebar(open) {
      mobile = window.innerWidth <= 1152;
      sidebarOpen = mobile ? open : true;

      if (mobile) {
        sidebar.style.transform = sidebarOpen ? "translateX(0)" : "translateX(-20rem)";
        sidebar.style.visibility = sidebarOpen ? "visible" : "hidden";
        if (mask) {
          mask.style.visibility = sidebarOpen ? "visible" : "hidden";
          mask.style.opacity = sidebarOpen ? "1" : "0";
        }
        if (content)
          content.style.width = "";
      } else {
        sidebar.style.transform = "";
        sidebar.style.visibility = "visible";
        if (mask) {
          mask.style.visibility = "";
          mask.style.opacity = "";
        }
        if (content)
          content.style.width = "";
      }
    }

    function closeExpandedMenus(except) {
      var expanded = document.querySelectorAll("#mainmenu li.slide.active");
      for (var i = 0; i < expanded.length; i++) {
        if (expanded[i] !== except) {
          expanded[i].classList.remove("active");
          var link = expanded[i].querySelector("a.menu");
          if (link)
            link.classList.remove("active");
        }
      }
    }

    var menuLinks = document.querySelectorAll("#mainmenu a.menu");
    for (var i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener("click", function (event) {
        var item = this.parentNode;
        var open = item.classList.contains("active");
        event.preventDefault();

        closeExpandedMenus(item);
        item.classList.toggle("active", !open);
        this.classList.toggle("active", !open);
      });
    }

    if (toggle) {
      toggle.addEventListener("click", function (event) {
        event.preventDefault();
        if (window.innerWidth <= 1152)
          setSidebar(!sidebarOpen);
      });
    }

    if (mask) {
      mask.addEventListener("click", function () {
        if (window.innerWidth <= 1152)
          setSidebar(false);
      });
    }

    window.addEventListener("resize", function () {
      setSidebar(window.innerWidth > 1152);
    });

    setSidebar(!mobile);
  });
})();
