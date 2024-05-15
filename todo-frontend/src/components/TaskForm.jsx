import { useState } from 'react';
import { createTask } from '../features/task/taskThunks';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('moderate');
    const [dueDate, setDueDate] = useState('');

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.tasks.loading);
    const navigate = useNavigate();

    const handleCreateTask = async (newTask) => {
        await dispatch(createTask(newTask));
        navigate('/');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            title,
            description,
            priority,
            dueDate: new Date(dueDate).toISOString(),
        };
        setTitle('');
        setDescription('');
        setPriority('moderate');
        setDueDate('');
        handleCreateTask(newTask);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded-md px-4 py-2 w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border rounded-md px-4 py-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="priority" className="block text-gray-700 font-bold mb-2">Priority:</label>
                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="border rounded-md px-4 py-2 w-full"
                >
                    <option value="minor">Minor</option>
                    <option value="moderate">Moderate</option>
                    <option value="critical">Critical</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="dueDate" className="block text-gray-700 font-bold mb-2">Due Date:</label>
                <input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="border rounded-md px-4 py-2 w-full"
                />
            </div>
            <button type="submit" className="bg-orange text-white px-4 py-2 rounded-md hover:bg-orange-dark" disabled={loading}>
                {loading ? 'Creating Task...' : 'Create Task'}
            </button>
        </form>
    );
};

export default TaskForm;
