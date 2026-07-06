import Task from '../models/Task.js';

// @desc    Get all tasks with optional search, filter, and sort
// @route   GET /api/tasks
// @access  Public
export const getTasks = async (req, res, next) => {
  try {
    const { search, filter, sort, category, priority } = req.query;

    // Build the query object
    let query = {};

    // 1. Search filter (case-insensitive regex match on title or description)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // 2. Completion Status filter (all, completed, pending)
    if (filter === 'completed') {
      query.completed = true;
    } else if (filter === 'pending') {
      query.completed = false;
    }

    // 3. Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // 4. Priority filter
    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    // Define Sort Logic
    // We can use MongoDB aggregation if sorting by priority to map High->1, Medium->2, Low->3
    if (sort === 'priority') {
      const tasks = await Task.aggregate([
        { $match: query },
        {
          $addFields: {
            priorityOrder: {
              $switch: {
                branches: [
                  { case: { $eq: ['$priority', 'High'] }, then: 1 },
                  { case: { $eq: ['$priority', 'Medium'] }, then: 2 },
                  { case: { $eq: ['$priority', 'Low'] }, then: 3 },
                ],
                default: 4,
              },
            },
          },
        },
        { $sort: { priorityOrder: 1, createdAt: -1 } },
      ]);
      return res.status(200).json(tasks);
    } else {
      let sortOrder = { createdAt: -1 }; // default newest first
      if (sort === 'oldest') {
        sortOrder = { createdAt: 1 };
      }
      const tasks = await Task.find(query).sort(sortOrder);
      return res.status(200).json(tasks);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
export const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, priority, category } = req.body;

    if (!title || title.trim() === '') {
      res.status(400);
      throw new Error('Title is required');
    }

    const task = await Task.create({
      title,
      description,
      dueDate: dueDate || null,
      priority,
      category,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Public
export const updateTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, priority, category, completed } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    if (title !== undefined) {
      if (title.trim() === '') {
        res.status(400);
        throw new Error('Title cannot be empty');
      }
      task.title = title;
    }
    
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate || null;
    if (priority !== undefined) task.priority = priority;
    if (category !== undefined) task.category = category;
    if (completed !== undefined) task.completed = completed;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    await task.deleteOne();
    res.status(200).json({ message: 'Task removed successfully', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle task completion status
// @route   PATCH /api/tasks/:id/toggle
// @access  Public
export const toggleTaskStatus = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    task.completed = !task.completed;
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};
