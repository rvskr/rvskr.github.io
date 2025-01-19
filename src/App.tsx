import React, { useState, useEffect } from 'react';
import Footer from './components/Footer';
import { Github } from 'lucide-react';
import translations from './translations';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ContactForm from './components/ContactForm';
import ProjectsSection from './components/ProjectsSection'; 
import SkillsSection from './components/SkillsSection'; 

function App() {
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  
  const t = translations[language];
  const CACHE_TIME = 20 * 60 * 1000; // 20 минут в миллисекундах

  // Функция для проверки и загрузки данных из кэша или с сервера
  const fetchReposAndLanguages = async () => {
    try {
      const cachedData = localStorage.getItem('reposAndLanguages');
      const cachedTime = localStorage.getItem('cacheTime');
      
      const currentTime = new Date().getTime();
      
      // Если кэш есть и он актуален
      if (cachedData && cachedTime && currentTime - cachedTime < CACHE_TIME) {
        const { repos, languages } = JSON.parse(cachedData);
        setProgrammingLanguages(languages);
        setRepos(repos);
        setLoading(false);
      } else {
        // Если кэша нет или он устарел
        const response = await fetch('https://api.github.com/users/rvskr/repos');
        const data = await response.json();

        const languagesMap = new Map();
        data.forEach((repo) => {
          if (repo.language) {
            const current = languagesMap.get(repo.language) || { size: 0 };
            languagesMap.set(repo.language, {
              size: current.size + 1,
            });
          }
        });

        const languages = Array.from(languagesMap.entries()).map(([name, { size }]) => ({
          name,
          size,
        }));

        setProgrammingLanguages(languages);
        setRepos(data);
        setLoading(false);

        // Кэшируем данные
        localStorage.setItem('reposAndLanguages', JSON.stringify({ repos: data, languages }));
        localStorage.setItem('cacheTime', currentTime.toString());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    fetchReposAndLanguages();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === 'en' ? 'en-US' : 'ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200">
      {/* Передаем t и setLanguage в Header */}
      <Header t={t} setLanguage={setLanguage} language={language} />

      {/* Hero Section */}
      <HeroSection t={t} />
      
      {/* Skills Section */}
      <SkillsSection t={t} programmingLanguages={programmingLanguages} />

      {/* Projects Section */}
      <ProjectsSection t={t} loading={loading} repos={repos} formatDate={formatDate} />

      {/* Contact Form */}
      <ContactForm t={t} handleSubmit={undefined} />

      {/* Footer */}
      <Footer t={t} programmingLanguages={programmingLanguages} />
    </div>
  );
}

export default App;
