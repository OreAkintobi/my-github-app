import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CLIENT_SECRET = 'c36c52f3a25606fee77480909e1c006f68b5e1ab';
const CLIENT_ID = '7d8bf7ea78c682ff8fdb';

export const searchUsersThunk = createAsyncThunk<
  any | null,
  { user: string },
  { rejectValue: string }
>('searchUser', async ({ user }, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${user}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&per_page=5`
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
  any | null,
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
