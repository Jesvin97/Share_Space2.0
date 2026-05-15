import React from 'react';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isBot = message.role === 'assistant';

  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${isBot ? 'bg-black text-white' : 'bg-gray-200 text-black'} mx-2`}>
          {isBot ? <Bot size={16} /> : <User size={16} />}
        </div>
        <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
          isBot 
            ? 'bg-white border border-gray-100 text-gray-800' 
            : 'bg-black text-white'
        }`}>
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
