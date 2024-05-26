document.addEventListener("DOMContentLoaded", function() {
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    themeToggleCheckbox.addEventListener('change', toggleDarkMode);
    loadTheme();
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
        const username = document.getElementById('username').value;
        const projectLoader = new ProjectLoader(username);
        projectLoader.loadProjects(); // Загружаем проекты при открытии вкладки "Проекты"
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
    saveTheme(themeToggleCheckbox.checked);
}

function saveTheme(isDarkMode) {
    localStorage.setItem('darkMode', isDarkMode);
}

function loadTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const body = document.body;
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeToggleCheckbox.checked = true;
    }
}
