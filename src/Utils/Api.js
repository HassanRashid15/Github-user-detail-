// apiService.js

export const fetchUsers = async () => {
    const response = await fetch('https://api.github.com/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data;
  };
  