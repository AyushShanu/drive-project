// theme-toggle.js

const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement; // Or document.body, depending on where you want to apply the 'dark' class
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Function to apply the saved theme or system preference
function applyTheme() {
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
    htmlElement.classList.add('dark');
    if (themeToggleDarkIcon && themeToggleLightIcon) {
      themeToggleDarkIcon.classList.remove('hidden');
      themeToggleLightIcon.classList.add('hidden');
    }
  } else {
    htmlElement.classList.remove('dark');
    if (themeToggleDarkIcon && themeToggleLightIcon) {
      themeToggleDarkIcon.classList.add('hidden');
      themeToggleLightIcon.classList.remove('hidden');
    }
  }
}

// Apply theme on initial load
applyTheme();

// Add event listener for the toggle button
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (themeToggleDarkIcon && themeToggleLightIcon) {
        themeToggleDarkIcon.classList.add('hidden');
        themeToggleLightIcon.classList.remove('hidden');
      }
    } else {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (themeToggleDarkIcon && themeToggleLightIcon) {
        themeToggleDarkIcon.classList.remove('hidden');
        themeToggleLightIcon.classList.add('hidden');
      }
    }
  });
}

// Optional: Listen for changes in system preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) { // Only apply if no explicit user choice
    if (e.matches) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }
});
