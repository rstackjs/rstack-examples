import { fetchUser, fetchUserPosts, type Post, type User } from './api';
import { logger } from './logger';

/**
 * User service that uses API and logger
 */
export class UserService {
  async getUser(id: number): Promise<User> {
    logger.info(`Fetching user with ID: ${id}`);
    try {
      const user = await fetchUser(id);
      logger.info(`Successfully fetched user: ${user.name}`);
      return user;
    } catch (error) {
      logger.error(`Failed to fetch user: ${error}`);
      throw error;
    }
  }

  async getUserWithPosts(id: number): Promise<{ user: User; posts: Post[] }> {
    logger.info(`Fetching user and posts for ID: ${id}`);

    const user = await fetchUser(id);
    const posts = await fetchUserPosts(id);

    logger.info(`Fetched ${posts.length} posts for user: ${user.name}`);

    return { user, posts };
  }

  async getUserNames(ids: number[]): Promise<string[]> {
    const users = await Promise.all(ids.map((id) => fetchUser(id)));
    return users.map((user) => user.name);
  }
}
