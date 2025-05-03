import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('my-todo-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('my-todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="creative-container">
      <h1 className="creative-title">✨ My Creative To-Do List ✨</h1>
      <div className="creative-input-section">
        <input
          type="text"
          placeholder="What's on your mind?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>➕</button>
      </div>

      <ul className="creative-task-list">
        {tasks.map((t, index) => (
          <li key={index} className={`task ${t.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleComplete(index)}>{t.text}</span>
            <button onClick={() => removeTask(index)}>🗑️</button>
          </li>
        ))}
      </ul>

      {/* ✅ About Section */}
      <div className="about-section">
        <h2>📝 About This App</h2>
        <p>This creative To-Do List helps you stay organized and productive.</p>
        <ul>
          <li>➕ Add tasks easily with the input box.</li>
          <li>✅ Click on a task to mark it as completed.</li>
          <li>🗑️ Remove tasks you no longer need.</li>
          <li>💾 Tasks are saved in your browser automatically (local storage).</li>
          <li>🎨 Clean and responsive design for a better experience.</li>
        </ul>
        <p>Built with ❤️ using React.</p>
      </div>
    </div>
  );
}

export default App;