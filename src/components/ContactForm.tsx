// src/components/ContactForm.tsx
import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

const ContactForm = ({ t, handleSubmit }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const sendMessageToTelegram = async (formData) => {
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;  
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;  
    console.log('Environment variables check:');
    console.log('VITE_TELEGRAM_BOT_TOKEN exists:', !!token);
    console.log('VITE_TELEGRAM_CHAT_ID exists:', !!chatId);
    console.log('Process env:', import.meta.env); // Это покажет все доступные переменные окружения
    
    if (!token || !chatId) {
      console.error('Token:', token);
      console.error('Chat ID:', chatId);
      console.error('Telegram bot token or chat ID is missing');
      return;
    }
    
    if (!token || !chatId) {
      console.error('Telegram bot token or chat ID is missing');
      return;
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const message = `New message from ${formData.name} (${formData.email}):\n${formData.message}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setModalMessage(t.successMessage); 
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error(error);
      setModalMessage(t.errorMessage); // Текст сообщения при ошибке
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    setLoading(true);

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    await sendMessageToTelegram({ name, email, message });

    setLoading(false);
  };

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
