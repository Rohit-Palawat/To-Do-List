import React from 'react';
import { FiSearch, FiPlus, FiMenu, FiSliders } from 'react-icons/fi';

const Navbar = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  priorityFilter,
  setPriorityFilter,
  onAddTaskClick,
  onMenuClick
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between w-full bg-beige-light border-b border-lightgrey px-6 py-4">
      {/* Left side: Search & Menu toggle */}
      <div className="flex items-center flex-1 gap-4 max-w-lg">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slategrey hover:bg-lightgrey transition-colors"
          aria-label="Toggle Sidebar"
        >
          <FiMenu size={20} />
        </button>

        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slategrey-light">
            <FiSearch size={18} />
          </span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-offwhite border border-lightgrey rounded-xl text-sm text-slategrey-dark placeholder-slategrey-light focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition-all duration-200"
          />
        </div>
      </div>

      {/* Right side: Filters, Sort, and Add Button */}
      <div className="flex items-center gap-3 ml-4">
        {/* Priority Filter */}
        <div className="relative hidden md:block">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2.5 bg-offwhite border border-lightgrey rounded-xl text-sm font-medium text-slategrey focus:outline-none focus:ring-2 focus:ring-sage/40 cursor-pointer"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slategrey-light">
            <FiSliders size={14} />
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2.5 bg-offwhite border border-lightgrey rounded-xl text-sm font-medium text-slategrey focus:outline-none focus:ring-2 focus:ring-sage/40 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">Sort by Priority</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slategrey-light">
            <FiSliders size={14} />
          </span>
        </div>

        {/* Add Task Button */}
        <button
          onClick={onAddTaskClick}
          className="flex items-center gap-2 bg-accent-blue hover:bg-accent-bluedark text-white font-semibold text-sm px-4.5 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-sm active:scale-95"
        >
          <FiPlus size={18} />
          <span className="hidden sm:inline">Add Task</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
