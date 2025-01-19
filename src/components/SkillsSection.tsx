import React from 'react';
import { Code2 } from 'lucide-react';

const SkillsSection = ({ t, programmingLanguages }) => {
  // Переносим сюда объект с цветами языков
  const languageColors = {
    JavaScript: '#f7df1e',
    TypeScript: '#007acc',
    Python: '#3776ab',
    Java: '#b07219',
    Go: '#00add8',
    Rust: '#dea584',
    HTML: '#e34c26',
    CSS: '#563d7c',
    PHP: '#4F5D95',
  };

  // Рассчитываем проценты внутри компонента
  const totalLanguagesCount = programmingLanguages.reduce((acc, lang) => acc + lang.size, 0);

  const languagesWithPercentages = programmingLanguages.map((lang) => ({
    ...lang,
    percentage: totalLanguagesCount > 0 ? Math.round((lang.size / totalLanguagesCount) * 100) : 0,
    color: languageColors[lang.name] || '#6e7681', // Используем цвет для языка
  }));

  // Сортируем языки по убыванию процента
  const sortedLanguages = languagesWithPercentages.sort((a, b) => b.size - a.size);

  return (
    <section id="skills" className="py-20 px-4 bg-[#0d1117]">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <Code2 className="w-6 h-6" />
          {t.skills}
        </h3>
        <div className="grid grid-cols-1 gap-6">
          {sortedLanguages.map((lang) => (
            <div key={lang.name} className="bg-[#161b22] p-4 rounded-lg hover:bg-[#1f2937] transition-colors">
              <div className="flex justify-between mb-2">
                <span>{lang.name}</span>
                <span>{lang.percentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full transition-all duration-1000"
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
