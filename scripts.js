document.addEventListener("DOMContentLoaded", function() {
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    themeToggleCheckbox.addEventListener('change', toggleDarkMode);
    loadTheme();
    openTab('projects'); // Открываем вкладку проектов по умолчанию
});

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
    console.log(`Загружаем проекты для пользователя: ${username}`);

    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Произошла ошибка при загрузке проектов. Пожалуйста, проверьте имя пользователя и повторите попытку.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Полученные данные:', data);
            const projectsList = document.getElementById('projects-list');
            projectsList.innerHTML = '';

            data.forEach(repo => {
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

                projectDiv.appendChild(projectName);
                projectDiv.appendChild(projectDescription);
                projectDiv.appendChild(repoLink);

                if (repo.has_pages) {
                    const visitBtn = document.createElement('button');
                    visitBtn.classList.add('visit-btn');
                    visitBtn.textContent = 'Перейти на сайт';
                    visitBtn.addEventListener('click', function() {
                        window.open(`https://${username}.github.io/${repo.name}`);
                    });
                    projectDiv.appendChild(visitBtn);
                }

                projectsList.appendChild(projectDiv);
            });
        })
        .catch(error => {
            const projectsList = document.getElementById('projects-list');
            projectsList.innerHTML = `<p>${error.message}</p>`;
            console.error('Ошибка получения данных:', error);
        });
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
