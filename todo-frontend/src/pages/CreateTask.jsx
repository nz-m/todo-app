import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';

const CreateTask = () => {
    return (
        <div className="min-h-screen flex flex-col bg-offwhite">
            <Navbar />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8 text-dark">Create Task</h1>
                <TaskForm />
            </div>
        </div>
    );
};

export default CreateTask;
