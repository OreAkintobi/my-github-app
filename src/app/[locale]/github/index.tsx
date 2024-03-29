import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { getUserReposThunk, searchUsersThunk } from '@/store/thunks';
import { User as UserComponent, UserSkeleton } from '@/components';
import { User } from '@/types';
import { Theme, themes, useTheme } from '@/theme';
import { locales } from '@/i18n';
import germany from './germany.png';
import uk from './united-kingdom.png';

export const Github: React.FC = () => {
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const { color, changeTheme } = useTheme();
  const t = useTranslations('Github');
  const router = useRouter();
  const pathname = usePathname();

  const realPath = pathname.split('/')[0];
  const currentLocale = pathname.split('/')[1];

  const handleThemeChange = (color: Theme) => {
    changeTheme(color);
  };

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
    <div
      className={`mx-auto min-h-lvh py-8 bg-gradient-to-r from-${color}-100 via-${color}-300 to-${color}-500 text-white p-2`}
    >
      <h1 className={`text-4xl text-black font-bold text-center mb-4`}>
        {t('title')}
      </h1>

      <div
        className={`max-w-md mx-auto bg-white border-2 border-${color}-500 rounded-lg p-6 shadow-lg`}
      >
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          type="text"
          className={`w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-${color}-500 text-black`}
          placeholder={t('searchPlaceholder')}
          value={userSearchTerm}
          onChange={(e) => setUserSearchTerm(e.target.value)}
        />
        <button
          className={`w-full bg-${color}-600 text-white rounded-md py-2 px-4 hover:bg-${color}-700 focus:outline-none`}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? t('searching') : t('search')}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p>{reposLoading ? t('reposLoading') : ''}</p>

        <p className={`text-xl text-black font-bold text-center mt-4`}>
          {t('changeColors')}
        </p>
        <div className="flex justify-center mb-4">
          {themes.map((theme) => (
            <div
              key={theme}
              className={`w-12 h-12 rounded-full bg-${theme}-500 cursor-pointer mx-2 ${
                color === theme ? 'border-2 border-black' : ''
              }`}
              onClick={() => handleThemeChange(theme)}
            />
          ))}
        </div>

        <p className={`text-xl text-black font-bold text-center mt-4`}>
          Switch Locales
        </p>
        <div className="flex justify-center mb-4">
          {locales.map((locale) => (
            <div
              key={locale}
              className={`w-12 h-12 rounded-full cursor-pointer mx-2 ${
                currentLocale === locale ? 'border-2 border-black' : ''
              }`}
              onClick={() => {
                if (currentLocale === locale) return;

                router.push(`${realPath}/${locale}`);
              }}
            >
              <Image
                src={locale === 'de' ? germany : uk}
                alt="flag"
                className="w-full h-full rounded-full"
                width={24}
                height={24}
                placeholder="blur"
              />
            </div>
          ))}
        </div>
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
