// components/Modal.js
import React, { useState } from 'react';

const Modal = ({ user, repos, onClose }) => {
  const [sortOrder, setSortOrder] = useState('name');

  if (!user) return null;

  // Function to sort repositories based on selected order
  const sortedRepos = [...repos].sort((a, b) => {
    if (sortOrder === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'stars') {
      return b.stargazers_count - a.stargazers_count;
    } else {
      return new Date(b.created_at) - new Date(a.created_at);
    }
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-box-custom bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-32 h-32 rounded-full mb-4"
          />
          <p className="text-2xl font-bold">{user.login}</p>
          <p className="text-lg text-gray-600 inset-3 absolute">id no: {user.id}</p>
          <a
            href={user.html_url}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Profile URL
          </a>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Repositories:</h2>
          <div className="mb-4">
            <label htmlFor="sortOrder" className="block text-gray-600 mb-2">Sort by:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="name">Name</option>
              <option value="stars">Stars</option>
              <option value="date">Creation Date</option>
            </select>
          </div>
          {sortedRepos.length > 0 ? (
            <ul>
              {sortedRepos.map(repo => (
                <li key={repo.id} className="mb-4">
                  <a
                    href={repo.html_url}
                    className="text-blue-500 hover:underline text-lg font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                  <p className="text-gray-600">{repo.description || 'No description'}</p>
                  <div className="text-sm text-gray-500 mt-1">
                    <span className="mr-4">⭐ {repo.stargazers_count}</span>
                    <span className="mr-4">🍴 {repo.forks_count}</span>
                    <span>{new Date(repo.created_at).toLocaleDateString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No repositories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
