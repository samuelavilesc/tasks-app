import React, { useState, useEffect } from 'react';
import './App.css';
import CalendarView from './CalendarView';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [view, setView] = useState('list'); // 'list' or 'calendar'

  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then(res => res.json())
      .then(data => setTasks(data || []))
      .catch(err => console.error("Error fetching tasks:", err));
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;

    const payload = {
        title,
        due_date: dueDate ? new Date(dueDate).toISOString() : null
    };

    const res = await fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTitle('');
    setDueDate('');
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <div className="view-toggle">
          <button 
            className={view === 'list' ? 'active' : ''} 
            onClick={() => setView('list')}
          >
            List View
          </button>
          <button 
            className={view === 'calendar' ? 'active' : ''} 
            onClick={() => setView('calendar')}
          >
            Calendar View
          </button>
        </div>
      </header>
      <main>
        <form onSubmit={addTask} className="task-form">
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="New task..." 
            className="input-title"
            required
          />
          <input 
            type="datetime-local" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)}
            className="input-date" 
          />
          <button type="submit" className="btn-add">Add Task</button>
        </form>

        {view === 'list' ? (
          <div className="task-grid">
            {tasks.map(task => (
              <div key={task.id} className="task-card">
                <div className="task-content">
                  <h3>{task.title}</h3>
                  {task.due_date && (
                      <p className="due-date">📅 {new Date(task.due_date).toLocaleString()}</p>
                  )}
                </div>
                <button onClick={() => deleteTask(task.id)} className="btn-delete">
                  🗑️
                </button>
              </div>
            ))}
          </div>
        ) : (
          <CalendarView tasks={tasks} />
        )}
      </main>
    </div>
  );
}

export default App;
