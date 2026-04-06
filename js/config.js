// Configuración del curso
const CONFIG = {
    courseName: "Intensivo 8 - Español Nivel C1",
    teacher: {
        name: "María Agustina García García",
        email: "agustinagg@yahoo.es"
    },
    startDate: new Date(2026, 3, 7), // 7 de abril de 2026
    endDate: new Date(2026, 3, 30),   // 30 de abril de 2026
    sessionDuration: 2, // horas
    totalSessions: 14,
    studentsCount: 10,
    examDate: new Date(2026, 3, 30), // 30 de abril - examen
    practiceDays: [1, 2, 3, 4], // Lunes, Martes, Miércoles, Jueves (no viernes)
    excludedDates: [
        new Date(2026, 3, 10), // Viernes Santo
        new Date(2026, 3, 13), // Lunes de Pascua
        new Date(2026, 3, 17), // Viernes después de Jueves Santo
        new Date(2026, 3, 24)  // Viernes antes del Puente
    ]
};

// Mapeo de días de la semana
const DAY_NAMES = {
    0: 'Domingo',
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado'
};

const MONTH_NAMES = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre'
};

// Formatear fecha
function formatDate(date) {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const dayOfWeek = DAY_NAMES[date.getDay()];
    return `${dayOfWeek}, ${day} de ${month} de ${year}`;
}

// Formatear fecha corta
function formatShortDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
}

// Verificar si es día de práctica
function isPracticeDay(date) {
    const dayOfWeek = date.getDay();
    return CONFIG.practiceDays.includes(dayOfWeek);
}

// Verificar si está excluido
function isExcludedDate(date) {
    return CONFIG.excludedDates.some(excludedDate =>
        excludedDate.getDate() === date.getDate() &&
        excludedDate.getMonth() === date.getMonth() &&
        excludedDate.getFullYear() === date.getFullYear()
    );
}

// Verificar si es fin de semana
function isWeekend(date) {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
}