import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { useState } from 'react';
import { getUserReposThunk, searchUsersThunk } from '@/store/thunks';
import { User as UserComponent, UserSkeleton } from '@/components';
import { User } from '@/types';

export const Github: React.FC = () => {
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const dispatch = useAppDispatch();
  const { error, loading, users, repos, reposLoading } = useAppSelector(
    (state: RootState) => state.github
  );

  const handleSearch = () => {
    dispatch(searchUsersThunk({ user: userSearchTerm }));
  };

  const onSelectUser = (user: User) => {
    setSelectedUser(user.login);
    dispatch(getUserReposThunk({ repoUrl: user?.repos_url }));
  };

  return (
    <div className="mx-auto min-h-lvh py-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-2">
      <h1 className="text-4xl font-bold text-center mb-4">
        GitHub User Search
      </h1>

      <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg">
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          type="text"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500 text-black"
          placeholder="Enter GitHub username"
          value={userSearchTerm}
          onChange={(e) => setUserSearchTerm(e.target.value)}
        />
        <button
          className="w-full bg-purple-600 text-white rounded-md py-2 px-4 hover:bg-purple-700 focus:outline-none"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p>{reposLoading ? 'Getting Repos...' : ''}</p>
      </div>

      {loading && (
        <div className="animate-pulse mt-8 max-w-md mx-auto transition-all">
          {Array.from({ length: 5 }).map((_, i) => (
            <UserSkeleton key={i} />
          ))}
        </div>
      )}

      <div className="mt-8 max-w-md mx-auto transition-all">
        {users.map((user) => (
          <UserComponent
            key={user.id}
            user={user}
            repos={repos}
            isSelected={selectedUser === user.login}
            onSelect={onSelectUser}
            isLoadingRepos={reposLoading}
            error={error}
          />
        ))}
      </div>
    </div>
  );
};
