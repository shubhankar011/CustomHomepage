document.addEventListener('DOMContentLoaded', () => {

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Light-Mode';
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = 'Dark-Mode';
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = 'Light-Mode';
        }
    });

    function updateClock() {
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
            clockElement.textContent = timeString;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    const addBtn = document.getElementById('add-card-btn');
    const container = document.querySelector('.card-container');

    function createCard(name, url) {
        const newCard = document.createElement('a');
        newCard.href = url;
        newCard.className = 'card';
        newCard.target = "_blank";

        const icon = document.createElement('img');
        try {
            const domain = new URL(url).hostname;
            icon.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        } catch (e) {
            icon.src = 'https://www.google.com/s2/favicons?domain=google.com&sz=64'; // Fallback
        }
        icon.style.width = "32px";
        icon.style.marginBottom = "10px";

        const span = document.createElement('span');
        span.textContent = name;

        newCard.appendChild(icon);
        newCard.appendChild(span);
        
        return newCard;
    }

    const savedCards = JSON.parse(localStorage.getItem('myCustomLinks')) || [];
    savedCards.forEach(card => {
        const cardElement = createCard(card.name, card.url);
        container.insertBefore(cardElement, addBtn);
    });

    addBtn.addEventListener('click', () => {
        const siteName = prompt("Enter Website Name (e.g., GitHub):");
        const siteUrl = prompt("Enter Website URL (e.g., https://github.com):");

        if (siteName && siteUrl) {
            const cardElement = createCard(siteName, siteUrl);
            container.insertBefore(cardElement, addBtn);

            savedCards.push({ name: siteName, url: siteUrl });
            localStorage.setItem('myCustomLinks', JSON.stringify(savedCards));
        }
    });
});