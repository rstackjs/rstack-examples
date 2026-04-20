/**
 * API client for mocking demonstration
 */

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const API_BASE = 'https://api.example.com';

/**
 * Fetch user by ID
 */
export async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`${API_BASE}/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch posts by user ID
 */
export async function fetchUserPosts(userId: number): Promise<Post[]> {
  const response = await fetch(`${API_BASE}/users/${userId}/posts`);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`);
  }
  return response.json();
}

/**
 * Create a new post
 */
export async function createPost(post: Omit<Post, 'id'>): Promise<Post> {
  const response = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error(`Failed to create post: ${response.status}`);
  }
  return response.json();
}
