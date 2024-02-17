/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  LinkIcon,
} from '@heroicons/react/24/solid';
import { Transition, Disclosure } from '@headlessui/react';
import { Repo as RepoType, User as UserType } from '@/types';
import { Repo as RepoComponent } from './repo.component';
import { useTheme } from '@/theme';

type UserProps = {
  user: UserType;
  repos: RepoType[];
  error: string | null;
  isSelected: boolean;
  isLoadingRepos: boolean;
  onSelect: (user: UserType) => void;
};

export const UserSkeleton = () => {
  const theme = useTheme();

  return (
    <div className="bg-white shadow-2xl overflow-hidden sm:rounded-lg my-4 mx-2 sm:mx-0 animate-pulse">
      <Disclosure>
        <Disclosure.Button className="py-2 w-full">
          <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row items-center w-full">
            <div className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-4 bg-gray-300" />
            <div className="flex flex-col flex-1 items-start">
              <div
                className={`text-md font-bold text-${theme.color}-500 focus:outline-none flex justify-between items-center w-full`}
              >
                <span className="bg-gray-300 rounded w-1/2 h-4"></span>
              </div>
              <p className="bg-gray-300 rounded w-1/2 h-4 mt-2"></p>
              <p className="bg-gray-300 rounded w-1/2 h-4 mt-2"></p>
            </div>
          </div>
        </Disclosure.Button>
        <Disclosure.Panel className="text-gray-500">
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6 transition-all duration-300">
            <p className="text-gray-300 bg-gray-300 rounded w-full h-4 mt-2"></p>
            <p className="text-gray-300 bg-gray-300 rounded w-full h-4 mt-2"></p>
            <p className="text-gray-300 bg-gray-300 rounded w-full h-4 mt-2"></p>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
};

export const User = ({
  user,
  repos,
  error,
  isSelected,
  isLoadingRepos,
  onSelect,
}: UserProps) => {
  const theme = useTheme();

  const handleToggle = () => {
    onSelect(user);
  };

  return (
    <div
      className={`bg-white shadow-2xl overflow-hidden border-2 border-${theme.color}-700 rounded-lg my-4 mx-2 sm:mx-0`}
    >
      <Disclosure>
        {({ open }) => {
          const isOpen = open && isSelected;

          return (
            <>
              <Disclosure.Button className="py-2 w-full">
                <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row items-center w-full">
                  <img
                    src={user.avatar_url}
                    alt="User Avatar"
                    className={`w-24 h-24 rounded-full border-2 border-${theme.color}-700 mb-4 sm:mb-0 sm:mr-4`}
                  />
                  <div className="flex flex-col flex-1 items-start">
                    <button
                      className={`text-md font-bold text-${theme.color}-700 focus:outline-none flex justify-between items-center w-full`}
                      onClick={handleToggle}
                    >
                      <span>{user.login}</span>
                      <span className="mx-3">
                        {isOpen ? (
                          <ChevronUpIcon className="h-5 w-5 ml-2" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5 ml-2" />
                        )}
                      </span>
                    </button>

                    <button
                      className={`bg-${theme.color}-700 px-2 py-1 rounded-lg my-1`}
                    >
                      <a
                        href={user?.html_url}
                        className="text-white font-semibold text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkIcon className="h-4 w-4 inline" /> Github
                      </a>
                    </button>

                    <button
                      className={`bg-${theme.color}-700 px-2 py-1 rounded-lg my-1`}
                    >
                      <a
                        href={`https://github.com/${user?.login}?tab=repositories`}
                        className="text-white font-semibold text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkIcon className="h-4 w-4 inline" /> Repos
                      </a>
                    </button>
                  </div>
                </div>
              </Disclosure.Button>
              <Transition
                show={isOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="text-gray-500">
                  {isOpen && (
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6 transition-all duration-300">
                      {isLoadingRepos && (
                        <p className="text-gray-500">Loading repositories...</p>
                      )}
                      {error && <p className="text-red-500">{error}</p>}

                      {repos.length === 0 && !isLoadingRepos && (
                        <p className="text-red-500">
                          This user has no repositories
                        </p>
                      )}

                      {repos && (
                        <ul className="list-none mt-2">
                          {repos.map((repo) => (
                            <RepoComponent key={repo.id} repo={repo} />
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </Disclosure.Panel>
              </Transition>
            </>
          );
        }}
      </Disclosure>
    </div>
  );
};
