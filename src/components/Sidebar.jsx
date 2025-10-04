import React from 'react';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';

const Sidebar = ({
  sessions,
  activeSessionId,
  onNewChat,
  onSwitchChat,
  onDeleteChat,
}) => {
  return (
    <div className="w-64 bg-[var(--color-surface)] h-full flex flex-col border-r border-[var(--color-border)]">
      {/* Header with New Chat Button */}
      <div className="p-4 border-b border-[var(--color-border)]">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-200"
        >
          <Plus size={20} />
          New Chat
        </button>
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
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-primary shadow-sm border border-primary/20'
                    : 'hover:bg-[var(--color-background)] border border-transparent'
                }`}
              >
                <MessageSquare size={16} className="flex-shrink-0" />
                <span className="truncate flex-grow font-medium">{session.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(session.id);
                  }}
                  className="ml-2 p-1.5 rounded-lg text-[var(--color-muted)] hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
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
