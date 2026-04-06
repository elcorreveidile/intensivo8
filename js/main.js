// Funciones principales de inicialización

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Mostrar fecha actual
    showCurrentDateOnPage();

    // Mostrar información de próxima sesión
    showNextSessionInfo();

    // Inicializar calendario si existe el elemento
    if (document.getElementById('calendar-container')) {
        initializeCalendar();
    }

    // Inicializar reloj de sesión actual si existe
    if (document.getElementById('current-session-clock')) {
        updateCurrentSessionClock();
        setInterval(updateCurrentSessionClock, 60000); // Actualizar cada minuto
    }

    // Añadir event listeners globales
    addGlobalEventListeners();
}

// Mostrar fecha actual en la página
function showCurrentDateOnPage() {
    const dateElements = document.querySelectorAll('#current-date, .current-date');
    dateElements.forEach(element => {
        if (element) {
            element.textContent = showCurrentDate();
        }
    });
}

// Actualizar reloj de sesión actual
function updateCurrentSessionClock() {
    const clockElement = document.getElementById('current-session-clock');
    if (!clockElement) return;

    const currentSession = getCurrentSession();
    const nextSession = getNextSession();

    if (currentSession) {
        clockElement.innerHTML = `
            <div class="session-clock active">
                <div class="clock-icon">📅</div>
                <div class="clock-content">
                    <div class="clock-title">SESIÓN ACTUAL</div>
                    <div class="clock-session">Sesión ${currentSession.id}</div>
                    <div class="clock-time">HOY</div>
                </div>
            </div>
        `;
    } else if (nextSession) {
        const daysUntilSession = Math.ceil(
            (nextSession.date - new Date()) / (1000 * 60 * 60 * 24)
        );

        clockElement.innerHTML = `
            <div class="session-clock next">
                <div class="clock-icon">⏭️</div>
                <div class="clock-content">
                    <div class="clock-title">PRÓXIMA SESIÓN</div>
                    <div class="clock-session">Sesión ${nextSession.id}</div>
                    <div class="clock-time">${daysUntilSession > 0 ?
                        `en ${daysUntilSession} día${daysUntilSession !== 1 ? 's' : ''}` :
                        'mañana'}</div>
                    <div class="clock-date">${formatShortDate(nextSession.date)}</div>
                </div>
            </div>
        `;
    } else {
        clockElement.innerHTML = `
            <div class="session-clock completed">
                <div class="clock-icon">🎓</div>
                <div class="clock-content">
                    <div class="clock-title">CURSO FINALIZADO</div>
                    <div class="clock-session">¡Felicitaciones!</div>
                </div>
            </div>
        `;
    }
}

// Añadir event listeners globales
function addGlobalEventListeners() {
    // Cerrar modales con botón de cerrar
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeSessionModal);
    });

    // Cerrar modales haciendo clic fuera
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Navegación móvil
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scroll para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Función para crear notificaciones toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Animación de entrada
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Remover después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Función para confirmar acciones
function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

// Función para formatear texto
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Función para generar colores aleatorios para avatares
function generateAvatarColor(name) {
    const colors = [
        '#e67e22', '#3498db', '#27ae60', '#9b59b6',
        '#f39c12', '#1abc9c', '#34495e', '#e74c3c'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

// Función para validar email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Función para guardar datos en localStorage
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error saving to localStorage:', e);
        return false;
    }
}

// Función para cargar datos desde localStorage
function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error loading from localStorage:', e);
        return null;
    }
}

// Función para generar ID único
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Exportar funciones para uso global
window.appFunctions = {
    showToast,
    confirmAction,
    truncateText,
    generateAvatarColor,
    isValidEmail,
    saveToLocalStorage,
    loadFromLocalStorage,
    generateUniqueId,
    getCurrentSession,
    getNextSession,
    getSessionById,
    formatDate,
    formatShortDate
};