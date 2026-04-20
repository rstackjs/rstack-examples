import { afterEach, beforeEach, describe, expect, it, rs } from '@rstest/core';

/**
 * rs.mock() is hoisted to the top of the file and replaces the module.
 * Use rs.hoisted() to define mock values that need to be available during hoisting.
 */

// Using rs.hoisted to define mock values before rs.mock is hoisted
const { mockFetchUser, mockFetchUserPosts } = rs.hoisted(() => {
  return {
    mockFetchUser: rstest.fn(),
    mockFetchUserPosts: rstest.fn(),
  };
});

// Mock the API module
rs.mock('../src/api', () => ({
  fetchUser: mockFetchUser,
  fetchUserPosts: mockFetchUserPosts,
  createPost: rstest.fn(),
}));

import { rstest } from '@rstest/core';
// Import after mocking - the import will use the mocked version
import { UserService } from '../src/user-service';

describe('rs.mock() - Module Mocking', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    rstest.clearAllMocks();
  });

  afterEach(() => {
    rstest.resetAllMocks();
  });

  describe('Mocking API Calls', () => {
    it('should use mocked fetchUser', async () => {
      mockFetchUser.mockResolvedValue({
        id: 1,
        name: 'Mock User',
        email: 'mock@example.com',
      });

      const user = await userService.getUser(1);

      expect(user.name).toBe('Mock User');
      expect(mockFetchUser).toHaveBeenCalledWith(1);
    });

    it('should use mocked fetchUserPosts', async () => {
      mockFetchUser.mockResolvedValue({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      });

      mockFetchUserPosts.mockResolvedValue([
        { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
        { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
      ]);

      const { user, posts } = await userService.getUserWithPosts(1);

      expect(user.name).toBe('Test User');
      expect(posts.length).toBe(2);
      expect(mockFetchUser).toHaveBeenCalledWith(1);
      expect(mockFetchUserPosts).toHaveBeenCalledWith(1);
    });

    it('should handle errors from mocked API', async () => {
      mockFetchUser.mockRejectedValue(new Error('API Error'));

      await expect(userService.getUser(1)).rejects.toThrow('API Error');
    });

    it('should mock multiple user fetches', async () => {
      mockFetchUser
        .mockResolvedValueOnce({ id: 1, name: 'User 1', email: 'user1@example.com' })
        .mockResolvedValueOnce({ id: 2, name: 'User 2', email: 'user2@example.com' })
        .mockResolvedValueOnce({ id: 3, name: 'User 3', email: 'user3@example.com' });

      const names = await userService.getUserNames([1, 2, 3]);

      expect(names).toEqual(['User 1', 'User 2', 'User 3']);
      expect(mockFetchUser).toHaveBeenCalledTimes(3);
    });
  });
});
