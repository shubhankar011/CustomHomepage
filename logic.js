<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const rootElement = document.documentElement;

    // 1. Define paths to your images
    const sunIcon = 'sun-icon.png';
    const moonIcon = 'moon-icon.png';

    // 2. Function to set theme AND update icon
    function setTheme(theme) {
        rootElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update the icon image based on the new theme
        if (themeIcon) {
            themeIcon.src = (theme === 'dark') ? moonIcon : sunIcon;
        }
    }

    // 3. Initial Load: Apply saved theme immediately
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // 4. Toggle on Click
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = rootElement.getAttribute('data-theme');
            const newTheme = (currentTheme === 'light') ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }
});
=======
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const rootElement = document.documentElement;

    const sunIcon = 'sun-icon.png';
    const moonIcon = 'moon-icon.png';

    function setTheme(theme) {
        rootElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        
        if (themeIcon) {
            themeIcon.src = (theme === 'dark') ? moonIcon : sunIcon;
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = rootElement.getAttribute('data-theme');
            const newTheme = (currentTheme === 'light') ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }
});
>>>>>>> master
