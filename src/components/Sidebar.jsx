import React from 'react';
import { Plus, MessageSquare, Trash2, Sparkles, History } from 'lucide-react';

const Sidebar = ({
  sessions,
  activeSessionId,
  onNewChat,
  onSwitchChat,
  onDeleteChat,
}) => {
  return (
    <div className="w-64 md:w-64 bg-slate-50 dark:bg-slate-800 h-full flex flex-col border-r border-slate-200 dark:border-slate-700 shadow-xl md:shadow-none">
      {/* Sidebar Top Header - Matches main header height */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 dark:from-orange-500/5 dark:via-amber-500/5 dark:to-yellow-500/5 border-b border-slate-200 dark:border-slate-700">
        <div className="p-4 md:py-6 md:px-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-base md:text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                MiniChatBot
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">AI Assistant</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Chat Button Section */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-medium shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-200"
        >
          <Plus size={20} />
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat History Label */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
          <History size={14} />
          <span>Recent Chats</span>
          <span className="ml-auto px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold">
            {sessions.length}
          </span>
        </div>
      </div>

      {/* Chat Session List */}
      <nav className="flex-grow p-3 overflow-y-auto">
        <ul className="space-y-1">
          {sessions.map(session => (
            <li key={session.id}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchChat(session.id);
                }}
                className={`group flex items-center gap-3 p-3 rounded-xl text-sm transition-all duration-200 ${
                  activeSessionId === session.id
                    ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-600 dark:text-orange-400 shadow-sm border border-orange-200 dark:border-orange-800'
                    : 'hover:bg-white dark:hover:bg-slate-700 border border-transparent'
                }`}
              >
                <MessageSquare size={16} className="flex-shrink-0" />
                <span className="truncate flex-grow font-medium">{session.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(session.id);
                  }}
                  className="ml-2 p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
                  title="Delete Chat"
                >
                  <Trash2 size={14} />
                </button>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
