import React from 'react';
import TaskCard from './TaskCard';
import { FiInbox, FiPlus } from 'react-icons/fi';

const TaskList = ({ tasks, onToggle, onEdit, onDelete, onAddTaskClick, hasFilters }) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        {/* Modern Minimalist SVG Illustration */}
        <div className="w-48 h-48 mb-6 text-sage/60">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Background blob/shape */}
            <path
              d="M30 100C30 55.8172 65.8172 20 110 20C154.183 20 190 55.8172 190 100C190 144.183 154.183 180 110 180C65.8172 180 30 144.183 30 100Z"
              fill="#D8F3DC"
              fillOpacity="0.4"
            />
            {/* Notebook page representation */}
            <rect x="65" y="55" width="80" height="100" rx="12" fill="white" stroke="#A8D5BA" strokeWidth="3" />
            {/* Header coil binding */}
            <circle cx="85" cy="45" r="5" fill="#5F6B6D" />
            <circle cx="105" cy="45" r="5" fill="#5F6B6D" />
            <circle cx="125" cy="45" r="5" fill="#5F6B6D" />
            
            <path d="M85 45V55" stroke="#5F6B6D" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M105 45V55" stroke="#5F6B6D" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M125 45V55" stroke="#5F6B6D" strokeWidth="2.5" strokeLinecap="round" />

            {/* Checklist items (placeholder lines) */}
            <line x1="85" y1="80" x2="125" y2="80" stroke="#ECECEC" strokeWidth="3" strokeLinecap="round" />
            <line x1="85" y1="105" x2="115" y2="105" stroke="#ECECEC" strokeWidth="3" strokeLinecap="round" />
            <line x1="85" y1="130" x2="130" y2="130" stroke="#ECECEC" strokeWidth="3" strokeLinecap="round" />

            {/* A small completed green checkmark badge */}
            <circle cx="145" cy="140" r="16" fill="#10B981" />
            <path d="M139 140L143 144L151 135" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h3 className="font-sans font-bold text-lg text-slategrey-dark mb-1">
          {hasFilters ? 'No matching tasks found' : 'All clear for now!'}
        </h3>
        <p className="text-sm text-slategrey-light max-w-sm mb-6">
          {hasFilters
            ? 'Try resetting your search query or sorting/filtering criteria.'
            : 'You don’t have any tasks in this view. Enjoy your day, or create a new task to stay organized.'}
        </p>

        {!hasFilters && (
          <button
            onClick={onAddTaskClick}
            className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-slategrey-dark font-bold text-sm px-5 py-2.5 rounded-xl shadow-soft transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            <FiPlus size={16} />
            <span>Create First Task</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
