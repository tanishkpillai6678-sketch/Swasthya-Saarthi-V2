
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Video, Phone, MoreVertical, Check, CheckCheck } from 'lucide-react';
import { chatService } from '../services/chatService';
import { ChatMessage } from '../types';
import { User } from '../types';

const ConsultationChat: React.FC<{ user: User }> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock doctor details - in real app fetch based on ID
  const doctorName = "Dr. Anjali Sharma";
  const doctorStatus = "Online";

  useEffect(() => {
    if (!id) return;

    const unsubscribe = chatService.subscribe(id, (msgs) => {
      setMessages(msgs);
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    return () => unsubscribe();
  }, [id]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !id) return;

    const text = inputText;
    setInputText('');
    await chatService.sendMessage(id, user.uid, text);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
      
      {/* Header */}
      <div className="bg-primary-600 p-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-primary-700 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="relative">
            <img 
               src="https://picsum.photos/200/200?random=1" 
               alt="Doctor" 
               className="w-10 h-10 rounded-full border-2 border-primary-400"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-primary-600 rounded-full"></div>
          </div>
          <div>
            <h2 className="font-bold text-sm md:text-base leading-tight">{doctorName}</h2>
            <p className="text-xs text-primary-200">{doctorStatus}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2 hover:bg-primary-700 rounded-full transition-colors">
             <Video size={20} />
           </button>
           <button className="p-2 hover:bg-primary-700 rounded-full transition-colors">
             <Phone size={20} />
           </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950 space-y-4">
         <div className="text-center text-xs text-slate-400 my-4">
           Consultation Started • {new Date().toLocaleDateString()}
         </div>

         {messages.map((msg) => {
           const isMe = msg.senderId === user.uid;
           return (
             <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                 isMe 
                   ? 'bg-primary-600 text-white rounded-br-none' 
                   : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700'
               }`}>
                 <p className="text-sm">{msg.text}</p>
                 <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${
                   isMe ? 'text-primary-200' : 'text-slate-400'
                 }`}>
                   {formatTime(msg.timestamp)}
                   {isMe && (
                     <span>
                       {msg.status === 'sent' && <Check size={12} />}
                       {msg.status === 'delivered' && <CheckCheck size={12} />}
                       {msg.status === 'read' && <CheckCheck size={12} className="text-blue-300" />}
                     </span>
                   )}
                 </div>
               </div>
             </div>
           );
         })}
         <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          />
          <button 
            type="submit" 
            disabled={!inputText.trim()}
            className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600 transition-colors shadow-lg"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationChat;
