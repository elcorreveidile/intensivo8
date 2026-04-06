// Sistema de gestión de tareas

// Configuración
const TASK_CONFIG = {
    teacherEmail: 'agustinagg@yahoo.es',
    teacherName: 'María Agustina García García',
    courseName: 'Intensivo 8 - Español Nivel C1'
};

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    initializeTaskSystem();
    initializeTabs();
    populateSessionSelects();
    loadStudentTasks();
    loadTeacherDashboard();
    initializeTaskForm();
    initializeFilters();
});

// Inicializar sistema de tareas
function initializeTaskSystem() {
    // Crear estructura de almacenamiento si no existe
    if (!loadFromLocalStorage('tasks')) {
        saveToLocalStorage('tasks', []);
    }
}

// Inicializar pestañas
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.task-tab-btn');
    const tabContents = document.querySelectorAll('.task-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remover clase active de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Añadir clase active al clicado
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');

            // Actualizar vista según la pestaña
            if (tabId === 'student') {
                loadStudentTasks();
            } else if (tabId === 'teacher') {
                loadTeacherDashboard();
            }
        });
    });
}

// Poblar selects de sesiones
function populateSessionSelects() {
    const sessionSelect = document.getElementById('sessionSelect');
    const filterSession = document.getElementById('filterSession');

    if (sessionSelect) {
        SESSIONS.forEach(session => {
            const option = document.createElement('option');
            option.value = session.id;
            option.textContent = `Sesión ${session.id}: ${session.title}`;
            sessionSelect.appendChild(option);
        });
    }

    if (filterSession) {
        SESSIONS.forEach(session => {
            const option = document.createElement('option');
            option.value = session.id;
            option.textContent = `Sesión ${session.id}`;
            filterSession.appendChild(option);
        });
    }
}

// Inicializar formulario de tareas
function initializeTaskForm() {
    const form = document.getElementById('taskSubmissionForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitTask(form);
    });
}

// Enviar tarea
function submitTask(form) {
    const formData = new FormData(form);

    // Validar campos obligatorios
    const studentName = formData.get('studentName').trim();
    const studentEmail = formData.get('studentEmail').trim();
    const taskContent = formData.get('taskContent').trim();

    if (!studentName || !studentEmail || !taskContent) {
        showToast('Por favor, completa todos los campos obligatorios', 'error');
        return;
    }

    if (taskContent.length < 50) {
        showToast('El contenido de la tarea debe tener al menos 50 caracteres', 'warning');
        return;
    }

    if (!isValidEmail(studentEmail)) {
        showToast('Por favor, introduce un email válido', 'error');
        return;
    }

    // Crear objeto de tarea
    const task = {
        id: generateUniqueId(),
        studentName: studentName,
        studentEmail: studentEmail,
        sessionId: formData.get('sessionId'),
        taskType: formData.get('taskType'),
        title: formData.get('taskTitle'),
        description: formData.get('taskDescription'),
        content: taskContent,
        comments: formData.get('additionalComments'),
        submissionDate: new Date().toISOString(),
        status: 'pending',
        feedback: null,
        rating: null
    };

    // Guardar tarea
    const tasks = loadFromLocalStorage('tasks') || [];
    tasks.push(task);
    saveToLocalStorage('tasks', tasks);

    // Generar email
    generateTaskEmail(task);

    // Mostrar confirmación
    showToast('¡Tarea enviada correctamente! Se ha generado un email a la profesora.', 'success');

    // Limpiar formulario
    form.reset();

    // Actualizar lista de tareas
    loadStudentTasks();
}

// Generar email de tarea
function generateTaskEmail(task) {
    const session = getSessionById(parseInt(task.sessionId));
    const subject = `[Tarea] ${task.title} - Sesión ${task.sessionId} - ${task.studentName}`;

    const body = `
NUEVA TAREA ENTREGADA
====================

Curso: ${TASK_CONFIG.courseName}
Profesora: ${TASK_CONFIG.teacherName}

DATOS DEL ALUMNO
----------------
Nombre: ${task.studentName}
Email: ${task.studentEmail}

INFORMACIÓN DE LA TAREA
-----------------------
Sesión: ${session ? session.title : 'Sesión ' + task.sessionId}
Tipo de tarea: ${getTaskTypeLabel(task.taskType)}
Título: ${task.title}
Fecha de entrega: ${new Date(task.submissionDate).toLocaleString('es-ES')}

DESCRIPCIÓN
-----------
${task.description || 'Sin descripción adicional'}

CONTENIDO DE LA TAREA
---------------------
${task.content}

COMENTARIOS ADICIONALES
------------------------
${task.comments || 'Sin comentarios adicionales'}

---
Esta tarea se ha enviado a través de la plataforma web del curso.
Para revisarla, accede al panel de profesora.
    `.trim();

    // Crear enlace mailto
    const mailtoLink = `mailto:${TASK_CONFIG.teacherEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Abrir cliente de correo
    window.open(mailtoLink, '_blank');

    return mailtoLink;
}

// Obtener etiqueta de tipo de tarea
function getTaskTypeLabel(type) {
    const types = {
        'homework': 'Tarea para casa',
        'classwork': 'Actividad de clase',
        'essay': 'Redacción',
        'project': 'Proyecto grupal',
        'other': 'Otro'
    };
    return types[type] || type;
}

// Cargar tareas del estudiante
function loadStudentTasks() {
    const container = document.getElementById('submittedTasksList');
    if (!container) return;

    const tasks = loadFromLocalStorage('tasks') || [];

    if (tasks.length === 0) {
        container.innerHTML = '<p class="no-tasks">No has entregado ninguna tarea todavía.</p>';
        return;
    }

    // Ordenar por fecha de entrega (más reciente primero)
    tasks.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));

    let html = '';
    tasks.forEach(task => {
        const session = getSessionById(parseInt(task.sessionId));
        const statusLabel = getTaskStatusLabel(task.status);
        const statusClass = task.status;

        html += `
            <div class="task-item ${statusClass}">
                <div class="task-header">
                    <div class="task-info">
                        <div class="task-title">${task.title}</div>
                        <div class="task-meta">
                            ${session ? `Sesión ${task.sessionId}` : ''} •
                            ${new Date(task.submissionDate).toLocaleDateString('es-ES')} •
                            ${getTaskTypeLabel(task.taskType)}
                        </div>
                    </div>
                    <div class="task-status ${statusClass}">${statusLabel}</div>
                </div>
                <div class="task-content-preview">
                    ${task.content.substring(0, 150)}${task.content.length > 150 ? '...' : ''}
                </div>
                ${task.feedback ? `
                    <div class="task-feedback">
                        <strong>Feedback de la profesora:</strong>
                        <p>${task.feedback}</p>
                        ${task.rating ? `<div class="task-rating">Nota: ${task.rating}/10</div>` : ''}
                    </div>
                ` : ''}
            </div>
        `;
    });

    container.innerHTML = html;
}

// Obtener etiqueta de estado
function getTaskStatusLabel(status) {
    const labels = {
        'pending': '⏳ Pendiente de revisión',
        'reviewed': '✓ Revisada',
        'rejected': '✗ Necesita mejoras'
    };
    return labels[status] || status;
}

// Cargar dashboard de la profesora
function loadTeacherDashboard() {
    updateDashboardStats();
    loadTeacherTasksList();
}

// Actualizar estadísticas del dashboard
function updateDashboardStats() {
    const tasks = loadFromLocalStorage('tasks') || [];

    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const reviewedTasks = tasks.filter(t => t.status === 'reviewed').length;
    const ratedTasks = tasks.filter(t => t.rating !== null);

    const averageRating = ratedTasks.length > 0
        ? (ratedTasks.reduce((sum, t) => sum + t.rating, 0) / ratedTasks.length).toFixed(1)
        : '-';

    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
    document.getElementById('reviewedTasks').textContent = reviewedTasks;
    document.getElementById('averageRating').textContent = averageRating;
}

// Cargar lista de tareas para la profesora
function loadTeacherTasksList(filters = {}) {
    const container = document.getElementById('teacherTasksList');
    if (!container) return;

    let tasks = loadFromLocalStorage('tasks') || [];

    // Aplicar filtros
    if (filters.status && filters.status !== 'all') {
        tasks = tasks.filter(t => t.status === filters.status);
    }
    if (filters.sessionId && filters.sessionId !== 'all') {
        tasks = tasks.filter(t => t.sessionId === filters.sessionId);
    }
    if (filters.studentName) {
        tasks = tasks.filter(t =>
            t.studentName.toLowerCase().includes(filters.studentName.toLowerCase())
        );
    }

    if (tasks.length === 0) {
        container.innerHTML = '<p class="no-tasks">No hay tareas que coincidan con los filtros seleccionados.</p>';
        return;
    }

    // Ordenar por fecha y estado (pendientes primero)
    tasks.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return new Date(b.submissionDate) - new Date(a.submissionDate);
    });

    let html = '';
    tasks.forEach(task => {
        const session = getSessionById(parseInt(task.sessionId));
        const statusLabel = getTaskStatusLabel(task.status);
        const statusClass = task.status;

        html += `
            <div class="teacher-task-item">
                <div class="teacher-task-header">
                    <div class="student-info">
                        <div class="student-name">${task.studentName}</div>
                        <div class="student-email">${task.studentEmail}</div>
                    </div>
                    <div class="task-status ${statusClass}">${statusLabel}</div>
                </div>

                <div class="task-details">
                    <h4>${task.title}</h4>
                    <p><strong>Tipo:</strong> ${getTaskTypeLabel(task.taskType)}</p>
                    <p><strong>Sesión:</strong> ${session ? session.title : 'Sesión ' + task.sessionId}</p>
                    <p><strong>Fecha de entrega:</strong> ${new Date(task.submissionDate).toLocaleString('es-ES')}</p>
                    ${task.description ? `<p><strong>Descripción:</strong> ${task.description}</p>` : ''}
                </div>

                <div class="task-content-full">${task.content}</div>

                ${task.comments ? `
                    <div class="task-comments">
                        <strong>Comentarios del alumno:</strong>
                        <p>${task.comments}</p>
                    </div>
                ` : ''}

                ${task.feedback ? `
                    <div class="task-feedback">
                        <strong>Tu feedback:</strong>
                        <p>${task.feedback}</p>
                        ${task.rating ? `<div class="task-rating">Nota: ${task.rating}/10</div>` : ''}
                    </div>
                ` : ''}

                <div class="task-actions">
                    <button class="btn" onclick="openReviewModal('${task.id}')">
                        ${task.status === 'pending' ? '📝 Revisar' : '✏️ Actualizar revisión'}
                    </button>
                    ${task.status === 'pending' ? `
                        <button class="btn btn-secondary" onclick="markAsReviewed('${task.id}')">
                            ✓ Marcar como revisada
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Inicializar filtros
function initializeFilters() {
    const filterStatus = document.getElementById('filterStatus');
    const filterSession = document.getElementById('filterSession');
    const filterStudent = document.getElementById('filterStudent');

    if (filterStatus) {
        filterStatus.addEventListener('change', applyFilters);
    }
    if (filterSession) {
        filterSession.addEventListener('change', applyFilters);
    }
    if (filterStudent) {
        filterStudent.addEventListener('input', debounce(applyFilters, 300));
    }
}

// Aplicar filtros
function applyFilters() {
    const filters = {
        status: document.getElementById('filterStatus').value,
        sessionId: document.getElementById('filterSession').value,
        studentName: document.getElementById('filterStudent').value
    };

    loadTeacherTasksList(filters);
}

// Abrir modal de revisión
function openReviewModal(taskId) {
    const tasks = loadFromLocalStorage('tasks') || [];
    const task = tasks.find(t => t.id === taskId);

    if (!task) return;

    const modal = document.getElementById('reviewModal');
    const modalContent = document.getElementById('reviewModalContent');

    modalContent.innerHTML = `
        <h2>Revisar Tarea</h2>
        <div class="task-review-details">
            <h3>${task.title}</h3>
            <p><strong>Alumno:</strong> ${task.studentName} (${task.studentEmail})</p>
            <p><strong>Tipo:</strong> ${getTaskTypeLabel(task.taskType)}</p>
            <p><strong>Fecha de entrega:</strong> ${new Date(task.submissionDate).toLocaleString('es-ES')}</p>
        </div>

        <div class="task-content-review">
            <h4>Contenido de la tarea:</h4>
            <div class="content-text">${task.content}</div>
        </div>

        <form id="reviewForm" class="review-form">
            <input type="hidden" name="taskId" value="${task.id}">

            <div class="form-group">
                <label for="feedback">Feedback para el alumno:</label>
                <textarea id="feedback" name="feedback" rows="6" required
                          placeholder="Escribe tu feedback...">${task.feedback || ''}</textarea>
            </div>

            <div class="form-group">
                <label>Calificación (0-10):</label>
                <div class="rating-stars" id="ratingStars">
                    ${[1,2,3,4,5,6,7,8,9,10].map(n =>
                        `<span class="star ${task.rating >= n ? 'active' : ''}" data-rating="${n}">★</span>`
                    ).join('')}
                </div>
                <input type="hidden" name="rating" id="ratingInput" value="${task.rating || ''}">
            </div>

            <div class="form-group">
                <label for="status">Estado:</label>
                <select id="status" name="status">
                    <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>⏳ Pendiente</option>
                    <option value="reviewed" ${task.status === 'reviewed' ? 'selected' : ''}>✓ Revisada</option>
                    <option value="rejected" ${task.status === 'rejected' ? 'selected' : ''}>✗ Necesita mejoras</option>
                </select>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-success">💾 Guardar Revisión</button>
                <button type="button" class="btn btn-secondary" onclick="closeReviewModal()">Cancelar</button>
            </div>
        </form>
    `;

    modal.style.display = 'block';

    // Inicializar eventos del modal
    initializeReviewModal();
}

// Inicializar eventos del modal de revisión
function initializeReviewModal() {
    // Manejar estrellas de calificación
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('ratingInput');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;

            stars.forEach(s => s.classList.remove('active'));
            for (let i = 1; i <= rating; i++) {
                document.querySelector(`.star[data-rating="${i}"]`).classList.add('active');
            }
        });
    });

    // Manejar envío del formulario
    const form = document.getElementById('reviewForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveReview(form);
    });
}

// Guardar revisión
function saveReview(form) {
    const formData = new FormData(form);
    const taskId = formData.get('taskId');

    const tasks = loadFromLocalStorage('tasks') || [];
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        showToast('Error al guardar la revisión', 'error');
        return;
    }

    // Actualizar tarea
    tasks[taskIndex].feedback = formData.get('feedback');
    tasks[taskIndex].rating = parseInt(formData.get('rating')) || null;
    tasks[taskIndex].status = formData.get('status');
    tasks[taskIndex].reviewDate = new Date().toISOString();

    saveToLocalStorage('tasks', tasks);

    showToast('Revisión guardada correctamente', 'success');
    closeReviewModal();
    loadTeacherDashboard();
}

// Cerrar modal de revisión
function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    modal.style.display = 'none';
}

// Marcar como revisada
function markAsReviewed(taskId) {
    const tasks = loadFromLocalStorage('tasks') || [];
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) return;

    tasks[taskIndex].status = 'reviewed';
    tasks[taskIndex].reviewDate = new Date().toISOString();

    saveToLocalStorage('tasks', tasks);
    showToast('Tarea marcada como revisada', 'success');
    loadTeacherDashboard();
}

// Exportar todas las tareas
function exportAllTasks() {
    const tasks = loadFromLocalStorage('tasks') || [];

    if (tasks.length === 0) {
        showToast('No hay tareas para exportar', 'warning');
        return;
    }

    // Crear CSV
    let csv = 'Nombre,Email,Sesión,Tipo,Título,Estado,Fecha,Calificación\n';

    tasks.forEach(task => {
        csv += `"${task.studentName}","${task.studentEmail}","${task.sessionId}","${getTaskTypeLabel(task.taskType)}","${task.title}","${getTaskStatusLabel(task.status)}","${new Date(task.submissionDate).toLocaleDateString('es-ES')}","${task.rating || ''}"\n`;
    });

    // Descargar archivo
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `tareas_intensivo8_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);

    showToast('Tareas exportadas correctamente', 'success');
}

// Generar reporte
function generateReport() {
    const tasks = loadFromLocalStorage('tasks') || [];

    if (tasks.length === 0) {
        showToast('No hay datos para generar el reporte', 'warning');
        return;
    }

    const totalTasks = tasks.length;
    const reviewedTasks = tasks.filter(t => t.status === 'reviewed').length;
    const ratedTasks = tasks.filter(t => t.rating !== null);
    const averageRating = ratedTasks.length > 0
        ? (ratedTasks.reduce((sum, t) => sum + t.rating, 0) / ratedTasks.length).toFixed(1)
        : 0;

    const report = `
REPORTE DE PROGRESO - CURSO INTENSIVO 8
========================================

Fecha de generación: ${new Date().toLocaleString('es-ES')}

RESUMEN GENERAL
---------------
Total de tareas entregadas: ${totalTasks}
Tareas revisadas: ${reviewedTasks}
Tareas pendientes: ${totalTasks - reviewedTasks}
Tasa de revisión: ${totalTasks > 0 ? ((reviewedTasks / totalTasks) * 100).toFixed(1) : 0}%

CALIFICACIONES
--------------
Tareas calificadas: ${ratedTasks.length}
Nota media: ${averageRating}/10

ALUMNOS MÁS ACTIVOS
-------------------
${getMostActiveStudents(tasks)}

PRÓXIMAS ACCIONES
-----------------
${totalTasks - reviewedTasks > 0 ? `- Revisar ${totalTasks - reviewedTasks} tareas pendientes` : '- Todas las tareas revisadas'}
${ratedTasks.length > 0 ? '- Continuar con el seguimiento del progreso' : '- Comenzar a calificar tareas'}
    `.trim();

    // Mostrar reporte en modal
    alert(report);

    showToast('Reporte generado correctamente', 'success');
}

// Obtener alumnos más activos
function getMostActiveStudents(tasks) {
    const studentCount = {};
    tasks.forEach(task => {
        if (!studentCount[task.studentName]) {
            studentCount[task.studentName] = 0;
        }
        studentCount[task.studentName]++;
    });

    const sorted = Object.entries(studentCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    return sorted.map(([name, count]) => `- ${name}: ${count} tarea(s)`).join('\n');
}

// Enviar recordatorios masivos
function sendBulkReminder() {
    const tasks = loadFromLocalStorage('tasks') || [];
    const pendingTasks = tasks.filter(t => t.status === 'pending');

    if (pendingTasks.length === 0) {
        showToast('No hay tareas pendientes para recordar', 'info');
        return;
    }

    const confirmed = confirm(`¿Enviar recordatorios para ${pendingTasks.length} tareas pendientes? Se abrirán ${pendingTasks.length} ventanas de email.`);

    if (confirmed) {
        let sentCount = 0;
        pendingTasks.forEach(task => {
            const subject = `Recordatorio: Tarea "${task.title}" - Sesión ${task.sessionId}`;
            const body = `
Hola ${task.studentName},

Este es un recordatorio sobre tu tarea "${task.title}" de la Sesión ${task.sessionId}.

La tarea está pendiente de revisión. Te notificaré cuando haya sido revisada.

Saludos,
${TASK_CONFIG.teacherName}
${TASK_CONFIG.teacherEmail}
            `.trim();

            const mailtoLink = `mailto:${task.studentEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Abrir con un pequeño delay para evitar bloqueo del navegador
            setTimeout(() => {
                window.open(mailtoLink, '_blank');
            }, sentCount * 500);

            sentCount++;
        });

        showToast(`Se abrirán ${sentCount} emails de recordatorio`, 'success');
    }
}

// Utilidad: debounce para filters
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Hacer funciones disponibles globalmente
window.openReviewModal = openReviewModal;
window.closeReviewModal = closeReviewModal;
window.markAsReviewed = markAsReviewed;
window.exportAllTasks = exportAllTasks;
window.generateReport = generateReport;
window.sendBulkReminder = sendBulkReminder;