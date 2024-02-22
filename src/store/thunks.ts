import { Repo, UserResponse } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchUsersThunk = createAsyncThunk<
  UserResponse,
  { user: string },
  { rejectValue: string }
>('searchUser', async ({ user }, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${user}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&per_page=5`
    );

    return !response.data ? null : response?.data?.items;
  } catch (e: unknown) {
    const errorMessage = `Error Searching Users; ${
      e instanceof Error ? e.message : e
    }`;

    return rejectWithValue(errorMessage);
  }
});

export const getUserReposThunk = createAsyncThunk<
  Repo[],
  { repoUrl: string },
  { rejectValue: string }
>('getRepos', async ({ repoUrl }, { rejectWithValue }) => {
  try {
    const response = await axios.get(repoUrl);

    return !response.data ? null : response?.data;
  } catch (e: unknown) {
    const errorMessage = `Error Getting User Repos; ${
      e instanceof Error ? e.message : e
    }`;

    return rejectWithValue(errorMessage);
  }
});
