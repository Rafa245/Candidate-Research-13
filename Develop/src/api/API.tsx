const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    // Log the response status and headers
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);

    const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
    console.log('Rate Limit Remaining:', rateLimitRemaining);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText} (Status code: ${response.status})`);
    }

    const data = await response.json();
    return data;

  } catch (err) {
    console.error('Error fetching candidates:', err);
    return { error: 'Failed to fetch candidates. Please check your API token and try again.' };
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText} (Status code: ${response.status})`);
    }

    const data = await response.json();
    return data;
    
  } catch (err) {
    console.error('Error fetching user:', err);
    return { error: 'Failed to fetch user. Please try again later.' };
  }
};

export { searchGithub, searchGithubUser };
