// Funcionalidad para ejercicios interactivos

// Verificar ejercicio
function checkExercise(exerciseId) {
    const exerciseCard = document.getElementById(exerciseId);
    if (!exerciseCard) return;

    const questions = exerciseCard.querySelectorAll('.question[data-correct]');
    let correctCount = 0;
    let totalCount = questions.length;

    questions.forEach((question, index) => {
        const input = question.querySelector('.answer-input');
        const feedback = question.querySelector('.feedback');
        const correctAnswer = question.getAttribute('data-correct').toLowerCase();
        const userAnswer = input.value.trim().toLowerCase();

        // Normalizar respuestas (quitar acentos, etc.)
        const normalizedUserAnswer = normalizeText(userAnswer);
        const normalizedCorrectAnswer = normalizeText(correctAnswer);

        if (normalizedUserAnswer === normalizedCorrectAnswer) {
            // Respuesta correcta
            input.classList.remove('incorrect');
            input.classList.add('correct');
            question.classList.remove('incorrect');
            question.classList.add('correct');
            feedback.className = 'feedback show success';
            feedback.textContent = '✓ ¡Correcto!';
            correctCount++;
        } else {
            // Respuesta incorrecta
            input.classList.remove('correct');
            input.classList.add('incorrect');
            question.classList.remove('correct');
            question.classList.add('incorrect');
            feedback.className = 'feedback show error';
            feedback.textContent = `✗ Incorrecto. La respuesta correcta es: ${correctAnswer}`;
        }
    });

    // Mostrar resumen
    const percentage = Math.round((correctCount / totalCount) * 100);
    let message = `Has acertado ${correctCount} de ${totalCount} (${percentage}%)`;

    if (percentage === 100) {
        message += ' ¡Excelente! 🎉';
    } else if (percentage >= 80) {
        message += ' ¡Muy bien! 👏';
    } else if (percentage >= 60) {
        message += ' Bien, pero puedes mejorar 💪';
    } else {
        message += ' Sigue practicando 📚';
    }

    showToast(message, percentage >= 60 ? 'success' : 'warning');

    // Guardar progreso
    saveExerciseProgress(exerciseId, percentage);
}

// Normalizar texto (quitar acentos, etc.)
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

// Reiniciar ejercicio
function resetExercise(exerciseId) {
    const exerciseCard = document.getElementById(exerciseId);
    if (!exerciseCard) return;

    const questions = exerciseCard.querySelectorAll('.question');
    questions.forEach(question => {
        const input = question.querySelector('.answer-input');
        const feedback = question.querySelector('.feedback');

        input.value = '';
        input.classList.remove('correct', 'incorrect');
        question.classList.remove('correct', 'incorrect');
        feedback.className = 'feedback';
        feedback.textContent = '';
    });

    showToast('Ejercicio reiniciado', 'info');
}

// Enviar para revisión
function submitForReview(exerciseId, topic) {
    const exerciseCard = document.getElementById(exerciseId);
    if (!exerciseCard) return;

    const textareas = exerciseCard.querySelectorAll('.answer-textarea');
    let hasContent = false;

    textareas.forEach(textarea => {
        if (textarea.value.trim().length > 0) {
            hasContent = true;
        }
    });

    if (!hasContent) {
        showToast('Por favor, completa al menos una respuesta antes de enviar', 'warning');
        return;
    }

    // Guardar las respuestas
    const answers = [];
    textareas.forEach((textarea, index) => {
        answers.push({
            questionNumber: index + 1,
            answer: textarea.value.trim()
        });
    });

    // Guardar en localStorage
    const submission = {
        exerciseId: exerciseId,
        topic: topic,
        answers: answers,
        date: new Date().toISOString(),
        status: 'pending_review'
    };

    const submissions = loadFromLocalStorage('exercise_submissions') || [];
    submissions.push(submission);
    saveToLocalStorage('exercise_submissions', submissions);

    showToast('¡Respuestas enviadas para revisión! La profesora te dará feedback pronto.', 'success');

    // Limpiar campos
    textareas.forEach(textarea => {
        textarea.value = '';
    });
}

// Enviar redacción
function submitEssay(exerciseId) {
    const textarea = document.querySelector('.redaccion-textarea');
    if (!textarea) return;

    const essay = textarea.value.trim();
    const wordCount = essay.split(/\s+/).filter(word => word.length > 0).length;

    if (wordCount < 100) {
        showToast('Tu redacción debe tener al menos 100 palabras', 'warning');
        return;
    }

    // Guardar redacción
    const submission = {
        exerciseId: exerciseId,
        essay: essay,
        wordCount: wordCount,
        date: new Date().toISOString(),
        status: 'pending_review'
    };

    const submissions = loadFromLocalStorage('essay_submissions') || [];
    submissions.push(submission);
    saveToLocalStorage('essay_submissions', submissions);

    showToast('¡Redacción enviada para revisión! La profesora te dará feedback pronto.', 'success');

    // Limpiar campo
    textarea.value = '';
    updateWordCount();
}

// Actualizar contador de palabras
function updateWordCount() {
    const textarea = document.querySelector('.redaccion-textarea');
    const wordCountElement = document.getElementById('wordCount');

    if (textarea && wordCountElement) {
        const text = textarea.value.trim();
        const words = text.split(/\s+/).filter(word => word.length > 0);
        wordCountElement.textContent = words.length;
    }
}

// Guardar progreso de ejercicio
function saveExerciseProgress(exerciseId, percentage) {
    const progress = loadFromLocalStorage('exercise_progress') || {};
    progress[exerciseId] = {
        percentage: percentage,
        date: new Date().toISOString()
    };
    saveToLocalStorage('exercise_progress', progress);
}

// Cargar progreso de ejercicio
function loadExerciseProgress(exerciseId) {
    const progress = loadFromLocalStorage('exercise_progress');
    if (progress && progress[exerciseId]) {
        return progress[exerciseId];
    }
    return null;
}

// Inicializar contadores de palabras cuando el documento está listo
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.querySelector('.redaccion-textarea');
    if (textarea) {
        textarea.addEventListener('input', updateWordCount);
        updateWordCount(); // Inicializar contador
    }

    // Mostrar progreso anterior si existe
    const exercises = document.querySelectorAll('.exercise-card[id^="ejercicio"]');
    exercises.forEach(exercise => {
        const exerciseId = exercise.id;
        const progress = loadExerciseProgress(exerciseId);
        if (progress && progress.percentage >= 60) {
            const progressIndicator = document.createElement('div');
            progressIndicator.className = 'progress-indicator';
            progressIndicator.innerHTML = `
                <h3>✅ Progreso anterior: ${progress.percentage}%</h3>
                <p>Última vez completado: ${new Date(progress.date).toLocaleDateString('es-ES')}</p>
            `;
            exercise.insertBefore(progressIndicator, exercise.firstChild);
        }
    });
});

// Función para generar ejercicio aleatorio de práctica
function generateRandomExercise() {
    const exercises = [
        {
            type: 'grammar',
            question: 'Completa: "Espero que tú _____ (venir) mañana"',
            correct: 'vengas',
            hint: 'Usa subjuntivo'
        },
        {
            type: 'vocabulary',
            question: 'Antónimo de "posible"',
            correct: 'imposible',
            hint: 'Añade un prefijo de negación'
        },
        {
            type: 'vocabulary',
            question: 'Completa: "Ser un _____ de batalla" (trabajar mucho)',
            correct: 'caballo',
            hint: 'Es un animal'
        }
    ];

    const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
    return randomExercise;
}

// Función para exportar resultados del estudiante
function exportStudentResults() {
    const progress = loadFromLocalStorage('exercise_progress');
    const submissions = loadFromLocalStorage('exercise_submissions');
    const essays = loadFromLocalStorage('essay_submissions');

    const results = {
        progress: progress,
        submissions: submissions,
        essays: essays,
        exportDate: new Date().toISOString()
    };

    // Crear blob y descargar
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resultados_intensivo8_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showToast('Resultados exportados correctamente', 'success');
}

// Hacer funciones disponibles globalmente
window.checkExercise = checkExercise;
window.resetExercise = resetExercise;
window.submitForReview = submitForReview;
window.submitEssay = submitEssay;
window.updateWordCount = updateWordCount;
window.exportStudentResults = exportStudentResults;