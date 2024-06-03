import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().substring(0, 10));

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const completeTask = (index) => {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handleDateChange = (e) => {
        setCurrentDate(e.target.value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className="todo-container">
            <h1>To-Do List</h1>
            <input
                type="date"
                value={currentDate}
                onChange={handleDateChange}
                className="date-input"
            />
            <p className="date">{formatDate(currentDate)}</p>
            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={addTask}>Add</button>
            </div>
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <span>{task.text}</span>
                        <button onClick={() => completeTask(index)} className="mark-button">
                            {task.completed ? 'Unmark' : 'Mark'}
                        </button>
                        <button onClick={() => deleteTask(index)} className="delete-button">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
