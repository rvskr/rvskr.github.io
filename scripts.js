document.addEventListener("DOMContentLoaded", function() {
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    themeToggleCheckbox.addEventListener('change', toggleDarkMode);
    loadDarkTheme(); // Загружаем темную тему при загрузке страницы
    openTab('projects'); // Открываем вкладку проектов по умолчанию
});

class ProjectLoader {
    constructor(username) {
        this.username = username;
        this.projectsList = document.getElementById('projects-list');
    }

    async loadProjects() {
        console.log(`Загружаем проекты для пользователя: ${this.username}`);
        try {
            const response = await fetch(`https://api.github.com/users/${this.username}/repos?per_page=100`);
            if (!response.ok) {
                throw new Error('Произошла ошибка при загрузке проектов. Пожалуйста, проверьте имя пользователя и повторите попытку.');
            }
            const data = await response.json();
            this.displayProjects(data);
        } catch (error) {
            this.projectsList.innerHTML = `<p>${error.message}</p>`;
            console.error('Ошибка получения данных:', error);
        }
    }

    displayProjects(repos) {
        this.projectsList.innerHTML = '';
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        repos.forEach(repo => {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');

            const projectName = document.createElement('div');
            projectName.classList.add('project-name');
            projectName.textContent = repo.name;

            const projectDescription = document.createElement('div');
            projectDescription.classList.add('project-description');
            projectDescription.textContent = repo.description || 'Описание отсутствует';

            const repoLink = document.createElement('a');
            repoLink.classList.add('project-link');
            repoLink.href = repo.html_url;
            repoLink.target = "_blank";
            repoLink.textContent = 'Репозиторий';

            const lastUpdated = document.createElement('div');
            lastUpdated.classList.add('project-last-updated');
            lastUpdated.textContent = `Последнее обновление: ${new Date(repo.updated_at).toLocaleDateString()}`;

            projectDiv.appendChild(projectName);
            projectDiv.appendChild(projectDescription);
            projectDiv.appendChild(repoLink);
            projectDiv.appendChild(lastUpdated);

            if (repo.has_pages) {
                const visitBtn = document.createElement('button');
                visitBtn.classList.add('visit-btn');
                visitBtn.textContent = 'Перейти на сайт';
                visitBtn.addEventListener('click', () => {
                    window.open(`https://${this.username}.github.io/${repo.name}`);
                });
                projectDiv.appendChild(visitBtn);
            }

            this.projectsList.appendChild(projectDiv);
        });
    }
}

function openTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
    });

    const selectedTab = document.getElementById(tabName);
    selectedTab.style.display = 'block';

    const selectedTabButton = document.querySelector(`.tab[data-tab="${tabName}"]`);
    selectedTabButton.classList.add('active');

    if (tabName === 'projects') {
        loadProjects(); // Загружаем проекты при открытии вкладки "Проекты"
    }
}

function loadProjects() {
    const username = document.getElementById('username').value;
    const projectLoader = new ProjectLoader(username);
    projectLoader.loadProjects();
}

function toggleDarkMode() {
    const body = document.body;
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    
    body.classList.toggle('dark-mode');
    saveTheme(themeToggleCheckbox.checked); // Сохраняем текущее состояние чекбокса
    loadDarkThemeStyles(themeToggleCheckbox.checked);
}

function saveTheme(isDarkMode) {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode)); // Сохраняем состояние чекбокса в localStorage
}

function loadDarkTheme() {
    const body = document.body;
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    
    // Загружаем состояние чекбокса из localStorage, если оно там сохранено
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    
    // При первом посещении сайта устанавливаем темную тему и чекбокс включенным
    if (isDarkMode === true || isDarkMode === null) {
        body.classList.add('dark-mode'); // Добавляем класс темной темы, если чекбокс был выбран или localStorage пуст
        themeToggleCheckbox.checked = true; // Устанавливаем чекбокс "Тёмная тема" как выбранный
        saveTheme(true); // Сохраняем в localStorage состояние чекбокса
    } else {
        body.classList.remove('dark-mode'); // Убираем класс темной темы, если чекбокс не был выбран
        themeToggleCheckbox.checked = false; // Устанавливаем чекбокс "Тёмная тема" как не выбранный
    }

    loadDarkThemeStyles(isDarkMode);
}

function loadDarkThemeStyles(isDarkMode) {
    const darkModeStyles = document.getElementById('dark-mode-styles');

    if (isDarkMode && !darkModeStyles) {
        const link = document.createElement('link');
        link.id = 'dark-mode-styles';
        link.rel = 'stylesheet';
        link.href = 'dark-mode.css';
        document.head.appendChild(link);
    } else if (!isDarkMode && darkModeStyles) {
        document.head.removeChild(darkModeStyles);
    }
}

// Функция для отправки данных формы в Google Форму
function submitGoogleForm(name, email, message) {
    const formData = new FormData();
    formData.append("entry.2099680010", name);  // ID поля "Имя:"
    formData.append("entry.1582618556", email); // ID поля "Email:"
    formData.append("entry.9658606", message);  // ID поля "Сообщение:"

    fetch('https://docs.google.com/forms/d/e/1FAIpQLSd94DKnl52L6D6ZC3JXELmOX8iQsl7Z3ztlM2n8vykHdiI8Tw/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    })
    .then(response => {
        // Код обработки успешной отправки
        console.log('Данные успешно отправлены в Google Форму');
        document.getElementById('formResponse').style.display = 'block'; // Показать сообщение об успешной отправке
        document.getElementById('contactForm').reset(); // Очистить форму
    })
    .catch(error => {
        // Код обработки ошибки
        console.error('Произошла ошибка при отправке данных:', error);
    });
}

// Пример использования:
const nameInput = document.getElementById('name');       // Получение поля "Имя:"
const emailInput = document.getElementById('email');     // Получение поля "Email:"
const messageInput = document.getElementById('message'); // Получение поля "Сообщение:"

// Обработчик события отправки формы
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращение стандартной отправки формы

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Проверка наличия всех необходимых данных
    if (name && email && message) {
        submitGoogleForm(name, email, message); // Отправка данных в Google Форму
    } else {
        alert('Пожалуйста, заполните все обязательные поля: Имя, Email и Сообщение.');
    }
});
