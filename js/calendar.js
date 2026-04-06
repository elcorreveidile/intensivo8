// Funciones para el calendario y manejo de fechas

// Mostrar fecha actual
function showCurrentDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = today.toLocaleDateString('es-ES', options);
    return dateString.charAt(0).toUpperCase() + dateString.slice(1);
}

// Verificar si una fecha es hoy
function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

// Verificar si una fecha es pasada
function isPast(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
}

// Verificar si una fecha es futura
function isFuture(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate > today;
}

// Obtener estado de la sesión
function getSessionStatus(sessionDate) {
    if (isToday(sessionDate)) {
        return 'today';
    } else if (isPast(sessionDate)) {
        return 'completed';
    } else if (isFuture(sessionDate)) {
        return 'upcoming';
    }
    return 'upcoming';
}

// Obtener clase CSS para estado de sesión
function getSessionStatusClass(sessionDate) {
    const status = getSessionStatus(sessionDate);
    switch(status) {
        case 'today':
            return 'session-today';
        case 'completed':
            return 'session-completed';
        case 'upcoming':
            return 'session-upcoming';
        default:
            return '';
    }
}

// Generar HTML para sesión en calendario
function generateSessionCard(session) {
    const statusClass = getSessionStatusClass(session.date);
    const statusText = getSessionStatusText(session.date);

    return `
        <div class="session-card ${statusClass}" data-session-id="${session.id}">
            <div class="session-header">
                <div class="session-date">
                    <span class="day">${session.date.getDate()}</span>
                    <span class="month">${MONTH_NAMES[session.date.getMonth()].substring(0, 3)}</span>
                </div>
                <div class="session-info">
                    <h3>${session.title}</h3>
                    <p class="session-unit">Unidad: ${session.unit}</p>
                </div>
                <div class="session-status">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
            </div>
            <div class="session-body">
                <p class="session-description">${session.description}</p>
                <div class="session-topics">
                    <h4>Temas:</h4>
                    <ul>
                        ${session.topics.map(topic => `<li>${topic}</li>`).join('')}
                    </ul>
                </div>
                <div class="session-materials">
                    <h4>Materiales:</h4>
                    <ul>
                        ${session.materials.map(material => `<li>${material}</li>`).join('')}
                    </ul>
                </div>
                ${session.homework ? `
                    <div class="session-homework">
                        <h4>Tarea para casa:</h4>
                        <p>${session.homework}</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Obtener texto de estado
function getSessionStatusText(sessionDate) {
    const status = getSessionStatus(sessionDate);
    switch(status) {
        case 'today':
            return 'HOY';
        case 'completed':
            return 'Completada';
        case 'upcoming':
            return 'Próxima';
        default:
            return '';
    }
}

// Crear calendario visual del mes
function createMonthCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    let calendarHTML = `
        <div class="month-calendar">
            <h3>${MONTH_NAMES[month]} ${year}</h3>
            <div class="calendar-grid">
                <div class="calendar-header">
                    <div class="day-name">Dom</div>
                    <div class="day-name">Lun</div>
                    <div class="day-name">Mar</div>
                    <div class="day-name">Mié</div>
                    <div class="day-name">Jue</div>
                    <div class="day-name">Vie</div>
                    <div class="day-name">Sáb</div>
                </div>
                <div class="calendar-days">
    `;

    // Días vacíos antes del primer día del mes
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarHTML += '<div class="calendar-day empty"></div>';
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        const dayOfWeek = currentDate.getDay();
        const hasSession = SESSIONS.some(session =>
            session.date.getDate() === day &&
            session.date.getMonth() === month &&
            session.date.getFullYear() === year
        );

        const isToday = isToday(currentDate);
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isPracticeDay = CONFIG.practiceDays.includes(dayOfWeek) &&
                              !isExcludedDate(currentDate) &&
                              !isWeekend;

        let dayClass = 'calendar-day';
        if (isToday) dayClass += ' today';
        if (isWeekend) dayClass += ' weekend';
        if (hasSession) dayClass += ' has-session';
        if (isPracticeDay && !hasSession) dayClass += ' practice-day';

        const session = hasSession ?
            SESSIONS.find(session =>
                session.date.getDate() === day &&
                session.date.getMonth() === month &&
                session.date.getFullYear() === year
            ) : null;

        calendarHTML += `
            <div class="${dayClass}" ${session ? `data-session-id="${session.id}"` : ''}>
                <span class="day-number">${day}</span>
                ${session ? `<span class="session-indicator">S${session.id}</span>` : ''}
            </div>
        `;
    }

    calendarHTML += `
                </div>
            </div>
        </div>
    `;

    return calendarHTML;
}

// Crear calendario de abril 2026
function createAprilCalendar() {
    return createMonthCalendar(2026, 3);
}

// Mostrar información de próxima sesión
function showNextSessionInfo() {
    const nextSession = getNextSession();
    const container = document.getElementById('next-session-info');

    if (nextSession) {
        const today = isToday(nextSession.date);
        const timeText = today ? 'de hoy' : 'próxima';

        container.innerHTML = `
            <div class="session-number">Sesión ${nextSession.id}</div>
            <div class="session-date">${formatDate(nextSession.date)}</div>
            <div class="session-topic">${today ? '📅 HOY' : '⏭️ PRÓXIMA SESIÓN'}</div>
            <p>${nextSession.title}</p>
            <p>${nextSession.description}</p>
        `;
    } else {
        container.innerHTML = `
            <div class="session-number">🎓</div>
            <div class="session-date">Curso Finalizado</div>
            <div class="session-topic">¡Felicitaciones!</div>
            <p>Has completado todas las sesiones del curso.</p>
        `;
    }
}

// Inicializar calendario en página
function initializeCalendar() {
    const calendarContainer = document.getElementById('calendar-container');
    if (calendarContainer) {
        calendarContainer.innerHTML = createAprilCalendar();
        addCalendarEventListeners();
    }
}

// Añadir event listeners al calendario
function addCalendarEventListeners() {
    const calendarDays = document.querySelectorAll('.calendar-day.has-session');
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            const sessionId = this.getAttribute('data-session-id');
            if (sessionId) {
                showSessionDetails(sessionId);
            }
        });
    });
}

// Mostrar detalles de sesión
function showSessionDetails(sessionId) {
    const session = getSessionById(parseInt(sessionId));
    if (session) {
        const modal = document.getElementById('session-modal');
        const modalContent = document.getElementById('session-modal-content');

        if (modal && modalContent) {
            modalContent.innerHTML = generateSessionCard(session);
            modal.style.display = 'block';
        }
    }
}

// Cerrar modal de sesión
function closeSessionModal() {
    const modal = document.getElementById('session-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}