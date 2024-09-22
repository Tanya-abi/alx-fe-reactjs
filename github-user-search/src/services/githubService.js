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

const GITHUB_API_URL = 'https://api.github.com/users/';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}${username}`);
    return response.data;
  } catch (error) {
    throw new Error('User not found');
  }
};

