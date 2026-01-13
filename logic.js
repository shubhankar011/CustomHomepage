document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Light-Mode';
    }

    themeToggle.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        if (isDark) {
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
            clockElement.textContent = now.toLocaleTimeString([], {
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
            });
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    const addBtn = document.getElementById('add-card-btn');
    const container = document.querySelector('.card-container');

    const defaultLinks = [
        { name: "GitHub", url: "https://github.com" },
        { name: "YouTube", url: "https://www.youtube.com" },
        { name: "Gemini", url: "https://gemini.google.com" },
        { name: "YT Music", url: "https://music.youtube.com" },
        { name: "Notebook LM", url: "https://notebooklm.google.com" }
    ];

    let savedCards = JSON.parse(localStorage.getItem('myCustomLinks'));
    if (!savedCards || savedCards.length === 0) {
        savedCards = defaultLinks;
        localStorage.setItem('myCustomLinks', JSON.stringify(savedCards));
    }

    function createCard(name, url) {
        const wrapper = document.createElement('div');
        wrapper.className = 'card-wrapper';

        const newCard = document.createElement('a');
        newCard.href = url;
        newCard.className = 'card ubuntu-regular';
        newCard.target = "_blank";

        const icon = document.createElement('img');
        try {
            const domain = new URL(url).hostname;
            icon.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        } catch (e) {
            icon.src = 'https://www.google.com/s2/favicons?domain=google.com&sz=64';
        }
        icon.className = 'cimg';

        const span = document.createElement('span');
        span.textContent = name;
        span.className = 'cspan';

        const delBtn = document.createElement('button');
        delBtn.innerHTML = '&times;';
        delBtn.className = 'delete-btn';
        delBtn.onclick = (e) => {
            e.preventDefault();
            if (confirm(`Delete ${name}?`)) {
                wrapper.remove();
                savedCards = savedCards.filter(c => !(c.name === name && c.url === url));
                localStorage.setItem('myCustomLinks', JSON.stringify(savedCards));
            }
        };

        newCard.appendChild(icon);
        newCard.appendChild(span);
        wrapper.appendChild(newCard);
        wrapper.appendChild(delBtn);

        return wrapper;
    }

    savedCards.forEach(card => {
        const cardElement = createCard(card.name, card.url);
        container.insertBefore(cardElement, addBtn);
    });

    addBtn.addEventListener('click', () => {
        const siteName = prompt("Enter Website Name:");
        const siteUrl = prompt("Enter Website URL:");
        if (siteName && siteUrl) {
            const cardElement = createCard(siteName, siteUrl);
            container.insertBefore(cardElement, addBtn);
            savedCards.push({ name: siteName, url: siteUrl });
            localStorage.setItem('myCustomLinks', JSON.stringify(savedCards));
        }
    });

    function setDynamicBackground() {
        if (navigator.onLine) {
            const onlineImage = "https://picsum.photos/1920/1080";
            document.body.style.backgroundImage = `url('${onlineImage}?t=${new Date().getTime()}')`;
        }
        else{
            const offlineImage = "images/default-bg.jpg"
            document.body.style.backgroundImage = `url('${offlineImage}')`
        }
    }
    setDynamicBackground();
});