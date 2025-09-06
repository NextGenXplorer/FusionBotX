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
    <div className="w-64 bg-gray-100 dark:bg-gray-900 h-full flex flex-col border-r border-gray-200 dark:border-gray-700">
      {/* Header with New Chat Button */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 p-2 rounded-lg bg-primary text-white hover:bg-opacity-90 transition-colors"
        >
          <Plus size={20} />
          New Chat
        </button>
      </div>

      {/* Chat Session List */}
      <nav className="flex-grow p-2 overflow-y-auto">
        <ul>
          {sessions.map(session => (
            <li key={session.id} className="my-1">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchChat(session.id);
                }}
                className={`flex items-center gap-3 p-2 rounded-lg text-sm transition-colors ${
                  activeSessionId === session.id
                    ? 'bg-primary/20 text-primary dark:text-white'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                <MessageSquare size={16} className="flex-shrink-0" />
                <span className="truncate flex-grow">{session.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent switching chat when deleting
                    onDeleteChat(session.id);
                  }}
                  className="ml-2 p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-500/10 opacity-50 hover:opacity-100"
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
