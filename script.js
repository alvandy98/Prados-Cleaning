document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const toggleIcon = document.querySelector(".toggle-icon");
  const toggleText = document.querySelector(".toggle-text");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navLinks = document.getElementById("navLinks");
  const dropdown = document.querySelector(".dropdown");
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownLinks = document.querySelectorAll(".dropdown-menu a");

  function setTheme(mode) {
    if (!themeToggle || !toggleIcon || !toggleText) return;

    if (mode === "dark") {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      toggleIcon.textContent = "☀";
      toggleText.textContent = "Light";
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      toggleIcon.textContent = "☾";
      toggleText.textContent = "Dark";
    }
  }

  setTheme(localStorage.getItem("theme") || "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isDark = document.body.classList.contains("dark-mode");
      setTheme(isDark ? "light" : "dark");
    });
  }

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
      mobileMenuToggle.textContent = navLinks.classList.contains("open") ? "×" : "☰";
    });
  }

  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      dropdown.classList.toggle("open");
    });
  }

  document.addEventListener("click", function (event) {
    if (dropdown && !dropdown.contains(event.target)) {
      dropdown.classList.remove("open");
    }
  });

  dropdownLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (dropdown) dropdown.classList.remove("open");
      if (navLinks) navLinks.classList.remove("open");
      if (mobileMenuToggle) mobileMenuToggle.textContent = "☰";
    });
  });

  const serviceSections = document.querySelectorAll(
    "#commercial, #construction, #residential-property"
  );

  if (serviceSections.length > 0) {
    window.addEventListener("scroll", function () {
      let currentSection = "";

      serviceSections.forEach(function (section) {
        const sectionTop = section.offsetTop - 140;

        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute("id");
        }
      });

      dropdownLinks.forEach(function (link) {
        link.classList.remove("active-section");

        if (currentSection && link.getAttribute("href").includes(currentSection)) {
          link.classList.add("active-section");
        }
      });
    });
  }
});
