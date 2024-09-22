import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const users = await fetchUserData(searchParams);
      setResults(users);
    } catch (err) {
      setError('Looks like we cant find any users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch({ username, location, minRepos });
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">GitHub Username</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Minimum Repositories</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter minimum repositories"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
            Search
          </button>
        </form>
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}
      {results.length > 0 && (
        <div className="mt-5 space-y-4">
          {results.map((user) => (
            <div key={user.id} className="p-4 bg-gray-100 rounded-lg shadow">
              <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
              <h2 className="text-xl">{user.login}</h2>
              <p>Location: {user.location || 'N/A'}</p>
              <p>Repositories: {user.public_repos || 'N/A'}</p>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                View GitHub Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;


