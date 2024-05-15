import { FaTrashAlt, FaCheck } from 'react-icons/fa';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import {updateTask, deleteTask} from "../features/task/taskThunks.js";

const TaskCard = ({ task }) => {
    const dispatch = useDispatch();
    const onComplete = (taskId) => {
        dispatch(updateTask({
            taskId: taskId,
            taskData: { ...task, isCompleted: true }
        }));
    };

    const onDelete = (taskId) => {
        dispatch(deleteTask(taskId));
    }

    const renderPriorityBadge = () => {
        let priorityClass = '';
        switch (task.priority) {
            case 'minor':
                priorityClass = 'bg-green-500';
                break;
            case 'moderate':
                priorityClass = 'bg-yellow-500';
                break;
            case 'critical':
                priorityClass = 'bg-red-500';
                break;
            default:
                priorityClass = 'bg-gray-500';
        }
        return <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-white ${priorityClass}`}>{task.priority}</span>;
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
                <span>{renderPriorityBadge()}</span>
                <button onClick={() => onDelete(task._id)} className="text-gray-600 hover:text-red-500">
                    <FaTrashAlt />
                </button>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">Due Date: {format(new Date(task.dueDate), 'dd/MM/yyyy')}</p>
                    <div className="flex items-center">
                        {task.isCompleted ? (
                            <FaCheck className="text-green-500 mr-2" />
                        ) : (
                            <FaCheck className="text-gray-500 mr-2" />
                        )}
                        <button onClick={() => onComplete(task._id)} className={`text-sm font-semibold ${task.isCompleted ? 'text-green-500 cursor-not-allowed' : 'text-gray-500 hover:text-green-500'}`} disabled={task.isCompleted}>
                            Completed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
