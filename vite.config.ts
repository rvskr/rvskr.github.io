import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Загружаем переменные окружения в зависимости от режима (development/production)
  const env = loadEnv(mode, process.cwd());

  return {
    envPrefix: 'VITE_',
    base: './', // Изменено с '/' на './' для корректной работы с GitHub Pages
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    define: {
      // Явно определяем переменные окружения
      'import.meta.env.VITE_TELEGRAM_BOT_TOKEN': JSON.stringify(env.VITE_TELEGRAM_BOT_TOKEN),
      'import.meta.env.VITE_TELEGRAM_CHAT_ID': JSON.stringify(env.VITE_TELEGRAM_CHAT_ID)
    }
  };
});