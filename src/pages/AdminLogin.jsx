import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { adminLogin } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        adminLogin(email, password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                    <button type="submit" className="w-full p-3 rounded-lg text-lg font-semibold bg-blue-600 text-white">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
