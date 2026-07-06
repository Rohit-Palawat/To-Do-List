import React from 'react';
import { FiCalendar, FiEdit2, FiTrash2 } from 'react-icons/fi';

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const { _id, title, description, dueDate, priority, category, completed } = task;

  // Format Due Date
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Determine if task is overdue
  const isOverdue = () => {
    if (!dueDate || completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  };

  // Priority Styles
  const getPriorityStyles = (prio) => {
    switch (prio) {
      case 'High':
        return 'bg-accent-red/10 text-accent-red border border-accent-red/20';
      case 'Medium':
        return 'bg-accent-amber/10 text-accent-amber border border-accent-amber/20';
      case 'Low':
      default:
        return 'bg-lightgrey text-slategrey border border-lightgrey-dark/10';
    }
  };

  // Category Colors
  const getCategoryStyles = (cat) => {
    switch (cat) {
      case 'Work':
        return 'bg-accent-amber/10 text-accent-amber-dark border border-accent-amber/10';
      case 'Study':
        return 'bg-sage/20 text-sage-dark border border-sage/10';
      case 'Personal':
        return 'bg-blue-100 text-blue-600 border border-blue-200/50';
      case 'Others':
      default:
        return 'bg-lightgrey text-slategrey border border-lightgrey-dark/10';
    }
  };

  return (
    <div
      className={`group relative flex items-start gap-4 p-5 bg-white rounded-2xl border transition-all duration-300 hover:shadow-soft hover:scale-[1.005] ${
        completed ? 'border-lightgrey opacity-75' : 'border-lightgrey hover:border-sage/40'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(_id)}
        className={`flex-shrink-0 flex items-center justify-center w-5.5 h-5.5 rounded-lg border-2 mt-0.5 transition-all duration-200 ${
          completed
            ? 'bg-accent-green border-accent-green text-white scale-100'
            : 'border-slategrey-light/40 hover:border-sage hover:bg-mint/10'
        }`}
        aria-label={completed ? 'Mark task as incomplete' : 'Mark task as complete'}
      >
        {completed && (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path d="M7.629 14.571L3.371 10.314l1.414-1.414 2.843 2.843 7.071-7.071 1.414 1.414z" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          {/* Priority Badge */}
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${getPriorityStyles(priority)}`}>
            {priority}
          </span>
          {/* Category Badge */}
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${getCategoryStyles(category)}`}>
            {category}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-sans font-semibold text-[15px] text-slategrey-dark transition-all duration-200 mb-1 leading-snug break-words ${
            completed ? 'line-through text-slategrey-light font-normal' : ''
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p
            className={`text-sm text-slategrey-light line-clamp-2 mb-3 break-words ${
              completed ? 'line-through text-slategrey-light/60' : ''
            }`}
          >
            {description}
          </p>
        )}

        {/* Footer/Due Date */}
        {dueDate && (
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-md ${
                completed
                  ? 'text-slategrey-light bg-lightgrey/30'
                  : isOverdue()
                  ? 'text-accent-red bg-accent-red/5 font-semibold'
                  : 'text-slategrey bg-lightgrey/40'
              }`}
            >
              <FiCalendar className="w-3.5 h-3.5" />
              <span>{formatDate(dueDate)}</span>
              {!completed && isOverdue() && <span className="text-[10px] font-bold uppercase tracking-wide ml-0.5">Overdue</span>}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-4 right-4">
        <button
          onClick={() => onEdit(task)}
          className="p-1.5 rounded-lg text-slategrey hover:text-accent-blue hover:bg-blue-50 transition-colors"
          title="Edit Task"
        >
          <FiEdit2 size={15} />
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="p-1.5 rounded-lg text-slategrey hover:text-accent-red hover:bg-red-50 transition-colors"
          title="Delete Task"
        >
          <FiTrash2 size={15} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
