// 祝日データ（必要に応じて追加）
const holidays = {
    '2025-01-01': '元日',
    '2025-01-13': '成人の日',
    // 他の祝日をここに追加
};

// カレンダーを生成する関数
function generateCalendar(year, month) {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; // 既存のカレンダーをリセット

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // 曜日のヘッダーを追加
    daysOfWeek.forEach((day, index) => {
        const header = document.createElement('div');
        header.className = 'calendar-day header';
        if (index === 0) header.classList.add('sunday'); // 日曜日
        if (index === 6) header.classList.add('saturday'); // 土曜日
        header.textContent = day;
        calendar.appendChild(header);
    });

    const firstDay = new Date(year, month, 1).getDay(); // 月の最初の日の曜日
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 月の日数
    const lastDay = new Date(year, month, daysInMonth).getDay(); // 月の最後の日の曜日

    const today = new Date(); // 今日の日付
    const isTodayInCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    // 空白セルを追加（先頭の曜日に合わせる）
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day';
        calendar.appendChild(emptyCell);
    }

    // 各日付のセルを追加
    for (let day = 1; day <= daysInMonth; day++) {
        const dateCell = document.createElement('div');
        const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dateCell.className = 'calendar-day';

        // 土曜日
        if (new Date(year, month, day).getDay() === 6) {
            dateCell.classList.add('saturday');
        }

        // 日曜日
        if (new Date(year, month, day).getDay() === 0) {
            dateCell.classList.add('sunday');
        }

        // 祝日
        if (holidays[date]) {
            dateCell.classList.add('holiday');
            dateCell.title = holidays[date]; // ホバー時に祝日名を表示
        }

        // 今日の日付
        if (isTodayInCurrentMonth && day === today.getDate()) {
            dateCell.classList.add('today');
        }

        dateCell.textContent = day;
        calendar.appendChild(dateCell);
    }

    // 空白セルを追加（末尾の曜日に合わせる）
    for (let i = lastDay + 1; i < 7; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day';
        calendar.appendChild(emptyCell);
    }
}

// 初期表示用の現在の年月
const now = new Date();
generateCalendar(now.getFullYear(), now.getMonth());

// 月を変更する関数
function changeMonth(offset) {
    const currentYear = parseInt(document.getElementById('year').textContent, 10);
    const currentMonth = parseInt(document.getElementById('month').textContent, 10) - 1;

    let newMonth = currentMonth + offset;
    let newYear = currentYear;

    if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
    } else if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
    }

    document.getElementById('year').textContent = newYear;
    document.getElementById('month').textContent = newMonth + 1;

    generateCalendar(newYear, newMonth);
}
