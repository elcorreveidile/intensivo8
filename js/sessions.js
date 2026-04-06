// Información de las sesiones del curso
const SESSIONS = [
    {
        id: 1,
        date: new Date(2026, 3, 7),   // 7 de abril - Martes
        title: "Sesión 1: Presentación y Evaluación Inicial",
        description: "Presentación del curso, evaluación inicial y actividades rompehielo",
        unit: "Saber Hablar",
        topics: [
            "Presentación del curso y profesora",
            "Evaluación diagnóstica inicial",
            "Actividades de presentación y comunicación",
            "Introducción a las Unidades 5 y 6",
            "Explicación del sistema de evaluación y tareas"
        ],
        materials: [
            "Cuestionario de evaluación inicial",
            "Fichas de presentación",
            "Guía del curso"
        ],
        homework: "Completar ficha de presentación y objetivos personales",
        classActivities: [
            "Entrevistas por parejas: Presentación y objetivos",
            "Actividad grupal: Expectativas del curso",
            "Debate: ¿Por qué aprender español nivel C1?"
        ],
        focusArea: "communication"
    },
    {
        id: 2,
        date: new Date(2026, 3, 8),   // 8 de abril - Miércoles
        title: "Sesión 2: Uso del Indicativo vs Subjuntivo (I)",
        description: "Introducción al uso de modos verbales en contextos intencionales",
        unit: "Saber Gramática",
        topics: [
            "Uso del subjuntivo en oraciones intencionales",
            "Quiero que... / Para que... / Con la finalidad de que...",
            "Matrices de doble sentido: gritar, repetir, sugerir",
            "Subjuntivo aislado: ¡Que se vaya!",
            "Práctica con ejercicios de El Ventilador"
        ],
        materials: [
            "Presentación: Modo indicativo vs subjuntivo",
            "Ejercicios de oraciones intencionales",
            "Texto de El Ventilador: Análisis de modos"
        ],
        homework: "Ejercicios 1-5 de oraciones intencionales (pág. 45-47)",
        classActivities: [
            "Por parejas: Completar oraciones con modo adecuado",
            "Grupos de 3: Crear diálogos usando matrices intencionales",
            "Corrección colectiva de ejercicios"
        ],
        focusArea: "grammar"
    },
    {
        id: 3,
        date: new Date(2026, 3, 9),   // 9 de abril - Jueves
        title: "Sesión 3: Uso del Indicativo vs Subjuntivo (II)",
        description: "Matrices veritativas y uso del modo en oraciones subordinadas",
        unit: "Saber Gramática",
        topics: [
            "Matrices veritativas: Creo que... vs No creo que...",
            "Veo que... / Es posible que...",
            "Declarar vs cuestionar: Afirmar, suponer, considerar",
            "Usos intencionales del modo",
            "Subjuntivo en estructuras condicionales"
        ],
        materials: [
            "Ejercicios de matrices veritativas",
            "Texto periodístico para análisis",
            "Fichas de estructuras condicionales"
        ],
        homework: "Redacción: Opinión sobre tema actual usando matrices veritativas",
        classActivities: [
            "Actividad en grupos: Análisis de texto periodístico",
            "Por parejas: Debate usando expresiones de opinión",
            "Juego: ¿Indicativo o subjuntivo?"
        ],
        focusArea: "grammar"
    },
    {
        id: 4,
        date: new Date(2026, 3, 10),  // 10 de abril - Viernes
        title: "Sesión 4: Artículos y Determinantes",
        description: "Uso avanzado de artículos, demostrativos y cuantificadores",
        unit: "Saber Gramática",
        topics: [
            "Artículos definidos: sustantivador, ponderaciones",
            "Artículos indefinidos: una de, una maravilla de",
            "Ausencia de artículo: nombramiento vs mención",
            "Demostrativos anafóricos: Este/Aquel",
            "Cuantificadores: Todo/Nada, Muy/Mucho + sustantivo"
        ],
        materials: [
            "Presentación: Artículos y determinantes",
            "Ejercicios de uso del artículo",
            "Texto literario para análisis"
        ],
        homework: "Ejercicios 6-10 de artículos y determinantes (pág. 52-54)",
        classActivities: [
            "Por parejas: Corrección de texto sin artículos",
            "Grupos: Análisis de uso de artículos en texto literario",
            "Actividad creativa: Redacción usando artículos específicos"
        ],
        focusArea: "grammar"
    },
    {
        id: 5,
        date: new Date(2026, 3, 14),  // 14 de abril - Martes
        title: "Sesión 5: Pronombres Personales (I)",
        description: "Uso de pronombres sujeto y objetos directo/indirecto",
        unit: "Saber Gramática",
        topics: [
            "Pronombres sujeto: construcciones absolutas",
            "Personificación y reduplicación enfática",
            "Pronombres OD/OI: presencia y ausencia",
            "Doble posición con verbos de percepción",
            "Leísmo, laísmo y loísmo"
        ],
        materials: [
            "Presentación: Pronombres personales",
            "Ejercicios de pronombres OD/OI",
            "Texto de El Ventilador: Análisis de pronombres"
        ],
        homework: "Ejercicios 11-15 de pronombres personales (pág. 58-60)",
        classActivities: [
            "Actividad en grupos: Corrección de errores comunes de pronombres",
            "Por parejas: Transformar oraciones usando pronombres",
            "Debate: Usos regionales de pronombres en el mundo hispano"
        ],
        focusArea: "grammar"
    },
    {
        id: 6,
        date: new Date(2026, 3, 16),  // 16 de abril - Jueves
        title: "Sesión 6: Pronombres Personales (II) y Relativos",
        description: "Pronombres relativos y uso avanzado",
        unit: "Saber Gramática",
        topics: [
            "Pronombres relativos: Quien/(el) que",
            "El cual, la cual, lo cual vs el que, la que",
            "Cuanto con indicativo y subjuntivo",
            "Dativo ético",
            "Tematizador de locativos"
        ],
        materials: [
            "Ejercicios de pronombres relativos",
            "Texto académico para análisis",
            "Fichas de oraciones compuestas"
        ],
        homework: "Redacción: Descripción de una persona usando relativos",
        classActivities: [
            "Por parejas: Unir oraciones con pronombres relativos",
            "Grupos: Análisis de texto académico",
            "Juego: ¿Quién es quién? usando relativos"
        ],
        focusArea: "grammar"
    },
    {
        id: 7,
        date: new Date(2026, 3, 17),  // 17 de abril - Viernes
        title: "Sesión 7: Preposiciones y Conectores",
        description: "Uso significativo de preposiciones y marcadores discursivos",
        unit: "Saber Gramática",
        topics: [
            "Preposiciones con valor temporal, espacial, modal",
            "Organizadores discursivos: en cuanto a, en lo que se refiere a",
            "Conectores: mientras que, en cambio, por el contrario",
            "Marcadores reformuladores: es decir, o sea, en otras palabras",
            "Práctica con textos de El Ventilador"
        ],
        materials: [
            "Presentación: Preposiciones y conectores",
            "Ejercicios de conectores discursivos",
            "Texto argumentativo para análisis"
        ],
        homework: "Ejercicios 16-20 de preposiciones y conectores (pág. 65-67)",
        classActivities: [
            "Por parejas: Completar texto con conectores apropiados",
            "Grupos: Debate usando organizadores discursivos",
            "Actividad: Reescribir texto cambiando conectores"
        ],
        focusArea: "grammar"
    },
    {
        id: 8,
        date: new Date(2026, 3, 21),  // 21 de abril - Martes
        title: "Sesión 8: Tiempos Verbales de Pasado",
        description: "Contraste de tiempos pasados y valores especiales",
        unit: "Saber Gramática",
        topics: [
            "Pretérito imperfecto: valor de presente-futuro",
            "Pretérito indefinido: valor de presente-futuro",
            "Futuro: uso en presente (objeciones, ponderaciones)",
            "Condicional: uso en pasado, periodístico",
            "Pluscuamperfecto: cortesía",
            "Perífrasis de pasado"
        ],
        materials: [
            "Presentación: Tiempos verbales de pasado",
            "Ejercicios de contraste de pasados",
            "Texto narrativo para análisis"
        ],
        homework: "Ejercicio 21-25 de tiempos pasados (pág. 72-74)",
        classActivities: [
            "Por parejas: Corregir uso de tiempos en narración",
            "Grupos: Análisis de valores especiales de pasados",
            "Actividad: Crear historia usando diferentes pasados"
        ],
        focusArea: "grammar"
    },
    {
        id: 9,
        date: new Date(2026, 3, 22),  // 22 de abril - Miércoles
        title: "Sesión 9: Formación de Palabras (I)",
        description: "Mecanismos de derivación mediante prefijos",
        unit: "Saber Palabras",
        topics: [
            "Prefijos de negación: anti-, a-, in-, i-, im-, ir-, des-",
            "Prefijos de ubicación: sub-, super-, extra-, inter-",
            "Prefijos temporales: pre-, post-, anti-, ex-",
            "Formación de antónimos mediante prefijación",
            "Práctica con familias léxicas"
        ],
        materials: [
            "Presentación: Formación de palabras",
            "Lista de prefijos más comunes",
            "Ejercicios de prefijación",
            "Texto de El Ventilador: Vocabulario prefijado"
        ],
        homework: "Crear 10 palabras usando prefijos y escribir oraciones",
        classActivities: [
            "Por parejas: Juego de prefijos (crear palabras nuevas)",
            "Grupos: Análisis de familias léxicas",
            "Actividad: Concurso de palabras prefijadas"
        ],
        focusArea: "vocabulary"
    },
    {
        id: 10,
        date: new Date(2026, 3, 23),  // 23 de abril - Jueves
        title: "Sesión 10: Formación de Palabras (II)",
        description: "Sufijación y composición de palabras",
        unit: "Saber Palabras",
        topics: [
            "Sustantivos derivados de verbos: -ción, -te, -miento, -ado",
            "Verbos derivados de adjetivos: -ecer, -ear, -ificar",
            "Sufijos de profesión y oficio",
            "Composición: palabras compuestas",
            "Familias de palabras de la misma raíz"
        ],
        materials: [
            "Presentación: Sufijación y composición",
            "Ejercicios de derivación y composición",
            "Diccionario de familias léxicas"
        ],
        homework: "Ejercicios 1-5 de derivación y composición (pág. 88-90)",
        classActivities: [
            "Por parejas: Crear familias léxicas",
            "Grupos: Análisis de palabras compuestas",
            "Actividad: Crucigrama de formación de palabras"
        ],
        focusArea: "vocabulary"
    },
    {
        id: 11,
        date: new Date(2026, 3, 24),  // 24 de abril - Viernes
        title: "Sesión 11: Vocabulario de Animales",
        description: "Expresiones y vocabulario relacionado con animales aplicado a humanos",
        unit: "Saber Palabras",
        topics: [
            "Nombres de animales para virtudes humanas",
            "Nombres de animales para defectos humanos",
            "Expresiones idiomáticas con animales",
            "Campo semántico: características animales aplicadas a personas",
            "Actividades inspiradas en El Ventilador"
        ],
        materials: [
            "Presentación: Vocabulario de animales",
            "Lista de expresiones con animales",
            "Ejercicios de vocabulario temático",
            "Texto: El mundo animal en español"
        ],
        homework: "Redacción: Descripción de una persona usando vocabulario de animales",
        classActivities: [
            "Por parejas: Adivinar expresiones con animales",
            "Grupos: Debate sobre estereotipos de animales",
            "Actividad creativa: Crear metáforas animales"
        ],
        focusArea: "vocabulary"
    },
    {
        id: 12,
        date: new Date(2026, 3, 28),  // 28 de abril - Martes
        title: "Sesión 12: Vocabulario Académico",
        description: "Recursos léxicos para el discurso académico y formal",
        unit: "Saber Palabras",
        topics: [
            "Verbos precisos vs generales (hacer, tener, haber, poner)",
            "Vocabulario para expresiones escritas formales",
            "Conectores académicos",
            "Recursos para mejorar la calidad escrita",
            "Estructuras con pronombres relativos en contexto académico"
        ],
        materials: [
            "Presentación: Vocabulario académico",
            "Lista de verbos precisos por categorías",
            "Ejercicios de sustitución léxica",
            "Modelos de textos académicos"
        ],
        homework: "Reescribir un texto informal usando vocabulario académico",
        classActivities: [
            "Por parejas: Sustituir verbos generales por precisos",
            "Grupos: Análisis de textos académicos",
            "Actividad: Crear texto académico breve"
        ],
        focusArea: "vocabulary"
    },
    {
        id: 13,
        date: new Date(2026, 3, 29),  // 29 de abril - Miércoles
        title: "Sesión 13: Repaso para el Examen",
        description: "Repaso integral de gramática y vocabulario",
        unit: "Repaso",
        topics: [
            "Repaso: Modo indicativo vs subjuntivo",
            "Repaso: Pronombres y artículos",
            "Repaso: Tiempos verbales de pasado",
            "Repaso: Formación de palabras",
            "Repaso: Vocabulario temático",
            "Estrategias para el examen"
        ],
        materials: [
            "Guía de repaso completa",
            "Ejercicios integrados",
            "Modelos de examen de años anteriores",
            "Lista de verificación para el examen"
        ],
        homework: "Estudiar todos los temas y repasar ejercicios",
        classActivities: [
            "Por parejas: Repaso mutuo de temas",
            "Grupos: Resolución de modelo de examen",
            "Actividad: Juego de preguntas y respuestas",
            "Debate: Dudas y estrategias para el examen"
        ],
        focusArea: "review"
    },
    {
        id: 14,
        date: new Date(2026, 3, 30),  // 30 de abril - Jueves
        title: "EXAMEN FINAL - Evaluación del Curso",
        description: "Evaluación escrita y oral de todos los contenidos",
        unit: "Evaluación",
        topics: [
            "Prueba escrita (2 horas):",
            " - Comprensión auditiva",
            " - Comprensión lectora",
            " - Expresión escrita",
            " - Competencia lingüística",
            "Prueba oral (2 horas):",
            " - Interacción oral",
            " - Expresión oral"
        ],
        materials: [
            "Examen escrito oficial",
            "Guía de examen oral",
            "Criterios de evaluación"
        ],
        homework: "N/A",
        classActivities: [
            "Realización de examen escrito (mañana)",
            "Realización de examen oral (tarde)",
            "Feedback de la experiencia del curso"
        ],
        focusArea: "exam"
    }
];

// Función para obtener la sesión actual
function getCurrentSession() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let session of SESSIONS) {
        const sessionDate = new Date(session.date);
        sessionDate.setHours(0, 0, 0, 0);

        if (sessionDate.getTime() === today.getTime()) {
            return session;
        }
    }
    return null;
}

// Función para obtener la próxima sesión
function getNextSession() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let session of SESSIONS) {
        const sessionDate = new Date(session.date);
        sessionDate.setHours(0, 0, 0, 0);

        if (sessionDate.getTime() >= today.getTime()) {
            return session;
        }
    }
    return null;
}

// Función para obtener sesión por ID
function getSessionById(id) {
    return SESSIONS.find(session => session.id === id);
}

// Función para obtener sesiones por unidad
function getSessionsByUnit(unitName) {
    return SESSIONS.filter(session => session.unit.includes(unitName));
}

// Función para obtener sesiones por área de enfoque
function getSessionsByFocusArea(focusArea) {
    return SESSIONS.filter(session => session.focusArea === focusArea);
}