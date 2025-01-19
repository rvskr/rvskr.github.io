import React from 'react';
import { Github, Mail, Phone, MessageCircle, DiscIcon as BrandDiscord } from 'lucide-react';


interface FooterProps {
  t: any;
  programmingLanguages: { name: string; percentage: number; color: string }[];
}

const Footer: React.FC<FooterProps> = ({ t, programmingLanguages }) => {
  return (
    <footer className="bg-[#161b22] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">{t.contactMe}</h4>
            <div className="space-y-4">
              <a
                href="https://t.me/r_vskr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Telegram
              </a>
              <a
                href="https://discord.com/users/yourid"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <BrandDiscord className="w-5 h-5" />
                Discord
              </a>
              <a
                href="https://github.com/rvskr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a
                href="mailto:roman.mayber@gmail.com"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                roman.mayber@gmail.com
              </a>
              <a
                href="tel:+380988609833"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                +380988609833
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">{t.codeStats}</h4>
            <div className="space-y-2">
                         
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
