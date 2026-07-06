import React, { useState, useEffect } from 'react';
import { FiX, FiCalendar } from 'react-icons/fi';

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Personal');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
      setPriority(task.priority || 'Medium');
      setCategory(task.category || 'Personal');
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium');
      setCategory('Personal');
    }
    setErrors({});
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple Validation
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      title,
      description,
      dueDate: dueDate || null,
      priority,
      category,
    });
  };

  const priorityOptions = ['Low', 'Medium', 'High'];
  const categoryOptions = ['Personal', 'Work', 'Study', 'Others'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slategrey/40 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-offwhite rounded-3xl w-full max-w-lg shadow-soft-lg border border-lightgrey overflow-hidden transform transition-all duration-300 scale-100 translate-y-0 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-lightgrey bg-white">
          <h2 className="font-sans font-bold text-lg text-slategrey-dark">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slategrey hover:bg-lightgrey transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slategrey-light uppercase tracking-wider mb-2">
              Task Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Design app homepage mockups"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: null });
              }}
              className={`w-full px-4 py-2.5 bg-white border ${
                errors.title ? 'border-accent-red ring-1 ring-accent-red/30' : 'border-lightgrey'
              } rounded-xl text-sm text-slategrey-dark focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition-all duration-200`}
            />
            {errors.title && (
              <p className="mt-1.5 text-xs text-accent-red font-medium">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slategrey-light uppercase tracking-wider mb-2">
              Description (Optional)
            </label>
            <textarea
              rows="3"
              placeholder="Add details about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-lightgrey rounded-xl text-sm text-slategrey-dark focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition-all duration-200 resize-none"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-xs font-semibold text-slategrey-light uppercase tracking-wider mb-2">
              Due Date
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slategrey-light">
                <FiCalendar size={16} />
              </span>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-lightgrey rounded-xl text-sm text-slategrey-dark focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition-all duration-200 cursor-pointer"
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-semibold text-slategrey-light uppercase tracking-wider mb-2.5">
              Priority
            </label>
            <div className="grid grid-cols-3 gap-2">
              {priorityOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setPriority(opt)}
                  className={`py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    priority === opt
                      ? opt === 'High'
                        ? 'bg-accent-red/10 border-accent-red/45 text-accent-red font-semibold'
                        : opt === 'Medium'
                        ? 'bg-accent-amber/10 border-accent-amber/45 text-accent-amber font-semibold'
                        : 'bg-sage/20 border-sage/45 text-sage-dark font-semibold'
                      : 'bg-white border-lightgrey text-slategrey hover:bg-lightgrey/30'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slategrey-light uppercase tracking-wider mb-2.5">
              Category
            </label>
            <div className="grid grid-cols-4 gap-2">
              {categoryOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setCategory(opt)}
                  className={`py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${
                    category === opt
                      ? 'bg-slategrey-dark text-white border-slategrey-dark'
                      : 'bg-white border-lightgrey text-slategrey hover:bg-lightgrey/30'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-lightgrey">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-lightgrey text-sm font-semibold text-slategrey hover:bg-lightgrey/30 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-accent-blue hover:bg-accent-bluedark text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.02] shadow-sm active:scale-95"
            >
              {task ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
