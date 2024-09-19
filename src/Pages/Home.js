import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchUserRepos } from "./../Utils/Api.js";
import Modal from './Modal';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Home() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toString().includes(searchTerm)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleUserClick = async (user) => {
    try {
      const repos = await fetchUserRepos(user.login);
      setSelectedUser(user);
      setUserRepos(repos);
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to fetch repositories. Please try again later.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setUserRepos([]);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderSkeletonCards = () => (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="relative bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
            {/* Avatar skeleton */}
            <Skeleton circle={true} height={96} width={96} className="mb-4" />

            {/* Username skeleton */}
            <Skeleton width={`60%`} height={24} className="mb-2" />

            {/* ID skeleton */}
            <Skeleton width={`40%`} height={20} className="mb-2" />

            {/* Button skeleton */}
            <Skeleton width={`60%`} height={40} className="mt-4" />
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );

  if (loading) {
    // Skeleton loading state
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-3xl text-center font-bold">GitHub Users</h1>
        </header>
        <section className="flex-grow p-4 my-7">
          {renderSkeletonCards()}
        </section>
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl text-center font-bold">GitHub Users</h1>
      </header>

      <section className="flex-grow p-4 my-7">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
          <input
            type="text"
            placeholder="Search by username or ID..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border rounded-lg w-full sm:w-1/2"
          />
        </div>

        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                data-aos="fade-up"
                className="relative bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold">{user.login}</h2>
                <p className="text-sm text-gray-600 inset-3">id no: {user.id}</p>
                <button
                  onClick={() => handleUserClick(user)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  View Repos
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No users found.</p>
        )}
      </section>

      {isModalOpen && (
        <Modal
          user={selectedUser}
          repos={userRepos}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Home;
