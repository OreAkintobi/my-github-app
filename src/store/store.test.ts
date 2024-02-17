import { describe, expect, test } from '@jest/globals';
import { getUserReposThunk, searchUsersThunk } from './thunks';

describe('thunks', () => {
  test('searchUsersThunk', async () => {
    const result = await searchUsersThunk({ user: 'test' });
    expect(result).toBe(null);
  });
  test('getUserReposThunk', async () => {
    const result = await getUserReposThunk({ repoUrl: 'test' });
    expect(result).toBe(null);
  });
});
