import { describe, expect, test } from '@jest/globals';
import { getUserReposThunk, searchUsersThunk } from '../thunks';
import { store } from '..';

describe('thunks', () => {
  test('searchUsersThunk', async () => {
    const result = await searchUsersThunk({ user: 'test' });
    expect(result).toBeTruthy();
  });
  test('getUserReposThunk', async () => {
    const result = await getUserReposThunk({ repoUrl: 'test' });
    expect(result).toBeTruthy();
  });
});

test('should return initial state', () => {
  const initialState = {
    users: [],
    repos: [],
    loading: false,
    reposLoading: false,
    error: null,
  };

  expect(store.getState().github).toEqual(initialState);
});
