document.addEventListener('DOMContentLoaded', () => {
    async function trackVisits() {
        try {
            const namespace = "cleartab-project";
            const key = "total-opens";
            const response = await fetch(`https://api.countapi.net/hit/${namespace}/${key}`);
            const data = await response.json();
            console.log(`Global Opens: ${data.value}`);
        } catch (error) {
            console.error("CountAPI Error:", error);
        }
    }


    trackVisits();
    const nameDisplay = document.getElementById('user-name');
    const nameInput = document.getElementById('name-input');
    const greetingText = document.getElementById('greeting-text');

    function updateGreeting() {
        const hour = new Date().getHours();
        if (hour < 12 && hour > 4) greetingText.textContent = "Good Morning, ";
        else if (hour < 14 && hour > 12) greetingText.textContent = "Good Afternoon, ";
        else if (hour < 19 && hour > 14) greetingText.textContent = "Good Evening,"
        else greetingText.textContent = "Good Night, ";
    }

    const savedName = localStorage.getItem('userName') || 'Guest';
    nameDisplay.textContent = savedName;

    nameDisplay.addEventListener('click', () => {
        nameDisplay.style.display = 'none';
        nameInput.style.display = 'inline-block';
        nameInput.value = nameDisplay.textContent;
        nameInput.focus();
    });

    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const newName = nameInput.value;
            if (newName.trim() == "") {
                nameDisplay.textContent = "Guest";
            }
            else {
                nameDisplay.textContent = newName;
            }
            localStorage.setItem('userName', nameDisplay.textContent);
            nameDisplay.style.display = 'inline-block';
            nameInput.style.display = 'none';
        }
    });

    nameInput.addEventListener('blur', () => {
        nameDisplay.style.display = 'inline-block';
        nameInput.style.display = 'none';
    });

    updateGreeting();
    setInterval(updateGreeting, 60000);
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
        const timeElement = document.getElementById('time-display');
        if (timeElement) {
            const now = new Date();
            timeElement.textContent = now.toLocaleTimeString([], {
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
            });
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    const engines = [
        { name: 'Google', url: 'https://www.google.com/search', param: 'q', icon: 'images/google.png' },
        { name: 'YouTube', url: 'https://www.youtube.com/results', param: 'search_query', icon: 'images/youtube.webp' },
        { name: 'DuckDuckGo', url: 'https://duckduckgo.com/', param: 'q', icon: 'images/ddg.png' }
    ];

    let currentEngineIndex = 0;

    document.getElementById('engine-toggle').addEventListener('click', () => {
        currentEngineIndex = (currentEngineIndex + 1) % engines.length;
        const engine = engines[currentEngineIndex]
        const form = document.getElementById('engine');
        const input = document.getElementById('search-input');
        const icon = document.getElementById('current-engine-icon');

        form.action = engine.url;
        input.name = engine.param;
        input.placeholder = `Search ${engine.name}...`;
        icon.src = engine.icon;
    });

    const addBtn = document.getElementById('add-card-btn');
    const addBtnWrapper = addBtn.parentElement;
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
        container.insertBefore(cardElement, addBtnWrapper);
    });

    addBtn.addEventListener('click', () => {
        const siteName = prompt("Enter Website Name:");
        const siteUrl = prompt("Enter Website URL:");
        if (siteName && siteUrl) {
            const cardElement = createCard(siteName, siteUrl);
            container.insertBefore(cardElement, addBtnWrapper);
            savedCards.push({ name: siteName, url: siteUrl });
            localStorage.setItem('myCustomLinks', JSON.stringify(savedCards));
        }
    });

    function setDynamicBackground() {
        if (navigator.onLine) {
            const width = window.innerWidth < 600 ? 1080 : 1920;
            const height = window.innerHeight < 600 ? 1920 : 1080;
            const onlineImage = `https://picsum.photos/${width}/${height}`;
            document.body.style.backgroundImage = `url('${onlineImage}?t=${new Date().getTime()}')`
        }
        else {
            const offlineImage = "images/default-bg.jpg"
            document.body.style.backgroundImage = `url('${offlineImage}')`
        }
    }
    setDynamicBackground();

    const ddpBtn = document.getElementById('stretch');
    const ddpImg = ddpBtn.querySelector('img');
    const controlsRow = document.querySelector('.controls-row');

    if (ddpBtn) {
        ddpBtn.addEventListener('click', () => {
            controlsRow.classList.toggle('active');
            ddpImg.classList.toggle('rotate-icon');
        });
    }
});
