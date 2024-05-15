import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../features/task/taskThunks.js';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import Navbar from '../components/Navbar';

const Home = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks?.tasks);
    const loading = useSelector((state) => state.tasks?.loading);
    const error = useSelector((state) => state.tasks?.error);
    const navigate = useNavigate();
    const [sortByPriority, setSortByPriority] = useState(true);
    const [sortedTasks, setSortedTasks] = useState([]);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            const sorted = [...tasks].sort((a, b) => {
                const priorityOrder = { critical: 3, moderate: 2, minor: 1 };
                return sortByPriority ? priorityOrder[b.priority] - priorityOrder[a.priority] : priorityOrder[a.priority] - priorityOrder[b.priority];
            });
            setSortedTasks(sorted);
        }
    }, [tasks, sortByPriority]);

    const userName = localStorage.getItem('user') || 'User';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleAddTask = () => {
        navigate('/create-task');
    };

    const toggleSortByPriority = () => {
        setSortByPriority(!sortByPriority);
    };

    return (
        <div className="min-h-screen flex flex-col bg-offwhite">
            <Navbar userName={userName} onLogout={handleLogout} onAddTask={handleAddTask} />
            {loading && <p>Loading tasks...</p>}
            <div className="flex flex-col items-center mt-8">
                {tasks && tasks.length > 0 && (
                    <div className="self-end mr-8 mb-4">
                        <button
                            onClick={toggleSortByPriority}
                            className="bg-orange text-white px-2 py-1 rounded-md text-sm hover:bg-orange-dark"
                        >
                            {sortByPriority ? 'Reverse Order' : 'Sort by Priority'}
                        </button>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
                    {error && <p className="text-red-500">{error}</p>}
                    {!error && tasks && tasks.length > 0 ? (
                        sortedTasks.map((task) => <TaskCard key={task._id} task={task} />)
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">No tasks added yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
