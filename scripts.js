document.addEventListener("DOMContentLoaded", function() {
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    themeToggleCheckbox.addEventListener('change', toggleDarkMode);
    loadTheme();
    loadProjects();
});

function loadProjects() {
    const username = document.getElementById('username').value;

    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        .then(response => response.json())
        .then(data => {
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
            projectsList.innerHTML = '<p>Произошла ошибка при загрузке проектов.</p>';
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