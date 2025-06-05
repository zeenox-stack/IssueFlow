import React from "react";

import GitHubLogo from "../../assets/github-logo-svgrepo-com.svg";
import GitHubLogoDark from "../../assets/github-logo-dark-mode.svg";

const Login: React.FC = React.memo(() => {
  const handleLogin = () =>
    (window.location.href = "http://localhost:3000/auth/github");
  const handleLogout = () =>
    (window.location.href = "http://localhost:3000/auth/logout");

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="h-4/5 w-2/4 rounded-xl border border-gray-200 bg-gray-300 border-opacity-40 flex flex-col justify-center items-center gap-y-3">
        <h2 className="font-[Poppins] text-gray-500 font-semibold text-[1.8rem]">Login</h2>
        <button
          onClick={handleLogin}
          className="group px-1 py-1 w-3/4 rounded-lg bg-black font-md text-gray-100 min-h-[3rem] hover:bg-gray-400 hover:text-gray-800 flex justify-center items-center gap-x-2 group"
        >
          <img
            src={GitHubLogoDark}
            alt="GitHub Logo"
            className="block group-hover:hidden w-8 h-8"
          />
          <img
            src={GitHubLogo}
            alt="GitHub Logo Dark"
            className="hidden group-hover:block w-8 h-8"
          />
          Login through GitHub
        </button>
        <button
          onClick={handleLogout}
          className="px-3 py-3 w-3/4 rounded-lg bg-red-600 opacity-75 text-gray-100 min-h-[3rem] hover:bg-red-400"
        >
          Logout
        </button>
      </div>
    </section>
  );
});

export default Login;
