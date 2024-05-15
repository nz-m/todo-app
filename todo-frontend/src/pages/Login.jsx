import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../features/auth/authThunks';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, loginError } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(result)) {
            navigate('/');
        }
    };

    const handleTestUserLogin = async () => {
        const testEmail = 'testuser@example.com';
        const testPassword = 'testpassword123';
        const result = await dispatch(loginUser({ email: testEmail, password: testPassword }));
        if (loginUser.fulfilled.match(result)) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-offwhite">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-dark mb-4">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange"
                    />
                    <button type="submit" className="w-full bg-orange text-white py-2 rounded-lg font-semibold" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                    {loginError && <p className="mt-4 text-center text-red-600">{loginError}</p>}
                </form>
                <div className="text-center mt-4">
                    <Link to="/register" className="text-blue-500 hover:underline">Don't have an account? Register</Link>
                </div>
                <div className="text-center mt-4">
                    <button onClick={handleTestUserLogin} className="text-orange hover:underline">Continue as Test User</button>
                </div>
                <div className="text-center mt-4">
                    <p className="text-gray-500 mt-4">
                        Please note: The backend service may take up to 30 seconds to start. If loading times are longer
                        than usual, kindly wait a moment.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
