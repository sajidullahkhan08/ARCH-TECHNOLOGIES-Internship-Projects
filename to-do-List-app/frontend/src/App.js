import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoStats from './components/TodoStats';
import TodoFilter from './components/TodoFilter';
import { getTodos, createTodo, updateTodo, deleteTodo, toggleTodo, getStats } from './services/todoService';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [filters, setFilters] = useState({
    completed: undefined,
    priority: '',
    category: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, [filters]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filters.completed !== undefined) {
        queryParams.append('completed', filters.completed);
      }
      if (filters.priority) {
        queryParams.append('priority', filters.priority);
      }
      if (filters.category) {
        queryParams.append('category', filters.category);
      }
      if (filters.sortBy) {
        queryParams.append('sortBy', filters.sortBy);
      }
      if (filters.sortOrder) {
        queryParams.append('sortOrder', filters.sortOrder);
      }

      const data = await getTodos(queryParams.toString());
      setTodos(data);
    } catch (error) {
      toast.error('Failed to fetch todos');
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await createTodo(todoData);
      setTodos(prev => [newTodo, ...prev]);
      toast.success('Todo added successfully!');
      fetchStats();
    } catch (error) {
      toast.error('Failed to add todo');
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      const updatedTodo = await updateTodo(id, todoData);
      setTodos(prev => prev.map(todo => todo._id === id ? updatedTodo : todo));
      toast.success('Todo updated successfully!');
      fetchStats();
    } catch (error) {
      toast.error('Failed to update todo');
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
      toast.success('Todo deleted successfully!');
      fetchStats();
    } catch (error) {
      toast.error('Failed to delete todo');
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const updatedTodo = await toggleTodo(id);
      setTodos(prev => prev.map(todo => todo._id === id ? updatedTodo : todo));
      toast.success(updatedTodo.completed ? 'Todo completed!' : 'Todo marked as pending');
      fetchStats();
    } catch (error) {
      toast.error('Failed to toggle todo');
      console.error('Error toggling todo:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="App">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
          },
        }}
      />
      
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className="app-header">
          <motion.h1 
            className="app-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            ✨ TaskMaster
          </motion.h1>
          <p className="app-subtitle">Organize your life, one task at a time</p>
        </header>

        <div className="app-content">
          <div className="sidebar left-sidebar">
            <TodoStats stats={stats} />
          </div>

          <div className="main-content">
            <TodoForm onAddTodo={handleAddTodo} />
            
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  className="loading-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="loading-spinner"></div>
                  <p>Loading your tasks...</p>
                </motion.div>
              ) : (
                <motion.div
                  key="todos"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TodoList
                    todos={todos}
                    onUpdateTodo={handleUpdateTodo}
                    onDeleteTodo={handleDeleteTodo}
                    onToggleTodo={handleToggleTodo}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="sidebar right-sidebar">
            <TodoFilter filters={filters} onFilterChange={handleFilterChange} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
