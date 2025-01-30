import { FC, useContext, useState } from 'react';
import { Context } from "../main.tsx";
import { observer } from 'mobx-react-lite';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { store } = useContext(Context);

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500">
            <div className="bg-white p-10 rounded-lg shadow-xl max-w-sm w-full">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Welcome Back</h2>
                <div className="space-y-6">
                    <div>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Email"
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300 ease-in-out"
                        />
                    </div>
                    <div>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300 ease-in-out"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={() => store.login(email, password)}
                            className="w-full bg-teal-600 text-white py-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Login
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => store.registration(email, password)}
                            className="w-full bg-gray-200 text-gray-700 py-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Register
                        </button>
                    </div>
                    <div className="text-center mt-6 text-sm text-gray-600">
                        <p>Don't have an account? <span className="text-teal-600 cursor-pointer hover:underline">Sign up</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(LoginForm);
