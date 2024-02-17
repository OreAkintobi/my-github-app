import { createSlice } from '@reduxjs/toolkit';
import { searchUsersThunk, getUserReposThunk } from './thunks';
import { Repo, User } from '@/types';

interface GithubState {
  users: User[];
  repos: Repo[];
  loading: boolean;
  reposLoading: boolean;
  error: string | null;
}

const initialState: GithubState = {
  users: [],
  repos: [],
  loading: false,
  reposLoading: false,
  error: null,
};

const { reducer, ...slice } = createSlice({
  name: 'github',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(searchUsersThunk.pending, (state) => ({
      ...state,
      loading: true,
      users: [],
      repos: [],
      error: null,
    }));
    builder.addCase(searchUsersThunk.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      users: payload,
    }));
    builder.addCase(searchUsersThunk.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload ?? null,
    }));

    builder.addCase(getUserReposThunk.pending, (state) => ({
      ...state,
      reposLoading: true,
      repos: [],
    }));
    builder.addCase(getUserReposThunk.fulfilled, (state, { payload }) => ({
      ...state,
      reposLoading: false,
      repos: payload,
    }));
    builder.addCase(getUserReposThunk.rejected, (state, { payload }) => ({
      ...state,
      reposLoading: false,
      error: payload ?? null,
    }));
  },
});

export const githubReducer = reducer;

export const { actions } = slice;
