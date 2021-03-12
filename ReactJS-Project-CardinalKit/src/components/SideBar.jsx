import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const highLightLink = path => {
    setCurrentPath(path);
  };

  return (
    <div>
      <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0 h-screen">
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <Link className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" to="/users">
            Stanford Medicine
          </Link>
          <ul className="mt-6">
            <li className="relative px-6 py-3">
              {currentPath === '/users' && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-red-700 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                />
              )}
              <Link
                className="inline-flex items-center w-full text-sm font-semibold text-gray-500 transition-colors duration-150 hover:text-gray-800"
                to="/users"
                onClick={e => highLightLink('/users')}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <span>
                  <i className="far fa-tachometer-slow"></i>
                </span>
                <span className="ml-4 text-base">Dashboard</span>
              </Link>
            </li>
          </ul>
          <ul className="mt-6">
            <li className="relative px-6 py-3 focus:text-gray-800">
              {currentPath === '/manage_users' && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-red-700 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                />
              )}
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 "
                to="/manage_users"
                onClick={e => highLightLink('/manage_users')}
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                <span className="ml-4 text-base">Manage Users</span>
              </Link>
            </li>
          </ul>
          <ul className="mt-6">
            <li className="relative px-6 py-3">
              {currentPath === '/manage_surveys' && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-red-700 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                />
              )}
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                to="/manage_surveys"
                onClick={e => highLightLink('/manage_surveys')}
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                <span className="ml-4  text-base">Manage Surveys</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
