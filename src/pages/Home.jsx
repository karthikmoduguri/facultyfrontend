import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, User } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: "admin",
      label: "Admin",
      icon: <Users size={40} />,
      desc: "Manage faculty, students, and schedules.",
      color: "from-blue-500 to-indigo-600",
      link: "/admin-login",
    },
    {
      id: "faculty",
      label: "Faculty",
      icon: <GraduationCap size={40} />,
      desc: "Access your timetable, student details, and notices.",
      color: "from-green-500 to-emerald-600",
      link: "/faculty-login",
    },
    {
      id: "student",
      label: "Student",
      icon: <User size={40} />,
      desc: "View your schedule, grades, and campus updates.",
      color: "from-purple-500 to-pink-600",
      link: "/student-login",
    },
  ];

  return (
   <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      
      {/* Header */}
      <header className="py-6 px-8 flex justify-between items-center bg-black bg-opacity-40 backdrop-blur-md border-b border-gray-700">
        <h1 className="text-2xl font-bold tracking-wide">📚 Alliance University Portal</h1>
        <button className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 transition-all">
          Contact Support
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to <span className="text-yellow-400">Alliance University Technical Block</span>
        </h2>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl">
          Your gateway to academics, schedules, and campus life. Select your role to log in.
        </p>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl w-full">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => navigate(role.link)}
              className={`cursor-pointer bg-gradient-to-br ${role.color} p-8 rounded-2xl shadow-lg hover:scale-105 transform transition-all hover:shadow-2xl`}
            >
              <div className="mb-4">{role.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{role.label}</h3>
              <p className="text-sm text-gray-100">{role.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-400 text-sm border-t border-gray-700">
        © {new Date().getFullYear()} Alliance University. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
