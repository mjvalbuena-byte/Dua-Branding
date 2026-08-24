# 📋 Aplicación de Lista de Tareas

## Descripción

Aplicación web simple y elegante para gestionar tu lista de tareas diarias. Los datos se guardan automáticamente en el navegador usando **localStorage**, por lo que tus tareas se mantienen incluso después de cerrar la pestaña.

## ✨ Características

- ✅ **Agregar tareas** - Ingresa nuevas tareas fácilmente
- ✅ **Marcar como completadas** - Checkea las tareas que termines
- ✅ **Eliminar tareas** - Borra tareas individuales
- ✅ **Filtrar tareas** - Visualiza todas, solo pendientes o solo completadas
- ✅ **Limpiar completadas** - Elimina todas las tareas completadas de una vez
- ✅ **Estadísticas** - Visualiza el total, completadas y pendientes
- ✅ **localStorage** - Tus tareas se guardan automáticamente
- ✅ **Responsivo** - Funciona en celular, tablet y desktop
- ✅ **Interfaz moderna** - Diseño limpio y atractivo

## 🚀 Cómo usar

### Opción 1: Abrir directamente en el navegador

1. Descarga los archivos
2. Abre `index.html` en tu navegador
3. ¡Comienza a agregar tareas!

### Opción 2: Ver en GitHub Pages

Si está configurado en el repositorio:
```
https://mjvalbuena-byte.github.io/Dua-Branding/todo-app/
```

## 📁 Estructura de archivos

```
todo-app/
├── index.html      # Estructura HTML
├── styles.css      # Estilos CSS
├── script.js       # Lógica JavaScript
└── README.md       # Este archivo
```

## 🛠️ Tecnologías utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones
- **JavaScript (Vanilla)** - Funcionalidad
- **localStorage API** - Persistencia de datos

## 📊 Cómo funciona localStorage

La aplicación guarda automáticamente tus tareas en el navegador:

```javascript
// Guardar tareas
localStorage.setItem('todoApp_tasks', JSON.stringify(tasks));

// Cargar tareas
const saved = localStorage.getItem('todoApp_tasks');
```

Los datos se mantienen incluso:
- ✅ Al cerrar la pestaña
- ✅ Al cerrar el navegador
- ✅ Al apagar la computadora

**Nota:** Se borran si limpias el historial del navegador (caché).

## 🎨 Personalización

Puedes cambiar los colores editando las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Color principal */
    --success-color: #10b981;      /* Color de éxito */
    --danger-color: #ef4444;       /* Color de peligro */
    /* ... más variables */
}
```

## 🌐 Compatibilidad

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Navegadores móviles

## 📝 Ejemplo de datos guardados

Las tareas se guardan en localStorage como JSON:

```json
[
  {
    "id": 1692806400000,
    "text": "Completar el proyecto DUA",
    "completed": false,
    "createdAt": "24/8/2026, 14:30:00"
  },
  {
    "id": 1692806500000,
    "text": "Revisar presentación",
    "completed": true,
    "createdAt": "24/8/2026, 14:31:40"
  }
]
```

## 🔧 Funciones principales

### `addTask(text)`
Agrega una nueva tarea a la lista.

### `deleteTask(id)`
Elimina una tarea específica.

### `toggleTask(id)`
Marca una tarea como completada/pendiente.

### `clearCompleted()`
Elimina todas las tareas completadas.

### `renderTasks()`
Re-renderiza la interfaz con las tareas actuales.

### `saveTasks()` / `loadTasks()`
Guarda y carga tareas desde localStorage.

## 💡 Tips de uso

1. **Atajo de teclado:** Presiona `Enter` después de escribir para agregar una tarea
2. **Filtrado rápido:** Usa los botones de filtro para ver solo lo que necesitas
3. **Limpieza:** Usa "Limpiar completadas" para mantener tu lista organizada

## 🐛 Solución de problemas

### Las tareas no se guardan
- Verifica que localStorage esté habilitado en tu navegador
- Intenta limpiar el caché y recargar la página

### No veo las tareas guardadas
- Abre DevTools (F12) → Application → LocalStorage
- Busca la clave `todoApp_tasks`

## 📄 Licencia

Libre para usar y modificar.

---

**Hecho con ❤️ por MJ Valbuena**