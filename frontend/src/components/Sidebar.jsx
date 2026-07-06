import React from 'react';
import { FiCheckCircle, FiClock, FiList, FiBriefcase, FiBookOpen, FiUser, FiGrid, FiX } from 'react-icons/fi';

const Sidebar = ({
  activeTab,
  setActiveTab,
  activeCategory,
  setActiveCategory,
  stats,
  isOpen,
  setIsOpen
}) => {
  const categories = [
    { name: 'All', icon: FiGrid, color: 'text-slategrey' },
    { name: 'Personal', icon: FiUser, color: 'text-blue-500' },
    { name: 'Work', icon: FiBriefcase, color: 'text-accent-amber' },
    { name: 'Study', icon: FiBookOpen, color: 'text-sage-dark' },
    { name: 'Others', icon: FiList, color: 'text-slategrey-light' }
  ];

  const tabs = [
    { id: 'all', label: 'All Tasks', icon: FiList, count: stats.all },
    { id: 'pending', label: 'Pending', icon: FiClock, count: stats.pending },
    { id: 'completed', label: 'Completed', icon: FiCheckCircle, count: stats.completed }
  ];

  const completionPercentage = stats.all > 0 ? Math.round((stats.completed / stats.all) * 100) : 0;

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slategrey/20 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-72 bg-offwhite border-r border-lightgrey px-6 py-8 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-mint text-sage-dark font-bold text-xl shadow-sm border border-sage/30">
              ✓
            </div>
            <div>
              <h1 className="font-sans font-bold text-lg text-slategrey-dark tracking-wide">TaskFlow</h1>
              <p className="text-xs text-slategrey-light font-medium">Keep life simple</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slategrey hover:bg-lightgrey transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Status Navigation */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-slategrey-light uppercase tracking-wider mb-3">Lists</p>
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-mint/50 text-slategrey-dark border border-sage/20'
                      : 'text-slategrey hover:bg-lightgrey/40 hover:text-slategrey-dark'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sage-dark' : 'text-slategrey-light'}`} />
                    <span>{tab.label}</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-sage/40 text-slategrey-dark' : 'bg-lightgrey/50 text-slategrey'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Category Filters */}
        <div className="mb-auto">
          <p className="text-xs font-semibold text-slategrey-light uppercase tracking-wider mb-3">Categories</p>
          <div className="space-y-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setActiveCategory(cat.name);
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-beige-dark/40 text-slategrey-dark'
                      : 'text-slategrey hover:bg-lightgrey/40 hover:text-slategrey-dark'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${cat.color}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress Widget Card */}
        <div className="bg-mint/30 border border-sage/20 rounded-2xl p-5 mt-6 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slategrey-dark">Progress</span>
            <span className="text-xs font-bold text-sage-dark">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-lightgrey rounded-full h-1.5 mb-3 overflow-hidden">
            <div
              className="bg-accent-green h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-xs text-slategrey">
            {completionPercentage === 100
              ? 'Excellent! All tasks completed.'
              : `${stats.completed}/${stats.all} tasks completed. Keep it up!`}
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
