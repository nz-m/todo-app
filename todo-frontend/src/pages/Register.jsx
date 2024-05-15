import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { registerUser } from '../features/auth/authThunks';
import { clearErrors, clearSuccess } from '../features/auth/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registrationErrors, registrationSuccess, loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser({ name, email, password }));
  };

  if (registrationSuccess) {
    dispatch(clearSuccess());
    navigate('/');
  }

  // Clear errors on component unmount
  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-dark mb-4">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange"
            />
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
            <button type="submit" className="w-full bg-orange text-white py-2 rounded-lg font-semibold">
              {loading ? 'Registering...' : 'Register'}
            </button>

            <div className="text-center mt-4">
              <Link to="/login" className="text-blue-500 hover:underline">
                Already have an account? Sign In
              </Link>
            </div>
          </form>
          {registrationErrors.length > 0 && (
              <div className="mt-4 text-center text-red-500">
                {registrationErrors.map((error, index) => (
                    <p key={index}>{error}</p>
                ))}
              </div>
          )}
        </div>
      </div>
  );
};

export default Register;
