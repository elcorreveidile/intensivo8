# Curso Intensivo 8 - Español Nivel C1 (Superior)

Sistema web educativo para el curso intensivo de español nivel C1 del Centro de Lenguas Modernas de la Universidad de Granada.

## 📋 Información del Curso

- **Periodo:** 7 - 30 de abril de 2026
- **Duración:** 14 sesiones de 2 horas
- **Nivel:** C1 (Superior)
- **Profesora:** María Agustina García García
- **Email:** agustinagg@yahoo.es
- **Alumnos:** 10 estudiantes (procedencia mixta)

## 🎯 Características del Sistema

### Para Alumnos
- ✅ **Materiales educativos:** Contenido basado en las Unidades 5 (Saber Palabras) y 6 (Saber Gramática) de "El Ventilador"
- ✅ **Ejercicios interactivos:** Actividades con autocorrección inmediata y otras para revisión
- ✅ **Calendario visual:** Planificación completa con sesiones y fechas
- ✅ **Sistema de tareas:** Formulario para enviar tareas automáticamente a la profesora
- ✅ **Seguimiento de progreso:** Registro de ejercicios completados

### Para la Profesora
- ✅ **Panel de gestión:** Vista de todas las tareas entregadas
- ✅ **Sistema de corrección:** Feedback personalizado para alumnos
- ✅ **Estadísticas:** Dashboard con métricas del curso
- ✅ **Herramientas:** Exportación de datos, generación de reportes
- ✅ **Envío de recordatorios:** Recordatorios masivos por email

## 🗂️ Estructura del Proyecto

```
intensivo8/
├── index.html              # Página principal
├── calendario.html         # Calendario de sesiones
├── materiales.html         # Materiales del curso
├── ejercicios.html         # Ejercicios interactivos
├── tareas.html            # Sistema de gestión de tareas
├── recursos.html          # Recursos y enlaces útiles
├── css/
│   ├── styles.css         # Estilos generales
│   ├── calendar.css       # Estilos del calendario
│   ├── exercises.css      # Estilos de ejercicios
│   └── tasks.css          # Estilos de tareas
├── js/
│   ├── config.js          # Configuración del curso
│   ├── sessions.js        # Datos de sesiones
│   ├── calendar.js        # Funciones del calendario
│   ├── exercises.js       # Lógica de ejercicios
│   ├── tasks.js          # Sistema de tareas
│   └── main.js           # Funciones principales
├── img/
│   └── logo-clm.png       # Logo del CLM
├── pdfs/                  # Materiales en PDF (por crear)
└── README.md             # Este archivo
```

## 📅 Distribución de Sesiones

Las 14 sesiones se distribuyen automáticamente de la siguiente manera:

1. **7 de abril (Martes)** - Sesión 1: Presentación y evaluación inicial
2. **8 de abril (Miércoles)** - Sesión 2: Indicativo vs Subjuntivo (I)
3. **9 de abril (Jueves)** - Sesión 3: Indicativo vs Subjuntivo (II)
4. **10 de abril (Viernes)** - Sesión 4: Artículos y determinantes
5. **14 de abril (Martes)** - Sesión 5: Pronombres personales (I)
6. **16 de abril (Jueves)** - Sesión 6: Pronombres personales y relativos
7. **17 de abril (Viernes)** - Sesión 7: Preposiciones y conectores
8. **21 de abril (Martes)** - Sesión 8: Tiempos verbales de pasado
9. **22 de abril (Miércoles)** - Sesión 9: Formación de palabras (I)
10. **23 de abril (Jueves)** - Sesión 10: Formación de palabras (II)
11. **24 de abril (Viernes)** - Sesión 11: Vocabulario de animales
12. **28 de abril (Martes)** - Sesión 12: Vocabulario académico
13. **29 de abril (Miércoles)** - Sesión 13: Repaso para examen
14. **30 de abril (Jueves)** - **EXAMEN FINAL**

## 🚀 Instalación y Despliegue

### Opción 1: Sitio Estático Local

1. Clonar o descargar este repositorio
2. Abrir `index.html` en un navegador web
3. ¡Listo! No requiere servidor ni instalación adicional

### Opción 2: Servidor Local (Opcional)

Si prefieres usar un servidor local:

```bash
# Usando Python 3
python -m http.server 8000

# Usando Node.js (http-server)
npx http-server

# Usando PHP
php -S localhost:8000
```

Luego accede a `http://localhost:8000`

### Opción 3: Hosting Web

El sitio puede desplegarse en cualquier servicio de hosting estático:

- **GitHub Pages:** Gratis y fácil de configurar
- **Netlify:** Despliegue continuo
- **Vercel:** Optimizado para sitios estáticos
- **Surge.sh:** Deploy desde línea de comandos
- **Cualquier hosting tradicional:** Subir archivos vía FTP

## 📚 Contenidos Educativos

### Unidad 6: Saber Gramática
- Modo indicativo vs subjuntivo
- Artículos y determinantes
- Pronombres personales y relativos
- Preposiciones y conectores discursivos
- Tiempos verbales de pasado

### Unidad 5: Saber Palabras
- Formación de palabras (prefijos, sufijos, composición)
- Vocabulario de animales (expresiones y metáforas)
- Vocabulario académico y formal
- Familias léxicas y campos semánticos

## 📝 Uso del Sistema

### Para Alumnos

1. **Registro automático:** No requiere registro previo
2. **Consultar materiales:** Acceder a la sección "Materiales"
3. **Practicar ejercicios:** Completar ejercicios con autocorrección
4. **Enviar tareas:** Usar el formulario en "Tareas" → "Alumnos"
5. **Recibir feedback:** La profesora revisará y dará feedback personalizado

### Para la Profesora

1. **Ver tareas entregadas:** Ir a "Tareas" → "Profesora"
2. **Revisar tareas:** Hacer clic en "Revisar" en cada tarea
3. **Dar feedback:** Escribir comentarios y calificación
4. **Gestionar curso:** Usar las herramientas disponibles

## 🔧 Configuración

El sistema puede configurarse editando `js/config.js`:

```javascript
const CONFIG = {
    courseName: "Intensivo 8 - Español Nivel C1",
    teacher: {
        name: "María Agustina García García",
        email: "agustinagg@yahoo.es"
    },
    startDate: new Date(2026, 3, 7), // 7 de abril de 2026
    endDate: new Date(2026, 3, 30),   // 30 de abril de 2026
    // ... más configuración
};
```

## 📊 Almacenamiento de Datos

El sistema utiliza `localStorage` del navegador para:
- ✅ Guardar progreso de ejercicios
- ✅ Almacenar tareas enviadas
- ✅ Mantener feedback y calificaciones
- ✅ Registrar historial de actividad

**Nota:** Los datos se almacenan localmente en cada navegador. Para persistencia a largo plazo, se recomienda implementar un backend o exportar los datos regularmente.

## 🎨 Diseño y Estilo

El diseño está inspirado en "El Ventilador" con:
- **Colores cálidos y amigables:** Naranja (#e67e22), Azul (#3498db), Verde (#27ae60)
- **Diseño académico moderno:** Limpio, profesional y accesible
- **Responsive:** Adaptado para móviles, tablets y escritorio
- **Accesible:** Alto contraste, tipografía clara, navegación intuitiva

## 📱 Características Técnicas

- **Sitio estático:** No requiere base de datos ni servidor backend
- **JavaScript vanilla:** Sin dependencias de frameworks
- **HTML5/CSS3:** Estándares web modernos
- **LocalStorage:** Persistencia de datos local
- **Responsive Design:** Mobile-first approach
- **Cross-browser:** Compatible con navegadores modernos

## 🔄 Mantenimiento y Actualizaciones

### Para actualizar contenidos:

1. **Sesiones:** Editar `js/sessions.js`
2. **Ejercicios:** Editar `ejercicios.html` y `js/exercises.js`
3. **Materiales:** Añadir PDFs a carpeta `pdfs/`
4. **Configuración:** Editar `js/config.js`

### Para cambiar el diseño:

1. **Colores:** Editar variables CSS en `css/styles.css`
2. **Layout:** Modificar CSS en archivos correspondientes
3. **Logo:** Reemplazar `img/logo-clm.png`

## 📧 Sistema de Email

El sistema genera emails automáticos usando el protocolo `mailto:`:

- **Alumnos → Profesora:** Envío de tareas
- **Profesora → Alumnos:** Feedback y recordatorios

Los emails se abren en el cliente de correo configurado del usuario.

## 🌐 Recursos Adicionales

En la sección "Recursos" encontrarás enlaces a:
- Diccionarios (RAE, Clave, WordReference)
- Gramática (Cervantes, Fundéu)
- Vocabulario (Refranero, corpus lingüísticos)
- Práctica (RTVE, periódicos, videos)
- Cultura (cine, literatura, museos)

## 💡 Tips de Uso

### Para Alumnos:
- 📅 Revisa el calendario regularmente
- ✏️ Practica con ejercicios de autocorrección
- 📝 Envía tareas con antelación
- 💾 Guarda tu progreso regularmente

### Para la Profesora:
- 📊 Revisa el dashboard diariamente
- 📧 Da feedback rápido y constructivo
- 📥 Exporta datos regularmente
- 🎯 Usa recordatorios para tareas pendientes

## 🐛 Troubleshooting

### Problemas Comunes

**Ejercicios no se guardan:**
- Verifica que JavaScript esté habilitado
- Limpia caché del navegador
- Revisa consola para errores

**Tareas no se envían:**
- Verifica conexión a internet
- Confirma cliente de correo configurado
- Revisa todos los campos obligatorios

**Calendario no actualiza:**
- Refresca la página (F5)
- Verifica fecha/hora del sistema
- Limpia caché del navegador

## 📞 Soporte

Para problemas o dudas:
- 👩‍🏫 **Profesora:** agustinagg@yahoo.es
- 🏛️ **CLM:** clm@ugr.es
- 📧 **Soporte técnico:** Consultar con el departamento de informática del CLM

## 📄 Licencia

Este proyecto ha sido desarrollado para uso educativo del Centro de Lenguas Modernas de la Universidad de Granada.

## 🙏 Agradecimientos

- **Centro de Lenguas Modernas (CLM)** - Universidad de Granada
- **Profesora María Agustina García García** - Coordinación pedagógica
- **"El Ventilador" (Difusión)** - Inspiración para materiales y metodología

---

**Versión:** 1.0
**Última actualización:** Abril 2026
**Desarrollado para:** Curso Intensivo 8 - Nivel C1 (Superior)

¡Mucho éxito con el curso! 🎓🇪🇸