// Simple dark mode toggle without webpack
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('[data-theme-switch]');

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.dataset.theme;
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.dataset.theme = newTheme;
            localStorage.setItem('theme', newTheme);
        });
    }
});