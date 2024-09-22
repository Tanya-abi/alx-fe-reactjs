const GITHUB_API_KEY = process.env.REACT_APP_GITHUB_API_KEY;

export const fetchGitHubData = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `token ${GITHUB_API_KEY}`,
    },
  });
  const data = await response.json();
  return data;
};

import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/search/users';

export const fetchUserData = async ({ username, location, minRepos }) => {
  try {
    let query = `q=${username || ''}`;

    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>${minRepos}`;

    const response = await axios.get(`${GITHUB_API_URL}?${query}`);
    return response.data.items;
  } catch (error) {
    throw new Error('No users found');
  }
};


