import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import Footer from './components/Footer';
import { fetchTasks, createTask, updateTask, deleteTask, toggleTask } from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter and sort states
  const [activeTab, setActiveTab] = useState('all'); // all, pending, completed
  const [activeCategory, setActiveCategory] = useState('All'); // All, Personal, Work, Study, Others
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, priority
  const [priorityFilter, setPriorityFilter] = useState('All'); // All, High, Medium, Low

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Load all tasks from backend
  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await fetchTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Compute stats based on entire tasks array
  const stats = useMemo(() => {
    return {
      all: tasks.length,
      pending: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
    };
  }, [tasks]);

  // Handle task status toggle
  const handleToggleTask = async (id) => {
    try {
      const response = await toggleTask(id);
      setTasks(tasks.map((t) => (t._id === id ? response.data : t)));
      
      if (response.data.completed) {
        toast.success('Task marked as completed! 🎉');
      } else {
        toast.info('Task marked as pending.');
      }
    } catch (error) {
      console.error('Error toggling task:', error);
      toast.error('Failed to update task status.');
    }
  };

  // Handle task delete
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success('Task deleted successfully.');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task.');
    }
  };

  // Open modal for editing
  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Save task (handles both create and edit)
  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        // Edit mode
        const response = await updateTask(editingTask._id, taskData);
        setTasks(tasks.map((t) => (t._id === editingTask._id ? response.data : t)));
        toast.success('Task updated successfully.');
      } else {
        // Create mode
        const response = await createTask(taskData);
        setTasks([response.data, ...tasks]);
        toast.success('Task created successfully!');
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
      toast.error(error.response?.data?.message || 'Failed to save task.');
    }
  };

  // Open modal for new task
  const handleAddTaskClick = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Filtered and Sorted Tasks List
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // 1. Search Query Filter (title or description match)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          (t.description && t.description.toLowerCase().includes(query))
      );
    }

    // 2. Tab Filter (All / Pending / Completed)
    if (activeTab === 'pending') {
      result = result.filter((t) => !t.completed);
    } else if (activeTab === 'completed') {
      result = result.filter((t) => t.completed);
    }

    // 3. Category Filter
    if (activeCategory !== 'All') {
      result = result.filter((t) => t.category === activeCategory);
    }

    // 4. Priority Filter
    if (priorityFilter !== 'All') {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    // 5. Sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'priority') {
      const priorityWeights = { High: 3, Medium: 2, Low: 1 };
      result.sort((a, b) => {
        const weightA = priorityWeights[a.priority] || 0;
        const weightB = priorityWeights[b.priority] || 0;
        if (weightB !== weightA) {
          return weightB - weightA; // Higher weight first
        }
        return new Date(b.createdAt) - new Date(a.createdAt); // Secondary sort: newest first
      });
    }

    return result;
  }, [tasks, searchQuery, activeTab, activeCategory, priorityFilter, sortBy]);

  // Determine if any filters are active (for empty state messaging)
  const hasFilters = searchQuery.trim() !== '' || activeCategory !== 'All' || priorityFilter !== 'All';

  return (
    <div className="flex h-screen bg-beige overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="!rounded-2xl !shadow-soft !font-sans !text-sm !text-slategrey-dark"
      />

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        stats={stats}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          onAddTaskClick={handleAddTaskClick}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Scrollable Container for Tasks */}
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header info */}
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="font-sans font-bold text-xl text-slategrey-dark capitalize">
                  {activeCategory !== 'All' ? `${activeCategory} Tasks` : `${activeTab} Tasks`}
                </h2>
                <p className="text-xs text-slategrey-light mt-0.5">
                  Showing {filteredAndSortedTasks.length} tasks
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-sage border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm text-slategrey-light">Loading tasks...</p>
              </div>
            ) : (
              <TaskList
                tasks={filteredAndSortedTasks}
                onToggle={handleToggleTask}
                onEdit={handleEditClick}
                onDelete={handleDeleteTask}
                onAddTaskClick={handleAddTaskClick}
                hasFilters={hasFilters}
              />
            )}
          </div>
        </main>

        <Footer />
      </div>

      {/* Form Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
}

export default App;
