const today = new Date();
let month = 0;
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const monthYearEl = document.getElementById('monthYear');
let start = new Date(today.getFullYear(),0,1);
const daysGridEl = document.getElementById('daysGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const btn = document.getElementById('perc');
const toggle = document.getElementById('toggle-2');
const btn2 = toggle.querySelector('img');
const cales = document.querySelector('.cale-3');

function renderCalendar() {
    monthYearEl.innerHTML = `<p>${today.getDate()} ${monthNames[currentMonth]} ${currentYear}</p>`;
    let time = today.getTime() - start.getTime();
    const day1 = 1000*60*60*24;
    let days = new Date().getFullYear() % 4 == 0 ? 366 : 365;
    let spent = Math.floor(time/day1);
    let percent = (spent/days)*100;
    btn.textContent = `${Math.round(percent)} % of ${currentYear}`;

    daysGridEl.innerHTML = '';

    const firstDay = new Date(currentYear, month, 1).getDay();

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty';
        daysGridEl.appendChild(emptyDay);
    }

    // const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    for (let day = 0; day <= days; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        const date1= new Date(currentYear, 0, day + 1);
        dayDiv.title = date1.toDateString();
        dayDiv.textContent = day;

        const thisDate = new Date(currentYear, month, day);
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

if (toggle && cales && daysGridEl) {
    toggle.addEventListener('click', () => {
        cales.classList.toggle('active');
        if (btn2) btn2.classList.toggle('rotate-icon2');
        
    });
} else if (toggle && btn2 && cales) {
    toggle.addEventListener('click', () => {
        cales.classList.toggle('active');
        btn2.classList.toggle('rotate-icon2');
    });
}
// toggle.addEventListener('click',() => {
//     cales.classList.toggle('active');
//     btn2.classList.toggle('rotate-icon2');
//     daysGridEl.style.display = 'grid';
// });

// prevBtn.addEventListener('click', () => {
//     month--;
//     if (month < 0) {
//         month = 11;
//         currentYear--;
//     }
//     renderCalendar();
// });

// nextBtn.addEventListener('click', () => {
//     month++;
//     if (currentMonth > 11) {
//         month = 0;
//         currentYear++;
//     }
//     renderCalendar();
// });


renderCalendar();
