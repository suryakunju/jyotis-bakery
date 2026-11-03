// Opens and closes the menu on small screens.
document.addEventListener('DOMContentLoaded', function () {
  var button = document.querySelector('.menu-button');
  var nav = document.getElementById('site-nav') || document.getElementById('nav-links');
  if (button && nav) {
    button.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Theme toggle button setup
  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    function getPreferredTheme() {
      var saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function updateToggleButton(theme) {
      if (theme === 'dark') {
        themeToggle.textContent = '☀️ Light';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
      } else {
        themeToggle.textContent = '🌙 Dark';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
      }
    }

    var currentTheme = getPreferredTheme();
    updateToggleButton(currentTheme);

    themeToggle.addEventListener('click', function () {
      var activeTheme = getPreferredTheme();
      var nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      updateToggleButton(nextTheme);
    });

    // Listen for system theme changes if user hasn't explicitly set a preference
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem('theme')) {
          var sysTheme = e.matches ? 'dark' : 'light';
          updateToggleButton(sysTheme);
        }
      });
    }
  }
});
