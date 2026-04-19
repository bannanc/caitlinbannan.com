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

    // Drawer (mobile nav)
    const speedOpen = 50;
    const speedClose = 350;
    const activeClass = 'is-active';
    const visibleClass = 'is-visible';
    const selectorTarget = '[data-drawer-target]';
    const selectorTrigger = '[data-drawer-trigger]';
    const selectorClose = '[data-drawer-close]';

    const openDrawer = (trigger) => {
        const target = document.getElementById(trigger.getAttribute('aria-controls'));
        target.classList.add(activeClass);
        document.documentElement.style.overflow = 'hidden';
        trigger.setAttribute('aria-expanded', 'true');
        setTimeout(() => {
            target.classList.add(visibleClass);
        }, speedOpen);
    };

    const closeDrawer = (element) => {
        const closestParent = element.closest(selectorTarget);
        if (!closestParent) return;
        const trigger = document.querySelector('[aria-controls="' + closestParent.id + '"]');
        closestParent.classList.remove(visibleClass);
        document.documentElement.style.overflow = '';
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
        setTimeout(() => {
            closestParent.classList.remove(activeClass);
        }, speedClose);
    };

    document.addEventListener('click', (event) => {
        const open = event.target.closest(selectorTrigger);
        const close = event.target.closest(selectorClose);
        if (open) { openDrawer(open); event.preventDefault(); }
        if (close) { closeDrawer(close); event.preventDefault(); }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            document.querySelectorAll(selectorTarget).forEach((drawer) => {
                if (drawer.classList.contains(activeClass)) closeDrawer(drawer);
            });
        }
    });
});