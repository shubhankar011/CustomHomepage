const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

const monthYearEl = document.getElementById('monthYear');
const daysGridEl = document.getElementById('daysGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function renderCalendar() {
    monthYearEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    daysGridEl.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty';
        daysGridEl.appendChild(emptyDay);
    }

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.textContent = day;

        const thisDate = new Date(currentYear, currentMonth, day);
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        if (thisDate.getTime() === todayDate.getTime()) {
            dayDiv.classList.add('today');
        } else if (thisDate < todayDate) {
            dayDiv.classList.add('past');
        } else {
            dayDiv.classList.add('future');
        }

        daysGridEl.appendChild(dayDiv);
    }
}

prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

renderCalendar();
