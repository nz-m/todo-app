import {Link} from 'react-router-dom';
const Navbar = ({ userName, onLogout, onAddTask }) => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/" className="text-lg font-semibold mr-4">Todo Application</Link>
                    {userName && <span className="text-sm text-gray-500">Hello, {userName}</span>}
                </div>
                <div className="flex items-center space-x-4">
                    <button className="text-blue-500" onClick={onAddTask}>Add Task</button>
                    <button className="text-red-500" onClick={onLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;