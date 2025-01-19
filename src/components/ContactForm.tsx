import React, { useState, useEffect } from 'react';
import { Mail, Send } from 'lucide-react';

const ContactForm = ({ t, handleSubmit }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  // Проверяем переменные окружения при монтировании компонента
  useEffect(() => {
    console.log('Environment variables check on mount:');
    console.log('VITE_TELEGRAM_BOT_TOKEN exists:', !!import.meta.env.VITE_TELEGRAM_BOT_TOKEN);
    console.log('VITE_TELEGRAM_CHAT_ID exists:', !!import.meta.env.VITE_TELEGRAM_CHAT_ID);
    console.log('Environment variables:', {
      token: import.meta.env.VITE_TELEGRAM_BOT_TOKEN ? '[EXISTS]' : '[MISSING]',
      chatId: import.meta.env.VITE_TELEGRAM_CHAT_ID ? '[EXISTS]' : '[MISSING]'
    });
  }, []);

  const sendMessageToTelegram = async (formData) => {
    try {
      // Получаем переменные окружения
      const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      // Проверяем наличие переменных окружения
      if (!token || !chatId) {
        console.error('Configuration error:', {
          hasToken: !!token,
          hasChatId: !!chatId,
          envKeys: Object.keys(import.meta.env)
        });
        setModalMessage(t.errorMessage);
        throw new Error('Telegram configuration is missing');
      }

      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      const message = `New message from ${formData.name} (${formData.email}):\n${formData.message}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        }),
      });

      // Проверяем ответ от API Telegram
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Telegram API error:', {
          status: response.status,
          statusText: response.statusText,
          data
        });
        throw new Error(data.description || 'Failed to send message');
      }

      setIsSuccess(true);
      setModalMessage(t.successMessage);
    } catch (error) {
      console.error('Send message error:', error);
      setIsSuccess(false);
      setModalMessage(t.errorMessage);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.target);
      const formValues = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      await sendMessageToTelegram(formValues);
    } finally {
      setLoading(false);
    }
  };

  // Остальной JSX код остается без изменений
  return (
    <section id="contact" className="py-20 px-4 bg-[#0d1117]">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <Mail className="w-6 h-6" />
          {t.contact}
        </h3>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
              {t.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-2 rounded-md bg-[#161b22] border border-gray-700 text-white focus:border-[#238636] focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
              {t.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={t.emailPlaceholder}
              className="w-full px-4 py-2 rounded-md bg-[#161b22] border border-gray-700 text-white focus:border-[#238636] focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
              {t.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder={t.messagePlaceholder}
              className="w-full px-4 py-2 rounded-md bg-[#161b22] border border-gray-700 text-white focus:border-[#238636] focus:outline-none transition-colors"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#238636] hover:bg-[#2ea043] transition-colors"
            disabled={loading}
          >
            {loading ? (
              <span>Отправка...</span>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {t.send}
              </>
            )}
          </button>
        </form>

        {isSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-[#161b22] p-8 rounded-md max-w-sm w-full shadow-xl">
              <h4 className="text-lg font-semibold text-[#238636]">{t.success}</h4>
              <p className="mt-2 text-sm text-gray-300">{modalMessage}</p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-6 px-6 py-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;