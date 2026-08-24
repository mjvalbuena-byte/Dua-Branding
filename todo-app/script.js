// Elementos del DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const clearBtn = document.getElementById('clearBtn');
const totalCount = document.getElementById('totalCount');
const completedCount = document.getElementById('completedCount');
const pendingCount = document.getElementById('pendingCount');
const filterBtns = document.querySelectorAll('.filter-btn');

// Estado
let tasks = [];
let currentFilter = 'all';

// LocalStorage keys
const STORAGE_KEY = 'todoApp_tasks';

// ============================================
// FUNCIONES DE LOCALSTORE
// ============================================

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem(STORAGE_KEY);
    tasks = saved ? JSON.parse(saved) : [];
}

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

function addTask(text) {
    if (text.trim() === '') {
        alert('Por favor ingresa una tarea');
        return;
    }

    const task = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toLocaleString('es-ES')
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    updateStats();
    taskInput.value = '';
    taskInput.focus();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    updateStats();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

function clearCompleted() {
    const completedTasks = tasks.filter(t => t.completed);
    if (completedTasks.length === 0) {
        alert('No hay tareas completadas para eliminar');
        return;
    }

    if (confirm(`¿Estás seguro de que deseas eliminar ${completedTasks.length} tarea(s) completada(s)?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// ============================================
// RENDER Y UI
// ============================================

function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
    }
}

function renderTasks() {
    const filteredTasks = getFilteredTasks();
    taskList.innerHTML = '';

    if (filteredTasks.length === 0) {
        emptyState.classList.add('show');
        return;
    }

    emptyState.classList.remove('show');

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''}
                data-id="${task.id}"
            >
            <span class="task-text">${escapeHtml(task.text)}</span>
            <button class="delete-btn" data-id="${task.id}">🗑️ Eliminar</button>
        `;

        taskList.appendChild(li);
    });

    // Event listeners para checkboxes y botones de eliminar
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            toggleTask(parseInt(e.target.dataset.id));
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            deleteTask(parseInt(e.target.dataset.id));
        });
    });
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    totalCount.textContent = total;
    completedCount.textContent = completed;
    pendingCount.textContent = pending;

    // Deshabilitar botón de limpiar si no hay completadas
    clearBtn.disabled = completed === 0;
}

// ============================================
// EVENT LISTENERS
// ============================================

addBtn.addEventListener('click', () => {
    addTask(taskInput.value);
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask(taskInput.value);
    }
});

clearBtn.addEventListener('click', clearCompleted);

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderTasks();
    });
});

// ============================================
// UTILIDADES
// ============================================

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ============================================
// INICIALIZACIÓN
// ============================================

function init() {
    loadTasks();
    renderTasks();
    updateStats();
    taskInput.focus();
}

// Iniciar la app cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}