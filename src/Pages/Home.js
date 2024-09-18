import React, { useState, useEffect } from 'react';
import { fetchUsers } from './../Utils/Api';
import Modal from './Modal'; // Import the Modal component
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function Home() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Initialize AOS only once
    AOS.init({
      duration: 1000, // Duration of animations
      once: true, // Animation happens only once
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

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
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
                data-aos="fade-up" // AOS animation attribute
                className="relative bg-white shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => handleUserClick(user)}
              >
                <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full mb-4" />
                <p className="text-xl font-semibold">{user.login}</p>
                <p className="text-gray-600 absolute inset-3">id no: {user.id}</p>
                <a href={user.html_url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Profile URL</a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No users found.</p>
        )}
      </section>

      {isModalOpen && <Modal user={selectedUser} onClose={handleCloseModal} />}
    </div>
  );
}

export default Home;
