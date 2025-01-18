// types.ts
export type Language = {
    name: string;
    size: number;
    color: string;
    percentage?: number;
  };
  
  export type Repository = {
    name: string;
    description: string;
    html_url: string;
    homepage: string | null;
    created_at: string;
    pushed_at: string;
    stargazers_count: number;
    forks_count: number;
    languages_url: string;
  };
  
  export type Translation = {
    title: string;
    about: string;
    skills: string;
    contact: string;
    name: string;
    email: string;
    message: string;
    send: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    projects: string;
    created: string;
    lastUpdate: string;
    viewProject: string;
    viewGitHub: string;
    loading: string;
    codeStats: string;
    contactMe: string;
    menu: {
      about: string;
      skills: string;
      projects: string;
      contact: string;
    };
  };