# 🚀 Despliegue en GitHub Pages

Tu sitio web está configurado para desplegarse automáticamente en GitHub Pages.

## 📍 URL de tu sitio

Una vez activado, tu sitio estará disponible en:
**https://elcorreveidile.github.io/intensivo8/**

## ⚙️ Activación Manual (si es necesario)

Si el despliegue automático no se activó, sigue estos pasos:

### Opción 1: Desde la interfaz web de GitHub

1. Ve a tu repositorio: https://github.com/elcorreveidile/intensivo8
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, busca **Pages**
4. En **Build and deployment** > **Source**, selecciona:
   - **Source:** GitHub Actions
5. GitHub Pages detectará automáticamente tu workflow y lo ejecutará

### Opción 2: Verificar el estado del workflow

1. Ve a la pestaña **Actions** en tu repositorio
2. Deberías ver el workflow "Deploy static content to Pages"
3. Haz clic en él para ver el progreso del despliegue

## ✅ Verificar el despliegue

El despliegue toma entre 1-3 minutos. Cuando esté completo:

1. Ve a **Settings** > **Pages**
2. Verás la URL de tu sitio: **https://elcorreveidile.github.io/intensivo8/**
3. Haz clic en **Visit site** para ver tu web

## 🔄 Actualizaciones futuras

Cada vez que hagas `git push` a la rama `main`, el sitio se actualizará automáticamente.

```bash
git add .
git commit -m "Tu mensaje de commit"
git push origin main
```

## 📱 Compartir con alumnos

Una vez activado, puedes compartir este enlace con tus alumnos:
**https://elcorreveidile.github.io/intensivo8/**

## 🐛 Solución de problemas

### Si el sitio no aparece después de 5 minutos:

1. Verifica que el workflow haya finalizado correctamente en la pestaña **Actions**
2. Limpia la caché de tu navegador
3. Asegúrate de que estás usando la URL correcta (todo en minúsculas)

### Si hay errores en el workflow:

1. Ve a la pestaña **Actions**
2. Haz clic en el workflow fallido
3. Revisa los logs para identificar el problema
4. Corrige el error y haz un nuevo push

### Si quieres modificar el dominio:

1. Ve a **Settings** > **Pages**
2. En **Custom domain**, puedes añadir tu propio dominio
3. O deja el dominio por defecto de GitHub Pages

## 📊 Estadísticas

GitHub Pages te proporciona estadísticas de visitas:
1. Ve a la pestaña **Insights** en tu repositorio
2. Haz clic en **Traffic** para ver las visitas

---

**¡Tu sitio educativo estará online y disponible para tus alumnos!**