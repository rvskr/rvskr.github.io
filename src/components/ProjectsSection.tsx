import React, { useState, useEffect } from 'react';
import { Github, Calendar, Star, GitFork, Globe } from 'lucide-react';

const ProjectsSection = ({ t, loading, repos, formatDate }) => {
  const [visibleRepos, setVisibleRepos] = useState(4); // Число видимых репозиториев
  const [sortedRepos, setSortedRepos] = useState([]);

  // Сортировка репозиториев по дате последнего обновления (pushed_at)
  useEffect(() => {
    const sorted = [...repos].sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
    setSortedRepos(sorted);
  }, [repos]);

  const handleLoadMore = () => {
    setVisibleRepos((prevVisible) => prevVisible + 4); // Показываем еще 4 репозитория
  };

  return (
    <section id="projects" className="py-20 px-4 bg-[#161b22]">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <Github className="w-6 h-6" />
          {t.projects}
        </h3>
        {loading ? (
          <div className="text-center text-gray-400">{t.loading}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedRepos.slice(0, visibleRepos).map((repo) => {
              // Приоритет: если есть homepage, то используем его
              const repoHomepage = repo.homepage;
              const hasGitHubPages = repo.has_pages; // Используем поле has_pages

              // Определяем, какую ссылку показывать: сначала ссылка из About, если она есть
              const projectLink = repoHomepage || (hasGitHubPages ? `https://${repo.owner.login}.github.io/${repo.name}` : null);

              return (
                <div
                  key={repo.name}
                  className="bg-[#0d1117] p-6 rounded-lg hover:bg-[#1f2937] transition-colors"
                >
                  <h4 className="text-xl font-semibold mb-2">{repo.name}</h4>
                  <p className="text-gray-400 mb-4">{repo.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{t.created}: {formatDate(repo.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{t.lastUpdate}: {formatDate(repo.pushed_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#238636] hover:bg-[#2ea043] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      {t.viewGitHub}
                    </a>
                    {/* Показываем кнопку "View Project" только если есть ссылка */}
                    {projectLink && (
                      <a
                        href={projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#161b22] hover:bg-[#1f2937] transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        {t.viewProject}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {sortedRepos.length > visibleRepos && (
          <div className="mt-6 text-center">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white rounded-md"
            >
              {t.loadMore}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
