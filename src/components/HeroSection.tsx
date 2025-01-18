// src/components/HeroSection.tsx
import React from 'react';
import { Github, Mail } from 'lucide-react';

const HeroSection = ({ t }) => {
  return (
    <section id="about" className="relative py-32 px-4 bg-[#161b22] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '30px 30px',
          }}
        ></div>
      </div>
      <div className="max-w-6xl mx-auto relative">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            {t.title}
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">{t.about}</p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/rvskr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-[#238636] hover:bg-[#2ea043] transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a
              href="mailto:contact@example.com"
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-[#0d1117] hover:bg-[#1f2937] transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
